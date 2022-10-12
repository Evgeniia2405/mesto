/**
 * класс Section отвечает за отрисовку элементов на странице
 */
export default class Section {
  #renderedItems;
  #renderer;
  #container;

  constructor({ items, renderer }, selector) {
    this.#renderedItems = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(selector);
  }

  /**
   * функция отвечает за создание и отрисовку данных на странице
   */
  renderItems() {
    this.#renderedItems.forEach(item => this.#renderer(item))
  }

  /**
   * метод addItem принимает DOM-элемент и добавляет его в контейнер
   * @param {string} element DOM-элемент
   */
  addItem(element) {
    this.#container.prepend(element);
  }
}


