let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        img: 'images/product2.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 800,
        amount: 0,
        descr: 'Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
        img: 'images/product1.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1100,
        amount: 0,
        descr: 'FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
        img: 'images/product3.jpg',
        get SUMM() {
            return this.price * this.amount
        },
        get KCALL() {
            return this.kcall * this.amount
        }
    }
}

let extraProduct = {
    doubleMayonnaise:{
        name: 'Двойной майонез',
        price: 2000,
        kcall: 100,
    },
    lettuce:{
        name: 'Салатный лист',
        price: 4000,
        kcall: 20,
    },
    cheese:{
        name: 'Сыр',
        price: 5000,
        kcall: 130,
    },
}

let result = ''

function createProduct(){
    let main = document.querySelector('.main')
    for(let key in product){
        let {name, price, descr, img} = product[key]
        result += `<section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info">
                <img src="${img}" alt="" class="main__product-img">
                <h2 class="main__product-title">${name}
                    <span class="main__product-many">${price} сум</span>
                </h2>
            </div>
            <p class="main__product-descr">
                ${descr}
            </p>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">
                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                <output class="main__product-num">0</output>
                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
            </div>
            <div class="main__product-price"><span>0</span> сум</div>
        </div>
        <div class="main__product-extraProduct">`;
        for(let newKey in extraProduct){
            result += `<label class="main__product-label">
            <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
            <span class="main__product-check"></span>
            ${extraProduct[newKey].name}
        </label>`
        }
        result += `</div>
        <div class="main__product-kcall"><span>0</span> калорий</div>
    </section>`
    }
    main.innerHTML = result
    logic()
}

setTimeout(() => createProduct(), 1000)



function logic(){

let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn'),
    productInfo = document.querySelectorAll('.main__product-info'),
    view = document.querySelector('.view'),
    btnX = document.querySelector('.view__close')

productInfo.forEach((block) => {
        block.addEventListener('dblclick', function(){
            shwView(this)
            clearActive()
        })
})
    
function shwView(element){
        let src = element.closest('.main__product-info').querySelector('img').getAttribute('src')
        let img = view.querySelector('img')
        
        img.setAttribute('src', src)
    
        view.classList.add('active')
}


function clearActive(){
    btnX.addEventListener('click', function(){
        view.classList.remove('active')
    })
}

    
btnPlusOrMinus.forEach((btn) => {
    btn.addEventListener('click', function() {
        plusOrMinus(this)
    })
    let interval = 0
    btn.addEventListener('mousedown', function() {
        interval = setInterval(() => plusOrMinus(this), 100)
    })
    document.body.addEventListener('mouseup', function() {
        clearInterval(interval)
    })
})

function plusOrMinus (element){
    //closeset подключается к ближайщему заданному родителю
    //getAttribute() - берет значение указанного атрибута
    let parentId = element.closest('.main__product').getAttribute('id')
    let output = element.closest('.main__product').querySelector('.main__product-num')
    let price = element.closest('.main__product').querySelector('.main__product-price span')
    let kcall = element.closest('.main__product').querySelector('.main__product-kcall span')
    
    if(element.getAttribute('data-symbol') == '+') {
        product[parentId].amount++
    } else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0){
        product[parentId].amount--
    }
    
    output.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].SUMM
    kcall.innerHTML = product[parentId].KCALL
}

let levelStart = document.querySelector('.header__timer-extra')
function levelUpdateRecursion(n){
    n++
    levelStart.innerHTML = n
    if(n < 100){
        setTimeout(() => levelUpdateRecursion(n), 99)
    }
}
levelUpdateRecursion(0)


checkExtraProduct.forEach(product => {
    product.addEventListener('click', function(){
        addExtaProduct(this)
    })
})


function addExtaProduct(dopProduct){
    let parent = dopProduct.closest('.main__product')
    let parentId = parent.getAttribute('id')
    
    product[parentId][dopProduct.getAttribute('data-extra')] = dopProduct.checked
    
    let price = parent.querySelector('.main__product-price span')
    let kcall = parent.querySelector('.main__product-kcall span')
    let extraData = dopProduct.getAttribute('data-extra')
    
    if(product[parentId][extraData] == true){
        product[parentId].price += extraProduct[extraData].price
        product[parentId].kcall += extraProduct[extraData].kcall
    } else {
        product[parentId].price -= extraProduct[extraData].price
        product[parentId].kcall -= extraProduct[extraData].kcall
    }
    
    price.innerHTML = product[parentId].SUMM
    kcall.innerHTML = product[parentId].KCALL
}

let cart = [],
    fullName = '',
    fullPrice = 0,
    fullKcall = 0
    
    
addCart.addEventListener('click', () => {
        for(let key in product){
            let burger = product[key]
            if(burger.amount > 0){
                cart.push(burger)
            
                for (let newKey in burger){
                    if(burger[newKey] === true){
                        //'\n' экранированиеб перенос элемента на новую строку (<br>)
                        burger.name += ' и ' + extraProduct[newKey].name
                    }
                }
                burger.price = burger.SUMM
                burger.kcall = burger.KCALL
            }
        }
    
        cart.forEach(burger => {
            fullName += '\n' + burger.name + '\n'
            fullPrice += burger.price
            fullKcall += burger.kcall
        })
        receipt.style.display = 'flex'
        setTimeout(() => {
            receipt.style.opacity = '1'
            receiptWindow.style.top = '0',
            105
        })
        
        receiptOut.innerHTML = `Ваш заказ: ${fullName}
        Каллорийность: ${fullKcall}
        Общая сумма: ${fullPrice} сумм`
        
        let amount = document.querySelectorAll('.main__product-num'),
            price = document.querySelectorAll('.main__product-price span'),
            kcall = document.querySelectorAll('.main__product-kcall span')
            
        for(let i = 0; i < amount.length; i++){
            amount[i].innerHTML = 0
            price[i].innerHTML = 0
            kcall[i].innerHTML = 0
        }
})

7



payBtn.addEventListener('click', () => location.reload())

}