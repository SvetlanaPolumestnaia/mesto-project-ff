import { cardTemplate } from "./constants.js";

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, openFn, likeFn) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDelete = cardElementCopy.querySelector('.card__delete-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;

  buttonDelete.addEventListener('click', deleteFn);

  buttonImage.addEventListener('click', openFn)
  
  likeFn(cardElementCopy);
  
  return cardElementCopy;
};

// Функция добавления новой карточки на страницу
export function renderCard(cardData, container) {
  container.append(cardData);
};

// Функция удаления карточки
export function deleteCard(evt) {
  const currentCard = evt.target;
  currentCard.closest('.places__item').remove();
};

// Функция лайка
export function likeCard(searchAreaLike) {
  const likeButton = searchAreaLike.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
      likeButton.classList.toggle('card__like-button_is-active');
  })
}