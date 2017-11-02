var _ = {
    each: function(array, fu) {
        for (var i = 0, len = array.length; i < len; i++) {
            fu(array[i], i);
        };
    }
}

function Element(tagName, props, children) {
    var count = 0;
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    _.each(this.children, function(child, i) {
        if (child instanceof Element) {
            count += child.count;
        };
        count++;
    });
    this.count = count;
};
Element.prototype.render = function() {
    var count = 0;
    var props = this.props;
    var children = this.children || [];
    var el = document.createElement(this.tagName);
    for (var key in props) {
        el.setAttribute(key, props[key]);
    };
    children.forEach(function(child) {
        if (child instanceof Element) {
            count += child.count;
            child = child.render();
        } else {
            child = document.createTextNode(child);
        };
        count++;
        el.appendChild(child);
    });
    this.count = count;
    return el;
};

function h(tagName, props, children) {
    return new Element(tagName, props, children);
};
var ul = h('ul', { id: 'list' }, [
    h('li', { class: 'item' }, ['Item 1']),
    h('li', { class: 'item' }, ['Item 2']),
    h('li', { class: 'item' }, [
        h('ul', { id: 'list-1' }, [
            h('li', { class: 'item' }, ['Item 3-1']),
            h('li', { class: 'item' }, ['Item 3-2']),
            h('li', { class: 'item' }, ['Item 3-3']),
        ])
    ])
]);
document.body.appendChild(ul.render());