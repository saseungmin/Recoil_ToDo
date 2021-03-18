import {
  newTodos, filteredTodos, setPath, userCheckErrorHandling, updateTodos,
} from './utils';

import { BASE_URL } from './constants/url';

import { removeItem } from '../services/storage';

jest.mock('../services/storage');
describe('newTodos', () => {
  const initialState = [
    { _id: '1', task: 'task', isComplete: false },
    { _id: '2', task: 'task', isComplete: false },
  ];

  it('Change the value of the key of the array', () => {
    const todos = newTodos(initialState)({
      _id: '1',
      key: 'task',
      value: 'some task',
    });

    expect(todos).toEqual([
      { ...initialState[0], task: 'some task' },
      { ...initialState[1] },
    ]);
  });
});

describe('updateTodos', () => {
  const oldTodos = [
    { _id: '1', task: 'task', isComplete: false },
    { _id: '2', task: 'task', isComplete: false },
  ];

  const newTodo = { _id: '1', task: 'task', isComplete: true };
  it('Only the Todo that matches the _id will be changed to the new ToDo.', () => {
    const todos = updateTodos(oldTodos, newTodo);

    expect(todos).toEqual([
      newTodo,
      oldTodos[1],
    ]);
  });
});

describe('filteredTodos', () => {
  const initialState = [
    { id: '1', task: 'task', isComplete: false },
    { id: '2', task: 'task', isComplete: true },
  ];

  it('When All todos', () => {
    const result = filteredTodos.ALL(initialState);

    expect(result).toEqual(initialState);
  });

  it('When is completed todos', () => {
    const result = filteredTodos.COMPLETED(initialState);

    expect(result).toEqual([initialState[1]]);
  });

  it("When isn't completed todos", () => {
    const result = filteredTodos.ACTIVE(initialState);

    expect(result).toEqual([initialState[0]]);
  });
});

describe('setPath', () => {
  it('When env "development"', () => {
    const result = setPath('development');

    expect(result).toEqual({
      baseURL: '/',
    });
  });

  it('When another env', () => {
    const result = setPath('production');

    expect(result).toEqual({
      baseURL: BASE_URL,
      withCredentials: true,
    });
  });
});

describe('userCheckErrorHandling', () => {
  context('Have Error', () => {
    it('Call localStorage removeItem', () => {
      try {
        userCheckErrorHandling(new Promise((_, reject) => reject(new Error('error'))));
      } catch (error) {
        expect(removeItem).toBeCalledTimes(1);
      }
    });
  });

  context('Have Success', () => {
    it('should response data', async () => {
      const response = await userCheckErrorHandling(new Promise((resolve) => resolve('success')));

      expect(response).toBe('success');
    });
  });
});
