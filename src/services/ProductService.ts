import { Category, PrismaClient, Product, ProductVariation } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
    async getProducts(skip:number = 0,take:number = 9): Promise<(Product & {variations: ProductVariation[],categories: Category[]})[]> {
        const products = await prisma.product.findMany(
            {
                include:{variations: true,categories: true},
                skip,
                take,
            }
        );
        return products;
    }
      
    async createProduct(productData: Omit<Product, "id">): Promise<Product> {
        const product = await prisma.product.create({
        data: productData,
        });
        return product;
    }

    async getProductById(productId: number): Promise<Product & {variations: ProductVariation[],categories: Category[]} | null> {
        const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {variations: true,categories: true}
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
