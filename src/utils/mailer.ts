import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { jwtSecret, mail, url } from '../config';
import { getToken } from './';

import appLogger from './logger';

const transport = nodemailer.createTransport(mail);

export const sendEmail = (email: string, name: string) => {
  if (process.env.NODE_ENV === 'production') {
    const token: string = getToken({ email });
    const html = generateEmail(name, token);
    transport.sendMail(
      {
        from: 'Car Finder',
        html,
        to: email
      },
      (err, info) => {
        appLogger.info(`The mail sent to ${email}`);
        if (err) {
          throw err;
        }
      }
    );
  }
};

// change hardcoded string

const generateEmail = (name: string, token: string) => {
  return `
    <div style="background-color:turquoise; padding: 10px; font-family: BlinkMacSystemFont, Segoe UI, Arial, sans-serif; ">
      <div style="background-color: white; border-radius: 5px;">
        <div style="background-color:turquoise; color: #4a4a4a;  padding: 20px; border-radius: 5px 5px 0 0;">     
          <span>Gstream Service</span>
        </div>
        <div style="background-color: white; padding: 40px 30px 30px; border-radius: 5px; color: #4a4a4a;">
          <h1>${`Здравствуйте, ${name}!`}</h1>
          <p style="margin-bottom: 40px;">${'Чтобы воспользоваться сервисом GStream, подтвердите ваш е-мейл, ' +
            'перейдя по ссылке.'}</p>
          <div style="display: flex; justify-content: flex-end;"> 
            <button style="padding: 0px; background-color: green; margin-bottom: 20px; border-color: transparent; font-size: 0.9rem; border-radius: 3px;">
              <a href="http://${url}/?token=${token}" style="display: block; padding: 10px; text-decoration: none; color: rgba(0, 0, 0, 0.7);">${'Подтвердить'}</a>
            </button>
          </div>
          <hr style="color: #95989a">
          <p style="font-size: 12px; color: #95989a; text-align: center;"> by GStream Inc.  The source code is licensed under MIT.</p>
        </div>
      </div>
    </div>`;
};
