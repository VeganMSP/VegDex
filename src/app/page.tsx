"use client";
import {IPageInfo} from "@/models/IPageInfo";
import useSWR from "swr";
import {fetchHomePageFromDb} from "@/services/MetaService";
import {ContentPage} from "@/app/ui/contentPage";
import {sanitizeHTML} from "@/functions/HtmlUtils";

const Home = () => {
  const {data, isLoading, error} = useSWR<IPageInfo>("homePage", fetchHomePageFromDb);
  const sanitizedData = sanitizeHTML(data?.content as string);

  return (
    <ContentPage isLoading={isLoading}
                 pageTitle={"VeganMSP.com"}
                 sanitizedData={sanitizedData}/>
  );
};
export default Home;