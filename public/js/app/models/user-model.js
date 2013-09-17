YUI.add('user', function (Y) {
    Y.namespace('Conclave.Models').User =  Y.Base.create('userModel', Y.Model, [Y.ModelSync.REST], {
        root: '/api/users',
        idAttribute : '_id',
        initializer: function () {
 

        },
        loadCurrentUser: function (callback) {
            this.url = '/users/current';
            this.load(function(){
                this.url = null;
                callback();
            });
        },
        loadByCreds: function (callback){
            this.url = '/users/query?email={email}&password={password}';
            this.load(function(){
                this.url = null;
                callback();
            });
        }
    }, {
        ATTRS: {
            _id: {
                value: ''
            },
            first: {
                value: ''
            },
            last: {
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
}, '0.0.1', {requires:['model', 'model-sync-rest', 'weigh-in-list']});