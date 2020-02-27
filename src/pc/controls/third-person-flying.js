import Vector3D from "../../hx/jeash/geom/Vector3D";
import MoveResult from "../../hx/components/MoveResult";
import SurfaceMovement from "../../hx/components/controller/SurfaceMovement";
import CollisionEvent from "../../hx/systems/collisions/CollisionEvent";
import CollisionResult from "../../hx/components/CollisionResult";
import EllipsoidCollider from "../../hx/systems/collisions/EllipsoidCollider";
import Jump from "../../hx/components/Jump";
import CollisionBoundNode from "../../hx/altern/collisions/CollisionBoundNode";
import Transform3D from "../../hx/components/Transform3D";

import "./orbit-camera";

var ThirdPersonFlying = pc.createScript('thirdPersonFlying');

ThirdPersonFlying.attributes.add('entityCamera', { type: 'entity' });
ThirdPersonFlying.attributes.add('collisionSceneEntity', { type: 'entity' });
ThirdPersonFlying.attributes.add('terrainEntity', { type: 'entity' });
ThirdPersonFlying.attributes.add('yawEntity', { type: 'entity' });
//ThirdPersonFlying.attributes.add('jumpPowerMultiplier', { type: 'number', default:0.2 });
ThirdPersonFlying.attributes.add('gravForce', { type: 'number', default:0.5 });

ThirdPersonFlying.attributes.add('friction', { type: 'number', default:0 });
ThirdPersonFlying.attributes.add('walkSpeed', { type: 'number', default:230 });

ThirdPersonFlying.attributes.add('ellipsoidThreshold', { type: 'number', default:0.00001, min:Number.MIN_VALUE });
ThirdPersonFlying.attributes.add('groundNormalThreshold', { type: 'number', default:0, min:0, max:1 });

ThirdPersonFlying.attributes.add('jumpCooldown', { type: 'number', default:0.5 });
ThirdPersonFlying.attributes.add('jumpPower', { type: 'number', default:9 });
ThirdPersonFlying.attributes.add('jumpJetEnabled', { type: 'boolean', default:false });
ThirdPersonFlying.attributes.add('jumpJetCooldown', { type: 'number', default:0.03 });
ThirdPersonFlying.attributes.add('jumpJetPower', { type: 'number', default:0.6 });


ThirdPersonFlying.states = {
    idle: {
        animation: 'idle.json'
    },
    walking: {
        animation: 'walking_inPlace.json'
    },
    jumping: {
        animation: 'jumping.json'
    }
};


