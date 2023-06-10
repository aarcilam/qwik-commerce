import { useOnDocument, useSignal, $ } from "@builder.io/qwik";

export function useScroll() {
  const scroll = useSignal(0);
  const endOfPage = useSignal(false);

  useOnDocument(
    "scroll",
    $((event) => {
      const scroll_pos = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      scroll.value = scroll_pos;

      if (scroll.value >= pageHeight - 10) {
        endOfPage.value = true;
      } else {
        endOfPage.value = false;
      }
    })
  );
  return {
    scroll,
    endOfPage,
  };
}
