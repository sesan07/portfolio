import { FirebaseOptions } from 'firebase/app';
import ICloudinaryConfigurations from '@cloudinary/url-gen/config/interfaces/Config/ICloudinaryConfigurations';

export interface IEnvironment {
    production: boolean,
    cloudinary: ICloudinaryConfigurations,
    firebase: FirebaseOptions,
}
