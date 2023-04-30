import ICloudinaryConfigurations from '@cloudinary/url-gen/config/interfaces/Config/ICloudinaryConfigurations';

export interface IEnvironment {
    production: boolean;
    cloudinary: ICloudinaryConfigurations;
    cloudinaryURL: string;
    directusUrl: string;
}
