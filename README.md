## Проект: Место

### Описание:
Проект выполнен в ходе изучения курса frontend разработка на платформе Яндекс.Практикум.</br>
Цель проекта: создание интерактивной страницы, где можно установить свой аватар, изменить имя и вид деятельности. Добавить свою карточку с местом, где был человек. Возможность лайкнуть карточку и снять лайк.

Сайт Место</br>
![](/src/images/ImgPage.png)
**Стек**
- HTML
- CSS
- Grid layout
- Flexbox
- Nested БЭМ
- JavaScrip
- Webpack
- Работа с API
- Git

**Функциональность**
- Внешний вид сайта соответствует макету: \* [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1).
- Файловая структура организована по БЭМ.
- Вёрстка по PixelPerfect, адаптивная: минимальная ширина: 320px и максимальная: 1280px.
- Проект взаимодействует с сервером: [https://mesto.nomoreparties.co.](https://mesto.nomoreparties.co.). Информация о пользователе и начальные карточки подгружаться с указанного сервера.
- Редактирование профиля. При клике на аватар, открываться форма (PopUp) для ввода ссылки на новое изображение. При введение валидных данных, информация сохраняется на сервере.
![](/src/images/UpdateAvatar.jpg)
- Добавление новой карточки. При клике на кнопку " + ", открываться форма (PopUp) для ввода данных для новой карточки. При введение валидных данных, информация сохраняется на сервере.
![](/src/images/AddPic.jpg)
- Отображение количества лайков карточки. У каждой карточки есть свойство likes — оно содержит массив пользователей, лайкнувших карточку. На каждой карточке написано, сколько у неё лайков. При постановке и снятии лайка "сердечко" меняет цвет, а счётчик лайков увеличиваться или уменьшаться.
- Удаление карточки. Иконка удаления есть только на созданных вами карточках, так как удалять чужие карточки нельзя. При клике на кнопку "🗑", открываться форма (PopUp). Карточка удалится, если в попапе удаления карточки пользователь нажал «Да».
![](/src/images/DelCard.jpg)
- Улучшен UX всех форм. При coхранении даных на сервер, пользователь уведомляется о процессе загрузки- текст кнопки меняется на: «Сохранение...»
- Настроена сборка проекта Webpack

**Ссылка GitHub Pages:**
[https://evgeniia2405.github.io/mesto/](https://evgeniia2405.github.io/mesto/)

![QR код для просмотра сайта с мобильного устройства](https://user-images.githubusercontent.com/107268897/184111082-c70ea692-5f1f-4824-b7b3-b751f9bf1af3.png)

**QR код** для просмотра сайта с мобильного устройства

**Инструкция по запуску проекта**
- клонировать репозиторий
- выполнить команду npm install для установки зависимостей
- для просмотра проекта выполнить команду npm run dev
- для тестирования сайта можно взять фотографии с сайта [Unsplash](https://unsplash.com/) — коллекции бесплатных изображений. ~~Тогда не придётся думать об авторских правах.~~
