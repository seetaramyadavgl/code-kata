// import axios from "axios";
const axios = require('axios');


const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

function printTodos(todos) {
  todos.forEach((todo) => {
    console.log(`Title: ${todo.title}, Completed: ${todo.completed}`);
  });
}

// Move the function declaration to the top of the file as a named export
function filterFirst20EvenTodos(todos) {
  return todos.filter((todo, index) => index % 2 === 0).slice(0, 20);
}

async function fetchTodos() {
  try {
    const todos = await axios.get(TODOS_URL);
    

    const evenTodos = filterFirst20EvenTodos(todos.data);

    printTodos(evenTodos);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

module.exports = { fetchTodos, filterFirst20EvenTodos };

fetchTodos();