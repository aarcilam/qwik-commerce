import { component$, $, useContext } from "@builder.io/qwik";
import { Button } from "../shared/button/button";
import { ShowPrice } from "../shared/show-price/show-price";
import { ImageWithBackHover } from "../shared/image-with-back-hover/image-with-back-hover";
import { Product, ProductVariation } from "@prisma/client";
import { useCart } from "~/hooks/useCart";
import { ImageWithZoomHover } from "../shared/image-with-zoom-hover/image-with-zoom-hover";
import { Select } from "../shared/forms/select/select";
import { ProductsCollection } from "../products-collection/products-collection";

export interface ProductProps {
  product: Product & {
    variations: ProductVariation[];
  };
}

export const ProductDetail = component$<ProductProps>((props) => {
  const { addToCart } = useCart();
  // TODO save the variation selected on a signal for addToCart with variation
  return (
    <>
      <div class="flex">
        <div class=" w-1/2">
          <ImageWithZoomHover frontImage={props.product.image} />
        </div>
        <div class=" w-1/2">
          <h2>
            {props.product.id}
            {props.product.name}
          </h2>
          <ShowPrice price={props.product.price} />
          {props.product.variations.length > 0 && (
            <Select
              onChange$={(event) => {
                console.log(event);
              }}
              options={props.product.variations.map((item) => item.value)}
              type=""
            />
          )}
          <Button
            text="Add To Cart"
            onClick$={() => addToCart(props.product)}
          ></Button>
        </div>
      </div>
      <ProductsCollection products={null} />
    </>
  );
});
