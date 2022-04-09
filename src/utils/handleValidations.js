export class handleValidations {
  static ageValidation(age, type) {
    let newAge = 0;
    newAge = type === "increment" ? age + 1 : age -1;
    let msg = "",
      error = false;
    if (newAge >= 95) {
      error = true;
      msg = "Please enter a valid age";
    } else if (newAge <= 15) {
      error = true;
      msg = "Please enter a valid age";
    }
    return {
      error,
      msg,
    };
  }

  static weigthValidation(weigth, type) {
    let newWeigth = 0;
    newWeigth = type === "increment" ? weigth + 1 : weigth -1;
    let msg = "",
      error = false;
    if (newWeigth >= 100) {
      error = true;
      msg = "Enter valid weigth";
    } else if (newWeigth <= 40) {
      error = true;
      msg = "Enter valid weigth";
    }
    return {
      error,
      msg,
    };
  }

  static heightFeetValidation(heightFeet, type) {
    let newHeightFeet = 0;
    newHeightFeet = type === "increment" ? heightFeet + 1 : heightFeet -1;
    let msg = "",
      error = false;
    if (newHeightFeet >= 12) {
      error = true;
      msg = "Enter valid height";
    } else if (newHeightFeet <= 1) {
      error = true;
      msg = "Enter valid height";
    }
    return {
      error,
      msg,
    };
  }

  static heightInchValidation(heightInch, type) {
    let newHeightInch = 0;
    newHeightInch = type === "increment" ? heightInch + 1 : heightInch -1;
    let msg = "",
      error = false;
    if (newHeightInch >= 11 ) {
      error = true;
      msg = "Enter valid height";
    } else if (newHeightInch <= 0 ) {
      error = true;
      msg = "Enter valid height";
    }
    return {
      error,
      msg,
    };
  }
}
export default handleValidations;
