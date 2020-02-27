import CollisionBoundNode from "../../hx/altern/collisions/CollisionBoundNode";
import Transform3D from "../../hx/components/Transform3D";
import BoundBox from "../../hx/components/BoundBox";
import DBVT from "../../hx/altern/collisions/dbvt/DBVT";
import DBVTNode from "../../hx/altern/collisions/dbvt/DBVTNode";
import Geometry from "../../hx/util/geom/Geometry";
import BVHTree from "../../hx/altern/partition/js/BVHTree";
import BVH from "../../hx/bvhtree/bvh";
import AABBUtils from "../../hx/util/geom/AABBUtils";
import Vec3 from "../../hx/util/geom/Vec3";
import LibUtil from "../../hx/util/LibUtil";
import IRaycastImpl from "../../hx/altern/ray/IRaycastImpl";
import GeomCollisionSceneUtil from "../../hx/util/geom/GeomCollisionSceneUtil";

var CollisionScene = pc.createScript('collisionScene');
CollisionScene.attributes.add('bvhTrisPerNode', {type:'number',
 description:'Set this value to around 6 or higher to determine the maximum number of triangles per leaf node in a triMesh. Usually i reccomend not more than 16 per node in general.',
 default:12, min:6, precision:1 });

CollisionScene.TYPE_PLAYCANVAS_TAGGED = 0;
CollisionScene.TYPE_DBVT = 1;
CollisionScene.TYPE_BVHTREE = 2;
CollisionScene.TYPE_NONE = -1;

CollisionScene.attributes.add('sceneGenType', { type:'number',  default: CollisionScene.TYPE_PLAYCANVAS_TAGGED,
  description: "Construct entire collision scene using one of the following implementations from your Playcanvas Scene (or 'None', if you wish not to process anything in your scenegraph)",
    enum:[
  { 'Playcanvas SceneGraph Tagged': CollisionScene.TYPE_PLAYCANVAS_TAGGED },
  { 'Dynamic Bounding Volume Tree': CollisionScene.TYPE_DBVT },
  { 'None': CollisionScene.TYPE_NONE },
  //{ 'Static BVHTree Single Trimesh': CollisionScene.TYPE_BVHTREE }
  ] });

CollisionScene.attributes.add('recastCLIEnable', {type:'boolean', default:false, description: 'Check this box to connect to your RecastCLI Server to generate navmesh of collisions from your Playcanvas scene graph at runtime!'});
CollisionScene.attributes.add('recastCLIServer', {type:'string', description:'The websocket server path to use', default:'ws://localhost:9090/'});
CollisionScene.attributes.add('recastCLIEntity', {type:'entity', description:'The entity reference that holds the recastCli Settings'});
CollisionScene.attributes.add('recastNoStream', { type:'boolean', description: 'Check this box to quickly force-send all geometry data to RecastCLI websocket server without streaming. Might have issues on some browsers (like Firefox).'});


CollisionScene.getAltTransform = function(lt, t) {
    lt = lt.data;
    t = t ? t : new Transform3D();
    t.a = lt[0]; t.b = lt[4]; t.c = lt[8];  t.d = lt[12];
    t.e = lt[1]; t.f = lt[5]; t.g = lt[9]; t.h = lt[13];
    t.i = lt[2]; t.j = lt[6]; t.k = lt[10];  t.l = lt[14];
    return t;
};

CollisionScene.getWavefrontStr = function(geometry) {
    var i;
    var len;
    var v;
    var str = "";
    len = geometry.vertices.length;
    for (i=0; i<len; i+=3) {
        str += "v " + geometry.vertices[i] + " " + geometry.vertices[i+1] + " " + geometry.vertices[i+2] + "\n";
    }
    len = geometry.indices.length;
    for (i=0; i<len; i+=3) {
        str += "f " + (geometry.indices[i]+1) + " " + (geometry.indices[i+1]+1) + " " + (geometry.indices[i+2]+1) + "\n";
    }
    return str;
};

CollisionScene.MODEL_ENTRIES = {};
CollisionScene.MODEL_GEOM_ENTRIES = {};

CollisionScene.getScaleCompensation = function(ent, v, rootEnt) {
    var r = ent;
    v = v || new pc.Vec3(1,1,1);
    while( (r=r.parent) && r!==rootEnt ) {
        var scaleChk = r.getLocalScale();
         if (scaleChk.x === 0 || scaleChk.y === 0 || scaleChk.z === 0  ) {
            console.error("Detected scale zero in collision hierachy. Scale compensation will halt!");
             v.x = 1;
             v.y = 1;
             v.z = 1;
             return v;
        }
        v.x /= scaleChk.x;
        v.y /= scaleChk.y;
        v.z /= scaleChk.z;

    }
    return v;
};

