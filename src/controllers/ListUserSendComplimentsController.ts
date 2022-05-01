import { Request, Response } from 'express';
import ListUserSendComplimentsService from '../services/ListUserSendComplimentsService';

export default class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const listUserSendComplimentsService = new ListUserSendComplimentsService();
    const compliments = await listUserSendComplimentsService.execute(userId);

    return response.json(compliments);
  }
}
