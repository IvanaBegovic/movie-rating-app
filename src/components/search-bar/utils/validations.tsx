export function isNumber(value: string) {
  return /^[0-9+]*$/i.test(value)
}

export function isEmail(value: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-_]+\.[A-Z]{2,4}$/i.test(value)
}

export function isAlphabet(value: string) {
  return /^[A-Za-z ]*$/i.test(value)
}
