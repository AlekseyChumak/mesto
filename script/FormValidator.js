export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    // Передадим текст ошибки
    _showInputError (inputElement, errorMessage) {
        const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.errorBorder);
        formError.textContent = errorMessage;
        formError.classList.add(this._validationConfig.inputErrorClass);        
    }


    // очистим ошибку
    _hideInputError (inputElement) {
        const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.errorBorder);
        formError.classList.remove(this._validationConfig.inputErrorClass);
        formError.textContent = "";
    };

    // очистим поля от ошибок
    _clearInputsError (formElement) {
        this._inputList.forEach((input) => {
          this._hideInputError(formElement, input, this._validationConfig);
    });
    };
  
    // Проверка на наличие невалидного поля
    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
    });
    };

    //Неактивное состояние кнопки
    _disebledSubmitButton () {
        this._buttonElement.setAttribute("disabled", false);
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    };

    // Активное состояние кнопки
    _enableSubmitButton () {
        this._buttonElement.removeAttribute("disabled", false);
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    };
  
    // Функция переключения состояния кнопки
    _toggleButtonState (inputList) {
        if (this._hasInvalidInput(inputList)) {
            this._disebledSubmitButton();
            } else {
           this._enableSubmitButton();           
        }
    };

    // функция ВАЛИДНА?
    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Добавление обработчика всем полям формы
    _setEventListeners (formElement) {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    };
}

