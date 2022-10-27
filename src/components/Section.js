/**
 * класс Section отвечает за отрисовку элементов на странице
 */
export default class Section {
  #renderer;
  #container;

  constructor({ renderer }, selector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(selector);
  }

  /**
   * функция отвечает за создание и отрисовку данных на странице
   */
  renderItems(items) {
    items.forEach(item => this.#renderer(item))
  }

  /**
   * метод addItem принимает DOM-элемент и добавляет его в контейнер
   * @param {string} element DOM-элемент
   */
  addItem(element) {
    this.#container.prepend(element);
  }
}


