import Contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

const initContentstack = () => {
  return Contentstack.stack({
    apiKey: "blt911d48ba4800fbf9",
    deliveryToken: "cs876e5578cfa25935d800bb69",
    environment: "local",
    live_preview: {
      preview_token: "csb9429e8fc4097512865225ac",
      enable: true,
      host: "rest-preview.contentstack.com",
    },
  });
};

export const stack = initContentstack();

export const initPreview = () => {
  "use client";

  ContentstackLivePreview.init({
    stackDetails: {
      apiKey: "blt911d48ba4800fbf9",
    },
  });
};
