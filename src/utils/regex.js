export const regexPatterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  phoneNumber: /^07[0-9]{8}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  creditCard:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  date: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/,
  time: /^([01]\d|2[0-3]):?([0-5]\d)$/,
  otpDigits: /^\d$/,
  digits: /^\d*$/,
  noWhiteSpaces: /^\S*$/,
  alphanumeric: /^[a-zA-Z0-9]*$/,
};

export const validateInput = (type, value) => {
  return regexPatterns[type].test(value);
};
