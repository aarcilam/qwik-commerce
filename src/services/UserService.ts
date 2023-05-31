import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

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

  async getUserById(userId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
