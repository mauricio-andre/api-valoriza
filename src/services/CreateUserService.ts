import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default class CreateUserService {
  public async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    if (!password) {
      throw new Error('Password incorrect');
    }

    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);
    const user = usersRepositories.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepositories.save(user);

    return user;
  }
}
