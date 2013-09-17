YUI.add('app-regions', function (Y, NAME) {

var Lang = Y.Lang;

function AppRegions() { }

AppRegions.ATTRS = {
    regions: {
        setter: '_setRegions',
        value: false
    }
};



/*

MyApp.addRegions({
  mainRegion: "#some-div",
  navRegion: "#another-div"
});

*/
AppRegions.prototype = {
    initializer: function() {
        
    },
    showView: function (region, view, config, options, callback) {
        /*jshint expr: true */
        var viewInfo, created;

        options || (options = {});

        // Support the callback function being either the fourth or fifth arg.
        if (callback) {
            options = Y.merge(options, { callback: callback });
        } else if (Lang.isFunction(options)) {
            options = { callback: options };
        }

        if (Lang.isString(view)) {
            viewInfo = this.getViewInfo(view);

            // Use the preserved view instance, or create a new view.
            // TODO: Maybe we can remove the strict check for `preserve` and
            // assume we'll use a View instance if it is there, and just check
            // `preserve` when detaching?
            if (viewInfo && viewInfo.preserve && viewInfo.instance) {
                view = viewInfo.instance;

                // Make sure there's a mapping back to the view metadata.
                this._viewInfoMap[Y.stamp(view, true)] = viewInfo;
            } else {
                // TODO: Add the app as a bubble target during construction, but
                // make sure to check that it isn't already in `bubbleTargets`!
                // This will allow the app to be notified for about _all_ of the
                // view's events. **Note:** This should _only_ happen if the
                // view is created _after_ `activeViewChange`.

                view = this.createView(view, config);
                created = true;
            }
        }

        // Update the specified or preserved `view` when signaled to do so.
        // There's no need to updated a view if it was _just_ created.
        if (options.update && !created) {
            view.setAttrs(config);
        }

        // TODO: Hold off on rendering the view until after it has been
        // "attached", and move the call to render into `_attachView()`.

        // When a value is specified for `options.render`, prefer it because it
        // represents the developer's intent. When no value is specified, the
        // `view` will only be rendered if it was just created.
        if ('render' in options) {
            if (options.render) {
                view.render();
            }
        } else if (created) {
            view.render();
        }
        
        return this._set(region +'View', view, { options: options });
    },
    _setRegions: function(regions) {
        var defRegions = this.regions;
        if (regions && regions === true) {
            return Y.merge(defRegions);
        }
        return regions;
    }
};

// -- Namespace ----------------------------------------------------------------
Y.App.AppRegions = AppRegions;
Y.Base.mix(Y.App, [AppRegions]);

}, '@VERSION@', {"requires": ["app-base"]});
