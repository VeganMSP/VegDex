import React from "react";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody} from "reactstrap";
import AsyncCreatableSelect from "react-select/async-creatable";
import {getBlogPostCategories} from "../services/BlogService";

export const BlogPostStatus = {
  DRAFT: 0,
  PUBLISHED: 1
};

interface IProps {
  isOpen: any;
  toggleFunc: any;
  changeFunc: any;
  submitFunc: any;
}

export const BlogPostFormModal = (props: IProps) => {
  const {isOpen, toggleFunc, changeFunc, submitFunc} = props;

  const populateBlogPostCategories = async () => {
    const response = await getBlogPostCategories();
    return await response.json();
  };

  return (
    <>
      <Button class={"primary"} onClick={toggleFunc}>
        Create New +
      </Button>

      <Modal
        isOpen={isOpen}
        toggle={toggleFunc}
      >
        <ModalBody>
          <Form onSubmit={(e) => {
            e.preventDefault();
            submitFunc(e);
          }
          }>
            <FormGroup row>
              <Label for="title"
                     sm={2}>
                Title:
              </Label>
              <Col sm={10}>
                <Input id="title"
                       name="title"
                       onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="content"
                     sm={2}>
                Content:
              </Label>
              <Col sm={10}>
                <Input id="content"
                       name="content"
                       type="textarea"
                       onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="blog_post_category_id"
                     sm={2}>
                Category:
              </Label>
              <Col sm={10}>
                <AsyncCreatableSelect id="blog_post_category_id"
                                      name="blog_post_category_id"
                                      cacheOptions
                                      defaultOptions
                                      isClearable
                                      getOptionLabel={(e: any) => e.name}
                                      getOptionValue={e => e.id}
                                      loadOptions={populateBlogPostCategories}
                                      onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="status"
                     sm={2}>
                Status
              </Label>
              <Col sm={10}>
                <Input id="status"
                       name="status"
                       type="select"
                       onChange={changeFunc}
                >
                  <option value={BlogPostStatus.DRAFT} selected>Draft</option>
                  <option value={BlogPostStatus.PUBLISHED}>Published</option>
                </Input>
              </Col>
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}