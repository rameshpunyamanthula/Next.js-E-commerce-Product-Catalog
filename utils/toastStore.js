let lastToastMessage = "";

export const setLastToastMessage = (message) => {
  lastToastMessage = message;
};

export const getLastToastMessage = () => {
  return lastToastMessage;
};
