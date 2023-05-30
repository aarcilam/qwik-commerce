import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  async createProduct(productData: Omit<Product, "id">): Promise<Product> {
    const product = await prisma.product.create({
      data: productData,
    });
    return product;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  }

  async updateProduct(productId: number, productData: Partial<Product>): Promise<Product | null> {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    return product;
  }

  async deleteProduct(productId: number): Promise<Product | null> {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return product;
  }
}
