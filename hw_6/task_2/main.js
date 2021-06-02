class Product {
    constructor(name, manufactor, price) {
        this.id = Math.random().toString().substr(2, 9);
        this.name = name;
        this.manufactor = manufactor;
        this.price = price;
        this.photoNames = [];
    }

    getGoodDescription() {
        return `${this.name} (${this.manufactor}): ${this.price} rub`
    }

    generateProductPhotos(photoNames) {
        for (let i = 0; i < 3; i++) {
            this.photoNames.push(photoNames[Math.floor(Math.random() * photoNames.length)]);
        }
        
    }
}


class Basket {
    constructor(items = []) {
        this.items = items;
    }

    addItem(item) {
        this.items.push(item)
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



let photosCounter = 0;
let currentProduct = null;






function addProductToBasket(e) {
    let pressedProductId = 0;
    for (const node of e.target.parentElement.children) {
        if (node.id === 'product_id') {
            pressedProductId = node.innerHTML.split(' ')[1];
        }
    }
    basket.addItem(products.filter(item => item.id === pressedProductId)[0]);
    // console.log(pressedProductId);
    // console.log(basket.items)
    updateBasketDescription()
}

function createProductsListInCatalog(products, catalog) {
    for (const product of products) {
        product.generateProductPhotos(images);
        // console.log(product.photoNames);
        const prodElement = document.createElement('div');
        prodElement.classList.add('card');
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card_info');
        cardInfo.insertAdjacentHTML("beforeend", `<p id='product_id'>ID: ${product.id}</p>`);
        cardInfo.insertAdjacentHTML("beforeend", `<p>${product.name}</p>`);
        cardInfo.insertAdjacentHTML("beforeend", `<p>${product.manufactor}</p>`);
        cardInfo.insertAdjacentHTML("beforeend", `<p>${product.price} руб</p>`);

        const buyButton = document.createElement('button');
        buyButton.id = 'buy_button';
        buyButton.className = 'buy_button';
        buyButton.textContent = 'Купить'
        buyButton.addEventListener('click', addProductToBasket);
        cardInfo.appendChild(buyButton);

        const openImageButton = document.createElement('button');
        openImageButton.id = 'openImageButton';
        openImageButton.textContent = 'Images';
        openImageButton.onclick = function() {
            let image = document.getElementById('image');
            // console.log(`./imgs/${product.photoNames[0]}`)
            image.setAttribute('src', `./imgs/${product.photoNames[0]}`)
            modal.style.display = "block";
            currentProduct = product;
        }
        cardInfo.appendChild(openImageButton);

        prodElement.appendChild(cardInfo);
        catalog.appendChild(prodElement);
    }
    updateBasketDescription()
}





function updateBasketDescription() {
    const basketElement = document.getElementById('basket');

    let basketDescription = '';

    if (basket.getBasketSize() == 0) {
        basketDescription = 'Корзина пуста'
    } else {
        basketDescription = `В корзине ${basket.getBasketSize()} товаров на сумму ${basket.getBasketTotalPrice()} рублей.`;
    }

    const basketInfo = document.createElement('div');
    basketInfo.className = 'basket_info'
    basketInfo.textContent = basketDescription
    basketElement.replaceChild(basketInfo, basketElement.firstChild)
    basketElement.appendChild(basketInfo);
}



//сколько товаров в каталоге
const productsQuantityInCatalog = 10
const images = ['1.png','2.png','3.png','4.png','5.png','6.png',
'7.png','8.png','9.png','10.png','11.png'];
// 
const products = generateProducts(productsQuantityInCatalog);
const catalog = document.getElementById('catalog');
const basket = new Basket();
createProductsListInCatalog(products, catalog);


let modal = document.getElementById('imageModal');

let span = document.getElementsByClassName("close")[0];


span.onclick = function() {
    modal.style.display = "none";
    let image = document.getElementById('image');
    image.setAttribute('src', '');
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        currentProduct = null;
    }
}



const nextPhotoButton = document.getElementById('nextPhotoButton');
nextPhotoButton.onclick = function() {
    let image = document.getElementById('image');
    photosCounter = (photosCounter + 1) % 3;
    console.log(`./imgs/${currentProduct.photoNames[photosCounter]}`);
    image.setAttribute('src', `./imgs/${currentProduct.photoNames[photosCounter]}`);

}

  