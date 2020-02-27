var StaticModelBody = pc.createScript('staticModelBody');

StaticModelBody.attributes.add('model', {type:'asset', assetType:'model', description: 'The Model Asset'});
StaticModelBody.attributes.add('filterRegex', {type:'string', description: 'RegExp expression for filtering meshInstances'});
StaticModelBody.attributes.add('filterFlags', {type:'string', description: 'RegExp flags for expression'});
StaticModelBody.attributes.add('filterAsExclude', {type:'boolean', description: 'Filter is used for excluding meshInstances instead?'});
StaticModelBody.attributes.add('debugTestFilter', {type:'boolean',
  description: 'Check this box to hide/show visibility of meshInstances of current entity\'s matching model asset for collision filter previewing'});


// initialize code called once per entity
StaticModelBody.prototype.initialize = function() {
    var model = this.model ? this.model.resource : null;
    if (model) {
       this.initModel(model);
    }
    else if (this.model) {
        this.model.on("ready", function() {
            this.initModel(this.model.resource);
        }, this);
    }
};

StaticModelBody.prototype.countAllPrimitives = function(primitive) {
    var i = primitive.length;
    var count = 0;
    while(--i > -1) {
        count += primitive[i].count;
    }
    return count;
};

StaticModelBody.prototype.initModel = function(model) {
     var lastMeshInstances = null;
    if (this.filterRegex && this.filterRegex.trim()) {
        var polyCount = 0;
        //console.log(this.filterFlags);
        var exp = new RegExp(this.filterRegex, this.filterFlags && this.filterFlags.trim() ? this.filterFlags : undefined);
        var filterAsExclude = this.filterAsExclude;
        var entity = this.entity;
        var entityModelModel = this.entity.model ? this.entity.model.model : null;
        this.filteredIndexList = [];

        lastMeshInstances = model.meshInstances;
        model.meshInstances = model.meshInstances.filter(function(item, index) {
            var boo;
            boo = exp.test(item.node.name);
            if (filterAsExclude) boo = !boo;
            if (this.debugTestFilter && entityModelModel && index < entityModelModel.meshInstances.length ) entityModelModel.meshInstances[index].visible = boo;
            polyCount += boo ? (item.mesh.primitive.length < 2 ? item.mesh.primitive[0].count : this.countAllPrimitives(item.mesh.primitive) ) / 3 : 0;
            if (boo) this.filteredIndexList.push(index);
            return boo;
        }.bind(this));
        if (this.debugTestFilter) {
            console.log(this.entity.name + " collision polies: "+polyCount);
        }
    }

    if (lastMeshInstances !== null) {
       model.meshInstances = lastMeshInstances;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// StaticModelBody.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/