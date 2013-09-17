YUI.add('composite-view', function (Y, NAME) {
    var CompositeView = function (config) {
        CompositeView.superclass.constructor.apply(this, arguments);
    };

    Y.extend(CompositeView, Y.View, {
        modelTemplate: function() {
            return this.get('modelTemplate');
        },
        modelListTemplate :  function() {
            return this.get('modelListTemplate');
        },
        initializer: function () {
            var model = this.get('model');
            var list = this.get('modelList');
            list.after(['add', 'remove', 'reset'], this.render, this);
            model.after(['load', 'change', 'reset'], this.render, this);
            this.publish('render', {
                broadcast: true,
                bubbles: true,
                emitFacade: true
            });
        },
        _renderModel: function (data, template) {
            Y.log(arguments);
            var compiledTemplate = Y.Handlebars.compile(template),
                html;
            try {
                html = compiledTemplate(data);
            } catch (e) {
                html = "ERROR";
            }
            return html;
        },
        onRender: function () { },
        render: function () {
            var container = this.get('container');
            Y.log(Y.templates);
            Y.log(this.modelTemplate());
            Y.log(this.modelListTemplate());
            var modelMarkup = this._renderModel(this.get("model").toJSON(), Y.templates[this.modelTemplate()]);
            
            var modelListMarkup = this._renderModel({ items: this.get("modelList").toJSON() }, Y.templates[this.modelListTemplate()]);

            container.setHTML(modelMarkup + ' ' + modelListMarkup);
            if (!container.inDoc()) {
                Y.one('body').append(container);
            }
            this.onRender();
            this.fire('render');
            return this;
        }
    }, {
        ATTRS: {
            modelTemplate: { value: '' },
            modelListTemplate: { value:''}
        }
    });
    Y.CompositeView = CompositeView;
    
}, '@VERSION@', {"requires": ["view", "handlebars", "node", "event"]});