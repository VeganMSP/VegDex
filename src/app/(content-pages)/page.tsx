"use client";
import {PageInfo} from "@/models/PageInfo";
import useSWR from "swr";
import {ContentPage, EditContentPage} from "@/app/ui/contentPage";
import {useAuthorization} from "@/hooks/useAuthorization";
import {useState} from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const {isAdmin} = useAuthorization();
  const [editMode, setEditMode] = useState(false);
  const {data, isLoading, error, mutate} = useSWR<PageInfo>("/api/meta/homepage", fetcher);

  if (error) console.error(error);

  const handleSubmit = async (content: string) => {
    const response = await fetch("/api/meta/homepage", {
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
          pageTitle={"VeganMSP.com"}
          data={data?.content}
          submitHandler={handleSubmit}
        /> :
      <ContentPage
        isLoading={isLoading}
        pageTitle={"VeganMSP.com"}
        data={data}/>}
    </>
  );
};
export default Home;