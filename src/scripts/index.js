import '../pages/index.css';
import { modals, 
         modalEditProfile, 
         modalAddNewCard,
         modalImage,
         modalImageImg,
         modalImageCaption,
         buttonCloseImage,
         buttonEditProfile,
         buttonSaveEditProfile,
         buttonCloseEditProfile,
         buttonAddNewCard,
         buttonSaveAddNewCard,
         buttonCloseAddNewCard,
         placesList, 
         formEditProfile, 
         nameInput, 
         jobInput, 
         profileTitle, 
         profileDescription, 
         formNewCard, 
         placeNameInput, 
         urlInput, 
         validationConfiguration,
         apiConfiguration,
         cardTemplate} from './constants.js';
import { createCard, 
         deleteCard, 
         likeCard,
         getLikesQuantity, 
         showDeleteButton} from './cards.js';
import { openModal, 
         closeModal } from './modals.js';
import { enableValidation, 
         clearValidation } from './validation.js';
import { changeProfileData,
         addCard, 
         getInitialCards, 
         deleteCardFromServer,
         deleteMyCard} from './api.js';

// Функция добавления новой карточки на страницу
function renderCard(cardData, container) {
    container.append(cardData);
  };

// Добавление существующих на сервере карточек
getInitialCards(apiConfiguration)
    .then((results) => {
        const cards = results[1];
        cards.forEach((card) => {
            const newCard = createCard(card.link, card.name, card.name, deleteCardFromServer, likeCard, openModalImage);
            renderCard(newCard, placesList);
        
        newCard.id = card._id;
        newCard.dataset.likes = card.likes.length;
        newCard.dataset.ownerId = card.owner._id;
    
        getLikesQuantity(newCard);

        showDeleteButton(newCard, apiConfiguration);

        //console.log(newCard)
        //deleteCardFromServer(newCard, newCard.id, deleteCard, deleteMyCard, apiConfiguration);

    });
})


// Редактирование профиля
function handleFormEditProfile(evt) {        
    evt.preventDefault();
    if (nameInput.validity.valid && jobInput.validity.valid) {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
    }
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

// Добавление новой карточки пользователем
function handleFormAddNewCard(evt) {
    evt.preventDefault();
    if (placeNameInput.validity.valid && urlInput.validity.valid) {
        addCard(placeNameInput.value, urlInput.value, deleteCardFromServer, likeCard, openModalImage, apiConfiguration)
    }
};


formNewCard.addEventListener('submit', handleFormAddNewCard);

// Работа с открытием и закрытием модульных окон
// Открытие модульного окна с картинкой
export function openModalImage(evt) {
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
    clearValidation(modalEditProfile, validationConfiguration);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

buttonAddNewCard.addEventListener('click', () => {
    openModal(modalAddNewCard);
    clearValidation(modalAddNewCard, validationConfiguration);
    formNewCard.reset();
});

// Закрытие модальных окон
// По крестику
buttonCloseEditProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonCloseAddNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

buttonCloseImage.addEventListener('click', () => {
    closeModal(modalImage);
});

// По кнопке Сохранить
buttonSaveEditProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonSaveAddNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

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

// Валидация
  
enableValidation(validationConfiguration);

// API
// Изменение данных пользователя (меня)
changeProfileData(apiConfiguration);

