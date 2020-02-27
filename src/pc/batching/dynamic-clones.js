/**
 * @type {typeof pc.ScriptType}
 */
var DynamicClones = pc.createScript('dynamicClones');

DynamicClones.attributes.add('bufferAmount', { type:'number', min:1, default:128 });
DynamicClones.attributes.add('growAmount', { type:'number', min:1, default:128 });
DynamicClones.attributes.add('lodDistance', { type:'number', min:0 });

DynamicClones.prototype.emptyFunc = function() {};
DynamicClones.prototype.emptyFuncTest = function() { console.log("emptFuncTest"); };

DynamicClones.prototype.setInstanceLen = function(batch, len) {
	batch.instanceLen = len;
    batch.meshInstance.mesh.primitive[0].count = batch.pCount*len;
};

DynamicClones.prototype.activate = function() {
    this.enabled = true;
    if (!this.entity.enabled) this.entity.enabled = true;
};

DynamicClones.prototype.naiveFirstSetInstanceLen = function(index, len) {
    this.setInstanceLen(this.batchReps[0][index], len);
};

DynamicClones.prototype.naiveFirstSetVis = function(index, val) {
    this.batchReps[0][index].meshInstance.visible = val;
    this.batchReps[0][index].meshInstance.cull = !val;
    return val;
};


DynamicClones.prototype.naiveFirstSetTransformDataAtIndexWithPos = function(index, i, pe, x, y, z) {

    var base = i * 16;

    var batch = this.batchReps[0][index];
    var mp = batch.meshInstance.skinInstance.matrixPalette;
    mp[base] = pe[0];
    mp[base + 1] = pe[1];
    mp[base + 2] = pe[2];
    mp[base + 3] = pe[3];
    mp[base + 4] = pe[4];
    mp[base + 5] = pe[5];
    mp[base + 6] = pe[6];
    mp[base + 7] = pe[7];
    mp[base + 8] = pe[8];
    mp[base + 9] = pe[9];
    mp[base + 10] = pe[10];
    mp[base + 11] = pe[11];
    mp[base + 12] = x;
    mp[base + 13] = y;
    mp[base + 14] =  z;
    mp[base + 15] = pe[15];

       //break;

};


DynamicClones.prototype.naiveFirstFinalise = function(index) {
    this.finaliseMatrixPalette( this.batchReps[0][index].meshInstance.skinInstance);
};


DynamicClones.prototype.setInstanceLenAll = function(totalInstances) {
    this.checkGrowthLen(totalInstances);
    var i;
    var batches;
    var len = this.batchReps.length;
    var b;
    var allocLen;
    var totalLeft = totalInstances;
    for (i=0;i<len;i++) {
        batches = this.batchReps[i];
        allocLen = totalLeft >= this.maxBufferAmount ? this.maxBufferAmount : totalLeft;
        for (b = 0; b<batches.length; b++) {
            this.setInstanceLen(batches[b], allocLen);
        }
        totalLeft -= allocLen;

    }
};

DynamicClones.prototype.popInstanceLen = function(batch) {
    var len = batch.instanceLen - 1;
    batch.instanceLen = len;
    batch.meshInstance.mesh.primitive[0].count = batch.pCount*len;
};

DynamicClones.prototype.checkGrowth = function(requiredIndex) {
    if (requiredIndex >= this.growth) {
        this.grow(Math.ceil((requiredIndex - this.growth + 1)/this.growAmount ) * this.growAmount);
    }
};

DynamicClones.prototype.checkGrowthLen = function(len) {
    if (len > this.growth) {
        this.grow(Math.ceil((len - this.growth)/this.growAmount ) * this.growAmount);
    }
};

DynamicClones.prototype.setPositionAtIndex = function(i, x,y,z) {
    var ii = Math.floor(i / this.maxBufferAmount);
    i = i - ii*this.maxBufferAmount;

    var batches = this.batchReps[ii];
    /*
    if (!batches) {
        throw new Error("MISsING:"+ii);
    }
    */

    var b = batches.length;
    var base  = i * 16;
    while(--b > -1) {
        var batch = batches[b];
        var mp = batch.meshInstance.skinInstance.matrixPalette;
        var pe = batch.worldTransform.data;
        mp[base] = pe[0];
        mp[base + 1] = pe[1];
        mp[base + 2] = pe[2];
        mp[base + 3] = pe[3];
        mp[base + 4] = pe[4];
        mp[base + 5] = pe[5];
        mp[base + 6] = pe[6];
        mp[base + 7] = pe[7];
        mp[base + 8] = pe[8];
        mp[base + 9] = pe[9];
        mp[base + 10] = pe[10];
        mp[base + 11] = pe[11];

        mp[base + 12] =  x + pe[12];
        mp[base + 13] =  y + pe[13];
        mp[base + 14] =  z + pe[14];


        mp[base + 15] = pe[15];
    }
};


