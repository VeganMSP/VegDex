import React from "react";
import {PageInfo} from "@/models/PageInfo";
import {sanitizeHTML} from "@/functions/HtmlUtils";
import {formatDate} from "@/functions/date";

export const ContentPage = (props: {
  isLoading: boolean,
  data?: PageInfo
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

export const EditContentPage = (props: {
  isLoading: boolean,
  data?: string,
  pageTitle: string,
  submitHandler: (content: string) => void
}) => {
  const {isLoading, data, pageTitle, submitHandler} = props;
  const [content, setContent] = React.useState<string>(data ?? "");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  return (
    <div>
      <h2 className={"text-3xl"}>{pageTitle}</h2>
      {isLoading ?
        <p>Loading...</p> :
        <>
          <textarea
            className={"w-full h-96"}
            defaultValue={content}
            onChange={handleChange}
          ></textarea>
          <button
            onClick={() => submitHandler(content)}
            >Save</button>
        </>
      }
    </div>
  );
};
