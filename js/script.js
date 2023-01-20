



window.addEventListener('DOMContentLoaded', () => {


    //TABS


    const tab = document.querySelectorAll('.tabheader__item');
    const tabParent = document.querySelector('.tabheader__items');
    const tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        })

        tab.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    };

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');

        tab[i].classList.add('tabheader__item_active');
    };
    
    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) =>{
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tab.forEach((item, i) => {
                if(target === item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });


    ///TIMER///


    const deadline = '2022-02-27'; //конечная дата

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 24)),
            seconds = Math.floor((t / 1000 % 60));
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector);
            days = document.querySelector('#days');
            hours = document.querySelector('#hours');
            minutes = document.querySelector('#minutes');
            seconds = document.querySelector('#seconds');
            timeInterval = setInterval(updateClock, 1000);
            
        updateClock();
        function getZero(num){
            if (num >= 0 && num < 10){
                return `0${num}`
            } else {
                return num;
            }
        }

        function updateClock(){

            const t = getTimeRemaining(endtime);


            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);


    //MODAL

    const modalBtn = document.querySelectorAll('[data-modal]');
        modal = document.querySelector('.modal');
        modalClose = document.querySelector('[data-close]');
        modalTimerId = setInterval(openModal, 3000)

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function modalRemove (){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
        clearInterval(modalTimerId);
    }

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (e)=> {
        if (e.target === modal){
            modalRemove();
            
        }
    })

    window.addEventListener('scroll', showModalByScroll);
    modalClose.addEventListener('click', modalRemove)


    //CARDS

    class MenuCard{
        constructor (img, title, text, price, parent, ...classes){
            this.img = img;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parent);
        }
        
        render(){
            const div = document.createElement('div');
            if (this.classes.length === 0){
                this.div = 'menu__item';
                div.classList.add(this.div)
            } else {
                this.classes.forEach(className => div.classList.add(className));
            };
            
            div.innerHTML = `
                <img src="${this.img}" alt="vegy">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `
            this.parent.append(div);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        228,
        '.menu .container',
        
    ).render()



    //CALC
    
    //1 - получить результат
    //2 - объявить переменные (возраст, вес, пол, рост, рацион)
    //3 - создать функцию, которая будет считать общее число каллорий. Важно, чтобы были выбраны все переменные. 
    //также для каждого пола - своя формула
    //4 - создать функцию для статичных данных. можно ввести два аргумента для удобства
        //объявляем дивы у родителя. вешаем событие клик на родителя, которое будет проверять(если у слушателя клика содержится 
        //"дата атрибут", то действуем соответствующе, ну а иначе - то иначе))))
        //добавляем и убираем классы активности
    //5 - создать функцию для динамических данных(вес, рост, возраст). Можно добавить один аргумент.
        //добавляем на инпуты событие инпут, и там же можно создать switch, который будет получать атрибут 'id';
        //ну и действуем в зависимости от полученного атрибута

    //6 - вызываем функции там, где это нужно и со всеми соответсвующими селекторами


const result = document.querySelector('.calculating__result span');

let sex, ratio, age, weight, height; 

if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex')
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female')
}



if(localStorage.getItem('ratio')){
    sex = localStorage.getItem('ratio')
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375)
};


function initLocalSettings(selector, activeClass){
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);

        if(elem.getAttribute('id') === localStorage.getItem('sex')){
            elem.classList.add(activeClass);
        }
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            elem.classList.add(activeClass);
        }
    })
};

initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
initLocalSettings('#gender div', 'calculating__choose-item_active');

function calculateTotal(){
    if(!sex || !age || !weight || !height || !ratio){
        result.textContent = '____';
        return;
    }
    if(sex === 'female'){
        result.textContent = Math.floor((47.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calculateTotal();



function getStaticInformation(selector, activeClass){
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(e.target.getAttribute('data-ratio')){
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            };
            elements.forEach(elem => {
                elem.classList.remove(activeClass)
            })
            e.target.classList.add(activeClass);
            calculateTotal();
        });
    
    });
    
}

function getDynamicInformation(selector){
    const input = document.querySelector(selector);

    

    input.addEventListener('input', () => {
        if(input.value.match(/\D/g)){
            input.style = 'border: 1px solid red';
        } else{
        input.style = 'border: none'
        }
        switch (input.getAttribute('id')) {
            case 'age':
                age = +input.value
                break;
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
        }
        calculateTotal();
    })
}


getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
getStaticInformation('#gender div', 'calculating__choose-item_active');
getDynamicInformation('#age');
getDynamicInformation('#height');
getDynamicInformation('#weight');







































    // let result = document.querySelector('.calculating__result span');
    
    // let sex, height, age, weight, ratio;

    // function calculateTotal(){
    //     if(!sex || !height || !age || !weight || !ratio){
    //         result.innerText = '-___-';
    //         return;
    //     }

    //     if(sex === 'female'){
    //         result.textContent = Math.floor((47.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    //     } else {
    //         result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    //     }
    // }

    // function getStaticInformation(parentSelector, activeClass){
    //     const elements = document.querySelectorAll(`${parentSelector} div`);

    //     document.querySelector(parentSelector).addEventListener('click', (e) => {
    //         if(e.target.getAttribute('data-ratio')){
    //             ratio = +e.target.getAttribute('data-ratio');
    //         } else {
    //             sex = e.target.getAttribute('id')
    //         }
    //         console.log(ratio, sex);

    //         elements.forEach(elem => {
    //             elem.classList.remove(activeClass)
    //         });

    //         e.target.classList.add(activeClass);
    //         calculateTotal();
    //     });
        
        


    // }

    // function getDynamicInformation(selector){
    //     const input = document.querySelector(selector);

    //     input.addEventListener('input', () => {
    //         switch(input.getAttribute('id')){
    //             case 'height':
    //                 height = +input.value;
    //                 break;
    //             case 'weight':
    //                 weight = +input.value;
    //                 break;
    //             case 'age':
    //                 age = +input.value;
    //                 break;
    //         }
    //         calculateTotal()
    //     })
        
    // }

    // getDynamicInformation('#height');
    // getDynamicInformation('#weight');
    // getDynamicInformation('#age');
    // getStaticInformation('#gender', 'calculating__choose-item_active')
    // getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')


    // //Запросы
    
    // const forms = document.querySelectorAll('form');

    // function postData(form){
    //     form.addEventListener('submit', ()=>{
            
    //     })
    // }

});





// console.log('Запрос данных');

// const req = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных');

//         const product = {
//             name: 'TV',
//             price: 2000
//         }; 

//         resolve(product);
//     }, 2000)
// });

// req.then((product) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';

//             resolve(product);
//         }, 2000);
//     });

// }).then(product => {
//     console.log(product);
// })



// const test = time => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(), time);
//     });
// };