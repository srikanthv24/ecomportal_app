export const displayCurrency = (num) => {
  if (num) {
    let num1 = Number(num)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num1;
  } else {
    return "0";
  }
};
