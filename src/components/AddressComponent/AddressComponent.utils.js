export const parseGoogleAddress = (address, field) => {
  let result = "";
  address.find((a) => {
    if (a.types[0] === field) {
      result = a.long_name;
      return true; // stop searching
    }
    return false;
  });
  return result;
};
