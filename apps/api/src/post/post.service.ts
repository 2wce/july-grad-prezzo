import { Injectable } from '@nestjs/common';
import { CreatePostInput, UpdatePostInput } from '../graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostInput) {
    try {
      // check if user exists
      await this.prisma.user.findUniqueOrThrow({
        where: { id: data.authorId },
      });

      return this.prisma.post.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: string) {
    return this.prisma.post.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, data: UpdatePostInput) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    try {
      // check of post exists
      await this.prisma.post.findUniqueOrThrow({
        where: { id },
      });

      return this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
