// Открытие модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    window.addEventListener('keydown', handleEsc)
};

// Закрытие модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', handleEsc);
};

// Закрытие модального окна кликом по оверлею
export function closeModalOverlay(evt, modal) {
    if (evt.target === evt.currentTarget) {
        closeModal(modal);
    }
};

// Закрытие модального окна по кнопке Esc
function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const modalToClose = modals.find(modal => (modal.classList.contains('popup_is-opened')))
        closeModal(modalToClose);
    }
};