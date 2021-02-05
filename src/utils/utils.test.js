import { newTodos } from './utils';

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
