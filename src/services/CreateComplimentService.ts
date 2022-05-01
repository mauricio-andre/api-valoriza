import { getCustomRepository } from 'typeorm';
import ComplimentsRepositories from '../repositories/ComplimentsRepositories';
import UsersRepositories from '../repositories/UsersRepositories';

interface IRquest {
  tagId: string;
  userSenderId: string;
  userReceiverId: string;
  message: string;
}

export default class CreateComplimentService {
  async execute({ tagId, userSenderId, userReceiverId, message }: IRquest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories,
    );

    if (userSenderId == userReceiverId) {
      throw new Error('Incorrect user Receiver');
    }

    const userReceiverExists = usersRepositories.findOne(userReceiverId);
    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists');
    }

    const compliment = complimentsRepositories.create({
      tagId,
      userReceiverId,
      userSenderId,
      message
    });

    return complimentsRepositories.save(compliment);
  }
}
