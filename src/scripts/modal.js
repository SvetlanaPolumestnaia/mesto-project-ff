import { modalEdit, buttonEdit, modalOpen, buttonOpen, modalImage, modalImageImg, modalImageCaption } from "./constants.js";

// Функция открытия модального окна
export function openModal (modal, button, linkInOpenedModalImage, nameInOpenedModalImage, altInOpenedModalImage) {
    modalImageImg.src = linkInOpenedModalImage;
    modalImageCaption.textContent = nameInOpenedModalImage;
    modalImageImg.alt = altInOpenedModalImage;
    
    modal.classList.add('popup_is-animated');
    button.addEventListener('click', function() {
        modal.classList.add('popup_is-opened');
    })
}

// Вызов функции открытия модальных окон (редактирование и добавление новой карточки)
openModal(modalEdit, buttonEdit);
openModal(modalOpen, buttonOpen);

// Функция закрытия модального окна
function closeModal(modal) {
    function handleTarget(evt) {
        const target = evt.target;
        if (
            target === modal ||
            target.closest('.popup__close') ||
            target.closest('.popup__button') ||
            // Доделать закрытие по кнопке(про удаление слушателя)
            evt.code === 'Escape'
        ) {
            modal.classList.remove('popup_is-opened');
        }
    }
    modal.addEventListener('click', handleTarget);
    window.addEventListener('keydown', handleTarget)
}

// Вызов функции закрытия всех модальных окон
closeModal(modalEdit);
closeModal(modalOpen);
closeModal(modalImage);