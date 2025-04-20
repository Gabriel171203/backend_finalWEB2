import { Injectable, Post } from '@nestjs/common';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async save(user: Posts): Promise<Posts> {
    return this.postRepository.save(user);
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Posts[]> {
    return await this.postRepository.find({
      where: { user_id: userId },
      relations: ['tags'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserIdAndPostId(userId: number, postId: number): Promise<Posts> {
    const post = await this.postRepository.findOne({
      where: {
        user_id: userId,
        id: postId,
      },
      relations: ['tags'],
    });
    if (!post) {
      return new Posts();
    }
    return post;
  }

  async deleteById(postId: number) {
    await this.postRepository.delete({ id: postId });
  }

  async findByUserIdAndTagId(userId: number, tagId: number, page: number, limit: number): Promise<Posts[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('post.user_id = :userId', { userId })
      .andWhere('tag.id = :tagId', { tagId })
      .orderBy('post.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
