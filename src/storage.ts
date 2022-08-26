export const setItem = (key: string, data: object, session?: boolean) => {
  if (typeof window !== 'undefined' && data) {
    (session ? sessionStorage : localStorage).setItem(key, JSON.stringify(data));
  }
};

export const getItem = (key: string, session?: boolean): any => {
  if (typeof window !== 'undefined') {
    const value = (session ? sessionStorage : localStorage).getItem(key);

    if (value !== 'undefined' && value !== null) {
      return JSON.parse(value);
    }
  }
};

export const removeItem = (key, session) => {
  if (typeof window !== 'undefined') {
    (session ? sessionStorage : localStorage).removeItem(key);
  }
};
