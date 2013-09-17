YUI.add('app-create', function (Y, NAME) {

var Base = Y.Base,
    INITIALIZER = "initializer",
    DESTRUCTOR  = "destructor",
    VIEWS = "views",
    build = Base._build,
    newViews,
    _build = function(name, main, extensions, px, sx, cfg) {



        var builtClass = build._ctor(main, cfg),
        buildCfg = build._cfg(main, cfg, extensions),

        _mixCust = build._mixCust,

        dynamic = builtClass._yuibuild.dynamic,

        i, l, extClass, extProto,
        initializer,
        destructor,
        views,
        builtViews = builtClass.prototype.views,
        builtRoutes = [];


        // Augment/Aggregate
        for (i = 0, l = extensions.length; i < l; i++) {
            extClass = extensions[i];

            extProto = extClass.prototype;

            initializer = extProto[INITIALIZER];
            destructor = extProto[DESTRUCTOR];
            views = extProto[VIEWS];

            delete extProto[VIEWS];
            delete extProto[INITIALIZER];
            delete extProto[DESTRUCTOR];

            // Prototype, old non-displacing augment
            Y.mix(builtClass, extClass, true, null, 1);
            //Y.mix(builtViews, views, true, null, 1);
            builtViews  = Y.merge(builtViews, views);

            // Custom Statics
            _mixCust(builtClass, extClass, buildCfg);

            if (initializer) {
                extProto[INITIALIZER] = initializer;
            }

            if (destructor) {
                extProto[DESTRUCTOR] = destructor;
            }

            builtRoutes = builtRoutes.concat(extClass.ATTRS.routes.value);

            builtClass._yuibuild.exts.push(extClass);
        }
    
    if (px) {
        Y.mix(builtClass.prototype, px, true);
    }

    if (sx) {
        sx.ATTRS.routes.value = builtRoutes.concat(sx.ATTRS.routes.value);
        Y.mix(builtClass, build._clean(sx, buildCfg), true);
        _mixCust(builtClass, sx, buildCfg);
    }

    builtClass.prototype.hasImpl = build._impl;
    newViews = Y.merge(builtClass.prototype.views, builtViews);
    builtClass.prototype.views = newViews;
    if (dynamic) {
        builtClass.NAME = name;
        builtClass.prototype.constructor = builtClass;

        // Carry along the reference to `modifyAttrs()` from `main`.
        builtClass.modifyAttrs = main.modifyAttrs;
    }
    return builtClass;
},
AppCreate = function () {

};

 
AppCreate.NAME = 'app-create';

AppCreate.create = function(name, base, extensions, px, sx) {
    return _build(name, base, extensions, px, sx);
};

Y.App.Create = AppCreate;
Y.App.create = AppCreate.create;
Y.Base.mix(Y.App, [AppCreate]);

}, '@VERSION@', {"requires": ["app-base", "base-build"]});
