import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
import * as jwt from 'jsonwebtoken';
const jwtsecret = 'S3CR3T0';

export class UserService {
  async createUser(userData: Omit<User, "id">): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);
    console.log(userData);
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  }

  createToken(id:number,email:string){
    const token = jwt.sign({id,email},jwtsecret);
    return token;
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getUserByEmail(email:string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });
    return user;
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    });
    return user;
  }

  async deleteUser(userId: number): Promise<User | null> {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
