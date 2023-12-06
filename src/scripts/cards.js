import { deleteCardFromServer, getInitialData, getLikes } from "./api.js";
import { cardTemplate, apiConfiguration } from "./constants.js";

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, likeFn, openFn, data, apiConfig) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDeleteCard = cardElementCopy.querySelector('.card__delete-button');
  const buttonLikeCard = cardElementCopy.querySelector('.card__like-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  const likeElement = cardElementCopy.querySelector('.card__like-button_likes');
  
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;

  // cardElementCopy.id = data._id;
  // cardElementCopy.dataset.likes = data.likes.length;
  // cardElementCopy.dataset.ownerId = data.owner._id;

  buttonDeleteCard.addEventListener('click', (evt) => {
    deleteFn(evt, apiConfig);
  })

  buttonImage.addEventListener('click', openFn);
  
  if (cardElementCopy.dataset.ownerId === apiConfig.myId) {
    buttonDeleteCard.classList.add('card__delete-button_visible');
  } else {
    buttonDeleteCard.classList.remove('card__delete-button_visible');
  }

  return cardElementCopy;

  // buttonLikeCard.addEventListener('click', (evt) => {
  //   likeFn(evt, apiConfig);
  // });
  // likeElement.textContent = data.likes.length;
  // const likesList = Array.from(data.likes);

  // const isLike = likesList.some((id => id._id === apiConfig.myId));
  // if (isLike) {
  //   buttonLikeCard.classList.add('card__like-button_is-active');
  // } else {
  //   buttonLikeCard.classList.remove('card__like-button_is-active');
  // }
  
  
};

// Удаление карточки
export function deleteCard(evt, apiConfig) {
  const cardToDelete = evt.target.closest('.places__item');
  if (cardToDelete.dataset.ownerId === apiConfig.myId) {
    cardToDelete.remove();
    deleteCardFromServer(cardToDelete, apiConfig)
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
    });
  }
}

// todo Лайк карточки
export function likeCard(evt, apiConfig) {
  const buttonLike = evt.target.closest('.card__like-button');
  const cardToLike = buttonLike.closest('.places__item');
  getInitialData(apiConfig)
    .then((results) => {
      const cards = results[1];
      
  })

}