class Product {
    constructor(name, manufactor, price) {
        this.id = Math.random().toString().substr(2, 9);
        this.name = name;
        this.manufactor = manufactor;
        this.price = price;
    }

    getGoodDescription() {
        return `${this.name} (${this.manufactor}): ${this.price} rub`
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


function addProductToBasket(e) {
    let pressedProductId = 0;
    for (const node of e.target.parentElement.children) {
        if (node.id === 'product_id') {
            pressedProductId = node.innerHTML.split(' ')[1];
        }
    }
    basket.addItem(products.filter(item => item.id === pressedProductId)[0]);
    updateBasketDescription()
}

function createProductsListInCatalog(products, catalog) {
    for (const product of products) {
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


function drawBasketPopup() {
    const $basketPopupContainer = document.querySelector('#basket_popup_container');
    $basketPopupContainer.textContent = '';

    const htmlList = basket.items.map(function(item) {
        return `<li>
        <p class='popup__product'>${item.name} ${item.manufactor}. Цена: ${item.price}</p>
        <button data-id=${item.id} id="deleteProduct" class="#deleteProductBtn">X</button>`
    }).join(' ')
    

    $basketPopupContainer.insertAdjacentHTML('beforeend', `<div><ol>${htmlList}</ol></div>`);

    const basketDescription = (basket.getBasketSize() === 0) ? 'Корзина пуста' : `В корзине ${basket.getBasketSize()} товаров на сумму ${basket.getBasketTotalPrice()} рублей.`;
    $basketPopupContainer.insertAdjacentHTML('beforeend', `<div>${basketDescription}</div>`);
}



//сколько товаров в каталоге
const productsQuantityInCatalog = 10

// 
const products = generateProducts(productsQuantityInCatalog);
const $catalog = document.getElementById('catalog');
const basket = new Basket();
createProductsListInCatalog(products, $catalog);
const $basketElement = document.querySelector('#basket');
const $basketPopup = document.querySelector('#basket_popup');
const $closePopupBtn = document.querySelector('#closePopupBtn');
const basketPopupRoute = ['products', 'address', 'comment']


$basketElement.addEventListener('click', function() {
    drawBasketPopup();
    $basketPopup.style.display = 'block';
})

function drawAddressPopup() {
    const $basketPopupContainer = document.querySelector('#basket_popup_container');
    $basketPopupContainer.textContent = '';
    $basketPopupContainer.insertAdjacentHTML('beforeend', `
    <form name="address">
        <p>Адрес</p>
        <textarea name="address" cols="40" rows="3"></textarea></p>
    </form>
`);
}


function drawCommentPopup() {
    const $basketPopupContainer = document.querySelector('#basket_popup_container');
    $basketPopupContainer.textContent = '';
    $basketPopupContainer.insertAdjacentHTML('beforeend', `
    <form name="address">
        <p>Комментарии</p>
        <textarea name="address" cols="40" rows="3"></textarea></p>
    </form>
`);
}

$closePopupBtn.addEventListener('click', () => $basketPopup.style.display = 'none');
$basketPopup.addEventListener('click', function(e) {
    if (e.target.id === 'deleteProduct') {
        const productId = e.target.dataset.id;
        // console.log(productId);
        basket.items = basket.items.filter(function (item) {
            return item.id !== productId
        });
        drawBasketPopup();
    } else if (e.target.id === 'NextPopupBtn') {

        // Эта вся история нужна, чтобы
        const $popupContainer = document.querySelector('#basket_popup_container');
        $popupContainer.dataset.id = basketPopupRoute[(basketPopupRoute.indexOf($popupContainer.dataset.id) + 1) % basketPopupRoute.length];
        console.log($popupContainer.dataset.id);
        switch ($popupContainer.dataset.id) {
            case 'products':
                drawBasketPopup();
                break;
            case 'address':
                drawAddressPopup();
                break;
            case 'comment':
                drawCommentPopup();
                break;
            default:
                console.log('Something wrong in basket popup');
        }

    }
    
    
}) 