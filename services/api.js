import request from "../utils/request";

//https:jsonplaceholder.typicode.com/todos
export async function getData() {
  return request("https://jsonplaceholder.typicode.com/todos", {
    method: "post",
    body: req
  });
  return "respuesta de la api";
}
