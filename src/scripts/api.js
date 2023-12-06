// Функция обработки ответа от сервера
function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
} 

// Получение данных пользователей и карточек с сервера
export function getInitialData(apiConfig) {
    const targetUrlUsers = apiConfig.baseUrl + apiConfig.uriUsers;
    const usersList = fetch(targetUrlUsers, {
        headers: apiConfig.headers
        })
        .then(getResponseData)

    const targetUrlCards = apiConfig.baseUrl + apiConfig.uriCards;
    const cardsList = fetch(targetUrlCards, {
        headers: apiConfig.headers
    })
        .then(getResponseData)

    const promises = [ usersList, cardsList ];

    return Promise.all(promises)
        .then((results) => {
            return results;
        })
}

// Добавление новой карточки на сервер
export function addCardToServer(link, name, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards
    return fetch(targetUrl, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link }),
    })
        .then(getResponseData)
}

// Удаление своей карточки с сервера
export function deleteCardFromServer(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + '/' + card.id;
    return fetch(targetUrl, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(getResponseData)
}

// Добавление лайка на сервере
export function addLikeToServer(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + card.id;
    return fetch(targetUrl, {
        method: 'PUT',
        headers: apiConfig.headers
    })
        .then(getResponseData)  
}

// Удаление лайка с сервера
export function deleteLikeFromServer(card, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriCards + apiConfig.uriLikes + '/' + card.id;
    return fetch(targetUrl, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(getResponseData)
}

// Изменение данных профиля
export function changeProfileData(profileName, profileDescription, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileDescription
        })
    })
        .then(getResponseData)
}

// Изменение аватара
export function changeProfileAvatar(profileAvatar, apiConfig) {
    const targetUrl = apiConfig.baseUrl + apiConfig.uriUsers + apiConfig.uriMe + apiConfig.uriAvatar;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({ 
            avatar: profileAvatar
        })
    })
        .then(getResponseData)
}