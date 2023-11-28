import React from "react";
import {sanitizeHTML} from "@/functions/HtmlUtils";
import {formatDate} from "@/functions/date";

export const ContentPage = (props: {
  isLoading: boolean,
  data?: IPageInfo
  pageTitle: string
}) => {
  const {isLoading, data, pageTitle} = props;
  const sanitizedData = sanitizeHTML(data?.content ?? "");

  return (
    <div>
      <h2 className={"text-3xl"}>{pageTitle}</h2>
      {isLoading ?
        <p>Loading...</p> :
        <>
          <div className={"mb-3"}>
            <p className={"text-sm text-gray-500"}>Last updated: {formatDate(data?.updatedAt)}</p>
          </div>
          <div dangerouslySetInnerHTML={sanitizedData()}></div>
        </>
      }
    </div>
  );
};