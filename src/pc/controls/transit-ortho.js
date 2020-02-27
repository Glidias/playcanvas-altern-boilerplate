import "./orbit-camera";

var TransitOrtho = pc.createScript('transitOrtho');
TransitOrtho.attributes.add("isOrtho", { default: false, type: "boolean"} );
TransitOrtho.attributes.add("duration", { default: 0.5, type: "number", min:0 } );
TransitOrtho.attributes.add("orthoRefEntity", {
  description:"Reference entity for orthographic projection containing orthographic camera",
  type: "entity"} );
TransitOrtho.attributes.add("orthoHeightDefault", { title: "Ortho Screen Height (default)", description: "Uses this screen height if no orthoRefEntity is found. Zero value indicates auto-calculated from max distance of orbit camera", default: 0, type: "number", min:0 } );
TransitOrtho.attributes.add("switchProjectionOrtho", {
  description:"Whether to actually switch camera projection mode to pc.PROJECTION_ORTHOGRAPHIC at the end of transition for Orthographic matrix values.",
  type: "boolean"} );


// initialize code called once per entity
TransitOrtho.prototype.initialize = function() {

    this.on('attr:isOrtho', this.isOrthoValueHandler, this);
    this.startMatrix = new pc.Mat4();
    this.endMatrix = new pc.Mat4();
    this.isStarted = null;
    this.inProgress = false;

    // return back to non-ortho (shoulder) values (these are canceled away once shoulder view is reached)
    this.lastDistance = null;
    this.lastYaw = null;
    this.lastOffsetX = null;

    // return back to ortho values (these are canceled away once ortho view is reached)
    this.lastOrthoYaw = null;
    this.lastOrthoPitch = null;

    // values for ortho and non-ortho (shoulder) values
    this.orthoPitch = -90;
    this.orthoYaw = 0;
    this.orthoZoom = 42;
    this.shoulderPitch = 0;
};

TransitOrtho.prototype.isOrthoValueHandler = function (value, prev) {
 if (!this.enabled) {
       this.enabled = true;
   }
   if (value) {
       this.isStarted = 1;
   }
   else {
      this.isStarted = 2;
   }

};

TransitOrtho.prototype.setOrthoTransition = function(ort) {
    if (this.isStarted || ort === this.isOrtho) return false;
    this.isOrtho = ort;
    //this.fire("attr:isOrtho");
    return true;
};
TransitOrtho.prototype.toggleOrthoTransition = function() {
    if (this.isStarted) return false;
    this.isOrtho = !this.isOrtho;
    //this.fire("attr:isOrtho");
    return true;
};

TransitOrtho.prototype.postInitialize = function() {
    if (this.isOrtho) {
        this.isOrthoValueHandler(this.isOrtho, this.isOrtho);
    }
};

