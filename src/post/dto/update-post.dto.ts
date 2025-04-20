import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsDTO } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostsDTO) {}

