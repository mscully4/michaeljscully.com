export const dateFormatter = (date) => {
  return `${1 + date.getMonth()}/${1 + date.getDate()}/${date.getFullYear().toString().substr(-2)}`
}