CollisionScene.prototype.getScaleFromCollision = function(collision) {

    switch( collision.type) {
        case "box":
            return new pc.Vec3(collision.halfExtents.x*2, collision.halfExtents.y*2, collision.halfExtents.z*2);
        case "cylinder":
          return new pc.Vec3(collision.radius*2, collision.height, collision.radius*2);
        case "capsule":
          return new pc.Vec3(collision.radius*2, collision.height*0.5, collision.radius*2);
        case "sphere":
            return new pc.Vec3(collision.radius*2, collision.radius*2, collision.radius*2);
        default:
            console.warn("Could not find collision primitive transform type for:"+collision.type);
    }
    return new pc.Vec3(1,1,1);
};

CollisionScene.prototype.getAltTransformFromCollision = function(collision, t, sx, sy, sz) {
    sx = sx ? sx : 1;
    sy = sy ? sy : 1;
    sz = sz ? sz : 1;
    t = t ? t : new Transform3D();
    switch( collision.type) {
        case "box":
             t.compose(0,0,0, 0,0,0, collision.halfExtents.x*2*sx, collision.halfExtents.y*2*sy, collision.halfExtents.z*2*sz);
        break;
        case "cylinder":
           t.compose(0,0,0, 0,0,0, collision.radius*2*sx, collision.height*sy, collision.radius*2*sz);
        break;
        case "capsule":
           t.compose(0,0,0, 0,0,0, collision.radius*2*sx, collision.height*0.5*sy, collision.radius*2*sz);
        break;
        case "sphere":
            t.compose(0,0,0, 0,0,0, collision.radius*2*sx, collision.radius*2*sy, collision.radius*2*sz);
        break;
        default:
            console.warn("Could not find collision primitive transform type for:"+collision.type);
    }
    return t;
};

CollisionScene.prototype.getBoundsFromCollision = function(collision, t) {
    t = t ? t : new BoundBox();
    switch( collision.type) {
        case "box":
        case "cylinder":
        case "sphere":
            t.minX = -0.5; t.minY = -0.5; t.minZ = -0.5;
            t.maxX = 0.5; t.maxY = 0.5; t.maxZ = 0.5;
        break;

        case "capsule":
           t.minX = -0.5; t.minY = -1; t.minZ = -0.5;
            t.maxX = 0.5; t.maxY = 1; t.maxZ = 0.5;
        break;
        default:
            console.warn("Could not find collision primitive transform type for:"+collision.type);
    }
    return t;
};

CollisionScene.prototype.getBoxGeom = function() {
    return CollisionScene.box || (CollisionScene.box= this.getAltGeometryFromMesh(pc.createBox(this.app.graphicsDevice, { halfExtents: new pc.Vec3(0.5,0.5,0.5)} )));
} ;
CollisionScene.prototype.getPlaneGeom = function() {
    return CollisionScene.plane || (CollisionScene.plane= this.getAltGeometryFromMesh(pc.createPlane(this.app.graphicsDevice, { halfExtents: new pc.Vec3(0.5,0.5,0.5)} )));
} ;
CollisionScene.prototype.getCylinderGeom = function() {
    return CollisionScene.cylinder || (CollisionScene.cylinder= this.getAltGeometryFromMesh(pc.createCylinder(this.app.graphicsDevice, {radius:0.5, height:1})));
};
CollisionScene.prototype.getSphereGeom = function() {
    return CollisionScene.sphere || (CollisionScene.sphere= this.getAltGeometryFromMesh(pc.createSphere(this.app.graphicsDevice, {radius:0.5} )));
};
CollisionScene.prototype.getCapsuleGeom = function() {
    return CollisionScene.capsule || (CollisionScene.capsule= this.getAltGeometryFromMesh(pc.createCapsule(this.app.graphicsDevice, {radius:0.5, height:2} )));
};

CollisionScene.prototype.getCollidableFromEntity = function(entity) {
    var model;
    if (entity.script && entity.script.staticModelBody && entity.script.staticModelBody.enabled) {
        model = (entity.script.staticModelBody.model ? entity.script.staticModelBody.model.resource : null) || (entity.model ? entity.model.model : null);
        if (model !== null) {
            if ( (entity.script.staticModelBody.model ? entity.script.staticModelBody.model.resource : null) === null) {
                console.log("CollisionScene:: "+entity.name+". Could not find staticModelBody.collision model from script asset, using render model instead.");
            }
            return this.getCollidableEntryFromModel(model, entity.script.staticModelBody ? entity.script.staticModelBody.filteredIndexList : null,  entity.script.staticModelBody.model);
        } else {
            console.warn("CollisionScene:: "+entity.name+". Could not find collision model from staticModelBody or model from entity itself!");
        }
    }
    if (entity.collision) {
        return this.getCollidableFromCollision(entity.collision, entity);
    }
    return null;
};

