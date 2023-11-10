import { modals, modalEdit, buttonEdit, modalOpen, buttonOpen, modalImage, modalImageImg, modalImageCaption  } from "./constants.js";

// Функция открытия модального окна
export function openModal(evt) {
    // Для открытия картинки
    modalImageImg.src = evt.target.src;
    modalImageCaption.textContent = evt.target.alt;
    modalImageImg.alt = evt.target.alt;
    modalImage.classList.add('popup_is-opened');
    modalImage.style.backgroundColor = 'rgba(0, 0, 0, .9)';

    // Добавление всем модальным окнам класса для создания анимации (медленное открытие и закрытие)
    modals.forEach((modal) => {
        modal.classList.add('popup_is-animated')
    })

    // Функция открытия модального окна
    function handleOpenModal (modal, button) {
        button.addEventListener('click', function() {
            modal.classList.add('popup_is-opened');
        })
    }

    // Вызов функции открытия модальных окон
    handleOpenModal(modalEdit, buttonEdit);
    handleOpenModal(modalOpen, buttonOpen);
};

// Функция закрытия модального окна
function closeModal(modal) {
    function handleTarget(evt) {
        const target = evt.target;
        if (
            target === modal ||
            target.closest('.popup__close') ||
            target.closest('.popup__button') ||
            evt.code === 'Escape'
        ) { 
            modal.classList.remove('popup_is-opened');
        }
    }
    modal.addEventListener('click', handleTarget);
    window.addEventListener('keydown', handleTarget);
}

// // Вызов функции закрытия модального окна
closeModal(modalEdit);
closeModal(modalOpen);
closeModal(modalImage);