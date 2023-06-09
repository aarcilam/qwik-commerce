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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.value && props.products == null &&
                products.value.map((product: any) => (
                    <ProductComponent product={product} />
                ))
            }
            {props.products != null &&
                props.products.map((product: any) => (
                    <ProductComponent product={product} />
                ))
            }
        </div>
    );
});