import axios from "axios";

const API_ENDPOINT = "http://localhost:3000";
const ServiceWorker = {
 createTask(task, status) {
  console.log(task, status);
  return axios
    .post(API_ENDPOINT + "/task", {
      task: task,
      status: status
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

// async getTasks() {
//   return axios
//     .get(API_ENDPOINT + "/tasks")
//     .then(response => {
//       console.log(response);
//       return response;
//     })
//     .catch(err => {
//       console.error(err);
//       return err;
//     });
// }

// async  getTaskById(id) {
//   console.log(id);
//   return axios
//     .get(API_ENDPOINT + "/task/" + id)
//     .then(response => {
//       console.log(response);
//       return response;
//     })
//     .catch(err => {
//       console.error(err);
//       return err;
//     });
// }

// async  updateTask(id, task, status) {
//   return axios
//     .put(API_ENDPOINT + "/task/" + id, {
//       task: task,
//       status: status
//     })
//     .then(response => {
//       console.log(response);
//       return response;
//     })
//     .catch(err => {
//       console.error(err);
//       return err;
//     });
// }

// async  deleteTask(id) {
//   return axios
//     .delete(API_ENDPOINT + "/task/" + id)
//     .then(response => {
//       console.log(response);
//       return response;
//     })
//     .catch(err => {
//       console.error(err);
//       return err;
//     });
}
