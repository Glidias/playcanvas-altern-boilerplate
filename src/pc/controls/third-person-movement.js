import Vector3D from "../../hx/jeash/geom/Vector3D";
import MoveResult from "../../hx/components/MoveResult";
import SurfaceMovement from "../../hx/components/controller/SurfaceMovement";
import CollisionResult from "../../hx/components/CollisionResult";
import EllipsoidCollider from "../../hx/systems/collisions/EllipsoidCollider";
import Jump from "../../hx/components/Jump";
import CollisionBoundNode from "../../hx/altern/collisions/CollisionBoundNode";
import Transform3D from "../../hx/components/Transform3D";

import "./orbit-camera";

var ThirdPersonMovement = pc.createScript('thirdPersonMovement');

ThirdPersonMovement.attributes.add('entityCamera', { type: 'entity' });
ThirdPersonMovement.attributes.add('collisionSceneEntity', { type: 'entity' });
ThirdPersonMovement.attributes.add('yawEntity', { type: 'entity' });
ThirdPersonMovement.attributes.add('gravForce', { type: 'number', default:0.5 });

ThirdPersonMovement.attributes.add('friction', { type: 'number', default:0 });
ThirdPersonMovement.attributes.add('walkSpeed', { type: 'number', default:230 });

ThirdPersonMovement.attributes.add('ellipsoidThreshold', { type: 'number', default:0.00001, min:Number.MIN_VALUE });
ThirdPersonMovement.attributes.add('groundNormalThreshold', { type: 'number', default:0.573, min:0, max:1 });

ThirdPersonMovement.attributes.add('jumpCooldown', { type: 'number', default:0.5 });
ThirdPersonMovement.attributes.add('jumpPower', { type: 'number', default:9 });
ThirdPersonMovement.attributes.add('jumpJetEnabled', { type: 'boolean', default:false });
ThirdPersonMovement.attributes.add('jumpJetCooldown', { type: 'number', default:0.03 });
ThirdPersonMovement.attributes.add('jumpJetPower', { type: 'number', default:0.6 });

ThirdPersonMovement.attributes.add('keyboardEnabled', { type: 'boolean', default:true });

ThirdPersonMovement.prototype.initialize = function() {
    this.displacement = new Vector3D();
    this.source = new Vector3D();

   // this.force = new pc.Vec3();
    this.transformedVec = new pc.Vec3();

    this.initializedTerrain = false;

    this.autoForward = false;

    this.moveResult = new MoveResult();

    this.collisionResult = new CollisionResult(); // QPhysics
    this.collisionResult.max_ground_normal_threshold = this.groundNormalThreshold;

    this.vel = new pc.Vec3();
    this.right = new pc.Vec3();
    this.forward = new pc.Vec3();
    this.surfaceMovement = new SurfaceMovement();  // Controls
    this.surfaceMovement.WALK_SPEED = this.walkSpeed;
    this.surfaceMovement.friction = this.friction;

    this.testVec = new pc.Vec3();

    this.jump = new Jump(this.jumpCooldown, this.jumpPower);
    this.jumpJet = new Jump(this.jumpJetCooldown, this.jumpJetPower);

    this.collider = new EllipsoidCollider(this.entity.collision.radius, this.entity.collision.height/2, this.entity.collision.radius, this.ellipsoidThreshold, true);

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

    this.on("state", this.onState);
};

ThirdPersonMovement.prototype.onState = function(enabled) {
    if (enabled) {
        this.collisionResult.set_gotGroundNormal(false);
    }
};

// initialize code called once per entity
ThirdPersonMovement.prototype.postInitialize = function() {
    this.collisionScene = !this.collisionSceneEntity ?  this.app.root.collisionScene || (this.app.root.children.length ? this.app.root.children[0].collisionScene : null) || ( window["Rootscene"] ? Rootscene.SCENE :  null) : this.collisionSceneEntity.collisionScene;
    if (!this.collisionScene) alert("ThirdPersonMovement:: Failed to find collision scene!");
    if (this.collisionScene == null) {
        console.warn("third-person-movement :: Collision scene currently empty!");
        this.collisionScene = CollisionBoundNode.create(new Transform3D());
        this.app.once('collision-scene-initialized', this.onCollisionSceneInited, this);
    }
};

if (typeof importScripts !== 'function') {
    ThirdPersonMovement.DUMMY_ENTITY = new pc.Entity();  // a dummy parentless entity for quick transform calculations
}

ThirdPersonMovement.prototype.onCollisionSceneInited = function(scene) {
    this.collisionScene = scene;

};

