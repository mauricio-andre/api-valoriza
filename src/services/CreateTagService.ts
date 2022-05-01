import { getCustomRepository } from "typeorm";
import TagsRepositories from "../repositories/tagsRepositories";

export default class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error('incorrect name!');
    }

    const tagAlreadyExists = await tagsRepositories.findOne({ name });
    if (tagAlreadyExists) {
      throw new Error('Tag already exists');
    }

    const tag = tagsRepositories.create({ name });
    return tagsRepositories.save(tag);
  }
}
