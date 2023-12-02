"use client";
import {useState} from "react";
import useSWR from "swr";
import {PageInfo} from "@/models/PageInfo";
import {ContentPage, EditContentPage} from "@/app/ui/contentPage";
import {useAuthorization} from "@/hooks/useAuthorization";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AboutPage = () => {
  const {isAdmin, data: session} = useAuthorization();
  const [editMode, setEditMode] = useState(false);
  const {data, isLoading, error, mutate} = useSWR<PageInfo>("/api/meta/about", fetcher);

  if (error) console.error(error);

  const handleSubmit = async (content: string) => {
    const response = await fetch("/api/meta/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content})
    });
    if (response.ok) {
      setEditMode(false);
      await mutate({...data, content: content});
    }
  };

  return (
    <>
      {isAdmin && !editMode ? <button onClick={() => setEditMode(true)}>Edit</button> : null}
      {editMode ?
        <EditContentPage
          isLoading={isLoading}
          pageTitle={"About"}
          data={data?.content}
          submitHandler={handleSubmit}
        /> :
        <ContentPage
          isLoading={isLoading}
          pageTitle={"About"}
          data={data}
        />}
    </>
  );
};
export default AboutPage;