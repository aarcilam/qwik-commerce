import { $, useResource$, useSignal, useStore } from "@builder.io/qwik";
import { Product, ProductVariation } from "@prisma/client";
import { ProductService } from "~/services/ProductService";
import { server$ } from "@builder.io/qwik-city";

export function useProducts() {
    const products:(Product & {
        variations: ProductVariation[];
    })[] = useStore([]);

    const take = useSignal(9);
    const skip = useSignal(0);

    const getProducts = server$(async () => {
        const productService = new ProductService();
        products.push(...await productService.getProducts(skip.value,take.value));
        return products;
    });

    const getProduct = server$(async (id:number) => {
        const productService = new ProductService();
        return await productService.getProductById(id);
    });

    // TODO on this hook we need functions to refresh resource , to get more items 
    const productsResource = useResource$(async ({ track }):Promise<(Product & {
        variations: ProductVariation[];
    })[]> => {
        track(()=>skip.value)
        // TODO we need to set a max number of products
        return await getProducts();
    }); 


    return{
        products,
        productsResource,
        take,
        skip,
        getProduct
    }
}