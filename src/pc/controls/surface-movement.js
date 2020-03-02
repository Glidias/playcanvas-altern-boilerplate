import Vector3D from "../../hx/jeash/geom/Vector3D";
import MoveResult from "../../hx/components/MoveResult";
import SurfaceMovement from "../../hx/components/controller/SurfaceMovement";
import EllipsoidCollider from "../../hx/systems/collisions/EllipsoidCollider";
import CollisionBoundNode from "../../hx/altern/collisions/CollisionBoundNode";

/**
 * Simplified surface movement without calculating exact collision ground normal value for relatively stable 
 * ground movement
 */
var SurfaceMovement = pc.createScript('surfaceMovement');

SurfaceMovement.attributes.add('gravForce', { type: 'number', default:0.5 });

SurfaceMovement.attributes.add('friction', { type: 'number', default:0 });
SurfaceMovement.attributes.add('walkSpeed', { type: 'number', default:4 });

SurfaceMovement.attributes.add('ellipsoidThreshold', { type: 'number', default:0.00001, min:Number.MIN_VALUE });
SurfaceMovement.attributes.add('groundNormalThreshold', { type: 'number', default:0, min:0, max:1 });

if (typeof importScripts !== 'function') {
    SurfaceMovement.DEFAULT_GROUND_NORMAL = new pc.Vec3(); 
}

SurfaceMovement.prototype.initialize = function() {
    
    this.displacement = new Vector3D();
    this.source = new Vector3D();
    
    this.transformedVec = new pc.Vec3();
    
    this.moveResult = new MoveResult();
    //this.collisionResult = new CollisionResult(); // QPhysics
    //this.collisionResult.max_ground_normal_threshold = this.groundNormalThreshold;
    
    this.vel = new pc.Vec3(); // internal velocity for surfaceMovement to take into account accumlated gravity
    this.extVelocity = null; // optional external velocity to track x and z values
    this.right = new pc.Vec3();
    this.forward = new pc.Vec3();
    this.surfaceMovement = new SurfaceMovement();  // Controls
    this.surfaceMovement.WALK_SPEED = this.walkSpeed;
    this.surfaceMovement.friction = this.friction;

    this.collider = new EllipsoidCollider(this.entity.collision.radius, this.entity.collision.height/2, this.entity.collision.radius, this.ellipsoidThreshold, true);

    // Reapply the clamps if they are changed in the editor
    this.on('attr:friction', function (value, prev) {
        this.surfaceMovement.friction = value;
    });
    
     this.on('attr:ellipsoidThreshold', function (value, prev) {
        this.collider.threshold = value;
    });
    
    // Reapply the clamps if they are changed in the editor
    this.on('attr:walkSpeed', function (value, prev) {
        this.surfaceMovement.WALK_SPEED = value;
    });
    
    /*
    this.on('attr:groundNormalThreshold', function (value, prev) {
        this.collisionResult.max_ground_normal_threshold = value;
    }); */
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

    this.source.x = pos.x;
    this.source.y = pos.y;
    this.source.z = pos.z;
    this.displacement.x =this.vel.x * dt;
    this.displacement.y = this.vel.y * dt;
    this.displacement.z = this.vel.z * dt;
    
    //console.log(this.vel + ":");
    var destination = this.collider.calculateDestination(this.source, this.displacement, this.collisionScene);
    this.moveResult.x = destination.x;
    this.moveResult.y = destination.y;
    this.moveResult.z = destination.z;
    this.moveResult.collisions = this.collider.collisions;
    this.collider.collisions = null;

    var gotGroundNormal = this.gotGroundNormal;
  
    if (this.vel.x*this.vel.x + this.vel.y+this.vel.y + this.vel.z*this.vel.z !== 0) {
        //this.collisionResult.set_gotGroundNormal(false);
        this.gotGroundNormal = false;
    }
  
    var c = this.moveResult.collisions;
   
    while (c != null) { // consiedr early out and global gotGroundNormal check?
       
        if (c.normal.y >= this.groundNormalThreshold) {  // && event.geomType !=CollisionEvent.GeomThing
            /*
            if (!(gotGroundNormal=this.collisionResult.get_gotGroundNormal()) || this.collisionResult.maximum_ground_normal.y <= c.normal.y) {
                this.collisionResult.maximum_ground_normal.x = c.normal.x;
                this.collisionResult.maximum_ground_normal.y = c.normal.y;
                this.collisionResult.maximum_ground_normal.z = c.normal.z;
            }
            if (gotGroundNormal) this.vel.y = 0;
  
            this.collisionResult.set_gotGroundNormal(true);
            */
           this.vel.y = 0;
           this.gotGroundNormal = gotGroundNormal;
           break;
            
        }
       
        c = c.next;
    }
    this.gotGroundNormal = gotGroundNormal;

    var invT  = 1/dt;
    if (this.moveResult.collisions != null) {    
        this.vel.x = (this.moveResult.x - pos.x) * invT;   // pre-integration of moveResults by adjusting velocities
        this.vel.y = (this.moveResult.y - pos.y) * invT; 
        this.vel.z = (this.moveResult.z - pos.z) * invT; 
        this.moveResult.disposeCollisions();
    }

    pos.x += this.vel.x * dt;
    pos.y += this.vel.y * dt;
    pos.z += this.vel.z * dt;
    this.entity.setPosition(pos.x, pos.y, pos.z);

    var entForward = this.entity.forward;
    this.forward.x = entForward.x;
    this.forward.z = entForward.z;
    this.forward.normalize();

   
    SurfaceMovement.updateWith(dt, null, this.vel, this.surfaceMovement.walk_state, this.surfaceMovement.strafe_state, this.forward, this.right, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.friction,
        this.gravForce !== 0 ? gotGroundNormal ? SurfaceMovement.DEFAULT_GROUND_NORMAL : null
        : SurfaceMovement.DEFAULT_GROUND_NORMAL
        );
};