CollisionScene.prototype.getAllCollideGeometryFromEntity = function(entity) {
    if (entity.script && entity.script.staticModelBody && entity.script.staticModelBody.enabled) {
        model = (entity.script.staticModelBody.model ? entity.script.staticModelBody.model.resource : null) || (entity.model ? entity.model.model : null);
        if (model !== null) {
            if ( (entity.script.staticModelBody.model ? entity.script.staticModelBody.model.resource : null) === null) {
                console.log("CollisionScene:: "+entity.name+". Could not find staticModelBody.collision model from script asset, using render model instead.");
            }
            return this.getAltGeometryFromModel(model, entity.script.staticModelBody ? entity.script.staticModelBody.filteredIndexList : null,  entity.script.staticModelBody.model);
        } else {
            console.warn("CollisionScene:: "+entity.name+". Could not find collision model from staticModelBody or model from entity itself!");
        }
    }
    if (entity.collision) {
        if (entity.collision.type !== "mesh") {
            // warning: Primitive case, assumed this function will return plain Geometry for this case! (might change in future)
            return this.getCollidableFromCollision(entity.collision, entity);
        }
        else {  // Mesh collision case, assumed either return BVHTree or plain Geometry
            var geomModel;
            if (!entity.collision.model) {
                if (!entity.collision.asset || !this.app.assets.get(entity.collision.asset).loaded) {
                    console.warn("Could not find collision model. Currently not yet supported non-preloaded collision model assets");
                    return null;
                }
                else {
                    console.warn("Could not find supplied model asset ");
                    return null;
                }
            }
            if (entity.collision.asset && CollisionScene.MODEL_GEOM_ENTRIES[entity.collision.asset]) {
                return CollisionScene.MODEL_GEOM_ENTRIES[entity.collision.asset];
            }

            geomModel = this.getAltGeometryFromModel(entity.collision.model);
            if (entity.collision.asset) {
                CollisionScene.MODEL_GEOM_ENTRIES[entity.collision.asset] = geomModel;
            }
            return geomModel;
        }
    }
    return null;
};

CollisionScene.prototype.isCollisionPrim = function(entity) {
  var model;
    if (entity.script && entity.script.staticModelBody && entity.script.staticModelBody.enabled) {
        model = (entity.script.staticModelBody.model ? entity.script.staticModelBody.model.resource : null) || (entity.model ? entity.model.model : null);
        if (model !== null) {
            if ( (entity.script.staticModelBody.model ? entity.script.staticModelBody.model.resource : null) === null) {
                return false;
            }
        }
    }
    if (entity.collision && entity.collision.type!=="mesh") {
        return true;
    }
    return false;
};

CollisionScene.prototype.getCollidableFromCollision = function(collision, entity) {
  if (collision.type === "box") {
     return this.getBoxGeom();
  }
else if (collision.type==="cylinder") {
     return this.getCylinderGeom();
  }
  else if (collision.type==="sphere") {
      return this.getSphereGeom();
  }
else if (collision.type==="capsule") {
    return this.getCapsuleGeom();
}
else if (collision.type==="mesh") {
    if (!collision.model && !collision.asset) {
        if (entity && entity.model && entity.model.type === "plane") {
            return this.getPlaneGeom();
        }
        if (!collision.asset || !this.app.assets.get(collision.asset).loaded ) {
            console.warn("Could not find collision model. Currently not yet supported non-preloaded collision model assets");
            return null;
        }
        else {
            console.warn("Could not find supplied model asset ");
            return null;
        }
    }
    return this.getCollidableEntryFromModel(collision.model, null, collision.asset);
}
else {
    console.warn("CollisionScene:: Could not find matching collision type!:"+collision.type);
}
    return null;
};

CollisionScene.prototype.exceedPolies = function(model) {
    var limit = Math.ceil(this.bvhTrisPerNode*1.6);
    var meshInstances = model.meshInstances;
    var i = meshInstances.length;
    var count = 0;
    while(--i > -1) {
        var mesh = meshInstances[i].mesh;
    count += mesh.indexBuffer ?
        mesh.indexBuffer[pc.RENDERSTYLE_SOLID].getNumIndices() / 3 :
        mesh.vertexBuffer.getNumVertices() / 3;
        if (count > limit) return true;
    }
    return false;
};

CollisionScene.prototype.getCollidableEntryFromModel = function(model, filteredIndexList, asset, alwaysUseBVHTree) {
    if (asset) {
        if (CollisionScene.MODEL_ENTRIES[asset]) {
            this._entryBounds = CollisionScene.MODEL_ENTRIES[asset].bounds;
            return CollisionScene.MODEL_ENTRIES[asset].collidable;
        }
    }

    this._entryBounds = new BoundBox();
    this._entryBounds.cached = true;

    var collidable = this.exceedPolies(model) || alwaysUseBVHTree ? (this.getBVHTreeFromModel(model, filteredIndexList, this._entryBounds) || this.getAltGeometryFromModel(model, filteredIndexList, this._entryBounds) ) :
        this.getAltGeometryFromModel(model, filteredIndexList, this._entryBounds);

    if (collidable) {
        if (asset) {
            CollisionScene.MODEL_ENTRIES[asset] = {
              collidable: collidable,
              bounds: this._entryBounds
            };
        }
    } else {
        this._entryBounds = null;
    }
    return collidable;
};

