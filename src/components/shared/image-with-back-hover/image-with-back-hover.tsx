import { component$, useSignal } from "@builder.io/qwik";

export interface ImageWithBackHoverProps {
  frontImage: string|null,
  backImage: string|null
}

export const ImageWithBackHover = component$<ImageWithBackHoverProps>((props) => {
    const showBack = useSignal(false);
    // TODO on hover show backImage
  return (
    <div>
        {props.frontImage != null && !showBack &&
            <img src={props.frontImage} alt="" />
        }
        {props.backImage != null && showBack &&
            <img src={props.backImage} alt="" />
        }
    </div>
  );
});