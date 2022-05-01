import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/Tags';

@EntityRepository(Tag)
export default class TagsRepositories extends Repository<Tag> {}
