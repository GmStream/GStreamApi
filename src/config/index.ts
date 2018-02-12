export const mail = {
  auth: {
    pass: process.env.MAIL_PASS,
    user: process.env.MAIL_USER
  },
  service: 'Gmail'
};

export const url =
  process.env.NOVE_ENV === 'production'
    ? process.env.CLIENT_HOST_URL_PROD
    : process.env.CLIENT_HOST_URL_DEV;

export const jwtSecret = process.env.JWT_KEY;