DynamicClones.prototype.updateMatrixPaletteAtWithPos = function(batch, i, x,y,z) {
    var mp = batch.meshInstance.skinInstance.matrixPalette;
    var base;
    var pe = batch.worldTransform.data;
    base = i * 16;
    mp[base] = pe[0];
    mp[base + 1] = pe[1];
    mp[base + 2] = pe[2];
    mp[base + 3] = pe[3];
    mp[base + 4] = pe[4];
    mp[base + 5] = pe[5];
    mp[base + 6] = pe[6];
    mp[base + 7] = pe[7];
    mp[base + 8] = pe[8];
    mp[base + 9] = pe[9];
    mp[base + 10] = pe[10];
    mp[base + 11] = pe[11];
    mp[base + 12] =  x + pe[12];
    mp[base + 13] =  y + pe[13];
    mp[base + 14] =  z + pe[14];
    mp[base + 15] = pe[15];
};



/*
DynamicClones.prototype.deletePositionAtIndex = function(i) {

    var batchRepsAmt = this.maxBufferAmount * (this.batchReps.length - 1);
    var batch;
     var lastIndex = -1;
    var limitIndex = batchRepsAmt + this.batches[0].instanceLen -1;
    if (i === limitIndex) {

     //while(--b > -1) {
      //  this.popInstanceLen(this.batches[b]);
    // }

      return lastIndex;
    }


   lastIndex =  limitIndex;

    var ii = Math.floor(i / this.maxBufferAmount);
    i = i - ii*this.maxBufferAmount;
    var base  = i * 16;
    var lastBase =  (this.batches[0].instanceLen -1) * 16;
    var lastBatch;
    var batches = this.batchReps[ii];
    var b = batches.length;

    while(--b > -1) {
        batch = batches[b];
        lastBatch = this.batches[b];
        var mp = batch.meshInstance.skinInstance.matrixPalette;
        var mpl =  lastBatch.meshInstance.skinInstance.matrixPalette;
        mp[base + 12] = mpl[lastBase+12];
        mp[base + 13] = mpl[lastBase+13];
        mp[base + 14] = mpl[lastBase+14];
       // this.popInstanceLen(batch);
    }
    return lastIndex;
};


DynamicClones.prototype.deleteTransformAtIndex = function(i) {
   var b = this.batches.length;
    var batch;
       var lastIndex = -1;
    if (i === this.batches[0].instanceLen - 1) {
      //  console.log("OUT");
      //while(--b > -1) {
      //  this.popInstanceLen(this.batches[b]);
      // }
      return lastIndex;
    }

     var base  = i * 16;
     lastIndex =this.batches[0].instanceLen -1;
    while(--b > -1) {
        batch = this.batches[b];
        var lastBase = lastIndex * 16;
        var mp = batch.meshInstance.skinInstance.matrixPalette;
        mp[base] = mp[lastBase];
        mp[base + 1] = mp[lastBase+1];
        mp[base + 2] = mp[lastBase+2];
        mp[base + 3] = mp[lastBase+3];
        mp[base + 4] = mp[lastBase+4];
        mp[base + 5] = mp[lastBase+5];
        mp[base + 6] = mp[lastBase+6];
        mp[base + 7] = mp[lastBase+7];
        mp[base + 8] = mp[lastBase+8];
        mp[base + 9] = mp[lastBase+9];
        mp[base + 10] = mp[lastBase+10];
        mp[base + 11] = mp[lastBase+11];
        mp[base + 12] = mp[lastBase+12];
        mp[base + 13] = mp[lastBase+13];
        mp[base + 14] = mp[lastBase+14];
        mp[base + 15] = mp[lastBase+15];

        //break;
    }
    return true;
};
*/

/*
DynamicClones.prototype.getPositionAtIndex = function(i, pos) {
    var ii = Math.floor(i / this.maxBufferAmount);
    i = i - ii*this.maxBufferAmount;

    var batches = this.batches;

    pos = pos ? pos : new pc.Vec3();
    var batch = batches[0];
    var mp = batch.meshInstance.skinInstance.matrixPalette;
    var pe = batch.worldTransform.data;

    var base;
    base = i * 16;
    pos.x = mp[base+12] - pe[12];
    pos.y = mp[base+13] - pe[13];
    pos.z = mp[base+14] - pe[14];
    return pos;
};
*/

