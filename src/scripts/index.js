import '../pages/index.css';
import { initialCards, createCard, renderCard, deleteCard, likeCard } from './cards.js';
import { openModalImage, closeModal } from './modal.js';

export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

// Перебор для добавления изначальных карточек
initialCards.forEach((cards) => {
    renderCard(createCard(cards.link, cards.name, cards.name, deleteCard, openModalImage, closeModal, likeCard), placesList);
});

// Функция редактирования профиля
function editProfile() {
    const popupEdit = document.querySelector('.popup_type_edit');
    const formEdit = popupEdit.querySelector('.popup__form');
    const nameInput = popupEdit.querySelector('.popup__input_type_name');
    const jobInput = popupEdit.querySelector('.popup__input_type_description');
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

        function handleFormSubmit(evt) {        
            evt.preventDefault();
            
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;

            formEdit.reset();

            nameInput.value = profileTitle.textContent;
            jobInput.value = profileDescription.textContent;
        }

    formEdit.addEventListener('submit', handleFormSubmit);
}

// Вызов функции редактирования профиля
editProfile();

// Функция добавления новой карточки пользователем
function addNewCard() {
    const popupNewCard = document.querySelector('.popup_type_new-card');
    const formNewCard = popupNewCard.querySelector('.popup__form');
    const placeNameInput = formNewCard.querySelector('.popup__input_type_card-name');
    const UrlInput = formNewCard.querySelector('.popup__input_type_url');
    
    function handleFormNewCard(evt) {
        evt.preventDefault();

        const newCardData = createCard(UrlInput.value, placeNameInput.value, placeNameInput.value, deleteCard, openModalImage, closeModal, likeCard);
        
        placesList.prepend(newCardData);

        formNewCard.reset();
    };

    formNewCard.addEventListener('submit', handleFormNewCard);
}

// Вызов функции добавления новой карточки пользователем
addNewCard();