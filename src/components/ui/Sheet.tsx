"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Slide-in panel built on the native <dialog> element, which gives us focus
 * trapping, Escape-to-close and an inert page behind it for free.
 */
export function Sheet({
  open,
  onClose,
  side = "right",
  label,
  children,
  panelClassName = "",
}: {
  open: boolean;
  onClose: () => void;
  side?: "right" | "top";
  label: string;
  children: ReactNode;
  panelClassName?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame: number | undefined;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      frame = requestAnimationFrame(() => (dialog.dataset.state = "open"));
    } else if (dialog.open) {
      dialog.dataset.state = "closed";
      timer = setTimeout(() => {
        dialog.close();
        document.documentElement.style.overflow = "";
      }, 450);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [open]);

  const hidden = side === "right" ? "translate-x-full" : "-translate-y-full";

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-state="closed"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        // Handle Escape ourselves: a focused search input would otherwise
        // swallow the first press to clear its text.
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="group/sheet fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-data-[state=open]/sheet:opacity-100"
      />
      <div
        className={`absolute bg-ivory shadow-2xl transition-transform duration-500 ease-out-soft group-data-[state=open]/sheet:translate-x-0 group-data-[state=open]/sheet:translate-y-0 ${hidden} ${
          side === "right" ? "inset-y-0 right-0 flex w-full max-w-md flex-col" : "inset-x-0 top-0"
        } ${panelClassName}`}
      >
        {children}
      </div>
    </dialog>
  );
}
