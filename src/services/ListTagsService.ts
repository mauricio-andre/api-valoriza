import { getCustomRepository } from "typeorm";
import { instanceToPlain } from 'class-transformer';
import TagsRepositories from "../repositories/tagsRepositories";

export default class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();

    return instanceToPlain(tags);
  }
}
