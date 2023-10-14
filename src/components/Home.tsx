import React, {useEffect, useState} from "react";
import {IPageInfo} from "../models/IPageInfo";
import DOMPurify from "dompurify";
import {escapedNewLineToLineBreakTag} from "../functions/HtmlUtils";
import {fetchHomePage} from "../services/MetaService";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homePageInfo, setHomePageInfo] = useState<IPageInfo>(null!);
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(
      escapedNewLineToLineBreakTag(homePageInfo.content).join(""))
  });

  const fetchData = () => {
    fetchHomePage().then(data => setHomePageInfo(data));
  };

  useEffect(() => {
    if (homePageInfo) {
      setIsLoading(false);
      console.log(homePageInfo);
    } else {
      fetchData();
    }
  }, [homePageInfo]);

  return (
    <div>
      <h2>VeganMSP.com</h2>
      {isLoading ?
        <p>Loading...</p> :
        <>
          <div dangerouslySetInnerHTML={sanitizedData()}></div>
        </>
      }
    </div>
  );
};