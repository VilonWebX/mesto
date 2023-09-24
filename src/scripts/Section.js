export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer //функция
        this._container = document.querySelector(containerSelector) //куда добавить 
    }
    renderItems(items, user) {
        items.forEach(item => {
          this._renderer(item, user);
        });
    }
    addItem(element) {
        this._container.append(element)
    }
    prependItem(element) {
        this._container.prepend(element);
      }
}  