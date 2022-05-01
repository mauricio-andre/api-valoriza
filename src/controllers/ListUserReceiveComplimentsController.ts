import { Request, Response } from 'express';
import ListUserReceiveComplimentsService from '../services/ListUserReceiveComplimentsService';

export default class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();
    const compliments = await listUserReceiveComplimentsService.execute(userId);

    return response.json(compliments);
  }
}
