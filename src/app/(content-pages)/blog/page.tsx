"use client";
import React, {ChangeEvent, FormEvent, useState} from "react";
import useSWR from "swr";
import {format} from "date-fns";
import {BlogPost as BlogPostModel} from "@/models/BlogPost";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Blog = () => {
  const {data, isLoading, error} = useSWR<BlogPostModel[]>("/api/blog/posts", fetcher);
  const [formModal, setFormModal] = useState(false);
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const user = null;

  const toggleModal = () => setFormModal(!formModal);

  if (error) console.error(error);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    console.log(e);
    setForm(prevState => {
      prevState[target.name] = target.value;
      return prevState;
    });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    try {
      const response = await fetch("/api/v1/Blog", {
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

  const renderBlogPosts = (blog_posts?: BlogPostModel[]) => {
    if (blog_posts && blog_posts.length > 0) {
      return (
        <div>
          <ul>
            {blog_posts.map(post =>
              <BlogPost
                key={post.slug}
                post={post}
              />
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <p>There are no blog posts in the database!</p>
        </div>
      );
    }
  };

  const handleSubmit = (title: string, content: string, status: string) => {
    console.log(title, content, status);
  };

  return (
    <>
      <div>
        {isLoading ? <p><em>Loading...</em></p> :
          renderBlogPosts(data as BlogPostModel[])}
      </div>
    </>
  );
};

const BlogPost = (props: { post: BlogPostModel }) => {
  const {title, slug, content, createdAt} = props.post;
  const date = new Date(createdAt);
  const fullDate = format(date, "yyyy-MM-dd");
  const year = format(date, "yyyy");
  const month = format(date, "MM");
  const day = format(date, "dd");

  return (
    <div className='post-stub'>
      <h3 className='post-title'>
					<span className='date xs-hidden'>
						{fullDate}
            &nbsp;
					</span>
        <Link href={`/blog/${year}/${month}/${day}/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className='post-content'>{content}</p>
    </div>
  );
};
export default Blog;
