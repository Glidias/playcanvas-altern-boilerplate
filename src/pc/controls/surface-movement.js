import SurfaceMovement from '../../hx/components/controller/SurfaceMovement';

var SurfaceMovement = pc.createScript('surfaceMovement');

SurfaceMovement.attributes.add('gravForce', { type: 'number', default:0.5 });

SurfaceMovement.attributes.add('friction', { type: 'number', default:0 });
SurfaceMovement.attributes.add('walkSpeed', { type: 'number', default:4 });

SurfaceMovement.attributes.add('ellipsoidThreshold', { type: 'number', default:0.00001, min:Number.MIN_VALUE });
SurfaceMovement.attributes.add('groundNormalThreshold', { type: 'number', default:0, min:0, max:1 });


SurfaceMovement.prototype.initialize = function() {
    
    this.displacement = new altern.Vector3D();
    this.source = new altern.Vector3D();
    
    this.transformedVec = new pc.Vec3();
    
    this.moveResult = new altern.MoveResult();
    this.collisionResult = new altern.CollisionResult(); // QPhysics
    this.collisionResult.max_ground_normal_threshold = this.groundNormalThreshold;
    
    this.vel = new pc.Vec3();
    this.right = new pc.Vec3();
    this.forward = new pc.Vec3();
    this.surfaceMovement = new SurfaceMovement();  // Controls
    this.surfaceMovement.WALK_SPEED = this.walkSpeed;
    this.surfaceMovement.friction = this.friction;

    this.collider = new altern.EllipsoidCollider(this.entity.collision.radius, this.entity.collision.height/2, this.entity.collision.radius, this.ellipsoidThreshold, true);
    
    this.defaultGroundNormal = new pc.Vec3(0,1,0);
    
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
    
    this.on('attr:groundNormalThreshold', function (value, prev) {
        this.collisionResult.max_ground_normal_threshold = value;
    });  
};

// initialize code called once per entity
SurfaceMovement.prototype.postInitialize = function() {
    this.collisionScene = this.app.root.collisionScene || (this.app.root.children.length ? this.app.root.children[0].collisionScene : null) || ( window["Rootscene"] ? Rootscene.SCENE :  null);
    if (!this.collisionScene) alert("SurfaceMovement:: Failed to find collision scene!");
    if (this.collisionScene == null) { 
        console.warn("third-person-movement :: Collision scene currently empty!");
        this.collisionScene = new altern.CollisionBoundNode();
    }
};

// update code called every frame
SurfaceMovement.prototype.update = function(dt) {
    var pos = this.entity.getPosition();
    // movement direction states via key presses

    var entForward = this.entity.forward;

      // -- To factor out to GravityScript script

     if ( !this.collisionResult.get_gotGroundNormal() || ( this.collisionResult.get_gotGroundNormal() &&  this.collisionResult.maximum_ground_normal.dotProduct(this.vel) > 0) ) {
         this.vel.y -= this.gravForce;
    }
    
    if (this.extVelocity) {
        this.vel.x = this.extVelocity.x;
        //is.vel.y += this.extVelocity.y;
        this.vel.z = this.extVelocity.z;
    }
  
    
    // To factor out to EllipsoidCollider script
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
    
    
     // -- To factor out to QPhysics script
    if (this.vel.x*this.vel.x + this.vel.y+this.vel.y + this.vel.z*this.vel.z != 0) {
        this.collisionResult.set_gotGroundNormal(false);
    }
    var c = this.moveResult.collisions;
    var gotGroundNormal;
    while (c != null) {
       
        if (c.normal.y >= this.collisionResult.max_ground_normal_threshold ) {  // && event.geomType !=CollisionEvent.GeomThing
            
            if (!(gotGroundNormal=this.collisionResult.get_gotGroundNormal()) || this.collisionResult.maximum_ground_normal.y <= c.normal.y) {
                this.collisionResult.maximum_ground_normal.x = c.normal.x;
                this.collisionResult.maximum_ground_normal.y = c.normal.y;
                this.collisionResult.maximum_ground_normal.z = c.normal.z;
            }
            if (gotGroundNormal) this.vel.y = 0;
  
            this.collisionResult.set_gotGroundNormal(true);
            
        }
       
        c = c.next;
    }

    var invT  = 1/dt;
    if (this.moveResult.collisions != null) {    
        this.vel.x = (this.moveResult.x - pos.x) * invT;   // pre-integration of moveResults by adjusting velocities
        this.vel.y = (this.moveResult.y - pos.y) * invT; 
        this.vel.z = (this.moveResult.z - pos.z) * invT; 
        this.moveResult.disposeCollisions();
    }
    
    // -- To factor out to Velocity script
    // integration of velocities
    pos.x += this.vel.x * dt;
    pos.y += this.vel.y * d.ft;
    pos.z += this.vel.z * dt;
    this.entity.setPosition(pos.x, pos.y, pos.z);

    var entForward = this.entity.forward;
    this.forward.x = entForward.x;
    this.forward.z = entForward.z;

    this.forward.normalize();

    if (this.gravForce === 0) SurfaceMovement.updateWith(dt, null, this.vel, this.surfaceMovement.walk_state, this.surfaceMovement.strafe_state, this.forward, this.right, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.friction, this.defaultGroundNormal );
    else SurfaceMovement.updateWith(dt, null, this.vel, this.surfaceMovement.walk_state, this.surfaceMovement.strafe_state, this.forward, this.right, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.friction, this.collisionResult.get_gotGroundNormal() ? this.defaultGroundNormal : null );
    

};