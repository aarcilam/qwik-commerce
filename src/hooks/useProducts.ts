import { useResource$, useStore } from "@builder.io/qwik";
import { Product } from "@prisma/client";
import { ProductService } from "~/services/ProductService";
import { isServer } from '@builder.io/qwik/build';
import { server$ } from "@builder.io/qwik-city";

export function useProducts() {
    const products:Product[] = useStore([]);

    const getProducts = server$(async () => {
        const productService = new ProductService();
        products.push(...await productService.getProducts());
        return products;
    });

    const getProduct = server$(async (id:number) => {
        const productService = new ProductService();
        return await productService.getProductById(id);
    });

    // TODO on this hook we need functions to refresh resource , to get more items 
    const productsResource = useResource$(async ({ track }):Promise<Product[]> => {
        // TODO we need to set a max number of products
        return await getProducts();
    }); 

    const productResource = (id:number)=>{
        return useResource$(async ({ track }):Promise<Product | null> => {
            // TODO we need to set a max number of products
            return await getProduct(id);
        })
    }

    return{
        products,
        productsResource,
        productResource
    }
}