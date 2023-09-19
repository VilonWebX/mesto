export default class Section {
    constructor({ data, renderer }, selector) {
        this._items = data //добавить массив 6 краточек
        this._renderer = renderer //функция
        this._selector = document.querySelector(selector) //куда добавить 
    }
    //вставить один эелемент в контейнер
    addItem(element) {
        this._selector.prepend(element)
    }
    //отрисовка всех элементов 
    render() {
        this._items.forEach((item) => {
            this._renderer(item)
        })
    }
}