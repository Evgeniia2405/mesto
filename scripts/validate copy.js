const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


function setError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass) //добавляем модификатор ошибки
  // error.classList.add(config.errorClass)
  error.textContent = input.validationMessage
}

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass) //если все хорошо удаляем модификатор ошибки
  // error.classList.remove(config.errorClass)
  error.textContent = ''
}

function validateInput(form, input, config) { //проверяем соответствуют ли значения инпут тем  type pattern которые мы задали
  if (!input.validity.valid) {
    console.log(sss);
    setError(form, input, config)
  } else {
    hideError(form, input, config)
  }
}



function setButtonState(inputs, button, config) {
  const hasErrors = inputs.some(input => !input.validity.valid);
  if (hasErrors) {
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.classList.remove(config.inactiveButtonClass);
  }
}


function setHandlers(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => { // вешаем обработчик на событие инпут. мы должны проверить значение инпут
      setButtonState(inputs, button, config)
    })
  });
}

function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })

  setHandlers(form, config);
}

enableValidation(validationConfig)
