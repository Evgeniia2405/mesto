export default class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #buttonElement;
  #inputList;

  constructor(validationConfig, formElement) {

    this.#formSelector = validationConfig.formSelector;
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
    this.#errorClass = validationConfig.errorClass;
    this.#formElement = formElement;
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
  }

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

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
enableValidation() {
  this.#toggleButtonState();

  this.#inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this.#checkInputValidity(inputElement);
      // чтобы проверять его при изменении любого из полей
      this.#toggleButtonState();
    });
  });
}

// Функция для очистки текста ошибок после открытия формы ранее закрытой через esc || click in overlay
  resetValidation() {
    this.#inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
    });

    this.#toggleButtonState();
  }
}
