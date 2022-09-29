export default class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #popupErrorSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;

  #formElement;
  #buttonElement;
  #inputList;
  #popupErrors
  #popupInputs;

  constructor(validationConfig, formElement) {
    this.#formSelector = validationConfig.formSelector;
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#popupErrorSelector = validationConfig.popupErrorSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
    this.#errorClass = validationConfig.errorClass;

    this.#formElement = formElement;
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));

    this.#popupErrors = Array.from(this.#formElement.querySelectorAll(this.#popupErrorSelector));
    this.#popupInputs = this.#formElement.querySelectorAll(this.#inputSelector);
  }

 // #showInputError(inputElement) {
#showInputError(inputElement) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = this.#formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this.#inputErrorClass); //'popup__input_type_error'
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this.#errorClass); //'popup__error_visible'
};

#hideInputError(inputElement) {
  // Находим элемент ошибки
  const errorElement = this.#formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this.#inputErrorClass); //'popup__input_type_error'
  errorElement.classList.remove(this.#errorClass);   //'popup__error_visible'
  errorElement.textContent = '';
}

#checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this.#showInputError(inputElement);
  } else {
    this.#hideInputError(inputElement);
  }
}

// Функция проверяет наличие невалидного поля
#hasInvalidInput() {
  // проходим по этому массиву методом some
  return this.#inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
}


// Установка атрибута disabled и добавление класса для отображения неактивной кнопки
#setDisableButton() {
  this.#buttonElement.setAttribute('disabled', 'disabled');
  this.#buttonElement.classList.add(this.#inactiveButtonClass); //'popup__button_disabled'
}

// Удаление атрибута disabled и удаление свойств для отображения неактивной кнопки
#removeDisableButton(){
  this.#buttonElement.removeAttribute('disabled', 'disabled');
  this.#buttonElement.classList.remove(this.#inactiveButtonClass); //'popup__button_disabled'
}

#toggleButtonState() {
  // Если есть хотя бы один невалидный инпут
  if (this.#hasInvalidInput()) {
    // сделай кнопку неактивной
    this.#setDisableButton()
  } else {
    // иначе сделай кнопку активной
    this.#removeDisableButton()
  }
};

// Функция для очистки текста ошибок после открытия формы ранее закрытой через esc || click in overlay
//resetErrorPopupInput()
resetErrorPopupInput() {

  this.#popupErrors.forEach((popupError) => {
    popupError.textContent = '';
    });

  this.#popupInputs.forEach((popupInput) => {
    popupInput.classList.remove(this.#inputErrorClass); //'popup__input_type_error'
    });

  this.#toggleButtonState();
};


// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ПОЛЯМ ФОРМЫ
#setEventListeners() {
  this.#toggleButtonState();


  this.#inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this.#checkInputValidity(inputElement);
      // чтобы проверять его при изменении любого из полей
      this.#toggleButtonState();
    });
  });
};

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
enableValidation() {
  this.#setEventListeners();
}

}