CollisionScene.prototype.getAltGeometryFromModel = function(model, filteredIndexList) {
    var meshInstances = model.meshInstances;
    var i;
    var geom = new Geometry();
    var myVertices = [];
    var myIndices = [];
    var m;
    var t = new Transform3D();
    var tt = new Transform3D();
    var r;
    var len = filteredIndexList ? filteredIndexList.length : meshInstances.length;
    for (i=0; i< len; i++) {
        m = filteredIndexList ? meshInstances[filteredIndexList[i]] : meshInstances[i];
        CollisionScene.getAltTransform(m.node.getLocalTransform(), t);
        r = m.node;
        while( (r=r.parent) && !(r instanceof pc.Entity) ) {
            t.append( CollisionScene.getAltTransform(r.getLocalTransform(), tt) );
         }
        this.collectAltGeometryFromMesh(m.mesh, t, this._entryBounds, myVertices.length, myIndices.length, myVertices, myIndices );
    }
    geom.setVertices(myVertices);
    geom.setIndices(myIndices);
    return geom;
};

CollisionScene.prototype.getBVHTreeFromModel = function(model, filteredIndexList) {
    if (!window.bvhtree) {
       console.warn("window.bvhtree package missing? We reccomend it for better mesh collision performance!");
       return null;
    }
    var meshInstances = model.meshInstances;
    var i;
    var m;
    var t = new Transform3D();
    var tt = new Transform3D();
    var r;
    var triangles = [];
    var len = filteredIndexList ? filteredIndexList.length : meshInstances.length;
    for (i=0; i< len; i++) {
        m = filteredIndexList ? meshInstances[filteredIndexList[i]] : meshInstances[i];
        CollisionScene.getAltTransform(m.node.getLocalTransform(), t);
        r = m.node;
        while( (r=r.parent) && !(r instanceof pc.Entity) ) {
            t.append( CollisionScene.getAltTransform(r.getLocalTransform(), tt) );
         }
        this.addMeshToTris(triangles, m.mesh, t, this._entryBounds);
    }
    return new BVHTree( new bvhtree.BVH(triangles, 12) );
};
CollisionScene.prototype.getAltGeometryFromMesh = function(mesh, transform, boundBox) {
    var geom = new Geometry();
    var myVertices = [];
    var myIndices = [];
    this.collectAltGeometryFromMesh(mesh, transform, boundBox, 0, 0, myVertices, myIndices);
    geom.setVertices(myVertices);
    geom.setIndices(myIndices);
    return geom;
};

CollisionScene.prototype.collectAltGeometryFromMesh = function(mesh, transform, boundBox, vi, ii, myVertices, myIndices) {
    var baseI = vi/3;

    var t= transform;

    var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
    var vb = mesh.vertexBuffer;

    var format = vb.getFormat();
    var stride = format.size / 4;
    var positions;
    for (let j = 0; j < format.elements.length; j++) {
        var element = format.elements[j];
        if (element.name === pc.SEMANTIC_POSITION) {
            positions = new Float32Array(vb.lock(), element.offset);
        }
    }

    var indices = new Uint16Array(ib.lock());
    var numTriangles = mesh.primitive[0].count / 3;

    var i1, i2, i3;
    var x; var y; var z;
    var px; var py; var pz;

    var base = mesh.primitive[0].base;

   for (let j =0; j< positions.length; j+=stride) {
       px = positions[j];
       py = positions[j+1];
       pz = positions[j+2];
       if (t) {
          x = px; y=py; z=pz;
          px= t.a * x + t.b * y + t.c * z + t.d;
          py = t.e * x + t.f * y + t.g * z + t.h;
          pz= t.i * x + t.j * y + t.k * z + t.l;
       }
       if (boundBox) {
           AABBUtils.expand(px,py,pz,boundBox);
       }
       myVertices[vi++] = px;  myVertices[vi++] = py;  myVertices[vi++] = pz;
   }

     for (let j = 0; j < numTriangles; j++) {
        i1 = indices[base + j * 3];
        i2 = indices[base + j * 3 + 1];
        i3 = indices[base + j * 3 + 2];
        myIndices[ii++] = baseI + i1;  myIndices[ii++] = baseI + i2;  myIndices[ii++] = baseI + i3;
     }
};

