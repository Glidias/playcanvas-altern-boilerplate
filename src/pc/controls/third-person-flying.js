import Vector3D from "../../hx/jeash/geom/Vector3D";
import EllipsoidCollider from "../../hx/systems/collisions/EllipsoidCollider";
import CollisionBoundNode from "../../hx/altern/collisions/CollisionBoundNode";
import Transform3D from "../../hx/components/Transform3D";

import "./orbit-camera";

var ThirdPersonFlying = pc.createScript('thirdPersonFlying');

ThirdPersonFlying.attributes.add('entityCamera', { type: 'entity' });
ThirdPersonFlying.attributes.add('collisionSceneEntity', { type: 'entity' });
ThirdPersonFlying.attributes.add('flySpeed', { type: 'number', default:230 });
ThirdPersonFlying.attributes.add('yawEntity', { type: 'entity' });
ThirdPersonFlying.attributes.add('ellipsoidThreshold', { type: 'number', default:0.00001, min:Number.MIN_VALUE });

ThirdPersonFlying.prototype.initialize = function() {
    this.displacement = new Vector3D();
    this.source = new Vector3D();

    this.transformedVec = new pc.Vec3();

    this.collider = new EllipsoidCollider(this.entity.collision.radius, this.entity.collision.height/2, this.entity.collision.radius, this.ellipsoidThreshold, false);

     this.on('attr:ellipsoidThreshold', function (value, prev) {
        this.collider.threshold = value;
    });
};

// initialize code called once per entity
ThirdPersonFlying.prototype.postInitialize = function() {
     this.collisionScene = !this.collisionSceneEntity ? this.app.root.collisionScene || (this.app.root.children.length ? this.app.root.children[0].collisionScene : null) || ( window["Rootscene"] ? Rootscene.SCENE :  null) : this.collisionSceneEntity.collisionScene;
    //if (!this.collisionScene) console.warn("ThirdPersonFlying:: Failed to find collision scene!");
    if (this.collisionScene == null) {
        console.warn("third-person-flying: collision scene currently empty!");
        this.collisionScene = CollisionBoundNode.create(new Transform3D());
        this.app.once('collision-scene-initialized', this.onCollisionSceneInited, this);
    }
};


ThirdPersonFlying.prototype.onCollisionSceneInited = function(scene) {
    this.collisionScene = scene;
};

// update code called every frame
ThirdPersonFlying.prototype.update = function(dt) {

    var pos = this.entity.getPosition();

    // movement direction states via key presses
    var x = 0;
    var y = 0;
    var z = 0;

    // Use W-A-S-D keys to move player
    // Check for key presses
    var entRight = this.entityCamera.right;
    var entForward = this.entityCamera.forward;
    if (this.app.keyboard.isPressed(pc.KEY_A) ) {
         x -= entRight.x;
         z -= entRight.z;
    }

    if ( this.app.keyboard.isPressed(pc.KEY_D) ) {
        x += entRight.x;
        z += entRight.z;
    }

    if ( this.app.keyboard.isPressed(pc.KEY_W) ) {
        x += entForward.x;
        y += entForward.y;
        z += entForward.z;
    }

    if ( this.app.keyboard.isPressed(pc.KEY_S) ) {
        x -= entForward.x;
        y -= entForward.y;
        z -= entForward.z;
    }

 
    var gotMove = (x !== 0 || z !== 0);

    // Determine relative directional states if got entityCamera containing script orbitCamera

    this.source.x = pos.x;
    this.source.y = pos.y;
    this.source.z = pos.z;

    this.displacement.x = x * this.flySpeed * dt;
    this.displacement.y = y * this.flySpeed *  dt;
    this.displacement.z = z * this.flySpeed * dt;

    var destination = this.collider.calculateDestination(this.source, this.displacement, this.collisionScene);
    this.entity.setPosition(destination.x, destination.y, destination.z);
    
    if (gotMove && this.yawEntity ) { 
        this.yawEntity.lookAt(destination.x + x, destination.y, destination.z+z);
    }
};



