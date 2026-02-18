import { useEffect, useRef } from "react";

export function useKeyboardBack() {
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.key === "Escape" || (event.key === "Tab" && event.shiftKey)) &&
        !event.repeat
      ) {
        event.preventDefault();
        backButtonRef.current?.click();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return backButtonRef;
}
