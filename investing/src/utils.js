export const dateFormatter = (date) => {
  return `${1 + date.getMonth()}/${1 + date.getDate()}/${date.getFullYear().toString().substr(-2)}`
}

export const percentageFormatter = (num) => {
  return `${(num).toFixed(2)}%`
}

export const dollarFormatter = (num, decimalPlaces) => {
  if (num >= 0) {
    return `$${num.toFixed(decimalPlaces)}`
  } else {
    return `-$${Math.abs(num).toFixed(decimalPlaces)}`
  }
}