import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { isString } from 'lodash';
import { CreatePostInput, UpdatePostInput } from '../graphql';
import { PrismaService } from '../prisma/prisma.service';
import { createPostSchema, updatePostSchema } from '../utils';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private prisma: PrismaService,
  ) {}

  @Mutation('createPost')
  async create(@Args('createPostInput') createPostInput: CreatePostInput) {
    try {
      const hasValidInput = await createPostSchema.isValid(createPostInput);

      if (!hasValidInput) {
        throw new Error('Invalid input');
      }

      return this.postService.create(createPostInput);
    } catch (error) {
      return error;
    }
  }

  @Query('posts')
  findAll() {
    console.log('findAll');
    return this.postService.findAll();
  }

  @Query('post')
  async findOne(@Args('id') id: string) {
    try {
      if (!id || !isString(id)) {
        throw new BadRequestException('Invalid input');
      }

      return this.postService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Mutation('updatePost')
  async update(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    try {
      const hasValidInput = await updatePostSchema.isValid({
        ...updatePostInput,
        id,
      });

      if (!hasValidInput) {
        throw new BadRequestException('Invalid input');
      }

      // check if post exists
      await this.prisma.post.findUniqueOrThrow({
        where: { id },
        include: {
          author: true,
        },
      });

      return this.postService.update(id, updatePostInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation('removePost')
  async remove(@Args('id') id: string) {
    try {
      if (!id || !isString(id)) {
        throw new BadRequestException('Invalid input');
      }

      // check if post exists
      await this.prisma.post.findUniqueOrThrow({
        where: { id },
        include: {
          author: true,
        },
      });

      return this.postService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
