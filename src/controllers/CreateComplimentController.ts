import { Request, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';

export default class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { tagId, userReceiverId, message } = request.body;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tagId,
      userSenderId: userId,
      userReceiverId,
      message,
    });

    return response.json(compliment);
  }
}
