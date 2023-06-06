import { Product } from "@prisma/client";
import { Product as ProductComponent } from "../product/product";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useProducts } from "~/hooks/useProducts";

export interface ProductsCollectionProps {
    products: Product[] | null
}

export const ProductsCollection = component$<ProductsCollectionProps>((props) => {
    // TODO make a function to filter here 
    const { getProducts } = useProducts();

    const products = useSignal(props.products);

    useTask$(async ({ track }) => {
        if (props.products == null) {
            const lastProducts = await getProducts();
            products.value = [...lastProducts]
        }
    })
    return (
        <div class="flex flex-wrap">
            {products.value && props.products == null &&
                products.value.map((product: any) => (
                    <div class="w-1/3">
                        <ProductComponent product={product} />
                    </div>
                ))
            }
            {props.products != null &&
                props.products.map((product: any) => (
                    <div class="w-1/3">
                        <ProductComponent product={product} />
                    </div>
                ))
            }
        </div>
    );
});