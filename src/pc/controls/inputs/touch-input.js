var TouchInput = pc.createScript('touchInput');
TouchInput.MASK_VALUE = 2;

TouchInput.attributes.add('orbitSensitivity', {
    type: 'number',
    default: 0.4,
    title: 'Orbit Sensitivity',
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

TouchInput.attributes.add('distanceSensitivity', {
    type: 'number',
    default: 0.2,
    title: 'Distance Sensitivity',
    description: 'How fast the camera moves in and out. Higher is faster'
});

TouchInput.attributes.add('panEnabled', {
    type: 'boolean',
    default: true,
    title: 'Panning Allowed',
    description: 'Is panning allowed via 2-touches and drag?'
});

TouchInput.attributes.add('yawOrientedPan', {
    type: 'boolean',
    enum: [
      { 'None': false },
      { '(x,z) Top': true },
    ],
    title: "Pan Plane 2D",
    description: "Pan along camera yaw oriented 2D plane?",
    default: false
});

TouchInput.attributes.add('reverseControlScheme', {
    type: 'boolean',
    default: false,
    title: 'Reverse Control Scheme'
});

TouchInput.attributes.add('domId', {
    type: 'string'
});

TouchInput.hackedTouch = false;

// initialize code called once per entity
TouchInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;

    this.fromWorldPoint = new pc.Vec3();
    this.toWorldPoint = new pc.Vec3();
    this.worldDiff = new pc.Vec3();
    this.calcMatrix = new pc.Mat4();

    this.dualTouched = false;

    // Store the position of the touch so we can calculate the distance moved
    this.lastTouchPoint = new pc.Vec2();
    this.lastPinchMidPoint = new pc.Vec2();
    this.lastPinchDistanceX = 0;
     this.lastPinchDistanceY = 0;
    this.lastPinchDistance = 0;
    //this.lastAxial = new pc.Vec2();
    //this.curAxial = new pc.Vec2();
    this.lastRotation = 0;

    this.touchDevice = this.app.touch;
    this.originalDistanceSensitivity = this.distanceSensitivity;



     // NOTE: this is a hack, assume fullscreen yea...so it's simplified
    if (!TouchInput.hackTouched) {
        pc.getTouchTargetCoords = function (touch) {
           return {
                x: touch.pageX,
                y: touch.pageY
            };
        };

        TouchInput.hackTouched = true;
    }

};

TouchInput.prototype.postInitialize = function() {
    if (this.orbitCamera && this.app.touch) {
        if (this.domId) {
            var elem = document.getElementById(this.domId);
            if (elem) {
                this.touchDevice = new pc.TouchDevice(elem);
                console.log("Switching to element id for touch:"+this.domId);
            }
            else {
                console.warn("could not find document by element id:"+this.domId);
            }
         }

        // Use the same callback for the touchStart, touchEnd and touchCancel events as they
        // all do the same thing which is to deal the possible multiple touches to the screen
        this.initListeners();

        this.on("enable", function() {
             this.initListeners();
        }, this);

         this.on("disable", function() {
             this.disableListeners();
        }, this);

        this.on('destroy', function() {
           this.disableListeners();
        }, this);
    }
};

TouchInput.prototype.initListeners = function() {
    this.touchDevice.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
    this.touchDevice.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
    this.touchDevice.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
    this.touchDevice.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);

};

TouchInput.prototype.disableListeners = function() {
    this.touchDevice.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
    this.touchDevice.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
    this.touchDevice.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

    this.touchDevice.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
};


TouchInput.prototype.getPinchDistance = function (pointA, pointB) {
    // Return the distance between the two points
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;

    return Math.sqrt((dx * dx) + (dy * dy));
};


TouchInput.prototype.getPinchDistanceX = function (pointA, pointB) {
    // Return the distance between the two points
   return Math.abs(pointA.x - pointB.x);
};
TouchInput.prototype.getPinchDistanceY = function (pointA, pointB) {
    // Return the distance between the two points
   return Math.abs(pointB.y - pointA.y);
};


TouchInput.prototype.calcMidPoint = function (pointA, pointB, result) {
    result.set(pointB.x - pointA.x, pointB.y - pointA.y);
    result.scale(0.5);
    result.x += pointA.x;
    result.y += pointA.y;
};


