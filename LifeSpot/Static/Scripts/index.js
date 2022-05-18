
let logger = function () {

    let sessionStorage = window.sessionStorage;
    // Вывод в консоль
    console.log('Начало сессии: ' + sessionStorage.getItem('startDate'));
    console.log('Даныне клиента: ' + sessionStorage.getItem('userAgent'));
    console.log('Возраст пользователя: ' + sessionStorage.getItem('userAge'));
}

/*
* Функция для проверки и сохранения  данных пользователя
* Также блокирует доступ к сайту лицам, не подтвердившим свой возраст
*
* */
let checker = function(newVisit) {

    if (window.sessionStorage.getItem('userAge') >= 18) {
        if (newVisit) {
            alert("Приветствуем на LifeSpot!" + '\n' + "Текущее время: " + new Date().toLocaleString());
        }
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com";
    }
}

/*
* Сохранение данных сессии сразу при заходе пользователя на страницу
*
* */
function handleSession(logger, checker) {

    // Проверяем дату захода и проставляем, если новый визит
    if (window.sessionStorage.getItem("startDate") == null) {
        window.sessionStorage.setItem("startDate", new Date().toLocaleString());
    }

    // Проверяем userAgent и проставляем, если новый визит
    if (window.sessionStorage.getItem("userAgent") == null) {
        window.sessionStorage.setItem("userAgent", window.navigator.userAgent);
    }

    // Проверяем возраст и проставляем, если новый визит
    if (window.sessionStorage.getItem("userAge") == null) {
        let input = prompt("Пожалуйста, введите ваш возраст?");
        window.sessionStorage.setItem("userAge", input)

        /* Возраст отсутствовал в sessionStorage. Значит, это первый визит пользователя, и
         при прохождении проверки на возраст он увидит приветствие*/
        checker(true);
    } else {

        /* Пользователь заходит не первый раз, приветствие не показываем. */
        checker(false);
    }

    /* Вызываем переданную в качестве колл-бэка функцию логирования.
        передавать в качестве коллбека не обязательно, можно вызвать и напрямую.
    */
    logger();
}

/*
* Функция для фильтрации контента
* Будет вызываться благодаря атрибуту oninput на index.html
*
* */
function filterContent() {
    let srhText = inputParseFunction();
    let elements = document.getElementsByClassName('video-container');
    for (let i = 0; i < elements.length; i++) {
        let videoTitle = elements[i].querySelector('.video-title').innerText.toLowerCase();
        if (!videoTitle.includes(srhText)) {
            elements[i].style.display = 'none';
        }
        else {
            elements[i].style.display = 'inline-block';
        }
    }
}