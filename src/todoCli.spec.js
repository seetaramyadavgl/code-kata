
const axios = require('axios');
const nock = require('nock');
const {fetchTodos, filterFirst20EvenTodos} = require('./todoCli');
jest.mock('axios');

describe('fetchTodos', () => {
  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  it('handles errors', async () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/todos')
      .replyWithError('Something went wrong');

    const consoleSpy = jest.spyOn(console, 'error');

    try {
      await fetchTodos();
    } catch (error) {
      expect(consoleSpy).toHaveBeenCalledWith('Error: Something went wrong');
      console.error(error);
    }
    consoleSpy.mockRestore();
  });
  
});

describe('filterFirst20EvenTodos', () => {
  it('returns an empty array when given an empty array', () => {
    const todos = [];
    const result = filterFirst20EvenTodos(todos);
    expect(result).toEqual([]);
  });

  it('returns the first 20 even todos when given an array of todos', () => {
    const todos = [
      { title: 'Todo 1', completed: true },
      { title: 'Todo 2', completed: false },
      { title: 'Todo 3', completed: true },
      { title: 'Todo 4', completed: false },
      { title: 'Todo 5', completed: true },
      { title: 'Todo 6', completed: false },
      { title: 'Todo 7', completed: true },
      { title: 'Todo 8', completed: false },
      { title: 'Todo 9', completed: true },
      { title: 'Todo 10', completed: false },
      { title: 'Todo 11', completed: true },
      { title: 'Todo 12', completed: false },
      { title: 'Todo 13', completed: true },
      { title: 'Todo 14', completed: false },
      { title: 'Todo 15', completed: true },
      { title: 'Todo 16', completed: false },
      { title: 'Todo 17', completed: true },
      { title: 'Todo 18', completed: false },
      { title: 'Todo 19', completed: true },
      { title: 'Todo 20', completed: false },
      { title: 'Todo 21', completed: true },
      { title: 'Todo 22', completed: false },
      { title: 'Todo 23', completed: true },
      { title: 'Todo 24', completed: false },
      { title: 'Todo 25', completed: true },
    ];
    const expected = [
      { title: 'Todo 1', completed: true },
      { title: 'Todo 3', completed: true },
      { title: 'Todo 5', completed: true },
      { title: 'Todo 7', completed: true },
      { title: 'Todo 9', completed: true },
      { title: 'Todo 11', completed: true },
      { title: 'Todo 13', completed: true },
      { title: 'Todo 15', completed: true },
      { title: 'Todo 17', completed: true },
      { title: 'Todo 19', completed: true },
      { title: 'Todo 21', completed: true },
      { title: 'Todo 23', completed: true },
      { title: 'Todo 25', completed: true },
    ];
    const result = filterFirst20EvenTodos(todos);
    expect(result).toEqual(expected);
  });
});