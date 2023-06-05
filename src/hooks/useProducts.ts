import { useResource$, useStore } from "@builder.io/qwik";
import { Product } from "@prisma/client";
import { ProductService } from "~/services/ProductService";

export function useProducts() {
    const products:Product[] = useStore([])

    // TODO on this hook we need functions to refresh resource , to get more items 
    const productsResource = useResource$(async ({ track }):Promise<Product[]> => {
        // TODO we need to set a max number of products
        const productService = new ProductService();
        products.push(...await productService.getProducts());
        return products;
    }); 

    const productResource = (id:number)=>{
        return useResource$(async ({ track }):Promise<Product | null> => {
            // TODO we need to set a max number of products
            const productService = new ProductService();
            return await productService.getProductById(id);
        })
    }

    return{
        products,
        productsResource,
        productResource
    }
}