// update code called every frame
TransitOrtho.prototype.update = function(dt) {
    if (this.isStarted === null) return;

    var camera = this.entity.camera;
    if (this.isStarted > 0) {
        this.fire("transitionBegin");

        if (this.isOrtho) {
            // lazy exit from zoomed
            /*
            if (this.entity.script.transitZooms) {
                this.entity.script.transitZooms.transitionEnabled = false;
                if (this.entity.script.transitZooms.zoomLevel !== 0) this.entity.script.transitZooms.zoomLevel = 0;
            }
            */
        }
        //// todo: get from pivoting position
        //
        // todo: get from last orthoHeight if available for this.isOrtho case.
        var distanceMax = !this.orthoRefEntity   ? this.entity.script.orbitCamera.distanceMax : this.orthoRefEntity.forward.dot( this.entity.forward.clone().scale(this.entity.script.orbitCamera._distance).add(this.entity.getPosition()).sub(this.orthoRefEntity.getPosition()) );
        var y = !this.isOrtho ? this.entity.camera.data.camera.orthoHeight :
        !this.orthoRefEntity ?
            this.orthoHeightDefault > 0 ?  this.orthoHeightDefault : this.entity.script.orbitCamera.getOrthoHeightFromDistance(distanceMax) :
            this.orthoRefEntity.camera.orthoHeight > 0 ? this.orthoRefEntity.camera.orthoHeight : this.entity.script.orbitCamera.getOrthoHeightFromDistance(distanceMax); //this.entity.getPosition().y - 100;
        this.entity.camera.data.camera.orthoHeight = y;
        var d = this.entity.script.orbitCamera.getDistanceFromOrthoHeight(y);


        // expand ortho height bounds if needed
        if ( d > this.entity.script.orbitCamera._distanceOrthoMax ) {
            this.entity.script.orbitCamera.maxOrthoHeight = y;
        }
        if (d < this.entity.script.orbitCamera._distanceOrthoin) {
             this.entity.script.orbitCamera.minOrthoHeight = y;
        }


        this.entity.script.orbitCamera.notifyOrthoHeightChange();

        var x = y * camera.aspectRatio;
        var perspMatrix;
        var orthoMatrix;
        if (this.isOrtho) {
            perspMatrix = this.startMatrix;
            orthoMatrix = this.endMatrix;
        }
        else {
           perspMatrix = this.endMatrix;
           orthoMatrix = this.startMatrix;
        }

        if (this.entity.camera.projection !== pc.PROJECTION_PERSPECTIVE) this.entity.camera.projection = pc.PROJECTION_PERSPECTIVE;
        this.entity.camera.myFakeOrtho = false; // fake own varaible

         this.entity.script.orbitCamera.sanitizeYaw();

        perspMatrix.setPerspective(camera.fov, camera.aspectRatio, camera.nearClip, camera.farClip);
        orthoMatrix.setOrtho(-x, x, -y, y, camera.nearClip, camera.farClip);
        //console.log("PERSP:"+perspMatrix.data);
        //console.log("ORTHO:"+orthoMatrix.data);
        //

        if ( this.isOrtho) {
            if (this.lastDistance === null) this.lastDistance =  this.entity.script.orbitCamera._targetDistance;
            if (this.lastYaw === null) this.lastYaw =  this.entity.script.orbitCamera._targetYaw;
            if (this.lastOffsetX === null) this.lastOffsetX = this.entity.script.orbitCamera.offsetX;
        }
        else {
            if (this.lastOrthoYaw === null) this.lastOrthoYaw = this.entity.script.orbitCamera._targetYaw;
            if (this.lastOrthoPitch === null) this.lastOrthoPitch = this.entity.script.orbitCamera._targetPitch;
        }

        var distanceInit = this.lastDistance !== null ? this.lastDistance : this.entity.script.orbitCamera.distanceInit;
        this.savedDistInit = distanceInit;
        //
        var yawInit = this.lastYaw !== null  ? this.lastYaw : this.entity.script.orbitCamera._targetYaw;
        var yawOrtho = this.lastOrthoYaw !== null ? this.lastOrthoYaw : !this.orthoRefEntity ? this.entity.script.orbitCamera.getSanitizedYawVal(this.orthoYaw) : this.entity.script.orbitCamera._calcYaw(this.orthoRefEntity.getRotation());
        var pitchOrtho = this.lastOrthoPitch !== null  ? this.lastOrthoPitch : !this.orthoRefEntity ? this.orthoPitch : this.entity.script.orbitCamera._calcPitch(this.orthoRefEntity.getRotation(), yawOrtho);
        var lastOffsetX = this.lastOffsetX !== null ? this.lastOffsetX : 0;
        this.startDistance = this.isOrtho ? distanceInit : distanceMax;

        this.startYaw = this.isOrtho ? this.entity.script.orbitCamera._targetYaw  : this.entity.script.orbitCamera._targetYaw;
        this.startPitch = this.isOrtho ?  this.entity.script.orbitCamera._targetPitch : this.entity.script.orbitCamera._targetPitch;

        this.endDistance =this.isOrtho ? distanceMax : distanceInit;
         // todo: attempt raycast to modify  distanceInit as of above

        this.endYaw = this.isOrtho ? yawOrtho : yawInit;

        var dyaw = this.endYaw - this.startYaw;
        if ( Math.abs(dyaw) > 180) {
            this.endYaw -= (dyaw >= 0 ? 1 : -1)*360;
        }

        this.endPitch = this.isOrtho ? pitchOrtho : this.shoulderPitch;

        this.startOffsetX = this.isOrtho ? lastOffsetX : 0;
        this.endOffsetX = this.isOrtho ? 0 : lastOffsetX;

        // pick shorter endYaw angle in relation to startYaw
        if (Math.abs(this.endYaw - this.startYaw) >= 180) {
            this.endYaw = this.endYaw > this.startYaw ? this.endYaw - 360 : this.endYaw + 360;
        }

        this.progress = 0;
        this.isStarted = 0;
        this.inProgress = true;
        this.entity.script.orbitCamera.enableControls(false);

    }

    var camData = this.entity.camera.projectionMatrix.data;
    var t = this.progress / this.duration;
    var isEnd = t>=1;
    t = isEnd ? 1 : t;

    var useRatio2 = this.isOrtho ? t : t;
    var useRatio = this.isOrtho ?  1-(--t)*t*t*t : t*t*t*t;


    var i;
     for ( i = 0; i < 16; i++) {
        camData[i] = this.lerp(this.startMatrix.data[i], this.endMatrix.data[i], useRatio);
     }
     this.entity.script.orbitCamera._targetYaw = this.lerp(this.startYaw, this.endYaw, useRatio2);
     this.entity.script.orbitCamera._targetPitch = this.lerp(this.startPitch, this.endPitch, useRatio2);
     this.entity.script.orbitCamera._targetDistance = this.lerp(this.startDistance, this.endDistance, useRatio2);
     this.entity.script.orbitCamera.offsetX = this.lerp(this.startOffsetX, this.endOffsetX, useRatio2);

     if (isEnd) {
        t = 1;
        this.isStarted = null;
        if (!this.isOrtho) {
           this.lastDistance = null;
           this.lastYaw = null;
           this.lastOffsetX = null;
           this.entity.script.orbitCamera._targetDistance = this.savedDistInit;
        }
         else {
            // this.lastOrthoHeight
            this.lastOrthoYaw = null;
            this.lastOrthoPitch = null;
         }
         this.entity.script.orbitCamera.enableControls(true);
         if (this.isOrtho) {
             if (this.switchProjectionOrtho) {
                 this.entity.camera.projection = pc.PROJECTION_ORTHOGRAPHIC;
             }
             else this.entity.camera.myFakeOrtho = true;
         }
         //if (this.entity.script.transitZooms) {
          //  this.entity.script.transitZooms.transitionEnabled = false;
        //}
         this.inProgress = false;
         this.fire("transitionComplete");
    }

    //camData[0] =
    this.progress += dt;

};

TransitOrtho.prototype.recalibrateShoulderFromOrthoPosition = function(pos, shoulderEnt) {
    // todo: get from pivoting position
   this.startDistance = this.entity.forward.dot(pos.clone().sub(this.entity.getPosition()));
   this.entity.script.orbitCamera._targetDistance = this.startDistance;
   this.entity.script.orbitCamera._distance = this.startDistance;

   shoulderEnt.setPosition(pos.x, pos.y, pos.z);
};

TransitOrtho.prototype.lerp = function(a, b, ratio) {
   return a + (b - a) * ratio;
};