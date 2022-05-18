/*
* Конструктор, через который создаётся комментарий
*
* */
function Comment() {
    // Запросим имя
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true
        return
    }

    // Запросим текст
    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    // Сохраним текущее время
    this.date = new Date().toLocaleString()
}

/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
*
* */
function addComment() {
    // Создаем объект обычного комментария
    let comment = new Comment();

    // Запросим, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?');

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment);
        // и добавим ему нужное свойство
        review.rate = 0;

        // Добавим на страницу
        writeReview(review)
    }
    else {
        // Добавим на страницу
        writeReview(comment)
    }
}

/*
* Запишем отзыв на страницу
*
* */
const writeReview = review => {

    let likeCounter = '';

    // Для проверки, является ли объект отзывом, используем свойство hasOwnProperty
    if (review.hasOwnProperty('rate')) {

        // Генерим идентификатор комментария.
        let commentId = Math.random();
        // Для кнопки лайков добавляем: идентификатор, атрибут onclick для передачи идентификатора в функцию, значок лайка, и само значение счётчика отделяем пробелом
        // Также мы добавили стиль, чтобы кнопка смотрелась лучше и не имела рамок
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `❤️ ${review.rate}</button>`
    }

    // Запишем результат
    document.getElementsByClassName('reviews')[0].innerHTML += '    <div class="review-text">\n' +
        `<p> <i> <b>${review['author']}</b>  ${review['date']}${likeCounter}</i></p>` +
        `<p>${review['text']}</p>` +
        '</div>';
}

/*
* Увеличивает счётчик лайков
*
* */
function addLike(id) {
    // Найдём нужный элемент по id
    let element = document.getElementById(id);

    // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    let array = element.innerText.split(' ')

    // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    let resultNum = parseInt(array[array.length - 1], 10);

    // Увеличим счётчик
    resultNum += 1

    // Сохраним измененное значение обратно в массив
    array[array.length - 1] = `${resultNum}`

    // Обновим текст элемента
    element.innerText = array.join(' ')
}

//********************
//BEGIN SLIDER
//********************
let slider = document.querySelector('.slider');
let touchStartX = null;
let touchStartY = null;
let sliderWidth = slider.offsetWidth;
let posThreshold = sliderWidth * .35; //порог смещения при достяжении которого переходим к следующей картинки
let trfRegExp = /[-0-9.]+(?=px)/; //для считывания свойства transform
/* Индекс слайда по умолчанию */
let slideIndex = 0;
showSlides(slideIndex);

document.addEventListener('mousedown', swipeStart);
document.addEventListener('touchstart', swipeStart)

getEvent = function () {
    // p.s. event - аргумент по умолчанию в функции
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
}

function swipeStart(event) {

    const evt = getEvent();
    touchStartX = evt.clientX;
    touchStartY = evt.clientY;

    // убираем плавный переход, чтобы слайд двигался за курсором без задержки
    // т.к. он будет включается в функции slide()
    slider.style.transition = '';

    document.addEventListener('touchmove', swipeMove);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mousemove', swipeMove);
    document.addEventListener('mouseup', swipeEnd);
}

function swipeMove(event) {
    const evt = getEvent();
    let moveX = evt.clientX;
    let diffX = touchStartX - moveX;

    // для более красивой записи возьмем в переменную текущее свойство transform
    let style = slider.style.transform;
    // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
    let matchs = +style.match(trfRegExp);
    let transform = matchs.length > 0 ? matchs[0] : 0;

    slider.style.transform = `translate3d(${transform - diffX}px, 0px, 0px)`;
}

function swipeEnd(event) {
    const evt = getEvent();
    let endX = evt.clientX;
    
    let diffX = endX - touchStartX;

    document.removeEventListener('touchmove', swipeMove);
    document.removeEventListener('mousemove', swipeMove);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    if (Math.abs(diffX) >= posThreshold) {
        //right <-> left
        if (diffX > 0) {
            nextSlide();
        }
        else {
            prevSlide()
        }
        slide();
    }
    else {
        currentSlide(slideIndex);
        slide();
    }
    
    touchStartX = null;
    touchStartY = null;
}

function slide() {
    slider.style.transition = 'transform .5s';
    slider.style.transform = 'translate3d(0px, 0px, 0px)';
}

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function nextSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function prevSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length - 1) {
        slideIndex = 0
    }
    if (n < 0) {
        slideIndex = slides.length - 1
    }
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}
//***************
//END SLIDER
//***************