export const timeSplitter = (str) => {
  const splitted = str?.split(" ")?.slice(0, 5);
  const time = splitted?.at(-1);

  return time;
};