CollisionScene.prototype.addMeshToTris = function(triangles, mesh, transform, boundBox) {
    var t = transform;

                    var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
                    var vb = mesh.vertexBuffer;

                    var format = vb.getFormat();
                    var stride = format.size / 4;
                    var positions;
                    for (let j = 0; j < format.elements.length; j++) {
                        var element = format.elements[j];
                        if (element.name === pc.SEMANTIC_POSITION) {
                            positions = new Float32Array(vb.lock(), element.offset);
                        }
                    }

                    var indices = new Uint16Array(ib.lock());
                    var numTriangles = mesh.primitive[0].count / 3;


                    var i1, i2, i3;
                    var x; var y; var z;

                    var base = mesh.primitive[0].base;
                        var ent;

                    if (boundBox) {
                       for (let j =0; j< positions.length; j+=stride) {
                           x = positions[j];
                           y = positions[j+1];
                           z = positions[j+2];
                           AABBUtils.expand(
                            t.a * x + t.b * y + t.c * z + t.d,
                            t.e * x + t.f * y + t.g * z + t.h,
                            t.i * x + t.j * y + t.k * z + t.l,
                           boundBox);
                       }
                    }

                    for (let j = 0; j < numTriangles; j++) {
                        i1 = indices[base + j * 3] * stride;
                        i2 = indices[base + j * 3 + 1] * stride;
                        i3 = indices[base + j * 3 + 2] * stride;
                        var v1 = new Vec3(positions[i1], positions[i1 + 1], positions[i1 + 2]);
                        var v2 = new Vec3(positions[i2], positions[i2 + 1], positions[i2 + 2]);
                        var v3 = new Vec3(positions[i3], positions[i3 + 1], positions[i3 + 2]);

                        var v = v1;

                        x = v.x; y = v.y; z = v.z;
                        v.x = t.a * x + t.b * y + t.c * z + t.d;
                        v.y = t.e * x + t.f * y + t.g * z + t.h;
                        v.z = t.i * x + t.j * y + t.k * z + t.l;

                        v = v2;
                        x = v.x; y = v.y; z = v.z;
                         v.x = t.a * x + t.b * y + t.c * z + t.d;
                        v.y = t.e * x + t.f * y + t.g * z + t.h;
                        v.z = t.i * x + t.j * y + t.k * z + t.l;

                        v = v3;
                        x = v.x; y = v.y; z = v.z;
                        v.x = t.a * x + t.b * y + t.c * z + t.d;
                        v.y = t.e * x + t.f * y + t.g * z + t.h;
                        v.z = t.i * x + t.j * y + t.k * z + t.l;

                        triangles.push([v1,v2,v3]);
                    }
};
CollisionScene.DEG_TO_RAD = Math.PI / 180;

CollisionScene.prototype.initialize = function() {

    this.node = CollisionBoundNode.create( new Transform3D() );
    this.entity.collisionScene = this.node;
    this.node.name = this.entity.name;


};

CollisionScene.prototype.postInitialize = function() {
   if (this.sceneGenType === CollisionScene.TYPE_PLAYCANVAS_TAGGED) this.initPlaycanvasTagged();
   else if (this.sceneGenType === CollisionScene.TYPE_DBVT) this.initDBVT();
   else  this.initPlaycanvasTagged();

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    if (!getParameterByName("debug") && window.location.protocol === "https:") {
        this.recastCLIEnable = false;
    }

    if (this.recastCLIEnable) {
        this.initRecastData();
        this.connectRecastCLI();
    }

     this.app.fire('collision-scene-initialized', this.node);
};

CollisionScene.prototype.initDBVT = function() {
    var collidable;


    var tree = new DBVT();
    this.entity.dbvt = tree;

     var list = this.entity.find(function(e) {

        //
        return e.enabled  && !e.tags.has("dynamic") && (((e.script && e.script.staticModelBody) || e.collision )  );
    });

    var boundBox;

    var i;
   var e;
    var len = list.length;
    var r;
    var t;
    var n;
    var tt = new Transform3D();
    var scc = new pc.Vec3();
    var DEG_TO_RAD = CollisionScene.DEG_TO_RAD;

    for (i=0; i<len;i++) {
        e = list[i];
        r = e;
        var isPrim;
        var tarName =  e.name !== "!c" && e.name !== "c" && e.name != "c!" ? e.name : e.parent.name;
        var primBounds;

        if ((isPrim=this.isCollisionPrim(r))) {

            var sc =  this.getScaleFromCollision(e.collision);
            var scr = e.getLocalScale();
            var scaleComp = CollisionScene.getScaleCompensation(e, null, this.entity);
            primBounds = this.getBoundsFromCollision(e.collision);

            scc.x = sc.x * scaleComp.x;
            scc.y = sc.y * scaleComp.y;
            scc.z = sc.z * scaleComp.z;

            var cp = e.getLocalPosition();
            var cr = e.getLocalTransform().getEulerAngles();
            t = new Transform3D();
            t.compose(cp.x, cp.y, cp.z, cr.x*DEG_TO_RAD, cr.y*DEG_TO_RAD, cr.z*DEG_TO_RAD, scc.x, scc.y, scc.z);

             while( (r=r.parent)  && r!==this.entity ) {
                 CollisionScene.getAltTransform(r.getLocalTransform(), tt);
                 t.append(tt);
            }
           // */
        } else {
            t = CollisionScene.getAltTransform(r.getLocalTransform());
             while( (r=r.parent)  && r!==this.entity ) {
             CollisionScene.getAltTransform(r.getLocalTransform(), tt);
             t.append(tt);
            }
        }

        if (!r || r===e) {
            alert("CollisionScene:: null or invalid r exception. SHould not be!!:"+r);
            r = this.entity;
        }

        // supply boundBox if !isPrim
        collidable = this.getCollidableFromEntity(e);
        //console.log("Adding collision:"+tarName + " : "+collidable);

        boundBox = null;
        if (isPrim) {
            // supply boundbox of collision primitiuve
            boundBox = primBounds;
        }
        else {
            if (collidable && this._entryBounds) {
                boundBox = this._entryBounds;
            }
        }

        if (boundBox) {
            var aabb = new BoundBox();
            AABBUtils.match(aabb, boundBox);
            AABBUtils.transform(aabb, t);
            boundBox = aabb;

            //AABBUtils.setToMax(aabb);
        }

        if (collidable) {
            if (boundBox) {
                tree.insertLeaf(DBVTNode.createFrom(collidable, boundBox, t));
            }
            else {
                alert("Failed to find bounding box for :"+tarName);
            }
        }
     }

    this.node.collidable = tree;
    this.node.raycastable = LibUtil.as(tree, IRaycastImpl);

};

