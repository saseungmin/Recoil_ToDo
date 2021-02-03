import { toggleTodo } from './utils';

describe('toggleTodo', () => {
  context('is Correct ID', () => {
    const todo = { id: '1', task: 'task', isComplete: false };

    it('change isComplete', () => {
      const { isComplete } = toggleTodo(todo)('1');

      expect(isComplete).toBe(true);
    });
  });

  context('is not Correct ID', () => {
    const todo = { id: '1', task: 'task', isComplete: false };

    it("doesn't change isComplete", () => {
      const { isComplete } = toggleTodo(todo)('2');

      expect(isComplete).toBe(false);
    });
  });
});
