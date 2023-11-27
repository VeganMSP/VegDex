"use client";
import {IPageInfo} from "@/models/IPageInfo";
import DOMPurify from "dompurify";
import useSWR from "swr";
import {escapedNewLineToLineBreakTag} from "@/functions/HtmlUtils";
import {fetchHomePageFromDb} from "@/services/MetaService";
import {ContentPage} from "@/app/ui/contentPage";

const Home = () => {
  const {data, isLoading, error} = useSWR<IPageInfo>("homePage", fetchHomePageFromDb);
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(
      escapedNewLineToLineBreakTag(data?.content as string).join(""))
  });

  return (
    <ContentPage isLoading={isLoading}
                 pageTitle={"VeganMSP.com"}
                 sanitizedData={sanitizedData}/>
  );
};
export default Home;