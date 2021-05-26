// Продолжить работу с интернет-магазином:
// В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// Реализуйте такие объекты.
// Перенести функционал подсчета корзины на объектно-ориентированную базу.




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
        if (item instanceof Item){
            this.items.push(item)
            console.log('Item added')
        } else {
            console.log('Item rejected. Invalid object')
        }
        
    }

    getBasketTotalPrice() {
        return this.items.reduce(function(acc, item) {
            return acc + item.price
        }, 0)
    }


}


myItems = [
    new Item('Blue car', 'Toyland', 10),
    new Item('Blue car', 'Toyland', 20),
    new Item('Blue car', 'Toyland', 20)
];

const basket = new Basket(myItems);
console.log(basket.getBasketTotalPrice());
