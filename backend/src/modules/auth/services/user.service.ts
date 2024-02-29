import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserType } from "../types/user.types";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";

// Work with UserEntity and getting some data from

@Injectable()
export class UserService { // UserService
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers() {
    return this.userRepository.find();
  }

  async findUserByUserID(userId: string) {
    return this.userRepository.findOne({ where: { userId: userId } });
  }

  async createOrFindUser(data: UserType) {
    const existedUser = await this.findUserByUserID(data.userId);
    if (existedUser) {
      return existedUser;
    }
    const query = await this.userRepository.create(data);
    return await this.userRepository.save(query);
  } // Only for Auth

  async deleteUserByUserID(userId: string) {
    return this.userRepository.delete(userId);
  }

  async setSuperUser(request: Request, privateKey: string) {
    console.log(privateKey);
    console.log(process.env.SUPERUSER_KEY);

    if (privateKey !== process.env.SUPERUSER_KEY) {
      throw new BadRequestException(`Your key doesn't match`);
    }
    const existedUser = await this.findUserByUserID(
      (request as any).user.userId
    );

    existedUser.isAdmin = true;
    await this.userRepository.update(existedUser.userId, existedUser);
    return existedUser;
  } // CRUD Service. Using only for auth and users controllers


}
