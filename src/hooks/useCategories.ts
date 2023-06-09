import { server$ } from "@builder.io/qwik-city";
import { CategoryService } from "~/services/CategoryService";


export function useCategories() {

    const getCategories = server$(async () => {
        const categoryService = new CategoryService();
        return await categoryService.getCategories();
    });

    const getCategoryProducts = server$(async (id:number) => {
        const categoryService = new CategoryService();
        return await categoryService.getProductsByCategory(id);
    });

    return{
        getCategories,
        getCategoryProducts
    }
}