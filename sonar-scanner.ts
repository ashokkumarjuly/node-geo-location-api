// import * as scanner from 'sonarqube-scanner'
const scanner = require('sonarqube-scanner');
let envName = '.env';
// switch (process.env.NODE_ENV) {
//     case 'staging':
//         envName = `.env.staging`;
//         break;
//     case 'production':
//         envName = `.env.production`;
//         break;
//     case 'testing':
//         envName = `.env.testing`;
//         break;
//     case 'qa':
//         envName = `.env.qa`;
//         break;
//     case 'development':
//         envName = `.env.development`;
//         break;
//     default:
//         envName = `.env.local`;
// }

const configDotenv = require('dotenv').config({ path: envName });

// The URL of the SonarQube server. Defaults to http://localhost:9000
const serverUrl = process.env.SONARQUBE_URL || 'http://127.0.0.1:9000';

// The token used to connect to the SonarQube/SonarCloud server. Empty by default.
const token = process.env.SONARQUBE_TOKEN || '';

// projectKey must be unique in a given SonarQube instance
const projectKey = process.env.SONARQUBE_PROJECTKEY || '';

// options Map (optional) Used to pass extra parameters for the analysis.
// See the [official documentation](https://docs.sonarqube.org/latest/analysis/analysis-parameters/) for more details.
const options = {
    'sonar.projectKey': projectKey,

    // projectName - defaults to project key
    // 'sonar.projectName': projectKey,

    // Path is relative to the sonar-project.properties file. Defaults to .
    'sonar.sources': 'src',

    // source language
    'sonar.language': 'ts',

    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',

    // Encoding of the source code. Default is default system encoding
    'sonar.sourceEncoding': 'UTF-8'
};

// parameters for sonarqube-scanner
const params = {
    serverUrl,
    token,
    options
};

const sonarScanner = async () => {
    if (!serverUrl) {
        console.log('SonarQube url not set. Nothing to do...');
        return;
    }

    //  Function Callback (the execution of the analysis is asynchronous).
    const callback = (result: any) => {
        console.log('Sonarqube scanner result:', result);
    };

    scanner(params, callback);
};

sonarScanner().catch((err) => console.error('Error during sonar scan', err));
