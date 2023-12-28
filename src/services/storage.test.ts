/* eslint-disable no-proto */
import { saveItem, loadItem, removeItem } from './storage';

describe('storage', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');

  beforeEach(() => {
    const mockStorage = {};

    (window.localStorage as any) = {
      setItem: (key: string, val: any) => Object.assign(mockStorage, { [key]: val }),
      getItem: (key: string) => (mockStorage as any)[key],
    };

    window.localStorage.__proto__.removeItem = jest.fn();
  });

  describe('saveItem', () => {
    const value = {
      value: 'value',
    };
    it('calls localStorage setItem', () => {
      saveItem('key', value);

      expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify(value));
    });
  });

  describe('loadItem', () => {
    it('calls localStorage getItem', () => {
      loadItem('key');

      expect(localStorage.getItem).toHaveBeenCalledWith('key');
    });
  });

  describe('removeItem', () => {
    it('calls localStorage removeItem', () => {
      removeItem('key');

      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
