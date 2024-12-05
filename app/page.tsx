import { Debug } from "@/components/Debug";
import { stack } from "@/contentstack/sdk";
import Image from "next/image";
import { LivePreviewQuery } from "@contentstack/delivery-sdk";

type InfoCardSection = {
  info_cards: {};
};

type BannerSection = {
  banner: {
    title: string;
    subtitle: string;
    link: string;
    style: "primary" | "secondary";
    image: {
      title: string;
      url: string;
    };
    button_label: string;
  };
};

const isBannerSection = (
  section: BannerSection | InfoCardSection,
): section is BannerSection => {
  return (section as BannerSection).banner !== undefined;
};

const isInforCardSection = (
  section: BannerSection | InfoCardSection,
): section is BannerSection => {
  return (section as InfoCardSection).info_cards !== undefined;
};

type HomePageResponse = {
  title: string;
  sections: (InfoCardSection | BannerSection)[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log({ searchParams });
  // This is needed for live preview otherwise changes won't take effect
  stack.livePreviewQuery({
    ...searchParams,
  } as unknown as LivePreviewQuery);

  // The API suggests we can just do stack.contentType("home_page").fetch() for single content type, but it breaks
  // and complains about live preview
  const response = await stack
    .contentType("home_page")
    .entry()
    .find<HomePageResponse>();

  const content = response?.entries?.[0];

  return (
    <div>
      <div>
        {content?.sections.map((item) => {
          if (isBannerSection(item)) {
            return (
              <section className="bg-red-500 flex flex-row">
                <div className="flex-grow flex flex-col justify-center align-middle">
                  <h1 className="text-white text-center">
                    {item.banner.title}
                  </h1>
                  <p className="text-white text-center">
                    {item.banner.subtitle}
                  </p>
                  <div className="w-full flex justify-center">
                    <button className="bg-white p-1 w-auto border-r-2">
                      {item.banner.button_label}
                    </button>
                  </div>
                </div>
                <div>
                  <Image
                    src={item.banner.image.url}
                    alt={item.banner.image.title}
                    width={500}
                    height={300}
                  />
                </div>
              </section>
            );
          }

          if (isInforCardSection(item)) {
            return (
              <div>
                <Debug value={item.info_cards} />
              </div>
            );
          }

          return null;
        })}

        {/* <Image src={content.image.url} alt="banner" width={1080} height={250} />
        <h1>{content.title}</h1>
        <h2>{content.description}</h2> */}
      </div>
    </div>
  );
}
