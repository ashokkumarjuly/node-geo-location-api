import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { APP_PATHS, USER_STATUS } from '../../../../constants';
import appConfig from '../../../../@core/app.config';
import sequelizeConnection from './SequelizeConnection';
import { IUserAttributes } from '../../interfaces';
import { getFileUploadPath } from '../../../../helpers/fileUploadHandler';

// Some attributes are optional in `User.build` and `User.create` calls
type IUserCreationAttributes = Optional<IUserAttributes, 'id'>;

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public firstName!: string;

    public lastName!: string;

    public email!: string;

    public password!: string;

    public uid!: string;

    public role!: number;

    public phoneNo!: string;

    public phoneCode!: string;

    public profileImage!: string;

    public address!: string;

    public address2!: string;

    public city!: string;

    public state!: string;

    public countryCode!: string;

    public zipCode!: string;

    public profileCompletion!: number;

    public status!: number;

    public emailVerified!: number;

    public authToken!: string;

    public verificationTokenExpires!: string;

    public timeZone!: string;

    public lastLoginDate!: string;

    // timestamps!
    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public readonly deletedAt!: Date;

    public roles: any;

    // // You can also pre-declare possible inclusions, these will only be populated if you
    // // actively include a relation.
    // public readonly roles?: Roles[]; // Note this is optional since it's only populated when explicitly requested in code

    // public static associations: {
    //     roles: Association<User, Roles>;
    // };
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or Sequelize.UUIDV1
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        full_name: {
            type: DataTypes.VIRTUAL,
            get() {
                return !this.firstName && !this.lastName
                    ? 'Anonymous'
                    : `${this.firstName} ${this.lastName ? this.lastName : ''}`;
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
                isUnique(value: string, next: any) {
                    User.findOne({
                        where: {
                            email: value,
                            status: { $gt: -1 }
                        }
                    })
                        .then((user: any) => {
                            // reject if a different user wants to use the same email
                            if (user && this.id !== user.id) {
                                return next('Email id is already in use!');
                            }
                            return next();
                        })
                        .catch((error: any) => next(error));
                }
            }
        },
        password: { type: DataTypes.STRING, allowNull: true },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                len: { args: [7, 20], msg: 'Phone number invalid, too short.' },
                isNumeric: { msg: 'not a valid phone number.' }
            }
        },
        phoneCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: '0'
            // validate: {
            //     isExist: function (value: string, next: any) {
            //         sequelize.models.Role.find({ where: { name: value } })
            //             .then(function (role) {
            //                 // reject if a different user wants to use the same email
            //                 if (role) {
            //                     return next();
            //                 } else {
            //                     return next('Role not exists.');
            //                 }
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });
            //     }
            // }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: USER_STATUS.PENDING
        },
        emailVerified: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0'
        },
        authToken: {
            allowNull: true,
            type: DataTypes.STRING
        },
        verificationTokenExpires: {
            allowNull: true,
            type: DataTypes.DATE
        },
        profileImage: {
            allowNull: true,
            type: DataTypes.STRING,
            get(this): string {
                if (this.getDataValue('profileImage')) {
                    return `${appConfig.base_URL}/api/uploads/${getFileUploadPath(
                        APP_PATHS.Files.UPLOAD_FOR.PROFILE.KEY,
                        false
                    )
                        .split('uploads/')
                        .pop()}/${this.getDataValue('profileImage')}`;
                }
                return '';
            }
        },
        address: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        address2: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        city: {
            allowNull: true,
            type: DataTypes.STRING
        },
        state: {
            allowNull: true,
            type: DataTypes.STRING
        },
        countryCode: {
            allowNull: true,
            type: DataTypes.STRING
        },
        zipCode: {
            allowNull: true,
            type: DataTypes.STRING
        },
        profileCompletion: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0'
        },
        timeZone: {
            allowNull: true,
            type: DataTypes.STRING
        },
        lastLoginDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('unix_timestamp(CURRENT_TIMESTAMP)')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection // passing the `sequelize` instance is required
    }
);

export default User;
