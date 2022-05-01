import { getCustomRepository } from "typeorm";
import ComplimentsRepositories from "../repositories/ComplimentsRepositories";

export default class ListUserSendComplimentsService {
  async execute(userId: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    return complimentsRepositories.find({
      where: {
        userSenderId: userId
      },
      relations: ['userSender', 'userReceiver', 'tag']
    });
  }
}
