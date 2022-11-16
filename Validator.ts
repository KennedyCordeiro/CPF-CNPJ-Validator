export const validateTaxNumber = (taxNumber: string) => {
    taxNumber = taxNumber.replace(/[^\d]+/g, '')
  
    if (taxNumber.length === 11) {
      if (!!taxNumber.match(/(\d)\1{10}/)) return false
  
      let aux = taxNumber.split('')
      const validator = aux
        .filter((digit, index, array) => index >= array.length - 2 && digit)
        .map(el => +el)
  
      const toValidate = (pop: number) =>
        aux
          .filter((digit, index, array) => index < array.length - pop && digit)
          .map(el => +el)
  
      const rest = (count: number, pop: number) =>
        ((toValidate(pop).reduce((sum, el, i) => sum + el * (count - i), 0) *
          10) %
          11) %
        10
      return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
    } else if (taxNumber.length === 14) {
  
      if (!!taxNumber.match(/(\d)\1{13}/)) return false
      
      const match = taxNumber.toString().match(/\d/g)
      const numbers = Array.isArray(match) ? match.map(Number) : []
  
      if (numbers.length !== 14) return false
  
      const items = [...new Set(numbers)]
  
      if (items.length === 1) return false
  
      const calc = (x: number) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0
  
        for (let i = x; i >= 1; i--) {
          const n = slice[x - i]
          sum += n * factor--
          if (factor < 2) factor = 9
        }
  
        const result = 11 - (sum % 11)
        return result > 9 ? 0 : result
      }
  
      const digits = numbers.slice(12)
      const digit0 = calc(12)
      if (digit0 !== digits[0]) return false
  
      const digit1 = calc(13)
      return digit1 === digits[1]
    }
    return false
  }
  