YUI.add('template-loader', function (Y, NAME) {

Y.TemplateLoader = function(uri) {
    var cfg,
    request;
    cfg = {
        sync: true
    };
    request = Y.io(uri, cfg);
    return request.responseText;
};

}, '@VERSION@', {"use": ["model-binder"]});
