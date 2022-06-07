//Плавное появление эл-тов
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        }
    });
}

let options = {
    threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
    observer.observe(elm);
}

//Табы
const tabs = document.querySelector('.faq__tabs');
const tabsItems = document.querySelectorAll('.faq__tabs--item');
const hiddenTabsText = document.querySelectorAll('.faq__item--text');
const tabsButton = document.querySelectorAll('.faq__item--button');

tabs.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.value === 'faq__overlay') {
        e.target.nextElementSibling.children[1].children[0].classList.toggle('rotate');
        e.target.nextElementSibling.nextElementSibling.classList.toggle('hidden');
        e.target.nextElementSibling.nextElementSibling.classList.toggle('opened');
    }
});

//Появление надписи "Позвонить!" возле фиксированной кнопки
const callbackNotice = document.querySelector('.callback__info');

const callbackNoticeShow = () => {
    callbackNotice.classList.remove('hidden');
    callbackNotice.classList.add('opened');
}

const callbackNoticeHide = () => {
    callbackNotice.classList.remove('opened');
    callbackNotice.classList.add('hidden');
}

setTimeout(callbackNoticeShow, 5000);
setTimeout(callbackNoticeHide, 15000);

//Вызов попапа с фикстрованной кнопки
const callbackButton = document.querySelector('.callback__button');
const callbackPhoneImg = document.querySelector('.callback__phone');
const callbackCloseImg = document.querySelector('.callback__close');
const callbackForm = document.querySelector('.callback__form');


callbackButton.addEventListener('click', () => {
    callbackButton.classList.toggle('clicked');
    callbackPhoneImg.classList.toggle('hidden');
    callbackCloseImg.classList.toggle('opened');
    callbackForm.classList.toggle('hidden');
    callbackForm.classList.toggle('opened');
});

//Плавный скролл для ссылок-якорей
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

//Валидация форм и отправка данных
const mainForm = document.forms.mainForm;
const mainFormName = mainForm.name;
const mainFormTel = mainForm.phone;
const mainFormError = document.querySelector('.feedback__form--error');

mainForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateMainForm() === true) {
        const data = new FormData(e.target);

        const name = data.get('name') ? data.get('name') : '';
        const phone = data.get('phone') ? data.get('phone') : '';
        const token = '5590467851:AAGpXbQMNsZ6GUHEFzGRa_0iKhWcFAZUOUY';
        const chatId = '-799563612';
        const txt = `Имя: ${name};%0AНомер: ${phone};`;
        const endpoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${txt}`;

        let response = await fetch(endpoint);

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }

    }
});

callbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateCallbackForm() === true) {
        const data = new FormData(e.target);

        const phone = data.get('phone') ? data.get('phone') : '';
        const token = '5590467851:AAGpXbQMNsZ6GUHEFzGRa_0iKhWcFAZUOUY';
        const chatId = '-799563612';
        const txt = `Перезвоните мне: ${phone}`;
        const endpoint = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${txt}`;

        let response = await fetch(endpoint);

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            let json = await response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
});

const validateMainForm = () => {
    const regexName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    const regexTel = /^\d+$/;
    let isValidate = false;

    if (!mainFormName.value && !mainFormTel.value || mainFormName.value && !mainFormTel.value || !mainFormName.value && mainFormTel.value) {
        mainFormError.textContent = 'Пожалуйста, заполните все обязательные поля';
        mainFormError.hidden = false;
        return isValidate;
    } else if (mainFormName.value.match(regexName) && mainFormTel.value.match(regexTel)) {
        mainForm.classList.add('dissapear');
        mainForm.style.display = 'none';
        mainFormError.style.margin = '0 auto';
        setTimeout(() => {
            mainFormError.hidden = false;
            mainFormError.classList.add('valid');
            mainFormError.textContent = 'Спасибо, ваша заявка успешно отправлена!'
        }, 300)

        isValidate = true;

        return isValidate;
    } else if (!mainFormName.value.match(regexName) && mainFormTel.value.match(regexTel)) {
        mainFormError.textContent = 'Пожалуйста, введите корректное имя'
        mainFormError.hidden = false;
        return isValidate;
    } else if (mainFormName.value.match(regexName) && !mainFormTel.value.match(regexTel)) {
        mainFormError.textContent = 'Пожалуйста, введите корректный номер телефона'
        mainFormError.hidden = false;
        return isValidate;
    }
}

const callbackInputName = callbackForm.phone;
const callbackError = document.querySelector('.callback__form--error');
const callbackSuccess = document.querySelector('.callback__form--success');
const callbackSubmit = document.querySelector('.callback__form--submit');

const validateCallbackForm = () => {
    const regexTel = /^\d+$/;
    let isValidate = false;

    if (!callbackInputName.value) {
        callbackError.textContent = 'Пожалуйста, введите номер телефона';
        callbackError.hidden = false;
        return isValidate;
    } else if (!callbackInputName.value.match(regexTel)) {
        callbackError.textContent = 'Пожалуйста, введите корректный номер телефона';
        callbackError.hidden = false;
        return isValidate;
    } else if (callbackInputName.value.match(regexTel)) {
        callbackSubmit.style.display = 'none';
        callbackError.style.display = 'none';
        callbackInputName.style.display = 'none';
        setTimeout(() => {
            callbackSuccess.classList.remove('hidden');
        }, 300)

        isValidate = true;

        return isValidate;
    }
}

//Мобильное меню 

const burger = document.querySelector('.burger__menu');
const burgerLine = document.querySelectorAll('.burger__line');
const hiddenMenu = document.querySelector('#mobile__menu--hidden');
const introBlock = document.querySelector('.intro');
const headerWrapper = document.querySelector('.header__wrapper');

burger.addEventListener('click', (e) => {
    burgerLine.forEach((item) => {
        item.classList.toggle('opened');
        hiddenMenu.classList.toggle('hidden');
        hiddenMenu.classList.toggle('opened');
        headerWrapper.classList.toggle('padding');
    });
});