class Item {
    constructor(name, manufactor, price) {
        this.name = name;
        this.manufactor = manufactor;
        this.price = price;
    }

    getGoodDescription() {
        return `${this.name} (${this.manufactor}): ${this.price} rub`
    }
}


class Basket {
    constructor(items) {
        this.items = items;
    }

    addItemToBasket(item) {
        if (item instanceof Item) {
            this.items.push(item)
            console.log('Item added')
        } else {
            console.log('Item rejected. Invalid object')
        }

    }

    getBasketSize() {
        return this.items.length;
    }

    getBasketTotalPrice() {
        return this.items.reduce(function (acc, item) {
            return acc + item.price
        }, 0)
    }


}


function generateItems(quantity) {
    const items = [];
    const names = [
        'Notebook',
        'SSD',
        'TV',
        'Phone',
        'Software',
        ''
    ];
    const manufactors = [
        'RosTech',
        'Microsoft',
        'Apple',
        'Samsung',
        'Lenovo'

    ];

    for (let i = 0; i < quantity; i += 1) {
        const name = names[Math.floor(Math.random() * names.length)];
        const man = manufactors[Math.floor(Math.random() * manufactors.length)];
        const cost = Math.floor(Math.random() * 100);
        items.push(new Item(name, man, cost));
    }
    return items
}


const itemQuantity = 5;

const basket = new Basket(generateItems(itemQuantity));
console.log(basket);
const basketElement = document.getElementById('basket');

let basketDescription = '';

if (basket.getBasketSize() == 0) {
    basketDescription = 'Корзина пуста'
} else {
    basketDescription = `В корзине ${basket.getBasketSize()} товаров на сумму ${basket.getBasketTotalPrice()} рублей.`;
}

const basketInfo = document.createElement('div');
basketInfo.textContent = basketDescription
basketElement.appendChild(basketInfo);