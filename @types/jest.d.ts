declare const given: {
  <T = never>(key: string, callback: () => T): T
  [key: string]: never
};
