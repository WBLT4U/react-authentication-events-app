function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && !isNaN(date.getTime()); 
}

function isValidImageUrl(value) {
  return value && value.startsWith('http');
}

function isValidEmail(value) {
  return value && value.includes('@');
}

export {
  isValidText,
  isValidDate,
  isValidImageUrl,
  isValidEmail
};
