import Vector3D from "../../hx/jeash/geom/Vector3D";
import MoveResult from "../../hx/components/MoveResult";
import EllipsoidCollider from "../../hx/systems/collisions/EllipsoidCollider";
import CollisionBoundNode from "../../hx/altern/collisions/CollisionBoundNode";

/**
 * Simplified surface movement relying on external supplied velocity
 * without calculating exact collision ground normal value for relatively stable movement.
 * ground movement.
 */
var SurfaceMovement = pc.createScript('surfaceMovement');

SurfaceMovement.attributes.add('gravForce', { type: 'number', default:0.5 });
SurfaceMovement.attributes.add('ellipsoidThreshold', { type: 'number', default:0.00001, min:Number.MIN_VALUE });
SurfaceMovement.attributes.add('groundNormalThreshold', { type: 'number', default:0, min:0, max:1 });

if (typeof importScripts !== 'function') {
    SurfaceMovement.SOURCE = new Vector3D();
    SurfaceMovement.DISPLACEMENT  = new Vector3D();
    SurfaceMovement.MOVE_RESULT = new MoveResult();
}

SurfaceMovement.prototype.initialize = function() {
    this.gotGroundNormal = false;
    this.vel = new pc.Vec3(); // internal velocity for surfaceMovement to take into account accumlated gravity
    this.extVelocity = null; // optional external velocity to track x and z values
    this.collider = new EllipsoidCollider(this.entity.collision.radius, this.entity.collision.height/2, this.entity.collision.radius, this.ellipsoidThreshold, true);
};

// initialize code called once per entity
SurfaceMovement.prototype.postInitialize = function() {
    this.collisionScene = this.app.root.collisionScene || (this.app.root.children.length ? this.app.root.children[0].collisionScene : null) || ( window["Rootscene"] ? Rootscene.SCENE :  null);
    if (!this.collisionScene) alert("SurfaceMovement:: Failed to find collision scene!");
    if (this.collisionScene == null) { 
        console.warn("surface-movement :: Collision scene currently empty!");
        this.collisionScene = CollisionBoundNode.create(new Transform3D());
        this.app.once('collision-scene-initialized', this.onCollisionSceneInited, this);
    }
};

SurfaceMovement.prototype.onCollisionSceneInited = function(scene) {
    this.collisionScene = scene;
};

// update code called every frame
SurfaceMovement.prototype.update = function(dt) {
    var pos = this.entity.getPosition();

    var SM = SurfaceMovement;
    var moveResult = SM.MOVE_RESULT;
    var displacement = SM.DISPLACEMENT;
    var source = SM.SOURCE;
    // || (this.gotGroundNormal) &&  .maximum_ground_normal.dotProduct(this.vel) > 0)
    if ( !this.gotGroundNormal ) {
         this.vel.y -= this.gravForce;
    }
    
    if (this.extVelocity) {
        this.vel.x = this.extVelocity.x;
        //is.vel.y += this.extVelocity.y;
        this.vel.z = this.extVelocity.z;
    }
    if (this.vel.y > 0) this.vel.y = 0;
    
    source.x = pos.x;
    source.y = pos.y;
    source.z = pos.z;
    displacement.x =this.vel.x * dt;
    displacement.y = this.vel.y * dt;
    displacement.z = this.vel.z * dt;
    
    var destination = this.collider.calculateDestination(source, displacement, this.collisionScene);
    moveResult.collisions = this.collider.collisions;
    this.collider.collisions = null;

    var gotGroundNormal = false; // this.gotGroundNormal;
  
   if (this.vel.x*this.vel.x + this.vel.y+this.vel.y + this.vel.z*this.vel.z !== 0) {
        this.gotGroundNormal = false;
   }
  
    var c = moveResult.collisions;
    
    while (c != null) { // consiedr early out and global gotGroundNormal check?
        //console.log("C:"+c.normal.y);
        if (c.normal.y >= this.groundNormalThreshold ) { 
           this.vel.y = 0;
           gotGroundNormal = true;
           break;   
        }
        c = c.next;
    }
    this.gotGroundNormal = gotGroundNormal;

    var invT  = 1/dt;
    if (moveResult.collisions != null) {    
        this.vel.x = (destination.x - pos.x) * invT;
        this.vel.y = (destination.y - pos.y) * invT; 
        this.vel.z = (destination.z - pos.z) * invT; 
        moveResult.disposeCollisions();
    }

    pos.x = destination.x;
    pos.y = destination.y;
    pos.z = destination.z;
    this.entity.setPosition(pos.x, pos.y, pos.z);
};
