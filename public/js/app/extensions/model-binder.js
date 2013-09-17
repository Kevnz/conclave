YUI.add('model-binder', function (Y, NAME) {

var ModelBinder = function() {

};

ModelBinder.prototype = {
    rootEl: '',
    initializer: function () {
        
    },
    bind: function() {
        var model = this.toJSON(),
            prop,
            el, elFromData,
            rootEl = this.get('rootEl'),
            form = rootEl,
            domEl;
        for (prop in model) {
            if (model.hasOwnProperty(prop)) {
                elFromData = form.one('[data-model-bind="' + prop + '"]');
                if (elFromData === null) {
                    el = form.one('#' + prop);
                    if (el === null) {
                        el = form.one('#' + prop.toLowerCase());
                    }
                } else {
                    el = elFromData;
                }
                if (el) {
                    //set the model-bind-attribute property to normailize the location of the attribute
                    el.setData('model-bind-attribute', prop);
                    domEl = el.getDOMNode();
                    this[domEl.nodeName.toLowerCase()](el, model, prop);
                    el.set('value', model[prop]);
                    el.on('change',this._setModel, this );
                }
            }
        }
    },
    input: function (node, model, property) {
        var inputType = node.get('type').toLowerCase();
        if (inputType === 'text' || inputType === 'password') {
            node.set('value', model[property]);
        }
    },
    textarea: function (node, model, property) {
        //var inputType = node.get('type').toLowerCase();
        node.setHTML(model[property]);
    },
    select: function (node, model, property) {
        var options;

        if (this.get(property + 'Options')) {
            options = this.get(property + 'Options');
            Y.Array.each(options, function (item) {
                node.append(Y.Node.create('<option value="' + item.value + '">' + item.name + '</option>'));
            });
            
        }
    },
    _setModel: function (e) {
        this.set(e.currentTarget.getData('model-bind-attribute'), e.currentTarget.get('value'));
    }
};
Y.ModelBinder = ModelBinder;

}, '@VERSION@', {"requires": ["node", "selector-css3"]});
