import { component$ } from "@builder.io/qwik";
import { Button } from "../shared/button/button";

export const Hero = component$(() => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">a Really Qwik Shop !</h1>
          <p class="py-6">
            a Qwik based ecommerce starter, using all the benefits of Qwik
            framework.
          </p>
          <Button text="see more" />
        </div>
      </div>
    </div>
  );
});
