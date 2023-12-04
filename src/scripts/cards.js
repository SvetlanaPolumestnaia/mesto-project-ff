import { cardTemplate, apiConfiguration } from "./constants.js";
import { handleLike } from "./api.js";

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, handleLikeFn, openFn) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDeleteCard = cardElementCopy.querySelector('.card__delete-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  const buttonLikeCard = cardElementCopy.querySelector('.card__like-button');
  
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;

  showDeleteButton(cardElementCopy, apiConfiguration);

  buttonDeleteCard.addEventListener('click', (evt) => {
    deleteFn(evt, apiConfiguration);
  })

  buttonLikeCard.addEventListener('click', (evt) => {
    handleLikeFn(evt, apiConfiguration);
  });

  buttonImage.addEventListener('click', openFn);
  
  return cardElementCopy;
};

// Функция показа кнопки удаления
export function showDeleteButton(card, apiConfig) {
  const deleteElement = card.querySelector('.card__delete-button')
  if (card.dataset.ownerId === apiConfig.myId) {
    deleteElement.classList.add('card__delete-button_visible');
  }
}

// Подсчет количества лайков
export function getLikes(card, data, apiConfig) {
  const buttonLike = card.querySelector('.card__like-button');
  const likeElement = card.querySelector('.card__like-button_likes');
  likeElement.textContent = data.likes.length;
  const likesList = Array.from(data.likes);
  // Не ищет мой айди почему-то
  const isMyId = likesList.some((id => id._id === 'f19ca1805b28867f6c3451ec'));
  if (isMyId) {
      buttonLike.classList.add('card__like-button_is-active');
    } else {
      buttonLike.classList.remove('card__like-button_is-active');
    }
}

