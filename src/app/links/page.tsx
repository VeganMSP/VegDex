"use client";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NewLink} from "@/components/_new_link";
import {ILink} from "@/models/ILink";
import {getLinksByCategory} from "@/services/LinksService";

const Links = () => {
  const [data, setData] = useState<ILink[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [formModal, setFormModal] = useState(false);
  const [form, setForm] = useState<{ [key: string]: string}>({});
  const user = null;

  const renderLinksList = (links: ILink[] | null) => {
    if (!links) return null;
    console.log("links: ", links);
    let links_by_category: { [key: string]: ILink[] } = links.reduce((acc, link) => {
      acc[link.category] = acc[link.category] || [];
      acc[link.category].push(link);
      return acc;
    }, Object.create(null));
    console.log("links_by_category: ", links_by_category);
    let categories = Object.keys(links_by_category).sort();
    console.log("categories: ", categories);
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

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      getLinksByCategory().then(data => {
        setData(data);
        setLoading(false);
      });
    }
  }, [data]);

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

  return (
    <div>
      {user ? <NewLink
        isOpen={formModal}
        toggleFunc={toggleModal}
        changeFunc={handleChange}
        submitFunc={submitForm}
      /> : null}
      <h2>Groups & Links</h2>
      {loading ? <p><em>Loading...</em></p> : renderLinksList(data)}
    </div>
  );
};
export default Links;

const LinkCategory = (props: { category: string, links: ILink[] }) => {
  const {category, links} = props;

  return (
    <div>
      <h3>{category}</h3>
      <ul>
        {links.map(link =>
          <Link key={link.slug} link={link}/>
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