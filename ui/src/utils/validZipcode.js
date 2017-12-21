const isValidZipcode = str => /^\d{5}(?:[-\s]\d{4})?$/g.test(str);

export default isValidZipcode;

