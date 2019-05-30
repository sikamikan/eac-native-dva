import request from '../utils/request';

export default function getData() {
  console.log('service');
  return request('https://jsonplaceholder.typicode.com/todos', {
    method: 'get',
  });
}
