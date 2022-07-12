import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { isString } from 'lodash';
import { CreateUserInput, UpdateUserInput } from '../graphql';
import { PrismaService } from '../prisma/prisma.service';
import { createUserSchema, updateUserSchema } from '../utils';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const hasValidInput = await createUserSchema.isValid(createUserInput);

    if (!hasValidInput) {
      throw new Error('Invalid input');
    }

    return this.userService.create(createUserInput);
  }

  @Query('user')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    if (!id || !isString(id)) {
      throw new BadRequestException('Invalid input');
    }

    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      const hasValidInput = await updateUserSchema.isValid({
        ...updateUserInput,
        id,
      });

      if (!hasValidInput) {
        throw new BadRequestException('Invalid input');
      }

      // check if user exists
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return this.userService.update(id, updateUserInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation('removeUser')
  async remove(@Args('id') id: string) {
    try {
      if (!id || !isString(id)) {
        throw new BadRequestException('Invalid input');
      }

      // check if user exists
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return this.userService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