CollisionScene.prototype.initPlaycanvasTagged = function() {
   //this.getAltTransform(this.entity.getLocalTransform())

   // this.entity.model.type
    var collidable;
    if ( (collidable = this.getCollidableFromEntity(this.entity)) ) {
        if (!this.entity.tags.has("noCollide")) this.node.collidable = collidable;
        if (!this.entity.tags.has("noRaycast")) this.node.raycastable = LibUtil.as(collidable, IRaycastImpl);
    }
    var guidNodes = {};
    guidNodes[this.entity._guid] = this.node;

    var guids = {};
    var list = this.entity.find(function(e) {

        //
        return e.enabled  && !e.tags.has("dynamic") && (((e.script && e.script.staticModelBody) || e.collision || e.tags.has("collisionBoundNode"))  );
    });
    var i;
    var e;
    var vc = 0;
    var len = list.length;
    var r;
    var t;
    var n;
    var tt = new Transform3D();
    var scc = new pc.Vec3();
    var DEG_TO_RAD = CollisionScene.DEG_TO_RAD;

    for (i=0; i<len;i++) {
        e = list[i];
        guids[e._guid] = true;
    }
      for (i=0; i<len;i++) {
        e = list[i];
        r = e;
        var isPrim;
        var tarName =  e.name !== "!c" && e.name !== "c" && e.name != "c!" ? e.name : e.parent.name;
        var primBounds;

        if ((isPrim=this.isCollisionPrim(r))) {

            var sc =  this.getScaleFromCollision(e.collision);
            var scr = e.getLocalScale();
            var scaleComp = CollisionScene.getScaleCompensation(e, null, this.entity);
            primBounds = this.getBoundsFromCollision(e.collision);

            // try out this method
             /*
           sc.x *= scr.x;
            sc.y *= scr.y;
            sc.z *= scr.z;

            scc.x = sc.x * scaleComp.x;
            scc.y = sc.y * scaleComp.y;
            scc.z = sc.z * scaleComp.z;

            var cp = e.getPosition();
            var cr = e.getRotation();
            t = new Transform3D();
            var mat4 = new pc.Mat4();
            mat4.setTRS(cp, cr, scc);
            CollisionScene.getAltTransform(mat4, t);

             while( (r=r.parent) && !guids[r._guid] && r!==this.entity ) {

             }
            */

         //  /*
            // collision primitives doesn't ignore local scale, but ignores all parent scales

            scc.x = sc.x * scaleComp.x;
            scc.y = sc.y * scaleComp.y;
            scc.z = sc.z * scaleComp.z;

            var cp = e.getLocalPosition();
            var cr = e.getLocalTransform().getEulerAngles();
            t = new Transform3D();
            t.compose(cp.x, cp.y, cp.z, cr.x*DEG_TO_RAD, cr.y*DEG_TO_RAD, cr.z*DEG_TO_RAD, scc.x, scc.y, scc.z);

             while( (r=r.parent) && !guids[r._guid] && r!==this.entity ) {
                 CollisionScene.getAltTransform(r.getLocalTransform(), tt);
                 t.append(tt);
            }
           // */
        } else {
            t = CollisionScene.getAltTransform(r.getLocalTransform());
             while( (r=r.parent) && !guids[r._guid] && r!==this.entity ) {
             CollisionScene.getAltTransform(r.getLocalTransform(), tt);
             t.append(tt);
            }
        }

        guidNodes[e._guid] = n = CollisionBoundNode.create(t);
        e.collisionNode = n;
        if (!r || r===e) {
            alert("CollisionScene:: null or invalid r exception. SHould not be!!:"+r);
            r = this.entity;
        }
        guids[e._guid] = r._guid;

        n.name = tarName;

        // supply boundBox if !isPrim
        collidable = this.getCollidableFromEntity(e);
        //console.log("Adding collision:"+tarName + " : "+collidable);
        if (isPrim) {
            // supply boundbox of collision primitiuve
            n.boundBox = primBounds;
        }
        else {
            if (collidable && this._entryBounds) {
                n.boundBox = this._entryBounds;
            }
        }
        if (collidable) {
            if (!e.tags.has("noCollide")) n.collidable = collidable;
            if (!e.tags.has("noRaycast")) n.raycastable = LibUtil.as(collidable, IRaycastImpl);
        }

        if (!n.boundBox) n.boundBox = new BoundBox();

     }

     for (i=0; i<len;i++) {
         e = list[i];
         guidNodes[guids[e._guid]].addChild(guidNodes[e._guid]);
     }

    // bubble up to expand bounding boxes?
    this.node.boundBox = new BoundBox();

    ///*
    tt = new Transform3D();
    var lastNode;
    for (i=0; i< len; i++) {
        n = guidNodes[list[i]._guid];
        r = n;
        lastNode = n;
        while( (r=r._parent) ) {
            if (!r.boundBox) continue;
            if (r.boundBox.cached) {
              t = new BoundBox();
              AABBUtils.match(t, r.boundBox);
              r.boundBox = t;
            }
            AABBUtils.match(tt, lastNode.boundBox);
            AABBUtils.transform(tt, lastNode.transform);

            GeomCollisionSceneUtil.updateBounds(r.boundBox, tt);
            lastNode = r;
        }

    }
   // */
   // */
   // lousy function..doesnt work the way i want it to be.
    //GeomCollisionSceneUtil.calculateHierarchyBoundBox(this.node, this.node, this.node.boundBox);
    /*
    for (i=0; i< len; i++) {
        n = guidNodes[list[i]._guid];
        console.log(n.name + " :"+n.collidable);
        console.log(n.boundBox);
    }
    */
    // console.log(this.node);
    console.log("Playcanvas SceneGraph Tagged:: Successfully created root scene collision bound node!");
};

