"use client";

import { useEffect } from "react";

/**
 * Soft deterrents against casual copying of portfolio content.
 * Not cryptographic security — slows down opportunistic copy/scrape.
 */
export function ContentProtection() {
  useEffect(() => {
    const allowTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      return Boolean(
        el?.closest(
          "input, textarea, [contenteditable='true'], a[href^='mailto'], a[download]",
        ),
      );
    };

    const onContextMenu = (e: MouseEvent) => {
      if (allowTarget(e.target)) return;
      e.preventDefault();
    };

    const onCopy = (e: ClipboardEvent) => {
      if (allowTarget(e.target)) return;
      e.preventDefault();
      e.clipboardData?.setData("text/plain", "");
    };

    const onCut = (e: ClipboardEvent) => {
      if (allowTarget(e.target)) return;
      e.preventDefault();
    };

    const onSelectStart = (e: Event) => {
      if (allowTarget(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (allowTarget(e.target)) return;
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      const blocked =
        (mod &&
          (key === "c" ||
            key === "x" ||
            key === "a" ||
            key === "u" ||
            key === "s" ||
            key === "p" ||
            (e.shiftKey && (key === "i" || key === "j" || key === "c")))) ||
        key === "f12" ||
        (e.ctrlKey && e.shiftKey && key === "i");
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDragStart = (e: DragEvent) => {
      if (allowTarget(e.target)) return;
      e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
