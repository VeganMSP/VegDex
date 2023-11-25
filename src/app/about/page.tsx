"use client";
import React, {useEffect, useState} from "react";
import {IPageInfo} from "@/models/IPageInfo";
import DOMPurify from "dompurify";
import {fetchAboutPage} from "@/services/MetaService";

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aboutInfo, setAboutInfo] = useState<IPageInfo>(null!);
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(aboutInfo.content)
  });

  const fetchData = () => {
    fetchAboutPage().then(data => setAboutInfo(data));
  };

  useEffect(() => {
    if (aboutInfo) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [aboutInfo]);

  return (
    <div>
      <h2>About</h2>
      {isLoading ?
        <p>Loading...</p> :
        <>
          <div dangerouslySetInnerHTML={sanitizedData()}></div>
        </>
      }
    </div>
  );
};
export default AboutPage;