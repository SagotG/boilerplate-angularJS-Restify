import React, { Component } from "react";
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
import ServiceWorker from "../../services/service";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      modal: false,
      modalCreate: false,
      backdrop: true,
      id: "",
      task: "",
      status: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log([e.target.name], e.target.value);
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    let listTasks = [];
    ServiceWorker.getTasks()
      .then(response => {
        response.forEach(data => {
          listTasks.push({
            id: data._id,
            task: data.task,
            status: data.status
          });
          this.setState({ tasks: listTasks });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteTask = id => {
    ServiceWorker.deleteTask(id).then(response => {
      if (response.status >= 200 || response.status <= 199) {
        this.getTasks();
      }
    });
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  toggleCreate = () => {
    this.setState(prevState => ({ modalCreate: !prevState.modalCreate }));
  };

  openInfo = x => {
    console.log(x);
    this.setState(prevState => ({
      modal: !prevState.modal,
      task: x.task,
      status: x.status
    }));
  };

  openModalCreate = () => {
    this.setState(prevState => ({ modalCreate: !prevState.modalCreate }));
  };

  createTask = e => {
    e.preventDefault();
    const { task, status } = this.state;
    ServiceWorker.createTask(task, status).then(response => {
      console.log(response);
      if (response.status >= 200 || response.status <= 199) {
        console.log("success");
        this.setState(prevState => ({ modalCreate: !prevState.modalCreate }));
        this.getTasks();
      }
      this.setState({ task: "", status: "" });
    });
  };

  render() {
    let list = this.state.tasks;
    const lisTasks = list.map(x => (
      <Card key={x.id}>
        <CardBody>
          <Col xs={10}>
            <h3>{x.task}</h3>
            <br></br>
            <p>{x.status}</p>
            <Button
              color="danger"
              className="float-right"
              size="sm"
              onClick={() => this.deleteTask(x.id)}
            >
              Delete
            </Button>
            <Button
              color="default"
              className="float-right"
              size="sm"
              onClick={() => this.openInfo(x)}
            >
              Show
            </Button>
          </Col>
        </CardBody>
      </Card>
    ));
    return (
      <>
        <Container>
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <h1>List Tasks</h1>
                  <Button
                    size="md"
                    color="primary"
                    className="float-right"
                    onClick={() => this.openModalCreate()}
                  >
                    Create
                  </Button>
                  <Button
                    size="md"
                    color="secondary"
                    className="float-right"
                    onClick={this.getTasks}
                  >
                    Refresh
                  </Button>
                </CardHeader>
                {lisTasks}
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            <h1>{this.state.task}</h1>
          </ModalHeader>
          <Container fluid>
            <ModalBody>
              <p>{this.state.status}</p>
            </ModalBody>
          </Container>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          size={"lg"}
          isOpen={this.state.modalCreate}
          toggle={this.toggleCreate}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggleCreate}>
            <h1>Create task</h1>
          </ModalHeader>
          <Container fluid>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  className="form-control"
                  name="task"
                  value={this.state.task}
                  placeholder="Task"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  className="form-control"
                  name="status"
                  value={this.state.status}
                  placeholder="Status"
                  onChange={this.onChange}
                />
              </FormGroup>
            </ModalBody>
          </Container>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleCreate}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.createTask.bind(this)}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Task;
