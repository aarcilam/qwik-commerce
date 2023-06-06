import { component$, useSignal } from "@builder.io/qwik";

export interface ImageWithBackHoverProps {
  frontImage: string|null
}

export const ImageWithZoomHover = component$<ImageWithBackHoverProps>((props) => {
  return (
    <div>
        {props.frontImage != null &&
            <img src={props.frontImage} alt="" />
        }
    </div>
  );
});