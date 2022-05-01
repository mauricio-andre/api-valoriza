import { getCustomRepository } from "typeorm";
import ComplimentsRepositories from "../repositories/ComplimentsRepositories";

export default class ListUserReceiveComplimentsService {
  async execute(userId: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    return complimentsRepositories.find({
      where: {
        userReceiverId: userId
      },
      relations: ['userSender', 'userReceiver', 'tag']
    });
  }
}
