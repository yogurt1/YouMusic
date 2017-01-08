export default class LinkedList<T> {
    private element: T
    private next: LinkedList<T>

    public setElement(element: T) {
        this.element = element
        return this
    }

    public getElement(): T {
        return this.element
    }

    public setNext(next: LinkedList<T>) {
        this.next = next
        return this
    }

    public getNext(): LinkedList<T> {
        return this.next
    }
}
