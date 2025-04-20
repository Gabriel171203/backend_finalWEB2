import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    // Map userId dan postId ke relasi entity
    const { userId, postId, ...rest } = createCommentDto;
    const comment = this.commentRepository.create({
      ...rest,
      user: { id: userId } as any,
      post: { id: postId } as any,
    });
    return this.commentRepository.save(comment);
  }

  async findByPostId(postId: number, page: number = 1, limit: number = 10): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findAll(page: number = 1, limit: number = 10): Promise<Comment[]> {
    return this.commentRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['user'], // ensure user relation is loaded
      select: {
        id: true,
        content: true,
        created_at: true,
        user: { id: true, username: true },
      },
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, updateCommentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
