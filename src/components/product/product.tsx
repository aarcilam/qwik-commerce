import { component$, $, useContext } from "@builder.io/qwik";
import { Button } from "../shared/button/button";
import { ShowPrice } from "../shared/show-price/show-price";
import { ImageWithBackHover } from "../shared/image-with-back-hover/image-with-back-hover";
import { Product as ProductInterface } from "@prisma/client";
import { CartContext } from "~/context/cart/cart-provider";
import { useCart } from "~/hooks/useCart";

export interface ProductProps {
  product:ProductInterface
}

export const Product = component$<ProductProps>((props) => {
  const {addToCart} = useCart();

  return (
    <>
      <ImageWithBackHover frontImage={props.product.image} backImage={props.product.image}/>
      <h2>{props.product.id}{props.product.name}</h2>
      <ShowPrice price={props.product.price} />
      <Button text="Add To Cart" onClick$={() => addToCart(props.product)}></Button>
    </>
  );
});