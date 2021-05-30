class Product {
    constructor(name, manufactor, price) {
        this.name = name;
        this.manufactor = manufactor;
        this.price = price;
    }

    getGoodDescription() {
        return `${this.name} (${this.manufactor}): ${this.price} rub`
    }
}


function generateProducts(quantity) {
    const items = [];
    const names = [
        'Notebook',
        'SSD',
        'TV',
        'Phone',
        'Software',
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
        const cost = Math.floor(Math.random() * 1000);
        items.push(new Product(name, man, cost));
    }
    return items
} 


const products = generateProducts(10);

console.log(products);

const catalog = document.getElementById('catalog');

function createProductsListInCatalog(products, catalog) {    
    for (const product of products) {
        const prodElement = document.createElement('div');
        prodElement.classList.add('card');
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card_info');
        cardInfo.insertAdjacentHTML("beforeend", `<p>${product.name}</p>`);
        cardInfo.insertAdjacentHTML("beforeend", `<p>${product.manufactor}</p>`);
        cardInfo.insertAdjacentHTML("beforeend", `<p>${product.price} руб</p>`);

        
        prodElement.appendChild(cardInfo);
        catalog.appendChild(prodElement);
        
    }
}

createProductsListInCatalog(products, catalog);