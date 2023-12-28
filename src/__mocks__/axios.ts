const mockAxios = jest.genMockFromModule('axios');

(mockAxios as any).create.mockReturnThis();

export default mockAxios;
