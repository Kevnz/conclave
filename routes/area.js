var areas = [];

areas.push({ id: 1, name: 'Intense Debate',
    description: 'It is intense discussions on stuff',
    topics :[{ title:'something',
        description:'something something',
        lastpost: { name:'tite', author:'Some One'}
    },{
        title:'something else',
        description:'something something else',
        lastpost: {name:'Post', author:'Someone Else'}
    }]
});
areas.push({ id: 2, name: 'Not So Intense Debate',
    description: 'Not an intense discussions on stuff',
    topics :[{ title:'Another Something',
        description:'Another something something',
        lastpost: { name:'tite', author:'Some One'}
    },{
        title:'something else',
        description:'something something else',
        lastpost: {name:'Post', author:'Someone Else'}
    }]
});


exports.index = function(req, res){
    res.send(areas);
};

exports.new = function(req, res){
    res.send('new');
};

exports.create = function(req, res){
    res.send('create');
};

exports.show = function(req, res){
    res.send(req.area);
};

exports.edit = function(req, res){
    res.send('edit');
};

exports.update = function(req, res){
    res.send('update');
};

exports.destroy = function(req, res){
    res.send('destroy');
};

exports.load = function(id, fn){
    var area = areas[id];
    if (!area) return fn(new Error('not found'));
    process.nextTick(function(){
        fn(null, user);
    });
};