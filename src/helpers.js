// Format population number
export const humanizeNumber = number => {
  let numberString = [];
  let suffix = "";

  if (number > 1000000000) {
    numberString.push(
      Math.round((number / 1000000000 + Number.EPSILON) * 100) / 100
    );
    suffix = "D";
  } else if (number > 1000000) {
    numberString.push(
      Math.round((number / 1000000 + Number.EPSILON) * 100) / 100
    );
    suffix = "M";
  } else if (number > 1000) {
    numberString.push(Math.round(number / 1000));
    suffix = "k";
  } else {
    numberString.push(number.toLocaleString());
  }

  return numberString.join("") + suffix;
};
