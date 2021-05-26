// * Подумать над глобальными сущностями. К примеру, сущность «Продукт» в 
// интернет-магазине актуальна не только для корзины, но и для каталога. Стремиться 
// нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей 
// сайта, но в разных местах давал возможность вызывать разные методы.


class Product {
    constructor(itemId, name, manufactor, price, characterictics = {}) {
        this.itemId = itemId;
        this.name = name;
        this.manufactor = manufactor;
        this.price = price;
        this.characterictics = characterictics;
        this.imgs = [];
        this.rating = 0
    }

    getItemDescription(currency){
        return `${this.name} (${this.manufactor}): ${this.price} rub`
    }

    addCharacteristic(key, value) {
        this.characterictics[key] = value;
        return true
    }


    formatCharacteristics() {
        const outputList = [];
        for (const key of Object.keys(this.characterictics)) {
            console.log(key);
            outputList.push(`${key} : ${this.characterictics[key]}`);
        }
        return outputList.join('\n')
    }


    updateItemRating(newRating) { 
        if (newRating >= 0 && newRating < 5){
            this.rating = newRating;
            return true;
        }
        console.log('Failed to update rating');
        return false;
    }
}


const item = new Product('123', 'Macbook Air', 'Apple', 95900)
item.addCharacteristic('Серия', 'MacBook Air');
item.addCharacteristic('Процессор', 'Apple M1');

item.updateItemRating(4.5)
console.log(item.formatCharacteristics())