// update code called every frame
ThirdPersonMovement.prototype.update = function(dt) {

     var pos = this.entity.getPosition();


    // movement direction states via key presses
    var x = 0;
    var y = 0;
    var z = 0;



    // Use W-A-S-D keys to move player
    // Check for key presses
    var entRight = this.entity.right;
    var entForward = this.entity.forward;
    var keyboardEnabled = this.keyboardEnabled;
    this.surfaceMovement.strafe_state = 0;
    if (keyboardEnabled && this.app.keyboard.isPressed(pc.KEY_A) ) {
         x -= entRight.x;
         z -= entRight.z;
        this.surfaceMovement.strafe_state -= 1;
    }

    if (keyboardEnabled &&  this.app.keyboard.isPressed(pc.KEY_D) ) {
          x += entRight.x;
         z += entRight.z;
        this.surfaceMovement.strafe_state += 1;
    }

    this.surfaceMovement.walk_state = 0;
    if (this.autoForward || (keyboardEnabled && this.app.keyboard.isPressed(pc.KEY_W)) ) {
        x += entForward.x;
        z += entForward.z;
         this.surfaceMovement.walk_state += 1;
    }

    if (keyboardEnabled &&  this.app.keyboard.isPressed(pc.KEY_S) ) {
        x -= entForward.x;
        z -= entForward.z;
         this.surfaceMovement.walk_state -= 1;
    }


    // Determine relative directional states if got entityCamera containing script orbitCamera
      var dummy =ThirdPersonMovement.DUMMY_ENTITY;
    var gotMove = (x !== 0 || z !== 0);

    if (gotMove && this.entityCamera  ) {

        var newTranslate;

        var yaw  = this.entityCamera.script && this.entityCamera.script.orbitCamera ? this.entityCamera.script.orbitCamera._yaw : null;
        if (yaw === null) {
            var quat = this.entityCamera.getRotation();
            quat.transformVector(pc.Vec3.FORWARD, this.testVec);

            yaw =  Math.atan2(-this.testVec.x, -this.testVec.z) * pc.math.RAD_TO_DEG;
        }


            dummy.setLocalEulerAngles(0, yaw, 0);
            this.transformedVec.x = x;
            this.transformedVec.z = z;
            newTranslate = dummy.getLocalTransform().transformVector( this.transformedVec, this.transformedVec );
            x = newTranslate.x;
            z = newTranslate.z;

     }



     this.source.x = pos.x;
    this.source.y = pos.y;
    this.source.z = pos.z;

      // -- To factor out to GravityScript script

     if (!this.collisionResult.get_gotGroundNormal() || ( this.collisionResult.get_gotGroundNormal() &&  this.collisionResult.maximum_ground_normal.dotProduct(this.vel) > 0) ) {
         this.vel.y -= this.gravForce ;
         this.collisionResult.set_gotGroundNormal(false);

    }

      this.jump.update(dt);
      this.jumpJet.update(dt);
    if ( this.collisionResult.get_gotGroundNormal() &&   this.app.keyboard.isPressed(pc.KEY_SPACE)  ) {
         this.collisionResult.set_gotGroundNormal(false);
        this.vel.y =0;
       this.jump.attemptJumpY(this.vel, dt);
    }
    else if ( this.jumpJetEnabled && this.app.keyboard.isPressed(pc.KEY_J)  ) {
        this.collisionResult.set_gotGroundNormal(false);
        this.vel.y =0;
       this.jumpJet.attemptJumpY(this.vel, dt);
    }

    this.displacement.x =this.vel.x * dt;
    this.displacement.y = this.vel.y * dt;
    this.displacement.z = this.vel.z * dt;
    var destination = this.collider.calculateDestination(this.source, this.displacement, this.collisionScene);
    this.moveResult.x = destination.x;
    this.moveResult.y = destination.y;
    this.moveResult.z = destination.z;
    this.moveResult.collisions = this.collider.collisions;
    this.collider.collisions = null;

    if (this.vel.x*this.vel.x + this.vel.y+this.vel.y + this.vel.z*this.vel.z !== 0) {
        this.collisionResult.set_gotGroundNormal(false);
    }
    var c = this.moveResult.collisions;
    var gotGroundNormal;
    while (c != null) {

        if (c.normal.y >= this.collisionResult.max_ground_normal_threshold ) {  // && event.geomType !=CollisionEvent.GeomThing
            
            if (!(gotGroundNormal= this.collisionResult.get_gotGroundNormal()) || this.collisionResult.maximum_ground_normal.y <= c.normal.y) {
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
    pos.y += this.vel.y * dt;
    pos.z += this.vel.z * dt;
    this.entity.setPosition(pos.x, pos.y, pos.z);


     var entForward;
    if (this.entityCamera) {
        entForward = dummy.forward;
        this.forward.x = entForward.x;
        this.forward.z = entForward.z;
        this.forward.y = 0;
       // /*
    }
      else {
        entForward = this.entity.forward;
        this.forward.x = entForward.x;
        this.forward.z = entForward.z;

    }
    this.forward.normalize();

    if (this.gravForce === 0) SurfaceMovement.updateWith(dt, null, this.vel, this.surfaceMovement.walk_state, this.surfaceMovement.strafe_state, this.forward, this.right, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.friction, this.defaultGroundNormal );
    else SurfaceMovement.updateWith(dt, null, this.vel, this.surfaceMovement.walk_state, this.surfaceMovement.strafe_state, this.forward, this.right, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.WALK_SPEED, this.surfaceMovement.friction, this.collisionResult.get_gotGroundNormal() ? this.defaultGroundNormal : null );


    if (gotMove && this.yawEntity) {  //&& this.collisionResult.get_gotGroundNormal()

        //this.animationSetState('walking');

        //if ( this.yawEntity) {
        this.yawEntity.lookAt(pos.x + x, pos.y, pos.z+z);
        //}

    } /*else{

        if( y > 0) {

            this.animationSetState('jumping');

        }
        else  this.animationSetState('idle');
    }
    */

};


/*
ThirdPersonMovement.prototype.animationSetState = function(state){

    var states = ThirdPersonMovement.states;


    if( state !== this.state ){

        // this.entity.findByName('Model').animation.play(states[state].animation, this.animationblendTime);
    }

    this.state = state;

};
*/