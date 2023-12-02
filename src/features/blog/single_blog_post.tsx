import React, {Component} from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";
import {BlogPost} from "@/models/BlogPost";

interface IState {
  slug: string;
  blog_post: BlogPost;
  loading: boolean;
}

const emptyBlogPost = (): BlogPost => ({
  title: "",
  slug: "",
  content: "",
  category: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createEmptyBlogPost = <T extends Partial<BlogPost>>(initialValues: T): BlogPost & T => {
  return Object.assign(emptyBlogPost(), initialValues);
};

class SingleBlogPost extends Component<any, IState> {
  static propTypes = {
    post: PropTypes.object.isRequired,
    slug: PropTypes.string,
    params: PropTypes.object,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      slug: this.props.params.slug,
      blog_post: createEmptyBlogPost({}),
      loading: true
    };
  }

  static renderBlogPost(blog_post: BlogPost) {
    const {title, content, createdAt} = blog_post;

    return (
      <div className='post-stub'>
        <h3 className='post-title'>
          <span className='date xs-hidden'>
            {format(new Date(createdAt), "yyyy-MM-dd")}
            &nbsp;
            {title}
          </span>
        </h3>
        <p className='post-content'>{content}</p>
      </div>
    );
  }

  componentDidMount() {
    this.getBlogPost(this.state.slug);
  }

  render() {
    const content = this.state.loading
      ? <p><em>Loading...</em></p>
      : SingleBlogPost.renderBlogPost(this.state.blog_post);
    return (
      <>
        {content}
      </>
    );
  }

  async getBlogPost(slug: string) {
    const reponse = await fetch("/api/v1/blog_posts?" + new URLSearchParams({
      slug: slug
    }));
    const data = await reponse.json();
    this.setState({blog_post: data, loading: false});
  }
}

export default SingleBlogPost;