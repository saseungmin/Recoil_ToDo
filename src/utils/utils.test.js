import { newTodos, filteredTodos } from './utils';

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