DynamicClones.prototype.setTransformDataAtIndex = function(i, pe) {
    var ii = Math.floor(i / this.maxBufferAmount);
    i = i - ii*this.maxBufferAmount;
    var batches = this.batchReps[ii];
    var b = batches.length;
    var base = i * 16;
   var batch;

   while(--b > -1) {
        batch = batches[b];
         var mp = batch.meshInstance.skinInstance.matrixPalette;
        mp[base] = pe[0];
        mp[base + 1] = pe[1];
        mp[base + 2] = pe[2];
        mp[base + 3] = pe[3];
        mp[base + 4] = pe[4];
        mp[base + 5] = pe[5];
        mp[base + 6] = pe[6];
        mp[base + 7] = pe[7];
        mp[base + 8] = pe[8];
        mp[base + 9] = pe[9];
        mp[base + 10] = pe[10];
        mp[base + 11] = pe[11];
        mp[base + 12] = pe[12];
        mp[base + 13] = pe[13];
        mp[base + 14] = pe[14];
        mp[base + 15] = pe[15];

       //break;
    }
};

DynamicClones.prototype.setTransformDataAtIndexWithPos = function(i, pe, x, y, z) {
    var ii = Math.floor(i / this.maxBufferAmount);
    i = i - ii*this.maxBufferAmount;
    var batches = this.batchReps[ii];
    var b = batches.length;
    var base = i * 16;
   var batch;

   while(--b > -1) {
        batch = batches[b];
        var mp = batch.meshInstance.skinInstance.matrixPalette;
        mp[base] = pe[0];
        mp[base + 1] = pe[1];
        mp[base + 2] = pe[2];
        mp[base + 3] = pe[3];
        mp[base + 4] = pe[4];
        mp[base + 5] = pe[5];
        mp[base + 6] = pe[6];
        mp[base + 7] = pe[7];
        mp[base + 8] = pe[8];
        mp[base + 9] = pe[9];
        mp[base + 10] = pe[10];
        mp[base + 11] = pe[11];
        mp[base + 12] = x;
        mp[base + 13] = y;
        mp[base + 14] =  z;
        mp[base + 15] = pe[15];

       //break;
    }
};




DynamicClones.prototype.finaliseMatrixPalette = function(skinInstance) {

    skinInstance.boneTexture.lock();
    skinInstance.boneTexture.unlock();
};

DynamicClones.prototype.finaliseAllMatrixPalettes = function() {
    var r = this.batchReps.length;
    var batches;
    while(--r >=0) {
        batches = this.batchReps[r];
        var i = batches.length;
        while(--i > -1) {
            this.finaliseMatrixPalette(batches[i].meshInstance.skinInstance);
        }
    }
};


DynamicClones.prototype.updateMatrixPalette = function() { // for reference
   // console.log("Nothing");
    //console.log( this.bones[0].getWorldTransform() );
    /*
    var pe;
    var mp = this.matrixPalette;
    var base;

    for (var i = this.instanceLen - 1; i >= 0; i--) {
        pe = this.bones[i].getWorldTransform().data;

        // Copy the matrix into the palette, ready to be sent to the vertex shader
        base = i * 16;
        mp[base] = pe[0];
        mp[base + 1] = pe[1];
        mp[base + 2] = pe[2];
        mp[base + 3] = pe[3];
        mp[base + 4] = pe[4];
        mp[base + 5] = pe[5];
        mp[base + 6] = pe[6];
        mp[base + 7] = pe[7];
        mp[base + 8] = pe[8];
        mp[base + 9] = pe[9];
        mp[base + 10] = pe[10];
        mp[base + 11] = pe[11];
        mp[base + 12] = pe[12];
        mp[base + 13] = pe[13];
        mp[base + 14] = pe[14];
        mp[base + 15] = pe[15];
    }


    if (this.device.supportsBoneTextures) {
        this.boneTexture.lock();
        this.boneTexture.unlock();
    }
     */
};

