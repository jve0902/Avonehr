export const getAcronym = (str) => {
  if (!str || typeof str === undefined) {
    return;
  }
  const matches = str.match(/\b(\w)/g);
  return matches.join("");
};

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
    else if (obj[key] === "" || obj[key] === null) delete obj[key];
  });
  return obj;
};