ThirdPersonFlying.prototype.initialize = function() {
    this.displacement = new Vector3D();
    this.source = new Vector3D();
    this.resCollisionPoint = new Vector3D();
    this.resCollisionPlane = new Vector3D();

   // this.force = new pc.Vec3();
    this.transformedVec = new pc.Vec3();
    //this.transformedVec2 = new pc.Vec3();

    this.initializedTerrain = false;

    // animation
    this.animationblendTime = 0.2;
    this.animationSetState('idle');

    this.moveResult = new MoveResult();

    this.collisionResult = new CollisionResult(); // QPhysics
    this.collisionResult.max_ground_normal_threshold = this.groundNormalThreshold;

    this.vel = new pc.Vec3();
    this.right = new pc.Vec3();
    this.forward = new pc.Vec3();
    this.surfaceMovement = new SurfaceMovement();  // Controls
    this.surfaceMovement.WALK_SPEED = this.walkSpeed;
    this.surfaceMovement.friction = this.friction;

    this.jump = new Jump(this.jumpCooldown, this.jumpPower);
    this.jumpJet = new Jump(this.jumpJetCooldown, this.jumpJetPower);

    this.collider = new EllipsoidCollider(this.entity.collision.radius, this.entity.collision.height/2, this.entity.collision.radius, this.ellipsoidThreshold, true);

    this.defaultGroundNormal = new pc.Vec3(0,1,0);

     this.app.on("spawn", function() {
        this.collisionResult.reset();
     },this);

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

     this.on('attr:jumpPower', function (value, prev) {
        this.jump.jump_speed = value;
    });

     this.on('attr:jumpCooldown', function (value, prev) {
        this.jump.JUMP_COOLDOWN = value;
    });

       this.on('attr:jumpJetPower', function (value, prev) {
        this.jumpJet.jump_speed = value;
    });

     this.on('attr:jumpJetCooldown', function (value, prev) {
        this.jumpJet.JUMP_COOLDOWN = value;
    });

    this.on('attr:groundNormalThreshold', function (value, prev) {
        this.collisionResult.max_ground_normal_threshold = value;
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

if (typeof importScripts !== 'function') {
    ThirdPersonFlying.DUMMY_ENTITY = new pc.Entity();  // a dummy parentless entity for quick transform calculations
}

ThirdPersonFlying.prototype.onCollisionSceneInited = function(scene) {
    this.collisionScene = scene;
};

// update code called every frame
ThirdPersonFlying.prototype.update = function(dt) {

     var pos = this.entity.getPosition();

     if (!this.initializedTerrain) {
         if (this.terrainEntity != null && this.terrainEntity.heightMap != null) {
             pos.y = this.terrainEntity.heightMap.Sample(pos.x, pos.z) + (this.entity.collision.height/2) + 200;
             this.entity.setPosition(pos.x, pos.y, pos.z);
             this.initializedTerrain = true;

         }
     }


    // Main script for player controls
    //



    // movement direction states via key presses
    var x = 0;
    var y = 0;
    var z = 0;



    // Use W-A-S-D keys to move player
    // Check for key presses
    var entRight = this.entityCamera.right;
    var entForward = this.entityCamera.forward;
    this.surfaceMovement.strafe_state = 0;
    if (this.app.keyboard.isPressed(pc.KEY_A) ) {
         x -= entRight.x;
         z -= entRight.z;
        this.surfaceMovement.strafe_state -= 1;
    }

    if ( this.app.keyboard.isPressed(pc.KEY_D) ) {
          x += entRight.x;
         z += entRight.z;
        this.surfaceMovement.strafe_state += 1;
    }

    this.surfaceMovement.walk_state = 0;
    if ( this.app.keyboard.isPressed(pc.KEY_W) ) {
        x += entForward.x;
        y += entForward.y;
        z += entForward.z;
         this.surfaceMovement.walk_state += 1;
    }

    if ( this.app.keyboard.isPressed(pc.KEY_S) ) {
        x -= entForward.x;
        y -= entForward.y;
        z -= entForward.z;
         this.surfaceMovement.walk_state -= 1;
    }




    // Determine relative directional states if got entityCamera containing script orbitCamera
      var dummy =ThirdPersonFlying.DUMMY_ENTITY;
    var gotMove = (x !== 0 || z !== 0);

    if (gotMove && this.entityCamera  ) {





       // /*

       // */

    }


    /*
    this.displacement.x = 0;
    this.displacement.y = -this.gravForce;
    this.displacement.z = 0;

    this.source.x = pos.x;
    this.source.y = pos.y;
    this.source.z = pos.z;
    var gotCollide = this.collider.getCollision(this.source, this.displacement, this.resCollisionPoint, this.resCollisionPlane,  this.collisionScene);
   // if (gotCollide) {
        // this.entity.setPosition(this.resCollisionPoint.x, this.resCollisionPoint.y, this.resCollisionPoint.z);
        //console.log("GOT collision:"+this.resCollisionPoint + ", "+this.resCollisionPlane);
    //}
    */

   // console.log("SETTING UP");
    // perform destination movement
    //

     this.source.x = pos.x;
    this.source.y = pos.y;
    this.source.z = pos.z;

    /*
    //if (this.collisionResult.get_gotGroundNormal()) {
         this.displacement.x =0;
        this.displacement.y = -this.collider.threshold*2;
        this.displacement.z  =0;
        var mustApplyGrav = false;
        var gotCollide = this.collider.getCollision(this.source, this.displacement, this.resCollisionPoint, this.resCollisionPlane, this.collisionScene);
        if (!gotCollide ||  this.resCollisionPlane.y < this.collisionResult.max_ground_normal_threshold  ) {
         this.collisionResult.set_gotGroundNormal(false);
           console.log("SHOULD fall!:"+this.vel);

        }
  //  else if (gotCollide && this.resCollisionPlane.y >= this.collisionResult.max_ground_normal_threshold ) {
   //      this.collisionResult.set_gotGroundNormal(true);
   // }
   // }
    */

      // -- To factor out to GravityScript script




    // To factor out to EllipsoidCollider script




  //  /*

    //*/


  //  var f = this.entityCamera.forward;
   // x = f.x;
  //  y = f.y;
   // z = f.z;

    this.displacement.x = x * this.walkSpeed * dt;
    this.displacement.y = y *this.walkSpeed *  dt;
    this.displacement.z = z * this.walkSpeed * dt;

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
            //if (gotGroundNormal) this.vel.y = 0;

            this.collisionResult.set_gotGroundNormal(true);

        }
        c = c.next;
    }
  //  console.log((this.moveResult.collisions!= null) + " : " + this.collisionResult.get_gotGroundNormal() + " :"+ this.collisionResult.maximum_ground_normal);






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
    pos.y += this.vel.y * dt;
    pos.z += this.vel.z * dt;
    this.entity.setPosition(destination.x, destination.y, destination.z);


//}
  // */

    //this.entityCamera.lookAt( pos );
    //
    //
    //
    // Back to anims
    //
    // use direction from keypresses to apply a force to the character
    if (gotMove) {  //&& this.collisionResult.get_gotGroundNormal()

        //this.force.set(x, 0, z).normalize().scale(this.power);


       // this.entity.rigidbody.applyForce( this.force );


        this.animationSetState('walking');

        if ( this.yawEntity) {
            this.yawEntity.lookAt(pos.x + x, pos.y, pos.z+z);
        }

    }else{

        if( y > 0) {

            this.animationSetState('jumping');

        }
        else  this.animationSetState('idle');
    }




};




ThirdPersonFlying.prototype.animationSetState = function(state){

    var states = ThirdPersonFlying.states;


    if( state !== this.state ){

        // this.entity.findByName('Model').animation.play(states[state].animation, this.animationblendTime);
    }

    this.state = state;

};