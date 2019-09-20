import { createBrowserHistory } from 'history';
import { stat } from 'fs';
const history = createBrowserHistory();
const axios = require('axios');

const API_ENDPOINT = "http://localhost:5000"

const config = {
  crossdomain: true
};

export default class Service {
  // 
  // User management 
  // 
  static async getTasks() {
    return axios.get(API_ENDPOINT + `/todos`).then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err);
      return err;
    })
  }

  static async deleteTask(id) {
    return axios.delete(API_ENDPOINT+`/todos/${id}`).then((response) =>{
      console.log(response.data);
      return (response);
    }).catch((err) => {
      console.error(err);
    })
  }

  static async createTask(task, status) {
    return axios.post(API_ENDPOINT+'/todos', {
      task: task,
      status: status
    }).then((response) => {
      console.log(response.data);
      return response;
    }).catch((err) => {
      console.log(err);
      return (err);
    })
  }

  static async getRender() {
    return axios.get(API_ENDPOINT+'/render').then((response) => {
      console.log(response);
      return response.data;
    }).catch((err) => {
      return err;
    })
  }
}