import '../pages/index.css';
import { modals, 
         modalEditProfile, 
         modalAddNewCard,
         modalImage,
         modalImageImg,
         modalImageCaption,
         buttonEditProfile, 
         buttonAddNewCard, 
         buttonsCloseModal, 
         buttonsSave, 
         initialCards, 
         placesList, 
         formEditProfile, 
         nameInput, 
         jobInput, 
         profileTitle, 
         profileDescription, 
         formNewCard, 
         placeNameInput, 
         urlInput } from './constants.js';
import { createCard, 
         deleteCard, 
         likeCard } from './cards.js';
import { openModal, 
         closeModal } from './modals.js';

// Функция добавления новой карточки на страницу
function renderCard(cardData, container) {
    container.append(cardData);
  };

// Перебор для добавления изначальных карточек
initialCards.forEach((cards) => {
    renderCard(createCard(cards.link, cards.name, cards.name, deleteCard, likeCard, openModalImage), placesList);
});

// Чтобы по умолчанию при открытии окна редактирования подставлялись значения из профайла
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Редактирование профиля
function handleFormEditProfile(evt) {        
    evt.preventDefault();
    
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

// Добавление новой карточки пользователем
function handleFormAddNewCard(evt) {
    evt.preventDefault();

    const newCardData = createCard(urlInput.value, placeNameInput.value, placeNameInput.value, deleteCard, likeCard, openModalImage);
    
    placesList.prepend(newCardData);

    formNewCard.reset();
};

formNewCard.addEventListener('submit', handleFormAddNewCard);

// Работа с открытием и закрытием модульных окон
// Открытие модульного окна с картинкой
function openModalImage(evt) {
    evt.preventDefault();
    modalImageImg.src = evt.target.src;
    modalImageCaption.textContent = evt.target.alt;
    modalImageImg.alt = evt.target.alt;
    modalImage.style.backgroundColor =  'rgba(0, 0, 0, .9)';

    openModal(modalImage);    
}

// Чтобы модальные окна плавно открывались
modals.forEach((modal) => {
    modal.classList.add('popup_is-animated')
})

// Открытие модальных окон по кнопкам
buttonEditProfile.addEventListener('click', () => {
    openModal(modalEditProfile);
});

buttonAddNewCard.addEventListener('click', () => {
    openModal(modalAddNewCard);
});

// Закрытие модальных окон
// По крестику
buttonsCloseModal.forEach((buttonClose) => {
    buttonClose.addEventListener('click', () => {
        modals.forEach((modal) => {
            closeModal(modal);
        })
    })
})

// По кнопке Сохранить
buttonsSave.forEach((buttonSave) => {
    buttonSave.addEventListener('click', () => {
        modals.forEach((modal) => {
            closeModal(modal);
        })
    })
})

// По оверлею
modals.forEach((modal) => {
   modal.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal(modal);
        }
    })
})

// По кнопке Escape
export function handleEsc(evt) {
    if (evt.key === 'Escape') {
        modals.forEach((modal) => closeModal(modal));
    }
};