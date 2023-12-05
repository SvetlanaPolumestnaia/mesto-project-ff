import { deleteCardFromServer } from "./api.js";
import { cardTemplate, apiConfiguration } from "./constants.js";

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, likeFn, openFn) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDeleteCard = cardElementCopy.querySelector('.card__delete-button');
  const buttonLikeCard = cardElementCopy.querySelector('.card__like-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;

  showDeleteButton(cardElementCopy, apiConfiguration);

  buttonDeleteCard.addEventListener('click', (evt) => {
    deleteFn(evt, apiConfiguration);
  })

  buttonLikeCard.addEventListener('click', (evt) => {
    likeFn(evt, apiConfiguration);
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
export function handleLikes(card, data, apiConfig) {
  const buttonLike = card.querySelector('.card__like-button');
  const likeElement = card.querySelector('.card__like-button_likes');

  // Отображение количества лайков
  likeElement.textContent = data.likes.length;

  // Список лайкнувших
  const likesList = Array.from(data.likes);
  // Если кто-то из лайкнувших - я, то добавляем класс, если нет - убираем
  // Сделала так, чтобы при перезагрузке страницы данные не слетали, функция используется, когда добавляем все карточки с сервера
  const isMyId = likesList.some((id => id._id === apiConfig.myId));
  if (isMyId) {
      buttonLike.classList.add('card__like-button_is-active');
    } else {
      buttonLike.classList.remove('card__like-button_is-active');
    }
}


// Удаление карточки
export function deleteCard(evt, apiConfig) {
  const cardToDelete = evt.target.closest('.places__item');
  if (cardToDelete.dataset.ownerId === apiConfig.myId) {
    cardToDelete.remove();
    deleteCardFromServer(cardToDelete, apiConfig);
  }
}
