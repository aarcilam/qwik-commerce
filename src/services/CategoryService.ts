import { Category, PrismaClient, Product, ProductVariation } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
    async getCategories(): Promise<(Category & {products:Product[]})[]> {
        const categories = await prisma.category.findMany(
            {
                include:{products: true},
            }
        );
        return categories;
    }
}
