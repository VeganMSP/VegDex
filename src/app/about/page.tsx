"use client";
import {IPageInfo} from "@/models/IPageInfo";
import useSWR from "swr";
import {ContentPage} from "@/app/ui/contentPage";
import {sanitizeHTML} from "@/functions/HtmlUtils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AboutPage = () => {
  const { data, isLoading, error } = useSWR<IPageInfo>("/api/meta/about", fetcher);
  const sanitizedData = sanitizeHTML(data?.content as string);

  if (error) console.error(error);

  return (
    <ContentPage isLoading={isLoading}
                 pageTitle={"About"}
                 sanitizedData={sanitizedData} />
  );
};
export default AboutPage;