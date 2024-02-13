module.exports = async () => {
  process.env.TZ = 'America/Sao_Paulo';
  process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/dbVavatips';
  process.env.securityCode = 'securityCode_EXAMPLEA';
  process.env.JWT_SECRET = 'JWT_SECRET_EXAMPLE';
  process.env.MODE_RUN = 'DEVELOP';
  process.env.CLOUDINARY_CLOUD_NAME = 'CLOUDINARY_NAME_EXAMPLE';
  process.env.CLOUDINARY_API_KEY = 'CLOUDINARY_KEY_EXAMPLE';
  process.env.CLOUDINARY_API_SECRET = 'CLOUDINARY_SECRET_EXAMPLE';
  process.env.DISABLE_LOGS = 'true';
};
