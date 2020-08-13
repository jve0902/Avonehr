export const getAcronym = (str) => {
  if (!str || typeof str === undefined) {
    return;
  }
  const matches = str.match(/\b(\w)/g);
  return matches.join("");
};
