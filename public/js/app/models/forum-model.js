YUI.add('forum-model', function (Y) {
    Y.namespace('Conclave.Models').User =  Y.Base.create('forumModel', Y.Model, [Y.ModelSync.REST], {
        root: '/api/forums',
        initializer: function () {
 

        }
    }, {
        ATTRS: {
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            password: {
                value: ''
            },
            email: {
                value: ''
            }
        }
    });
}, '0.0.1', {requires:['model', 'model-sync-rest']});