DynamicClones.prototype.validateBufferAmt = function(amt) {
    var meshInstances = this.entity.model.meshInstances;
    var maxInstanceCount = this.app.graphicsDevice.supportsBoneTextures ? 1024 : this.app.graphicsDevice.boneLimit;
    var len = meshInstances.length;
    var i;
    var m;
    var pCount = 0;
    var vertexCount = 0;
    for (i =0; i < len; i++) {
        m = meshInstances[i];
        var vTest =  m.mesh.vertexBuffer.getNumVertices();
        vertexCount = vTest > vertexCount ? vTest : vertexCount;
        pCount = m.mesh.primitive[0].count > pCount ?  m.mesh.primitive[0].count : pCount;
    }
    var vLimit = Math.floor(0xFFFF / vertexCount);

    this.maxBufferAmount = Math.min(vLimit, maxInstanceCount);
    return Math.min(amt, this.maxBufferAmount);
};

// initialize code called once per entity
DynamicClones.prototype.initialize = function() {



    this.maxBufferAmount = 0;
    this.useBufferAmount = this.validateBufferAmt(this.bufferAmount);

    this.batchReps = [];
    this.entity.setPosition(0,0,0);



    //this.growth = 0;
    this.growth = this.bufferAmount;


    this.entity.model.removeModelFromLayers(this.entity.model.model);


    //this.createBatches(1);  // Math.floor(this.bufferAmount/maxBufferAmount)
    this.createExactBatches(this.bufferAmount);
    this.ready = true;
    //this.fire("ready");
    //


};



DynamicClones.prototype.createExactBatches = function(amount) {

    this.instanceIndices = new Int32Array(amount);
    var amt;
    while (amount > 0) {
        amt = amount >= this.maxBufferAmount ? this.maxBufferAmount : amount;
        this.batchReps.push(this.createBatch(amt));
        amount -= amt;
    }

    //this.createBatch(14);
   // this.batches = this.batchReps[this.batchReps.length-1];
};


DynamicClones.prototype.createBatches = function(len) {
    var i;
    for (i=this.batchReps.length; i< len; i++) {
        this.batchReps.push(this.createBatch());
    }
};


DynamicClones.prototype.grow = function(amountToAdd) {
    if (this.growth < this.useBufferAmount) {
        if (this.growth + amountToAdd <= this.useBufferAmount) return;
    }

    this.growth += amountToAdd;
    if (this.growth<= this.maxBufferAmount) {
        this.useBufferAmount = this.growth;
    } else {
        this.useBufferAmount = this.maxBufferAmount;
    }

    var lastInstanceIndices = this.instanceIndices;
    this.instanceIndices = new Int32Array(this.growth);
    this.instanceIndices.set(lastInstanceIndices, 0);

    var instanceLenSlice;
    var getPallete = function(batch) {
        return batch.meshInstance.skinInstance.matrixPalette.slice(0, instanceLenSlice);
    };
    var i;
    var len = Math.ceil(this.growth / this.maxBufferAmount);
    var oldPallettes;
    for (i=this.batchReps.length-1; i< len; i++) {
       if (this.batchReps[i]) {
           if (this.batchReps[i][0].amountBuffered < this.useBufferAmount) {
            instanceLenSlice = this.batchReps[0][0].instanceLen*16;
            oldPallettes = this.batchReps[i].map(getPallete);
            this.destroyBatch(this.batchReps[i]);
            this.batchReps[i] = this.createBatch(this.useBufferAmount, oldPallettes, this.batchReps[i][0].instanceLen);
            //console.log("Recreating...");
           }
       } else {
           this.batchReps[i] = this.createBatch(this.useBufferAmount);
        //   console.log("Creating..");
       }
    }

};



DynamicClones.prototype.spawnCloneAt2 = function(batches, idx, x, y, z) {
    var len = batches.length;
    var i;
    var b;
    var bi;
    for (i=0; i< len; i++) {
        b = batches[i];
        this.updateMatrixPaletteAtWithPos(b, idx, 0, 0, 0);
    }
};

/*
DynamicClones.prototype.spawnCloneAt = function(x, y, z, deferFinalise) {
    var len = this.batches.length;
    var i;
    var b;
    var bi;
    for (i=0; i< len; i++) {
        b = this.batches[i];
        this.setInstanceLen(b, b.instanceLen);
        this.updateMatrixPaletteAtWithPos(b, b.instanceLen, 0, 0, 0);
        b.instanceLen++;
    }

    if (!deferFinalise && this.app.graphicsDevice.supportsBoneTextures) {
        this.finaliseAllMatrixPalettes();
    }
};
*/

DynamicClones.prototype.destroyBatch = function(batches) {
    var i=  batches.length;
    while(--i >= 0) {
        this.destroyMyBatch(batches[i]);
    }
};

