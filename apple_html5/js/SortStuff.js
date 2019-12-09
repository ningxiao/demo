class SortStuff extends HTMLElement {
    ul;
    shadow;
    instance;
    sortButton;
    elements = [];
    _sort = true;
    constructor(target = '#sortable') {
        super();
        this.setAttribute('target', target);
        this.shadow = this.attachShadow({ mode: 'open' });
        // this.createStyle();
        // this.createView();
        this.createTmpl();
    }
    static get observedAttributes() {
        return ['sort'];
    }
    get sort() {
        return Boolean(this._sort);
    }
    set sort(v) {
        this._sort = v;
        this.setAttribute('sort', v);
    }
    createTmpl() {
        let template = document.getElementById('stuff');
        let templateContent = template.content;
        this.shadow.append(templateContent.cloneNode(true));
        this.sortButton = this.shadow.querySelector('button');
        this.ul = this.shadow.querySelector('ul');
    }
    createStyle() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
            }
            button {
                box-sizing: border-box;
                white-space: nowrap;
                -webkit-appearance: none;
                cursor: pointer;
                outline: none;
                text-align: center;
                font-weight: 400;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                position: relative;
                -webkit-transition: all .3s;
                transition: all .3s;
                border-radius: 2px;
                line-height: 1;
                color: #fff;
                background: #4E73FF;
                border: 1px solid #4E73FF;
                min-width: 66px;
                height: 34px;
                padding: 0 13px;
                font-size: 14px;
            }
            ul,li{
                list-style: none;
            }
            `;
        this.shadow.appendChild(style);
    }
    createView() {
        this.sortButton = document.createElement('button');
        this.ul = document.createElement('ul');
        this.ul.innerHTML =
            `
            <li data-sort="c" class="item">Item 3</li>
            <li data-sort="a">Item 1</li>
            <li data-sort="d">Item 4</li>
            <li data-sort="b">Item 2</li>
            <li data-sort="e">Item 5</li>
        `;
        this.sortButton.setAttribute('data-key', 'sort');
        this.sortButton.innerText = '点击排序(默认)';
        this.shadow.append(this.sortButton, this.ul);
    }
    connectedCallback() {
        const children = this.ul.children;
        const key = this.sortButton.dataset.key;
        const data = [{ title: 'The title', text: 'Hello world' }, { title: 'A new title', text: 'Hi there' }];
        for (let i = 0; i < children.length; i++) {
            this.elements.push({
                value: children[i].dataset[key],
                node: children[i],
            });
        }
        this.sortButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('some-event', {
                detail: {
                    hazcheeseburger: true
                }
            }));
        });
        this.addEventListener('some-event', this);
        this.setAttribute('sort', this.sort);
        this.createInstance(data);
        console.log('当 custom element首次被插入文档DOM时，被调用。');
    }
    createInstance(data) {
        const template = document.querySelector('#example');
        const size = data.length;
        for (let i = 0; i < size; i++) {
            const dom = template.content.cloneNode(true);
            Array.from(dom.children).forEach((el) => {
                const key = /\{\{(.*)\}\}/.exec(el.innerText);
                if (key) {
                    el.innerText = data[i][key[1]];
                }
            });
            this.shadow.appendChild(dom);
        }
    }
    disconnectedCallback() {
        console.log('当 custom element从文档DOM中删除时，被调用。');
    }
    adoptedCallback() {
        console.log('当 custom element被移动到新的文档时，被调用');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'sort') {
            this.sortCall();
        }
        console.log('当 custom element增加、删除、修改自身属性时，被调用。', name, oldValue, newValue);
    }
    sortCall() {
        this.createInstance([{ title: 'A new title', text: 'Hi there' }]);
        if (this.sort) {
            this.elements.sort((x, y) => (x.value == y.value ? 0 : (x.value < y.value ? 1 : -1)));
            this.sortButton.innerText = '点击排序(倒序)';
        } else {
            this.elements.sort((x, y) => (x.value == y.value ? 0 : (x.value > y.value ? 1 : -1)));
            this.sortButton.innerText = '点击排序(正序)';
        }
        this.elements.forEach((i) => {
            this.ul.appendChild(i.node);
        });
    }
    handleEvent(e) {
        switch (e.type) {
            case 'some-event':
                this.sort = !this.sort;
                console.log(this.sort);
                break;
            default:
                break;
        }
    }
}
window.customElements.define('sort-stuff', SortStuff);
(async () => {
    // 导入doubleKill模块
    const module = await import('../template/29.js');
    module.default();
    // 设置颜色为红色
    module.pColor('red');
    document.querySelector('button').addEventListener('click', () => {
        const SortView = customElements.get('sort-stuff');
        const sortDom = new SortView('#sortable');
        document.body.append(sortDom);
    })
})();