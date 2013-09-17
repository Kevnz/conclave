YUI.add('collection-view', function (Y, NAME) {

var CollectionView = function () {
    CollectionView.superclass.constructor.apply(this, arguments);
};

Y.extend(CollectionView, Y.View, {
    initializer: function () {
        var list = this.get('modelList');
        list.after(['add', 'remove', 'reset'], this.render, this);
    },
    render: function () {
        var container = this.get('container'),
            templateNode = Y.one(this.template),
            source = templateNode.getHTML(),
            compiledTemplate = Y.Handlebars.compile(source),
            data = { items: this.get('modelList').toJSON() },
            html = compiledTemplate(data);
        
        container.setHTML(html);

        if (!container.inDoc()) {
            Y.one('body').append(container);
        }
        this.fire('render');
        return this;
    }
});
Y.CollectionView = CollectionView;

}, '@VERSION@');
