import React from "react";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody} from "reactstrap";
import AsyncCreatableSelect from "react-select/async-creatable";

interface IProps {
  isOpen: any;
  toggleFunc: any;
  changeFunc: any;
  submitFunc: any;
}

export const NewLink = (props: IProps) => {
  const {isOpen, toggleFunc, changeFunc, submitFunc} = props;

  const populateLinkCategories = async () => {
    const response = await fetch("api/v1/link-categories");
    return await response.json();
  };

  return (
    <>
      <Button id="link_form_toggle" className={"primary"} onClick={toggleFunc}>
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
              <Label for="name"
                     sm={2}>
                Name:
              </Label>
              <Col sm={10}>
                <Input id="name"
                       name="name"
                       onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description"
                     sm={2}>
                Description:
              </Label>
              <Col sm={10}>
                <Input id="description"
                       name="description"
                       type="textarea"
                       onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="website"
                     sm={2}>
                Website:
              </Label>
              <Col sm={10}>
                <Input id="website"
                       name="website"
                       onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="link_category_id"
                     sm={2}>
                Category:
              </Label>
              <Col sm={10}>
                <AsyncCreatableSelect id="link_category_id"
                                      name="link_category_id"
                                      cacheOptions
                                      defaultOptions
                                      isClearable
                                      getOptionLabel={(opt: any) => {
                                        console.log(opt);
                                        return opt.name ?? "";
                                      }}
                                      getOptionValue={e => e.id}
                                      loadOptions={populateLinkCategories}
                                      onChange={changeFunc}
                />
              </Col>
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