CollisionScene.prototype.getRecastCLIParams = function(asObject) {
  if (this.recastCLIParams) return this.recastCLIParams;
    var scriptRef = null;
    if (this.recastCLIEntity) {
        scriptRef = this.recastCLIEntity.script.recastCli;
    }
    else {
        scriptRef = this.entity.script.recastCli;
    }
    if (!scriptRef) {

        return null;
    }
    this.recastCLIParams = scriptRef.getParams(asObject);
    return this.recastCLIParams;
};



CollisionScene.prototype.initRecastData = function(noCLI) {

    if (!noCLI) {
        this.getRecastCLIParams();
        if (!this.recastCLIParams) {
            alert("Could not find recastCli settings script! RecastCLI will NOT run for: "+this.entity.name);
            return;
        }
    }

    var list = this.entity.find(function(e) {
        //
        return e.enabled  && !e.tags.has("dynamic") && (((e.script && e.script.staticModelBody) || e.collision )  );
    });


    var i;
    var e;
    var len = list.length;
    var r;
    var t;
    var n;
    var tt = new Transform3D();
    var scc = new pc.Vec3();
    var DEG_TO_RAD = CollisionScene.DEG_TO_RAD;
    var geometry;
    var indices = [];
    var vertices = [];
    var vc = 0;
    var ic = 0;
    var indicesOffset = 0;

    for (i=0; i<len;i++) {
        e = list[i];
        r = e;
        var isPrim;
        var tarName =  e.name !== "!c" && e.name !== "c" && e.name != "c!" ? e.name : e.parent.name;

        if ((isPrim=this.isCollisionPrim(r))) {

            var sc =  this.getScaleFromCollision(e.collision);
            var scr = e.getLocalScale();
            var scaleComp = CollisionScene.getScaleCompensation(e, null, this.entity);

            scc.x = sc.x * scaleComp.x;
            scc.y = sc.y * scaleComp.y;
            scc.z = sc.z * scaleComp.z;

            var cp = e.getLocalPosition();
            var cr = e.getLocalTransform().getEulerAngles();
            t = new Transform3D();
            t.compose(cp.x, cp.y, cp.z, cr.x*DEG_TO_RAD, cr.y*DEG_TO_RAD, cr.z*DEG_TO_RAD, scc.x, scc.y, scc.z);

             while( (r=r.parent)  && r!==this.entity ) {
                 CollisionScene.getAltTransform(r.getLocalTransform(), tt);
                 t.append(tt);
            }
           // */
        } else {
            t = CollisionScene.getAltTransform(r.getLocalTransform());
             while( (r=r.parent)  && r!==this.entity ) {
             CollisionScene.getAltTransform(r.getLocalTransform(), tt);
             t.append(tt);
            }
        }

        if (!r || r===e) {
            alert("CollisionScene:: null or invalid r exception. SHould not be!!:"+r);
            r = this.entity;
        }

        geometry = this.getAllCollideGeometryFromEntity(e);
        //console.log("Adding collision:"+tarName + " : "+collidable);
        if (geometry) {

            var v;
            var vLen;
            vLen = geometry.indices.length;
            for (v=0; v <vLen; v+=3) {
                indices[ic++] = indicesOffset + geometry.indices[v];
                indices[ic++] = indicesOffset + geometry.indices[v+1];
                indices[ic++] = indicesOffset + geometry.indices[v+2];
            }
            indicesOffset += geometry.vertices.length / 3;

            var x;
            var y;
            var z;
            vLen = geometry.vertices.length;
            for (v=0; v <vLen; v+=3) {
               x = geometry.vertices[v];
               y = geometry.vertices[v+1];
               z = geometry.vertices[v+2];
               vertices[vc++] =  (t.a * x + t.b * y + t.c * z + t.d);
               vertices[vc++] =  (t.e * x + t.f * y + t.g * z + t.h);
               vertices[vc++] =  (t.i * x + t.j * y + t.k * z + t.l);
            }
        }

     }


    CollisionScene.MODEL_GEOM_ENTRIES = {};  // purge memory cache

    if (noCLI) {
        geometry = new Geometry();
        geometry.setVertices(vertices);
        geometry.setIndices(indices);
        return geometry;
    }


    var typedArr = new Float32Array(this.recastCLIParams.length + 2+indices.length+vertices.length);
    len = this.recastCLIParams.length;
    for (i=0; i < len; i++) {
        typedArr[i] = this.recastCLIParams[i];
    }
    typedArr[this.recastCLIParams.length] = vertices.length / 3;
    typedArr[this.recastCLIParams.length+1] = indices.length / 3;
    vc = this.recastCLIParams.length + 2;

    len = vertices.length;
    for (i=0; i<len; i+=3) {
        typedArr[vc++] = vertices[i];
        typedArr[vc++] = vertices[i+1];
        typedArr[vc++] = vertices[i+2];
    }

    len = indices.length;
    for (i=0; i<len; i+=3) {
        typedArr[vc++] = indices[i];
        typedArr[vc++] = indices[i+1];
        typedArr[vc++] = indices[i+2];
    }

    this.recastCLIPacket = typedArr;
    console.log("Created RecastCLI packet..." + typedArr[this.recastCLIParams.length] + " vertices, "+typedArr[this.recastCLIParams.length + 1] + " triangles. " + (typedArr.length*4)+" bytes.");
    //console.log(this.recastCLIPacket);
    return geometry;
};

