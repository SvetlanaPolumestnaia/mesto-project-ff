import '../pages/index.css';
import { modals, 
         modalEditProfile, 
         modalAddNewCard,
         modalEditAvatar,
         modalImage,
         modalImageImg,
         modalImageCaption,
         buttonCloseImage,
         buttonEditProfile,
         buttonSaveProfile,
         buttonCloseProfile,
         buttonAddNewCard,
         buttonSaveNewCard,
         buttonCloseNewCard,
         buttonEditAvatar,
         buttonSaveAvatar,
         buttonCloseAvatar,
         placesList, 
         formEditProfile, 
         nameInput, 
         jobInput, 
         profileAvatar, 
         profileTitle, 
         profileDescription, 
         formNewCard, 
         placeNameInput, 
         urlInput, 
         formEditAvatar, 
         avatarInput,
         validationConfiguration,
         apiConfiguration } from './constants.js';
import { createCard, 
         likeCard, 
         deleteCard } from './cards.js';
import { openModal, 
         closeModal, 
         closeModalOverlay} from './modals.js';
import { enableValidation, 
         clearValidation } from './validation.js';
import { changeProfileData,
         addCardToServer, 
         getInitialData, 
         changeProfileAvatar } from './api.js';

// Добавление данных при загрузке страницы
getInitialData(apiConfiguration)
    .then((results) => {
            const [ users, cards ] = results;

            const myProfile = users.find(user => user._id === apiConfiguration.myId);
            profileTitle.textContent = myProfile.name;
            profileDescription.textContent = myProfile.about;
            profileAvatar.style.backgroundImage = `url('${myProfile.avatar}')`;

            cards.forEach((card) => {
                const newCard = createCard(card.link, card.name, card.name, deleteCard, likeCard, openModalImage, card, apiConfiguration);
                placesList.append(newCard);
        })
    })
    .catch(error => {
        console.error('Ошибка при отображени данных с сервера:', error);
    })

// Добавление новой карточки пользователем
function handleFormAddNewCard(evt, link, name, alt, deleteFn, likeFn, openFn, apiConfig) {
    evt.preventDefault();
    buttonSaveNewCard.textContent = 'Сохранение...';
    addCardToServer(link, name, apiConfig)
        .then(data => {
            const newCard = createCard(link, name, alt, deleteFn, likeFn, openFn, data, apiConfig);
            placesList.prepend(newCard);
            closeModal(modalAddNewCard);
        })
        .catch(error => {
            console.error('Ошибка при создании карточки:', error);
        })
        .finally(() => {
            buttonSaveNewCard.textContent = 'Сохранить';
        })
    
};

formNewCard.addEventListener('submit', (evt) => {
    handleFormAddNewCard(evt, urlInput.value, placeNameInput.value, placeNameInput.value, deleteCard, likeCard, openModalImage, apiConfiguration);
});

// Редактирование профиля
function handleFormEditProfile(evt) {        
    evt.preventDefault();
    buttonSaveProfile.textContent = 'Сохранение...'
    changeProfileData(nameInput.value, jobInput.value, apiConfiguration)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(modalEditProfile);
        })
        .catch(error => {
            console.error('Ошибка при изменении данных профиля:', error);
        })
        .finally(() => {
            buttonSaveProfile.textContent = 'Сохранить'
        })
}

formEditProfile.addEventListener('submit', (evt) => {
    handleFormEditProfile(evt);
});

// Изменение аватара
function handleFromEditAvatar(evt) {
    evt.preventDefault();
    buttonSaveAvatar.textContent = 'Сохранение...';
    changeProfileAvatar(avatarInput.value, apiConfiguration)
        .then(data => {
            profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
            closeModal(modalEditAvatar);
        })
        .catch(error => {
            console.error('Ошибка при изменении аватара:', error);
        })
        .finally(() => {
            buttonSaveAvatar.textContent = 'Сохранить';
        })
}

formEditAvatar.addEventListener('submit', (evt) => {
    handleFromEditAvatar(evt);
})

// Работа с открытием и закрытием модульных окон
// Открытие модульного окна с картинкой
export function openModalImage(evt) {
    evt.preventDefault();
    modalImageImg.src = evt.target.src;
    modalImageCaption.textContent = evt.target.alt;
    modalImageImg.alt = evt.target.alt;
    // По фигме при открытии картинки фон затемнения отличается от стандратного
    modalImage.style.backgroundColor =  'rgba(0, 0, 0, .9)';

    openModal(modalImage);    
}

// Чтобы модальные окна плавно открывались
modals.forEach((modal) => {
    modal.classList.add('popup_is-animated');
})

// Открытие модальных окон
buttonAddNewCard.addEventListener('click', () => {
    formNewCard.reset();
    clearValidation(formNewCard, validationConfiguration);
    openModal(modalAddNewCard);
});

buttonEditProfile.addEventListener('click', () => {
    clearValidation(formEditProfile, validationConfiguration);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(modalEditProfile);
});

buttonEditAvatar.addEventListener('click', () => {
    formEditAvatar.reset();
    clearValidation(formEditAvatar, validationConfiguration);
    openModal(modalEditAvatar);
})

// Закрытие модальных окон
// По крестику
buttonCloseNewCard.addEventListener('click', () => {
    closeModal(modalAddNewCard);
});

buttonCloseProfile.addEventListener('click', () => {
    closeModal(modalEditProfile);
});

buttonCloseAvatar.addEventListener('click', () => {
    closeModal(modalEditAvatar);
})

buttonCloseImage.addEventListener('click', () => {
    closeModal(modalImage);
});

// По оверлею
modalAddNewCard.addEventListener('click', closeModalOverlay); 

modalEditProfile.addEventListener('click', closeModalOverlay);

modalEditAvatar.addEventListener('click', closeModalOverlay);

modalImage.addEventListener('click', closeModalOverlay);

// Валидация
enableValidation(validationConfiguration);

// Спасибо за ревью! С наступающим новым годом ^^