DynamicClones.prototype.destroyMyBatch = function (batch) {
    batch.refCounter = 0;
    var layers = this.entity.model.layers;
    for (var i = 0; i < layers.length; i++) {
        this.app.scene.layers.getLayerById(layers[i]).removeMeshInstances(batch.model.meshInstances);
    }
    batch.model.destroy();
};

DynamicClones.prototype.createBatch = function(amountToBuffer, pallettes, instanceLen) {
    amountToBuffer = amountToBuffer ? amountToBuffer : this.useBufferAmount;

    if (!instanceLen) instanceLen = 0;

    var meshInstances = this.entity.model.meshInstances;
    var len = meshInstances.length;
    var i;
    var m;
    var b;

    var batches = [];
    var boneLimitPrefix = "#define BONE_LIMIT " + this.app.graphicsDevice.getBoneLimit()+ "\n" + "#define DYNAMICBATCH\n";
    var batchMeshInstances = [];
    var dummyArrayGen = [];
    // NOTE: we assume all necessary meshInstances have been combined and each meshInstance requires a unique batch on it's own
    for (i =0; i < len; i++) {
        var lastMaterial = meshInstances[i].material;
        dummyArrayGen.length = 0;
        m = meshInstances[i];
        for (b = 0; b < amountToBuffer; b++) {
          dummyArrayGen.push(m);
        }
         var pUpdate = pc.BatchManager.prototype.update;
        pc.BatchManager.prototype.update = this.emptyFunc;
        var lastOneTest;
        batch= this.app.batcher.create(dummyArrayGen, true, Math.random());
        pc.BatchManager.prototype.update = pUpdate;
        // workaround playcanvas: we are going to remove off the batch from the Batcher's official _batchlist, and manage this batch on our own!
        this.app.batcher._batchList.splice(this.app.batcher._batchList.indexOf(batch), 1);
        // workaround properties:
        batch.pCount = m.mesh.primitive[0].count;
        batch.origMeshInstances.length = 1; // save memory
        batch.worldTransform = m.node.getWorldTransform().clone();
        batch.amountBuffered = amountToBuffer;
        // will reinstate this later for dynamic node/bone references
        batch.meshInstance.skinInstance.bones = null;
        batch.meshInstance.skinInstance.updateMatrixPalette = this.emptyFunc;
        var material = batch.meshInstance.material;
        material.chunks.transformVS = boneLimitPrefix + (lastMaterial.chunks.transformVS ? lastMaterial.chunks.transformVS : pc.shaderChunks.transformVS);// this.transformVS;
        material.chunks.skinTexVS = (lastMaterial.chunks.skinBatchTexVS ? lastMaterial.chunks.skinBatchTexVS : pc.shaderChunks.skinBatchTexVS);
        material.chunks.skinConstVS = (lastMaterial.chunks.skinBatchConstVS ? lastMaterial.chunks.skinBatchConstVS : pc.shaderChunks.skinBatchConstVS);

        batch.meshInstance.cull = false;   // culling will be handled by eternal ICuller implementation (if any)
        this.setInstanceLen(batch, instanceLen);  // batch is resziable on demand and we can update the batch matrixPalette at any index

        batches.push(batch);
        batchMeshInstances.push(batch.meshInstance);

        if (pallettes && pallettes[i]) {
            batch.meshInstance.skinInstance.matrixPalette.set(pallettes[i], 0);
        }
    }


    //
    var layers = this.entity.model.layers;

    for (i=0; i<layers.length; i++) {
        this.app.scene.layers.getLayerById(layers[i]).addMeshInstances(batchMeshInstances);
    }

    return batches;
};

DynamicClones.prototype.clearBatchRep = function(batches) {
    var b = batches.length;
	var i;
    var layers = this.entity.model.layers;
    while(--b >= 0) {
        for (i=0; i<layers.length; i++) {
            this.app.scene.layers.getLayerById(layers[i]).removeMeshInstances(batches[b].map(function(batch){return batch.meshInstance;}));
        }
    }
};

DynamicClones.prototype.getPCBoundingBox = function() {
    var meshInstances = this.entity.model.meshInstances;
    var i;
    var aabb = new pc.BoundingBox();
    var len = meshInstances.length;
    aabb.add(meshInstances[0].aabb);
    for(i =1; i < len; i++) {
     aabb.add(meshInstances[i].aabb);
    }
    return aabb;
};