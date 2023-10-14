import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {BlogPostFormModal} from "./_new_blog_post";
import {IBlogPost} from "../models/IBlogPost";
import {getBlogPosts} from "../services/BlogService";

export const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<IBlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [formModal, setFormModal] = useState(false);
  const [form, setForm] = useState<{ [key: string]: string }>({});

  const toggleModal = () => setFormModal(!formModal);

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

  const blogPostFormModal = <BlogPostFormModal
    isOpen={formModal}
    toggleFunc={toggleModal}
    changeFunc={handleChange}
    submitFunc={submitForm}
  />;

  const renderBlogPosts = (blog_posts: IBlogPost[]) => {
    if (blog_posts.length > 0) {
      return (
        <div>
          {blogPostFormModal}
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
          {blogPostFormModal}
          <p>There are no blog posts in the database!</p>
        </div>
      );
    }
  }

  const handleSubmit = (title: string, content: string, status: string) => {
    console.log(title, content, status);
  }

  useEffect(() => {
    if (blogPosts) {
      setLoading(false);
    } else {
      getBlogPosts().then(r => {
        if (r.ok) return r.json();
      }).then(data => {
        setBlogPosts(data)
      });
    }
  }, [blogPosts]);

  return (
    <>
      <div>
        {loading ? <p><em>Loading...</em></p> :
          renderBlogPosts(blogPosts as IBlogPost[])}
      </div>
    </>
  );
};

const BlogPost = (props: { post: IBlogPost }) => {
  const {title, slug, content, created_at} = props.post;
  const date = new Date(created_at);
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
        <Link to={`/blog/${year}/${month}/${day}/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className='post-content'>{content}</p>
    </div>
  );
};