TouchInput.prototype.onTouchStartEndCancel = function(event) {
    // We only care about the first touch for camera rotation. As the user touches the screen,
    // we stored the current touch position
    var touches = event.touches;
    var wasDualTouched = this.dualTouched;
     this.dualTouched = false;
    if (touches.length === 1) {
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
       this.lastPinchMidPoint.set(touches[0].x, touches[0].y);

    } else if (touches.length === 2) {
        this.dualTouched = true;
        wasDualTouched = true;
        // If there are 2 touches on the screen, then set the pinch distance
         /*
        this.lastPinchDistanceX = this.getPinchDistanceX(touches[0], touches[1]);
         this.lastPinchDistanceY = this.getPinchDistanceY(touches[0], touches[1]);
        this.lastPinchDistance = Math.sqrt(this.lastPinchDistanceX*this.lastPinchDistanceX + this.lastPinchDistanceY*this.lastPinchDistanceY);
        */
        this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        this.calcMidPoint(touches[0], touches[1], this.lastPinchMidPoint);
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
       // this.lastAxial.x = touches[0].x - this.lastPinchMidPoint.x;
       // this.lastAxial.y = touches[0].y - this.lastPinchMidPoint.y;
       // this.lastAxial.normalize();
        this.lastRotation = Math.atan2(touches[0].y - this.lastPinchMidPoint.y,  touches[0].x - this.lastPinchMidPoint.x);

    }

    if (event.event.type === pc.EVENT_TOUCHSTART ) {
        this.orbitCamera.inputDetectMask |= TouchInput.MASK_VALUE;
        if (wasDualTouched) {
            this.orbitCamera.fire("panRelease");
       }
    }
    else {
       this.orbitCamera.inputDetectMask &= ~TouchInput.MASK_VALUE;
       if (wasDualTouched) {
            this.orbitCamera.fire("panRelease");
       }
    }

};





TouchInput.prototype.pan = function(midPoint) {
    var fromWorldPoint = this.fromWorldPoint;
    var toWorldPoint = this.toWorldPoint;
    var worldDiff = this.worldDiff;

    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;

    if (!this.yawOrientedPan) {
        camera.screenToWorld(midPoint.x, midPoint.y, distance, fromWorldPoint);
        camera.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, distance, toWorldPoint);
        worldDiff.sub2(toWorldPoint, fromWorldPoint);
    }
    else {

      if (this.entity.camera.myFakeOrtho)  this.entity.camera.data.camera._projection = pc.PROJECTION_ORTHOGRAPHIC;
      camera.screenToWorld(midPoint.x, midPoint.y, distance, fromWorldPoint);
        camera.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, distance, toWorldPoint);
       worldDiff.sub2(toWorldPoint, fromWorldPoint);
      if (this.entity.camera.myFakeOrtho)  this.entity.camera.data.camera._projection = pc.PROJECTION_PERSPECTIVE;

        ///*
        if (!this.entity.camera.myFakeOrtho && this.entity.camera.projection === pc.PROJECTION_PERSPECTIVE) {
            var scale = worldDiff.length();
            var dx = this.lastPinchMidPoint.x - midPoint.x;
            var dy = this.lastPinchMidPoint.y - midPoint.y;
            var d = dx*dx+dy*dy;
            if (d === 0 ) return;
            d = Math.sqrt(d);
            d = 1/d;
            dx *=d;
            dy *=d;
            dx *= scale;
            dy *= scale;
           worldDiff.x = dx;
            worldDiff.y = 0;
            worldDiff.z = dy;

             this.calcMatrix.setFromEulerAngles(0, this.orbitCamera._targetYaw, 0);
            this.calcMatrix.transformVector(worldDiff, worldDiff);
         }
    }

    this.orbitCamera.panByAmount(worldDiff);
};


TouchInput.pinchMidPoint = new pc.Vec2();

