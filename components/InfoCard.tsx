import { stack } from "@/contentstack/sdk";
import { FC } from "react";
import { Debug } from "./Debug";
import Image from "next/image";

export const CONTENT_TYPE_UID = "info_card";

type InfoCardModel = {
  title: string;
  subtitle: string;
  image: {
    title: string;
    url: string;
  };
  button_label: string;
  style: "primary" | "secondary";
};

export const InfoCard: FC<{ uid: string }> = async ({ uid }) => {
  const result = await stack
    .contentType(CONTENT_TYPE_UID)
    .entry(uid)
    .fetch<InfoCardModel>();

  return (
    <article className="border-2 border-black p-4">
      <Image
        src={result.image.url}
        width={400}
        height={400}
        alt={result.image.title}
      />
      <h2>{result.title}</h2>
      <p>{result.subtitle}</p>
      <button>{result.button_label}</button>
    </article>
  );
};
