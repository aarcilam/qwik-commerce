import { PrismaClient, Product, ProductVariation } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
    async getProducts(): Promise<(Product & {variations: ProductVariation[]})[]> {
        // TODO recieve a quantity of products to get and an offset to make a pagination
        const products = await prisma.product.findMany({include:{variations: true}});
        return products;
    }
      
    async createProduct(productData: Omit<Product, "id">): Promise<Product> {
        const product = await prisma.product.create({
        data: productData,
        });
        return product;
    }

    async getProductById(productId: number): Promise<Product & {variations: ProductVariation[]} | null> {
        const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {variations: true}
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
