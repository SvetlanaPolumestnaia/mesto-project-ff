import '../pages/index.css';
import { initialCards, placesList, formEdit, popupEdit, nameInput, jobInput, profileTitle, profileDescription } from './constants.js';
import { createCard, renderCard, deleteCard, likeCard } from './cards.js';
import { openModal } from './modal.js';


// Перебор для добавления изначальных карточек
initialCards.forEach((cards) => {
    renderCard(createCard(cards.link, cards.name, cards.name, deleteCard, openModal, likeCard), placesList);
});

// Чтобы по умолчанию при открытии окна редактирования подставлялись значения из порфайла
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Функция редактирования профиля
function handleFormSubmit(evt) {        
    evt.preventDefault();
    
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    formEdit.reset();

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// Слушатель на форму редактирования
formEdit.addEventListener('submit', handleFormSubmit);

// Функция добавления новой карточки пользователем
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const placeNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const urlInput = formNewCard.querySelector('.popup__input_type_url');

function handleFormNewCard(evt) {
    evt.preventDefault();

    const newCardData = createCard(urlInput.value, placeNameInput.value, placeNameInput.value, deleteCard, openModal, likeCard);
    
    placesList.prepend(newCardData);

    formNewCard.reset();
};

// Слушатель на форму добавления новой карточки
formNewCard.addEventListener('submit', handleFormNewCard);