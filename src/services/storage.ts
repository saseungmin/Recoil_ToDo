export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadItem = (key: string) => {
  const item = localStorage.getItem(key);

  return JSON.parse(item as any);
};

export const removeItem = (key: string) => localStorage.removeItem(key);
