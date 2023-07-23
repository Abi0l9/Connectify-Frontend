export const timeSplitter = (str) => {
  const splitted = str?.split(" ")?.slice(0, 5);
  const time = splitted?.at(-1);

  return time;
};

// export const dateSplitter = (str) => {
//   const splitted = str?.split(" ")?.slice()
// }
