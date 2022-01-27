import VirtualList from './dist/lib/VirtualList.es'

class Virtual extends HTMLElement {
    constructor() {
        super();
        const template = VirtualList({
            rowRenderer: ({ index }) => {
                const templateItem = document.getElementById('virtual-item');
                const content = templateItem.content.cloneNode(true);
                const dom = content.querySelector('.item');
                dom.innerHTML = index;
                return dom;
            },
        });
        this.appendChild(template);
    }
}
window.customElements.define('virtual-list', Virtual);
