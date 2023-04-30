import { IEnvironment } from './environment.types';

export const environment: IEnvironment = {
    production: true,
    cloudinary: {
        cloud: {
            cloudName: 'dsimwsznp',
        },
    },
    cloudinaryURL: 'https://res.cloudinary.com/dsimwsznp',
    directusUrl: 'https://cms.sesan.dev',
};
