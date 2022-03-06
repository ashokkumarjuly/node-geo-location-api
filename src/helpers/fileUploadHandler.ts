/* istanbul ignore file */

import * as fs from 'fs-extra';
// eslint-disable-next-line unicorn/import-style
import * as path from 'path';
import * as Formidable from 'formidable';
import { Request } from 'express';
import { startsWith } from 'lodash';
import IncomingForm from 'formidable/Formidable';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../@core/helpers/errors';
import { createDir, moveFile } from './fileHelper';
import AppConfig from '../@core/app.config';
import { FILE_TYPE } from '../constants';

interface IncomingFormCustom extends IncomingForm {
    multiples?: boolean;
    keepExtensions?: boolean;
}

interface IDataOptions {
    destination: string;
    user_id?: number;
    filename?: string;
    options?: any;
    type?: string;
}
interface IUploadRes {
    src: string;
    dest: string;
    filename: string;
    orginalfilename: string;
    version?: any;
}
interface IUploadResOutput {
    dest: string;
    filename: string;
    orginalfilename: string;
    version?: any;
}

/**
 * To remove leading slashed or "../" from a string,
 * -- If there are no './' or '../' the string is returned unchanged.
 * @param url
 * @returns
 */

const pathStrip = (url: string) => {
    const ax = url.lastIndexOf('./') + 1;
    return ax ? url.slice(Math.max(0, ax + 1)) : url;
};

export const getFileUploadPath = (uploadFor = 'user', absolutePath = true): string => {
    let uploadPath = `${AppConfig.file.uploadPath}`;
    switch (uploadFor) {
        case 'temp':
            uploadPath = `${AppConfig.file.uploadPath}/temp`;
            break;
        case 'user':
            uploadPath = `${AppConfig.file.uploadPath}/user`;
            break;
        case 'profile':
            uploadPath = `${AppConfig.file.uploadPath}/user/profile`;
            break;
        case 'artist':
            uploadPath = `${AppConfig.file.uploadPath}/artist`;
            break;
        case 'eula':
            uploadPath = `${AppConfig.file.uploadPath}/eula`;
            break;
        default:
            break;
    }

    return absolutePath ? uploadPath : pathStrip(uploadPath);
};
const localSaveFile = async (req: Request, data: IDataOptions): Promise<IUploadResOutput> => {
    const destPath = data.destination;
    const userId = data.user_id || '';
    const options = data.options || {};
    const filename = userId + uuidv4();

    try {
        await createDir(destPath);

        const result: IUploadRes = await new Promise((resolve, reject) => {
            const form: IncomingFormCustom = new Formidable.IncomingForm(options);
            form.multiples = false;
            form.keepExtensions = true;

            form.parse(req, (err, fields, files: any) => {
                if (err) {
                    reject(err);
                } else if (files && files?.upload_file) {
                    let flag = false;
                    if (
                        files?.upload_file?.mimetype &&
                        (((startsWith(files.upload_file.mimetype, 'image/') ||
                            /\.(jpg|jpeg|png|gif|bmp)$/i.test(files.upload_file.originalFilename)) &&
                            data.type === FILE_TYPE.IMAGE) ||
                            ((startsWith(files.upload_file.mimetype, 'pdf/') ||
                                /\.(pdf)$/i.test(files.upload_file.originalFilename)) &&
                                data.type === FILE_TYPE.PDF) ||
                            ((startsWith(files.upload_file.mimetype, 'text/csv') ||
                                /\.(pdf)$/i.test(files.upload_file.originalFilename)) &&
                                data.type === FILE_TYPE.CSV))
                    ) {
                        flag = true;
                    }

                    if (!flag) {
                        reject(new Error('Invalid File format.'));
                    }

                    const sourceFile = files.upload_file.filepath;
                    const extension = path.extname(files.upload_file.originalFilename).toLowerCase();
                    const orginalfilename = files.upload_file.originalFilename.replace(extension, '');
                    const destinationFile = `${destPath}/${filename}${extension}`;
                    const version = fields.version || '';

                    resolve({
                        src: sourceFile,
                        dest: destinationFile,
                        filename: `${filename}${extension}`,
                        orginalfilename,
                        version
                    });
                } else {
                    reject(new Error('Upload something went wrong.'));
                }
            });
        });

        let resultObj = { dest: '', filename: '', orginalfilename: '', version: '' };

        if (result) {
            await moveFile(result.src, result.dest);

            resultObj = {
                dest: result.dest,
                filename: result.filename,
                orginalfilename: result.orginalfilename,
                version: result.version
            };
        }

        return resultObj;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// To Upload file to .env.local server
export const uploadFile = async (req: Request, data: IDataOptions): Promise<IUploadResOutput> => {
    try {
        const destPath = data.destination;
        const thumbDestPath = 0;
        const createThumb = 0;

        if (!destPath) {
            throw new CustomError('general.error.destinationNotEmpty');
        }
        if (createThumb && !thumbDestPath) {
            throw new CustomError('general.error.destinationThumbNotEmpty');
        }

        // if (AppConfig.file.isCloudUpload) {
        //     // Upload to Cloud storage
        // }

        // Local Storage
        return await localSaveFile(req, data).catch((error) => {
            throw error;
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteFile = async (req: Request, data: IDataOptions): Promise<boolean> => {
    try {
        const destPath = data.destination;
        const { filename } = data;
        if (!destPath) {
            throw new CustomError('general.error.destinationNotEmpty');
        }

        let result = false;

        // if (AppConfig.file.isCloudUpload === true) {
        //     // delete in Cloud storage
        // }

        if (fs.existsSync(`${destPath}/${filename}`)) {
            fs.unlink(`${destPath}/${filename}`, (err) => {
                if (err) {
                    throw new CustomError('general.error.deleteLocalImage', { entity: JSON.stringify(err) });
                } else {
                    // console.log('successfully deleted .env.local image');
                }
            });
        }

        result = true;

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
