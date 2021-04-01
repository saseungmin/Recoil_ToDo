import {
  filteredTodos, setPath, updateTodos, getExpire,
} from './utils';

import mockToken from '../../fixtures/token';

import { BASE_URL } from './constants/url';

jest.mock('../services/storage');
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

describe('getExpire', () => {
  it('Should be decoded jwt and get expire data', () => {
    const result = getExpire(mockToken);

    expect(result).toEqual(new Date(1617696042 * 1000));
  });
});
