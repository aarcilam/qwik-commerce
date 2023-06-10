import { PrismaClient, Order } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderService {
  async createOrder(orderData: Omit<Order, "id">): Promise<Order> {
    const order = await prisma.order.create({
      data: orderData,
    });
    return order;
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  }

  async updateOrder(
    orderId: number,
    orderData: Partial<Order>
  ): Promise<Order | null> {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: orderData,
    });
    return order;
  }

  async deleteOrder(orderId: number): Promise<Order | null> {
    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return order;
  }
}
