"use client";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {ILink} from "@/models/ILink";
import {DataSection} from "@/app/ui/dataSection";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Links = () => {
  const {data, isLoading, error} = useSWR<ILink[]>("/api/links", fetcher);
  const [formModal, setFormModal] = useState(false);
  const [form, setForm] = useState<{ [key: string]: string}>({});
  const user = null;

  const renderLinksList = (links: ILink[] | null) => {
    if (!links) return null;
    let links_by_category: { [key: string]: ILink[] } = links.reduce((acc, link) => {
      acc[link.category] = acc[link.category] || [];
      acc[link.category].push(link);
      return acc;
    }, Object.create(null));
    let categories = Object.keys(links_by_category).sort();
    return (
      <div>
        {categories.length > 0 ? <>
          {categories.map(category =>
            <LinkCategory
              key={category}
              category={category}
              links={links_by_category[category]}
            />)}
        </> : <>
          <p>There are no links in the database.</p>
        </>}
      </div>
    );
  };

  const toggleModal = () => setFormModal(!formModal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    setForm(prevState => {
      prevState[target.name] = target.value;
      return prevState;
    });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    try {
      const response = await fetch("/api/v1/links", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);
      target.reset();
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (<>
    <DataSection isLoading={isLoading} key={"Groups & Links"} sectionTitle={"Groups & Links"}>
      {renderLinksList(data as ILink[])}
    </DataSection>
  </>);
};
export default Links;

const LinkCategory = (props: { category: string, links: ILink[] }) => {
  const {category, links} = props;

  return (
    <div>
      <h3>{category}</h3>
      <ul>
        {links.map(link =>
          <Link key={link.name} link={link}/>
        )}
      </ul>
    </div>
  );
};

const Link = (props: { link: ILink }) => {
  const {name, url, description} = props.link;

  return (
    <li>
      <a
        href={url} target={"_blank"} rel="noreferrer">{name}</a> - {description}
    </li>
  );
};