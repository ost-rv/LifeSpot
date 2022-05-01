let dataSessionMap = new Map();
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

/*
* Функция для проверки и сохранения  данных пользователя
* Также блокирует доступ к сайту лицам, не подтвердившим свой возраст
*
* */
function handleSession () {
    dataSessionMap.set('startSession', new Date().toLocaleString());
    dataSessionMap.set('userAgent', window.navigator.userAgent);
}

function checkAge() {
    dataSessionMap.set('userAge', prompt("Введите Ваш возраст:"));

    if (dataSessionMap.get('userAge') >= 18) {
        alert("Приветствуем на LifeSpot!" + '\n' + "Текущее время: " + new Date().toLocaleString());
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com";
    }
}


let sessionLog = function() {
    // Вывод в консоль
    for (let result of dataSessionMap) {
        console.log(result)
    }
}




