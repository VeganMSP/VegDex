import React, {Component} from "react";
import {Container} from "reactstrap";
import {NavMenu} from "./NavMenu";
import {Footer} from "./Footer";


export class Layout extends Component<any, any> {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu/>
        <div className='flex-shrink-0 pb-3'>
          <Container>
            {this.props.children}
          </Container>
        </div>
        <Footer/>
      </div>
    );
  }
}