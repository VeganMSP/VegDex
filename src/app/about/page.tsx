"use client";
import {IPageInfo} from "@/models/IPageInfo";
import useSWR from "swr";
import {fetchAboutPageFromDb} from "@/services/MetaService";
import {ContentPage} from "@/app/ui/contentPage";
import {sanitizeHTML} from "@/functions/HtmlUtils";

const AboutPage = () => {
  const { data, isLoading, error } = useSWR<IPageInfo>("aboutPage", fetchAboutPageFromDb);
  const sanitizedData = sanitizeHTML(data?.content as string);

  if (error) console.error(error);

  return (
    <ContentPage isLoading={isLoading}
                 pageTitle={"About"}
                 sanitizedData={sanitizedData} />
  );
};
export default AboutPage;