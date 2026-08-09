"use client";

import { useEffect } from "react";

/**
 * Soft deterrents against casual copying of portfolio content.
 * Not cryptographic security — slows down opportunistic copy/scrape.
 */
export function ContentProtection() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, a[href^='mailto'], a[download]")) {
        return;
      }
      e.preventDefault();
    };

    const onCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString() ?? "";
      if (selection.length > 80) {
        e.preventDefault();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const blocked =
        (e.ctrlKey || e.metaKey) &&
        (key === "u" || key === "s" || (e.shiftKey && key === "i"));
      if (blocked) {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
