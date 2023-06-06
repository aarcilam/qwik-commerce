import { component$, $, useContext } from "@builder.io/qwik";
import { Button } from "../shared/button/button";
import { ShowPrice } from "../shared/show-price/show-price";
import { ImageWithBackHover } from "../shared/image-with-back-hover/image-with-back-hover";
import { Product as ProductInterface, ProductVariation } from "@prisma/client";
import { useCart } from "~/hooks/useCart";
import { Link } from "@builder.io/qwik-city";

export interface ProductProps {
  product:(ProductInterface & {
      variations: ProductVariation[];
  })
}

export const Product = component$<ProductProps>((props) => {
  const {addToCart} = useCart();

  return (
    <>
    <Link href={'/shop/product/'+props.product.id}>
      <ImageWithBackHover frontImage={props.product.image} backImage={props.product.image}/>
      <h2>{props.product.id}{props.product.name}</h2>
      <ShowPrice price={props.product.price} />
    </Link>
    <Button text="Add To Cart" onClick$={() => addToCart(props.product)}></Button>
    </>
  );
});