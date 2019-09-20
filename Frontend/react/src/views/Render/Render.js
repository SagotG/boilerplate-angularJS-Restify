import React, { Component, PropTypes } from "react";
import Service from "../../services/service";
import { Markup } from "interweave";
import {
  Button,
  Card,
  Col,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row
} from "reactstrap";
class Render extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: ""
    };
  }

  componentDidMount() {
    this.getRender();
  }

  getRender = () => {
    Service.getRender()
      .then(response => {
        let contents = response;
        console.log("Content", contents.outerHTML);
        this.setState({ render: contents.toString() });
        setTimeout(() => {
          console.log(this.state.render);
        });
      })
      .catch(err => {
        console.log(err);
        return;
      });
  };

  render() {
    const { render } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <h1>Render module</h1>
                </CardHeader>
                <CardBody>
                  <Markup content={render} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Render;
