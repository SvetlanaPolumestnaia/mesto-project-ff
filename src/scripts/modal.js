import { configurationEdit, configurationNewCard } from "./configuration.js";

// Функция открытия модального окна (редактирование и добавление новой карточки)
export function openModal (config) {
    const modalOpen = document.querySelector(config.modal);
    const button = document.querySelector(config.buttonForOpen);
        
    button.addEventListener('click', function() {
        modalOpen.classList.add('popup_is-opened');
        modalOpen.classList.add('popup_is-animated');
    })
}

// Вызов открытия модальных окон (редактирование и добавление новой карточки)
openModal(configurationEdit);
openModal(configurationNewCard);

// Функция открытия модального окна (картинка)
export function openModalImage (linkInOpenedModal, nameInOpenedModal, altInOpenedModal, searchAreaOpen, config) {
    document.querySelector('.popup__image').src = linkInOpenedModal;
    document.querySelector('.popup__caption').textContent = nameInOpenedModal;
    document.querySelector('.popup__image').alt = altInOpenedModal;

    const modalOpenImage = document.querySelector(config.modal);
    const buttonImage = searchAreaOpen.querySelector(config.buttonForOpen);
        
    buttonImage.addEventListener('click', function() {
        modalOpenImage.classList.add('popup_is-opened');
        modalOpenImage.classList.add('popup_is-animated');
    })
}

// Функция закрытия модального окна
export function closeModal(config) {
    const modalClose = document.querySelector(config.modal);
    
    function handleTarget(evt) {
        const target = evt.target;  
        if (
            target === modalClose ||
            target.closest('.popup__close') ||
            target.closest('.popup__button') ||
            evt.code === 'Escape') {
                modalClose.classList.remove('popup_is-opened');             
        }
    }

    modalClose.addEventListener('click', handleTarget);
    window.addEventListener('keydown', handleTarget);
}

// Вызов функции закрытия модальных окон
closeModal(configurationEdit);
closeModal(configurationNewCard);