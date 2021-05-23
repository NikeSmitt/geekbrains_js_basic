// С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. 
// Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. 

function generatePriceArray(count) {
    const prices = [];
    for (let i = 0; i < count; i += 1) {
        prices.push(Math.floor(Math.random() * 1000));
    }
    return prices;
}

const goodCount = 2;

const basket = generatePriceArray(goodCount);
console.log(basket);

function countBasketPrice(prices) {
    return prices.reduce(function (acc, value) {
        return acc + value;
    }, 0)
}

console.log(countBasketPrice(basket));