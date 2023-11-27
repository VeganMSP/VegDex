"use client";
import React, {useEffect, useState} from "react";
import {IPageInfo} from "@/models/IPageInfo";
import DOMPurify from "dompurify";
import {escapedNewLineToLineBreakTag} from "@/functions/HtmlUtils";
import {fetchHomePageFromDb} from "@/services/MetaService";
import {ContentPage} from "@/app/ui/contentPage";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homePageInfo, setHomePageInfo] = useState<IPageInfo>(null!);
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(
      escapedNewLineToLineBreakTag(homePageInfo.content).join(""))
  });

  const fetchData = () => {
    // fetchHomePage().then(data => setHomePageInfo(data));
    fetchHomePageFromDb().then(data => setHomePageInfo(data));
  };


  useEffect(() => {
    if (homePageInfo) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [homePageInfo]);

  return (
    <ContentPage isLoading={isLoading}
                 pageTitle={"VeganMSP.com"}
                 sanitizedData={sanitizedData}/>
  );
};
export default Home;