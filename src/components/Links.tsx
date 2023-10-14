import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NewLink} from "./_new_link";
import {ILinkCategory} from "../models/ILinkCategory";
import {ILink} from "../models/ILink";
import {getLinksByCategory} from "../services/LinksService";

export const Links = () => {
  const [data, setData] = useState<ILinkCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [formModal, setFormModal] = useState(false);
  const [form, setForm] = useState<{ [key: string]: string}>({});

  const renderLinksList = (links_by_category: ILinkCategory[]) => {
    return (
      <div>
        {links_by_category.length > 0 ? <>
          {links_by_category.map(category =>
            <LinkCategory
              key={category.slug}
              category={category}
              links={category.links}
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
      getLinksByCategory().then(r => {
        if (r.ok) return r.json();
      }).then(data => {
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
      <NewLink
        isOpen={formModal}
        toggleFunc={toggleModal}
        changeFunc={handleChange}
        submitFunc={submitForm}
      />
      <h2>Groups & Links</h2>
      {loading ? <p><em>Loading...</em></p> : renderLinksList(data as ILinkCategory[])}
    </div>
  );
};

export const LinkCategory = (props: { category: ILinkCategory, links: ILink[] }) => {
  const {category, links} = props;

  return (
    <div>
      <h3>{category.name}</h3>
      <ul>
        {links.map(link =>
          <Link key={link.slug} link={link}/>
        )}
      </ul>
    </div>
  );
};

export const Link = (props: { link: ILink }) => {
  const {name, website, description} = props.link;

  return (
    <li>
      <a
        href={website} target={"_blank"} rel="noreferrer">{name}</a> - {description}
    </li>
  );
};