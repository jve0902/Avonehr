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


function getFullDate(x) {
  switch (x) {
    case 0:
      return 31;
    case 1:
      return 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      return 30;
  }
}

export const calculateAge = (date) => {
  let now = new Date();
  let dob = new Date(date);
  let year = now.getYear() - dob.getYear();
  let month = now.getMonth() - dob.getMonth();
  if (month < 0) {
    month = now.getMonth() + 12 - dob.getMonth();
    year = year - 1;
  }
  let day = now.getDate() - dob.getDate();
  if (day < 0) {
    let monthNumber = dob.getMonth();
    let fullDate = getFullDate(monthNumber);
    day = now.getDate() + fullDate - dob.getDate();
    month = month - 1;
  }

  return year > 0 ? year + " yrs" : month + " mo";
}

export const formatPhoneNumber = (phoneNumber) => {
  let cleaned = ('' + phoneNumber).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3]
  }
  return null
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
