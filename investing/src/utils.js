export const dateFormatter = (date) => {
  return date.toISOString().split("T")[0];
}

export const percentageFormatter = (num) => {
  return `${(num).toFixed(2)}%`
}

export const dollarFormatter = (num, decimalPlaces) => {
  if (num >= 0) {
    return `$${num.toFixed(decimalPlaces)}`
  } else {
    return `($${Math.abs(num).toFixed(decimalPlaces)})`
  }
}