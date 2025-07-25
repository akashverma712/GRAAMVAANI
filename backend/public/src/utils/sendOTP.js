import { transporter } from '../config/mail.js';
import { twilioClient } from '../config/twilio.js';

export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
  });
};

export const sendOtpSMS = async (phone, otp) => {
  await twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
};

  