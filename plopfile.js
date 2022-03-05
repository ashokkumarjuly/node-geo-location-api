module.exports = function (plop) {
    require('dotenv').config({ path: '.env.testing' });
    const _ = require('lodash');
    const path = require('path');

    const DB_ORM_NAME = process.env.DB_ORM_NAME || 'sequelize';

    const generatorSrcPath = 'bin/generator/templates';
    const apiDestFolderPath = 'src/api/v1';
    const serviceDestFolderPath = 'src/@factory/service';
    const interfaceDestFolderPath = 'src/@factory/models/interfaces';
    const dbServiceFolderPath = 'src/@factory/repo';
    const dbServiceFacadeFolderPath = `src/@factory/repo/utils/${DB_ORM_NAME}`;

    plop.addHelper('absPath', function (p) {
        return path.resolve(plop.getPlopfilePath(), p);
    });

    plop.addHelper('lowerCase', (text) => text.toLowerCase());

    plop.addHelper('camelCase', (text) => _.camelCase(text));

    plop.addHelper('kebabCase', (text) => _.kebabCase(text));

    plop.addHelper('dotCase', (text) => _.lowerCase(text).replace(/ /g, '.'));

    // adding a custom inquirer prompt type
    plop.addPrompt('directory', require('inquirer-directory'));

    const controllerActions = [
        {
            type: 'add',
            path: `${apiDestFolderPath}/{{kebabCase name}}/controller.ts`,
            templateFile: `${generatorSrcPath}/controller/controller.hbs`
        },
        {
            type: 'add',
            path: `${apiDestFolderPath}/{{kebabCase name}}/route.ts`,
            templateFile: `${generatorSrcPath}/controller/route.hbs`
        },
        {
            type: 'add',
            path: `${apiDestFolderPath}/{{kebabCase name}}/route.validate.ts`,
            templateFile: `${generatorSrcPath}/controller/route.validate.hbs`
        }
    ];

    const serviceActions = [
        {
            type: 'add',
            path: `${serviceDestFolderPath}/{{kebabCase name}}/index.ts`,
            templateFile: `${generatorSrcPath}/service/index.hbs`
        },
        {
            type: 'add',
            path: `${serviceDestFolderPath}/{{kebabCase name}}/{{dotCase name}}.spec.ts`,
            templateFile: `${generatorSrcPath}/service/service.spec.hbs`
        },
        {
            type: 'add',
            path: `${serviceDestFolderPath}/{{kebabCase name}}/{{dotCase name}}.service.ts`,
            templateFile: `${generatorSrcPath}/service/service.hbs`
        }
    ];

    const interfaceActions = [
        {
            type: 'add',
            path: `${interfaceDestFolderPath}/{{kebabCase name}}/index.ts`,
            templateFile: `${generatorSrcPath}/interface/index.hbs`
        },
        {
            type: 'add',
            path: `${interfaceDestFolderPath}/{{kebabCase name}}/Get{{pascalCase name}}ById.ts`,
            templateFile: `${generatorSrcPath}/interface/byId.hbs`
        },
        {
            type: 'add',
            path: `${interfaceDestFolderPath}/{{kebabCase name}}/Get{{pascalCase name}}s.ts`,
            templateFile: `${generatorSrcPath}/interface/get.hbs`
        },
        {
            type: 'add',
            path: `${interfaceDestFolderPath}/{{kebabCase name}}/create{{pascalCase name}}.ts`,
            templateFile: `${generatorSrcPath}/interface/create.hbs`
        },
        {
            type: 'add',
            path: `${interfaceDestFolderPath}/{{kebabCase name}}/update{{pascalCase name}}.ts`,
            templateFile: `${generatorSrcPath}/interface/update.hbs`
        },
        {
            type: 'add',
            path: `${interfaceDestFolderPath}/{{kebabCase name}}/{{pascalCase name}}.attributes.ts`,
            templateFile: `${generatorSrcPath}/interface/model.attributes.hbs`
        }
    ];

    const dbActions = [
        {
            type: 'add',
            path: `${dbServiceFolderPath}/{{kebabCase name}}/index.ts`,
            templateFile: `${generatorSrcPath}/db/index.hbs`
        },
        {
            type: 'add',
            path: `${dbServiceFacadeFolderPath}/_{{dotCase name}}.facade.ts`,
            templateFile: `${generatorSrcPath}/db/facade.hbs`
        }
    ];
    // create your controller generators here
    plop.setGenerator('controller', {
        description: 'To generate a controller',
        prompts: [
            {
                type: 'input',
                name: 'name',
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                }
            }
        ], // array of inquirer prompts
        actions: function (data) {
            const actions = [];
            actions.push(...controllerActions);

            return actions;
        } // array of actions
    });
    // create your interface generators here
    plop.setGenerator('interface', {
        description: 'To generate a interface',
        prompts: [
            {
                type: 'input',
                name: 'name',
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                }
            }
        ], // array of inquirer prompts
        actions: function (data) {
            const actions = [];
            actions.push(...interfaceActions);

            return actions;
        } // array of actions
    });
    // create your interface generators here
    plop.setGenerator('service', {
        description: 'To generate a service',
        prompts: [
            {
                type: 'input',
                name: 'name',
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                }
            }
        ], // array of inquirer prompts
        actions: function (data) {
            const actions = [];
            actions.push(...serviceActions);

            return actions;
        } // array of actions
    });
    // create your interface generators here
    plop.setGenerator('db-service', {
        description: 'To generate a db-service',
        prompts: [
            {
                type: 'input',
                name: 'name',
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                }
            }
        ], // array of inquirer prompts
        actions: function (data) {
            const actions = [];
            actions.push(...dbActions);

            return actions;
        } // array of actions
    });

    // create your Module generators here
    plop.setGenerator('module', {
        description: 'To generate an API modules with controllers, services, db-services',
        prompts: [
            {
                type: 'input',
                name: 'name',
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                }
            }
        ], // array of inquirer prompts
        actions: function (data) {
            const actions = [];
            actions.push(...interfaceActions);
            actions.push(...controllerActions);
            actions.push(...serviceActions);
            actions.push(...dbActions);

            return actions;
        } // array of actions
    });

    /**
     * To Generate in custom path
     */
    const controllerCustomAction = [
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/controller.ts`,
            templateFile: `${generatorSrcPath}/controller/controller.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/route.ts`,
            templateFile: `${generatorSrcPath}/controller/route.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/route.validate.ts`,
            templateFile: `${generatorSrcPath}/controller/route.validate.hbs`
        }
    ];

    const serviceCustomActions = [
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/index.ts`,
            templateFile: `${generatorSrcPath}/service/index.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/{{pascalCase name}}.spec.ts`,
            templateFile: `${generatorSrcPath}/service/service.spec.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/{{pascalCase name}}.service.ts`,
            templateFile: `${generatorSrcPath}/service/service.hbs`
        }
    ];

    const interfaceCustomActions = [
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/index.ts`,
            templateFile: `${generatorSrcPath}/interface/index.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/Get{{pascalCase name}}ById.ts`,
            templateFile: `${generatorSrcPath}/interface/byId.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/Get{{pascalCase name}}s.ts`,
            templateFile: `${generatorSrcPath}/interface/get.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/create{{pascalCase name}}.ts`,
            templateFile: `${generatorSrcPath}/interface/create.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/update{{pascalCase name}}.ts`,
            templateFile: `${generatorSrcPath}/interface/update.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/{{pascalCase name}}.attributes.ts`,
            templateFile: `${generatorSrcPath}/interface/model.attributes.hbs`
        }
    ];

    const dbCustomActions = [
        {
            type: 'add',
            path: `{{absPath path}}/{{kebabCase name}}/index.ts`,
            templateFile: `${generatorSrcPath}/db/index.hbs`
        },
        {
            type: 'add',
            path: `{{absPath path}/_{{dotCase name}}.facade.ts`,
            templateFile: `${generatorSrcPath}/db/facade.hbs`
        }
    ];
    plop.setGenerator('custom', {
        description: 'To generate components at user specified path',
        prompts: [
            {
                type: 'list',
                name: 'input',
                message: 'Please choose a generator',
                choices: ['controller', 'interface', 'service', 'db-service']
            },
            {
                type: 'input',
                name: 'name',
                validate: function (value) {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                }
            },
            {
                type: 'directory',
                name: 'path',
                message: 'Please select the directory to put this component?',
                basePath: plop.getPlopfilePath()
            }
        ], // array of inquirer prompts
        actions: function (data) {
            const actions = [];
            // console.log(data);
            switch (data.input) {
                case 'controller':
                    actions.push(...controllerCustomAction);
                    break;
                case 'db-service':
                    actions.push(...dbCustomActions);
                    break;
                case 'interface':
                    actions.push(...interfaceCustomActions);
                    break;
                case 'service':
                    actions.push(...serviceCustomActions);
                    break;
                default:
                    break;
            }
            return actions;
        } // array of actions
    });
};
