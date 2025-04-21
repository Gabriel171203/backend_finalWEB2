import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { CreatePostsDTO } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Posts } from './posts.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag/tag.entity';
import { Repository } from 'typeorm';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  @Post()
  async create(@Req() request: Request, @Body() createPostDTO: CreatePostsDTO) {
    const posts: Posts = new Posts();
    const userJwtPayload: JwtPayloadDto = request['user'];
    posts.content = createPostDTO.content;
    posts.image_url = createPostDTO.imageUrl;
    posts.title = createPostDTO.title;
    posts.user_id = userJwtPayload.sub;
    if (createPostDTO.tags && createPostDTO.tags.length > 0) {
      posts.tags = await this.tagRepository.findByIds(createPostDTO.tags);
    }
    await this.postService.save(posts);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(
    @Req() request: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Posts[]> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.postService.findByUserId(userJwtPayload.sub, page, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  async findOne(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<Posts> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.postService.findByUserIdAndPostId(userJwtPayload.sub, id);
  }

  @Get('by-tag/:tagId')
  @ApiParam({ name: 'tagId', type: Number, description: 'ID of the tag' })
  async findByTag(
    @Req() request: Request,
    @Param('tagId') tagId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Posts[]> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    return await this.postService.findByUserIdAndTagId(userJwtPayload.sub, tagId, page, limit);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  async updateOne(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() createPostDTO: CreatePostsDTO,
  ) {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const post: Posts = await this.postService.findByUserIdAndPostId(
      userJwtPayload.sub,
      id,
    );
    if (post.id == null) {
      throw new NotFoundException();
    }
    post.content = createPostDTO.content;
    post.image_url = createPostDTO.imageUrl;
    post.title = createPostDTO.title;
    if (createPostDTO.tags && createPostDTO.tags.length > 0) {
      post.tags = await this.tagRepository.findByIds(createPostDTO.tags);
    } else {
      post.tags = [];
    }
    await this.postService.save(post);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  async deleteOne(@Req() request: Request, @Param('id') id: number) {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const post: Posts = await this.postService.findByUserIdAndPostId(
      userJwtPayload.sub,
      id,
    );
    if (post.id == null) {
      throw new NotFoundException();
    }
    await this.postService.deleteById(id);
  }
}
