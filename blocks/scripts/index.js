let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let editButton = content.querySelector('.profile__button_action_edit');
let closeButton = popup.querySelector('.popup__close');
let profileInfo = content.querySelector('.profile__info');
let submitButton = popup.querySelector('.popup__button-submit');

//console.log('### popup', popup);
//console.log('### editButton', editButton);
//console.log('### closeButton', closeButton);


// открытие закрытие popup через toggle (см. вебинар Егор Шкиря 06.08)

// let togglePopup = function () {
//  popup.classList.toggle('popup_opened');
// }

// editButton.addEventListener('click',togglePopup);
// closeButton.addEventListener('click',togglePopup);


let openPopup = function () {
  popup.classList.add('popup_opened');
}

let closePopup = function () {
  popup.classList.remove('popup_opened');
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click',closePopup);

// закрытие popup через клик в область вне окна редактирования профиля
// см. вебинар Егор Шкиря 06.08
popup.addEventListener('click', function(event) {
  // console.log('###event', event);
  // console.log('###event.target', event.target);
  // console.log('###event.curentTarget', event.currentTarget);
  if (event.target === event.currentTarget) {
    closePopup();
  }
} );




// Находим форму в DOM
let formElement = content.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  let profileName = function () {
    content.querySelector('.profile__name').textContent = nameInput.value;
  }

  let profileJob = function () {
    content.querySelector('.profile__job').textContent = jobInput.value;
  }

  submitButton.addEventListener('click', myFunction);
    function myFunction() {
    if (((jobInput.value).length !== 0) && ((nameInput.value).length !== 0))
    profileName(), profileJob(), closePopup();

    else
    alert('заполните все поля ввода');
    console.log('заполните все поля ввода');
    return;
  }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

