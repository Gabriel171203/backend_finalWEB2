import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { IsArray, IsOptional } from "class-validator";

export class CreatePostsDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  imageUrl: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, type: [Number] })
  tags?: number[];
}