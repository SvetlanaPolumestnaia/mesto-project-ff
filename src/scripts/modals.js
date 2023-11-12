import { handleEsc } from "./index.js";

// Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    window.addEventListener('keydown', handleEsc)
};

// Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', handleEsc)
};