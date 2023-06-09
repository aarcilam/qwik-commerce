import { $, useComputed$, useResource$, useSignal, useStore } from "@builder.io/qwik";
import { Product, ProductVariation } from "@prisma/client";
import { ProductService } from "~/services/ProductService";
import { server$ } from "@builder.io/qwik-city";

interface ProductsStore{
    products:(Product & {
        variations: ProductVariation[];
    })[]
}

export function useProducts() {
    const productsStore:ProductsStore = useStore({
        products: []
    });

    const take = useSignal(9);
    const skip = useSignal(0);

    const getProducts = server$(async () => {
        const productService = new ProductService();
        return await productService.getProducts(skip.value,take.value);
    });

    const getProduct = server$(async (id:number) => {
        const productService = new ProductService();
        return await productService.getProductById(id);
    });

    return{
        productsStore,
        getProduct,
        getProducts,
        take,
        skip,
    }
}