TouchInput.prototype.onTouchMove = function(event) {
    var pinchMidPoint = TouchInput.pinchMidPoint;


    // We only care about the first touch for camera rotation. Work out the difference moved since the last event
    // and use that to update the camera target position
    var touches = event.touches;
     this.dualTouched = false;
    if ( touches.length === 1 ) {
        var touch = touches[0];
        if (!this.reverseControlScheme) {
            this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
            this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;
        }
        else {
            pinchMidPoint.x = touch.x;
            pinchMidPoint.y = touch.y;
            this.pan(pinchMidPoint);
        }
        this.lastPinchMidPoint.set(touch.x, touch.y);

        this.lastTouchPoint.set(touch.x, touch.y);

    } else if ( touches.length === 2 ) {
         this.dualTouched = true;
        // Calculate the difference in pinch distance since the last event

        //var currentPinchDistanceX = this.getPinchDistanceX(touches[0], touches[1]);
        //var currentPinchDistanceY = this.getPinchDistanceY(touches[0], touches[1]);
        var currentPinchDistance =  this.getPinchDistance(touches[0], touches[1]);//Math.sqrt(currentPinchDistanceX*currentPinchDistanceX + currentPinchDistanceY*currentPinchDistanceY);
        //var diffInPinchDistanceX = currentPinchDistanceX - this.lastPinchDistanceX;
        //var diffInPinchDistanceY = currentPinchDistanceY - this.lastPinchDistanceY;
        var diffInPinchDistance =  currentPinchDistance - this.lastPinchDistance;
       // this.lastPinchDistanceX = currentPinchDistanceX;
       // this.lastPinchDistanceY = currentPinchDistanceY;
        this.lastPinchDistance = currentPinchDistance;

        if (!this.entity.camera.myFakeOrtho && this.entity.camera.projection === pc.PROJECTION_PERSPECTIVE) {
             if (!this.orbitCamera.fovZooming) {
                 this.orbitCamera.distance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.distance * 0.1);
             }
             else {
                var curFOV = this.entity.camera.fov;
                var fov;
                fov = curFOV - diffInPinchDistance * this.distanceSensitivity * 0.1;
                if (fov < this.orbitCamera.minFOV) fov = this.orbitCamera.minFOV;
                if (fov > this.orbitCamera.maxFOV) fov = this.orbitCamera.maxFOV;
                this.entity.camera.fov = fov;

                  if (this.entity.originalCameraFOV) {
                    var fovVal = this.entity.camera.fov * pc.math.DEG_TO_RAD * 0.5;
                    var fovVal2 = this.entity.originalCameraFOV * pc.math.DEG_TO_RAD * 0.5;
                    //r focalLength =  1 / Math.tan(fovVal);
                    var relativeRatio = Math.tan(fovVal) / Math.tan(fovVal2);
                    this.distanceSensitivity = this.originalDistanceSensitivity * relativeRatio;
                 }

             }

        }
        else if (this.orbitCamera.allowOrthoZoom) {
            this.orbitCamera.orthoDistance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.orthoDistance * 0.1);
            this.orbitCamera.fire("orthoHeightChange");
        }

        // Calculate pan difference
        this.calcMidPoint(touches[0], touches[1], pinchMidPoint);
        if (!this.reverseControlScheme) {
            if (this.panEnabled) {
                this.pan(pinchMidPoint);
            }
        }
        else {
            this.orbitCamera.pitch -= (pinchMidPoint.y - this.lastPinchMidPoint.y) * this.orbitSensitivity;

            // todo: this rotate yaw needs to be tested.
            // this.curAxial.x = touches[0].x - this.pinchMidPoint.x;
            // this.curAxial.y = touches[0].y - this.pinchMidPoint.y;
             //this.curAxial.normalize();
             var curRotation = Math.atan2(touches[0].y - pinchMidPoint.y, touches[0].x - pinchMidPoint.x);
            this.orbitCamera.yaw += (curRotation - this.lastRotation) * pc.math.RAD_TO_DEG;
              //Math.acos(this.curAxial.x*this.lastAxial.x + this.curAxial.y*this.lastAxial.y) * pc.math.RAD_TO_DEG;
            //(pinchMidPoint.x - this.lastPinchMidPoint.x) * this.orbitSensitivity;
            this.lastRotation = curRotation;

        }

         //this.lastAxial.x = touches[0].x - this.lastPinchMidPoint.x;
        // this.lastAxial.y = touches[0].y - this.lastPinchMidPoint.y;
        this.lastPinchMidPoint.copy(pinchMidPoint);

    }
};

export default TouchInput;
