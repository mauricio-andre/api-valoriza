import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';

interface IRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  async execute({ email, password }: IRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);
    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error('Email/Password incorrect');
    }

    const token = sign(
      { email: user.email },
      '1c16a8dc6f4b56b9a55d856a8f805cfe', {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return token;
  }
}
