import '@/shared/envs';

export const { PORT } = process.env;

export const GENERATOR_CODE = process?.env?.GENERATOR_CODE?.toString() || '';
export const MONGO_URI = process.env.MONGO_URI?.toString() || '';
export const JWT_SECRET = process.env.JWT_SECRET?.toString() || '';
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.toString() || '';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.toString() || '';
export const CLOUDINARY_API_SECRET = process.env?.CLOUDINARY_API_SECRET?.toString();
export const MODE_RUN = process.env?.MODE_RUN?.toString() || '';
export const DISABLE_LOGS = process.env.DISABLE_LOGS === 'true';
