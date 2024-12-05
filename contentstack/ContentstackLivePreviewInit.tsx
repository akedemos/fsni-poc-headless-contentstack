"use client";
import { useEffect } from "react";
import { initPreview } from "./sdk";

/**
 * Live preview needs to be initialised as well on the client side
 *
 * The stack on the server side should have Live preview SDK included
 */
export const ContenstStackLivePreviewInit = () => {
  useEffect(() => {
    initPreview();
  }, []);

  return null;
};
