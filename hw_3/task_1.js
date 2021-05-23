// С помощью цикла while вывести все простые числа в промежутке от 0 до 100.


const top = 100;
let n = 2;
const primes = [];

function isPrime(value) {
    for (let divider = 2; divider <= Math.sqrt(n); divider += 1) {
        if (n % divider == 0) {
            return false
        }
    } 
    return true
}


while (n <= top) {
    if (isPrime(n)) primes.push(n);
    n += 1;
}
console.log(primes);
