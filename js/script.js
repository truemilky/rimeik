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

//Валидация форм 
const mainForm = document.forms.mainForm;
const mainFormName = mainForm.name;
const mainFormTel = mainForm.phone;
const mainFormError = document.querySelector('.feedback__form--error');

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    mainFormError.hidden = true;
    mainFormError.classList.remove('valid');

    validateForm()

});

const validateForm = () => {
    const regexName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    const regexTel = /^\d+$/;

    if (!mainFormName.value && !mainFormTel.value) {
        mainFormError.textContent = 'Пожалуйста, заполните все обязательные поля';
        mainFormError.hidden = false;
    } else if (mainFormName.value.match(regexName) && mainFormTel.value.match(regexTel)) {
        mainForm.classList.add('dissapear');
        setTimeout(() => {
            mainFormError.hidden = false;
            mainFormError.classList.add('valid');
            mainFormError.textContent = 'Спасибо, ваша заявка успешно отправлена!'
        }, 300)
    } else if (!mainFormName.value.match(regexName) && mainFormTel.value.match(regexTel)) {
        mainFormError.textContent = 'Пожалуйста, введите корректное имя'
        mainFormError.hidden = false;
    } else if (mainFormName.value.match(regexName) && !mainFormTel.value.match(regexTel)) {
        mainFormError.textContent = 'Пожалуйста, введите корректный номер телефона'
        mainFormError.hidden = false;
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