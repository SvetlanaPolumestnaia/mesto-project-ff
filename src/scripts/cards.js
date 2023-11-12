import { cardTemplate } from "./constants.js";

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, likeFn, openFn) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDeleteCard = cardElementCopy.querySelector('.card__delete-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;

  buttonDeleteCard.addEventListener('click', deleteFn);

  likeFn(cardElementCopy);

  buttonImage.addEventListener('click', openFn)

  return cardElementCopy;
};

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
};

// Функция лайка
export function likeCard(searchAreaLike) {
  const buttonLike = searchAreaLike.querySelector('.card__like-button');
  buttonLike.addEventListener('click', function() {
      buttonLike.classList.toggle('card__like-button_is-active');
  })
}