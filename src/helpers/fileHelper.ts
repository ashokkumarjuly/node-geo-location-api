/* istanbul ignore file */

import * as fs from 'fs';
import * as fse from 'fs-extra';

export const createDir = async (newPath: string): Promise<string> => {
    const path: string = await new Promise((resolve, reject) => {
        fs.stat(newPath, (exist) => {
            if (!exist) {
                fs.mkdir(newPath, { recursive: true }, (error) => {
                    if (error) reject(error);
                    resolve(newPath);
                });
            } else {
                resolve(newPath);
            }
        });
    });

    return path;
};

export const moveFile = async (src: string, dest: string): Promise<string> => {
    const result: string = await new Promise((resolve, reject) => {
        fse.move(src, dest, { overwrite: true }, (err) => {
            if (err) reject(err);
            resolve(dest);
        });
    });
    return result;
};
