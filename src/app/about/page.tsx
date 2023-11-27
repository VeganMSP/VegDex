"use client";
import {IPageInfo} from "@/models/IPageInfo";
import DOMPurify from "dompurify";
import useSWR from "swr";
import {fetchAboutPageFromDb} from "@/services/MetaService";
import {ContentPage} from "@/app/ui/contentPage";
import {escapedNewLineToLineBreakTag} from "@/functions/HtmlUtils";

const AboutPage = () => {
  const { data, isLoading, error } = useSWR<IPageInfo>("aboutPage", fetchAboutPageFromDb);
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(
      escapedNewLineToLineBreakTag(data?.content as string).join(""))
  });

  if (error) console.error(error);

  return (
    <ContentPage isLoading={isLoading}
                 pageTitle={"About"}
                 sanitizedData={sanitizedData} />
  );
};
export default AboutPage;