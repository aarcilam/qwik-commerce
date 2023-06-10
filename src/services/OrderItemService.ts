import { PrismaClient, OrderItem } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderItemService {
  async createOrderItem(
    orderItemData: Omit<OrderItem, "id">
  ): Promise<OrderItem> {
    const orderItem = await prisma.orderItem.create({
      data: orderItemData,
    });
    return orderItem;
  }

  async getOrderItemById(orderItemId: number): Promise<OrderItem | null> {
    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id: orderItemId,
      },
    });
    return orderItem;
  }

  async updateOrderItem(
    orderItemId: number,
    orderItemData: Partial<OrderItem>
  ): Promise<OrderItem | null> {
    const orderItem = await prisma.orderItem.update({
      where: {
        id: orderItemId,
      },
      data: orderItemData,
    });
    return orderItem;
  }

  async deleteOrderItem(orderItemId: number): Promise<OrderItem | null> {
    const orderItem = await prisma.orderItem.delete({
      where: {
        id: orderItemId,
      },
    });
    return orderItem;
  }
}
