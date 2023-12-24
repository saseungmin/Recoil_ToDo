import client from './client';

import { getCookie } from '../cookie';

jest.mock('../cookie', () => ({
  getCookie: jest.fn(),
}));

jest.unmock('axios');
describe('request interceptor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('API request should add authorization token to header', () => {
    getCookie.mockReturnValueOnce('token');

    const result = client.interceptors.request.handlers[0].fulfilled({ headers: {} });

    expect(getCookie).toHaveBeenCalledTimes(1);
    expect(result.headers).toHaveProperty('Authorization', 'token');
  });

  it("API request shouldn't add authorization token to header", () => {
    getCookie.mockReturnValueOnce('');

    const result = client.interceptors.request.handlers[0].fulfilled({ headers: {} });

    expect(getCookie).toHaveBeenCalledTimes(1);
    expect(result.headers).toHaveProperty('Authorization', '');
  });
});
