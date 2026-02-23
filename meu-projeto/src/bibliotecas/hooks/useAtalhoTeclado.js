import { useEffect } from "react";

export function useAtalhoTeclado(atalho, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      const [modifier, key] = atalho.split("+").map(s => s.trim().toLowerCase());
      
      const modifierPressed = 
        (modifier === "ctrl" && (e.ctrlKey || e.metaKey)) ||
        (modifier === "shift" && e.shiftKey) ||
        (modifier === "alt" && e.altKey);

      if (modifierPressed && e.key.toLowerCase() === key) {
        e.preventDefault();
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [atalho, callback]);
}