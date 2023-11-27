import React from "react";

export const ContentPage = (props: {
  isLoading: boolean,
  sanitizedData: () => { __html: string },
  pageTitle: string
}) => {
  const {isLoading, sanitizedData, pageTitle} = props;
  return (
    <div>
      <h2 className={"text-3xl"}>{pageTitle}</h2>
      {isLoading ?
        <p>Loading...</p> :
        <>
          <div dangerouslySetInnerHTML={sanitizedData()}></div>
        </>
      }
    </div>
  );
};