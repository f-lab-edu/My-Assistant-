import { config } from '@/config';
import { compare, hash } from 'bcryptjs';
import { Resend } from 'resend';
import { sign } from 'jsonwebtoken';

const resend = new Resend(config.RESEND_API_KEY);

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await compare(password, hashedPassword);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${config.CLIENT_URL}/sign/new-verification?token=${token}&email=${email}`;

  await resend.emails.send({
    from: 'mynote@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const signToken = async (
  id: string,
  email: string,
  username: string,
) => {
  return sign(
    {
      id,
      email,
      username,
    },
    config.JWT_TOKEN!,
  );
};
