'use strict';

(function () {
    const classYoutubeBlock = 'preyoutube__block-iframe';                   // класс блока с видео
    const classYoutubeIco = 'preyoutube__block-ytb-ico';                    // класс иконки ютуба
    const urlVideoService = 'https://www.youtube.com/embed/'                // ссылка на видео сервис
    const urlImgService = 'https://i.ytimg.com/vi/';                        // ссылка на сервис превью картинок для ютуб роликов
    const imgName = 'sddefault.jpg';                                        // имя превью картинки

    let youtubeBloks;                                                       // блоки с видео

    // ! ---

    function getYuotubeBloks() { youtubeBloks = Array.from(document.querySelectorAll(`.${classYoutubeBlock}`)); }     // получим блоки с видео

    function initYuotubeBloks() {                                                                   // обработаем блоки с видео
        addPrevieImg();                                                                             // добавим превью картинки для видео
        youtubeBloks.forEach(function (block) {                                                     // обработчик нажатия на картинку
            block.addEventListener('click', function () { clickPrevieImg(block); });
        });
    }

    function addPrevieImg() {                                                                       // добавим превью картинки для видео
        youtubeBloks.forEach(function (block) {                                                     // перебор
            let idVideo = block.getAttribute('data-youtube-id');                                    // получим id видео
            let urlPrevieImg = 'url(' + urlImgService + idVideo + '/' + imgName + ')';              // сформируем путь до преью картинки
            block.style.backgroundImage = urlPrevieImg;                                             // разместим картинку в блоке

            let playBtn = document.createElement('div');                                            // разместим иконку ютуба на картинку
            playBtn.setAttribute('class', `${classYoutubeIco}`);
            block.appendChild(playBtn);
        });
    }

    function clickPrevieImg(block) {                                                    // обработчик нажатия на картинку
        let idVideo = block.getAttribute('data-youtube-id');                            // получим id видео
        let iframeUrl = urlVideoService + idVideo + '?autoplay=1&autohide=1';           // сформируем ссылку
        let iframe = document.createElement('iframe');                                  // создадим фрейм

        iframe.setAttribute('src', iframeUrl);                                          // добавим атрибуты
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

        iframe.style.width = block.style.width;
        iframe.style.height = block.style.height;

        block.parentNode.replaceChild(iframe, block);                                   // заменим блок на фрейм
    }

    // ! ---

    getYuotubeBloks();                                                      // получим блоки с видео
    initYuotubeBloks();                                                     // обработаем блоки с видео
})();