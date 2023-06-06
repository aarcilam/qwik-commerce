import { Product } from "@prisma/client";
import { Product as ProductComponent } from "../product/product";
import { component$ } from "@builder.io/qwik";

export interface ProductsCollectionProps {
  products: Product[]
}

export const ProductsCollection = component$<ProductsCollectionProps>((props) => {
    // TODO make a function to filter here 
  return (
    <div class="flex flex-wrap">
      {
        props.products.map((product: any)=>(
          <div class="w-1/3">
            <ProductComponent product={product} />
          </div>
        ))
      }
    </div>
  );
});