CollisionScene.prototype.connectRecastCLI = function() {
    var context = this;

    CollisionScene.RecastCLI.socket = new WebSocket("ws://localhost:9090/");
    CollisionScene.RecastCLI.socket.binaryType = "arraybuffer";
    CollisionScene.RecastCLI.socket.addEventListener('open', function(){
        console.log("Connected to the RecastCLI server!");
        CollisionScene.RecastCLI.connected = true;
        context.sendRecastCLI();
    });

    CollisionScene.RecastCLI.socket.addEventListener('message', function(message){

    });

    CollisionScene.RecastCLI.socket.addEventListener('close', function(){
        console.log('RecastCLI Server Connection closed');
        alert(CollisionScene.RecastCLI.connected ? 'RecastCLI Server Connection closed' : 'RecastCLI Server Connection Failed to Connect');
    });

};

CollisionScene.prototype.sendRecastCLI = function() {
    if (this.recastCLIPacket && CollisionScene.RecastCLI.connected) {
        var useStreaming = this.recastCLIPacket.length * 4 > 65536 && !this.recastNoStream;

        var data;

        if (!useStreaming) {
            data = this.recastCLIPacket.buffer; //new Float32Array([this.recastCLIPacket[0],this.recastCLIPacket[1]]).buffer;
            CollisionScene.RecastCLI.Send(data);
            console.log("Sending entire recastCLIPacket...");
        }
        else {
            data = new Float32Array([-this.recastCLIPacket.length]).buffer;
            this.recastCLIPacketStream = {
              progress: 0,
              packet: this.recastCLIPacket
            };
            console.log("Preparing recastCLIPacketStream...");
            CollisionScene.RecastCLI.Send(data);
            setTimeout(this.sendRecastCLIStream.bind(this), 200);
        }
        this.recastCLIPacket = null;
    }

};

CollisionScene.prototype.sendRecastCLIStream = function() {
    if ( this.recastCLIPacketStream ) {
        var curProgress = this.recastCLIPacketStream.progress;
        var lenAmount = 16384; //65536/4;
        CollisionScene.RecastCLI.Send( this.recastCLIPacketStream.packet.slice( curProgress, curProgress + lenAmount).buffer );

        curProgress += lenAmount;
        this.recastCLIPacketStream.progress = curProgress;
        if (curProgress >= this.recastCLIPacketStream.packet.length ) {
            this.recastCLIPacketStream = null;
            console.log("recastCLIPacketStream completed!");
        }
        else {
            setTimeout(this.sendRecastCLIStream.bind(this), 200);
        }

    }
};

CollisionScene.RecastCLI = {
    Send: function(data) {
        CollisionScene.RecastCLI.socket.send(data);
    },
    connected: false
};