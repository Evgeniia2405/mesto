let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let editButton = content.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close');

let profileInfo = content.querySelector('.profile__info');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__job');

let formElement = content.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

// открытие закрытие popup через toggle (см. вебинар Егор Шкиря 06.08)
// let togglePopup = function () {
//  popup.classList.toggle('popup_opened');
// }
// editButton.addEventListener('click',togglePopup);
// closeButton.addEventListener('click',togglePopup);


let openPopup = function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

let closePopup = function () {
  popup.classList.remove('popup_opened');
}

// закрытие popup через клик в область вне окна редактирования профиля
// см. вебинар Егор Шкиря 06.08
//popup.addEventListener('click', function(event) {
  // console.log('###event', event);
  // console.log('###event.target', event.target);
  // console.log('###event.curentTarget', event.currentTarget);
 // if (event.target === event.currentTarget) {
 //   closePopup();
 // }
//} );

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click',closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

