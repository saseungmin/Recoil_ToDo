import { newTodos, filteredTodos, setPath } from './utils';

import { BASE_URL } from './constants/url';

describe('newTodos', () => {
  const initialState = [
    { id: '1', task: 'task', isComplete: false },
    { id: '2', task: 'task', isComplete: false },
  ];

  it('Change the value of the key of the array', () => {
    const todos = newTodos(initialState)({
      id: '1',
      key: 'task',
      value: 'some task',
    });

    expect(todos).toEqual([
      { ...initialState[0], task: 'some task' },
      { ...initialState[1] },
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
