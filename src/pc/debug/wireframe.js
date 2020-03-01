var Wireframe = pc.createScript('wireframe');
Wireframe.attributes.add('color', { type: 'rgba' });

// seems this method may not work for too complex meshes.. engine issue?
Wireframe.prototype.initialize = function() {
   var i=0;
   var len=  this.entity.model.model.meshInstances.length;

    this.entity.model.model.generateWireframe();
    for (i=0; i < this.entity.model.model.meshInstances.length; i++) {
      var mi = this.entity.model.model.meshInstances[i];
      mi.renderStyle = pc.RENDERSTYLE_WIREFRAME;
      mi.material = mi.material.clone();
      mi.material.diffuse.set(0,0,0,0);
      mi.material.specular.set(0,0,0,0);
      mi.material.shininess = 0;
      mi.material.emissive.set(this.color.r,this.color.g,this.color.b,this.color.a);
      mi.material.update();
  }    
   
};

// swap method called for script hot-reloading
// inherit your script state here
// Wireframe.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/