var MouseInput = pc.createScript('mouseInput');
MouseInput.MASK_VALUE = 1;

MouseInput.attributes.add('orbitSensitivity', {
    type: 'number',
    default: 0.3,
    title: 'Orbit Sensitivity',
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

MouseInput.attributes.add('distanceSensitivity', {
    type: 'number',
    default: 0.15,
    title: 'Distance Sensitivity',
    description: 'How fast the camera moves in and out. Higher is faster'
});

MouseInput.attributes.add('panEnabled', {
    type: 'boolean',
    default: true,
    title: 'Panning Allowed',
    description: 'Is panning allowed via right mouse button?'
});

MouseInput.attributes.add('yawOrientedPan', {
    type: 'boolean',
    enum: [
      { 'None': false },
      { '(x,z) Top': true },
    ],
    title: "Pan Plane 2D",
    description: "Pan along camera yaw oriented 2D plane?",
    default: false
});

MouseInput.attributes.add('reverseControlScheme', {
    type: 'boolean',
    default: false,
    title: 'Reverse Control Scheme'
});

// initialize code called once per entity
MouseInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    this.mouseOutHandler = this.onMouseOut.bind(this);

    this.calcMatrix = new pc.Mat4();

    this.fromWorldPoint = new pc.Vec3();
    this.toWorldPoint = new pc.Vec3();
    this.worldDiff = new pc.Vec3();

    this.originalOrbitSensitivity = this.orbitSensitivity;

    if (this.orbitCamera) {
       // var self = this;

       // var onMouseOut = function (e) {
        //   self.onMouseOut(e);
       // };
        this.initListeners();


        this.on('enable', function() {
          this.initListeners();
        }, this);

         this.on('disable', function() {
          this.disableListeners();
        }, this);

        // Remove the listeners so if this entity is destroyed
        this.on('destroy', function() {
          this.disableListeners();
        }, this);
    }

    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();

    this.lookButtonDown = false;
    this.panButtonDown = false;
    this.lastPoint = new pc.Vec2();
};



MouseInput.prototype.initListeners = function() {
     this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

     // Listen to when the mouse travels out of the window
    window.addEventListener('mouseout', this.mouseOutHandler, false);
};

MouseInput.prototype.disableListeners = function() {
      this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

    window.removeEventListener('mouseout', this.mouseOutHandler, false);
};





MouseInput.prototype.pan = function(screenPoint) {
    var fromWorldPoint = this.fromWorldPoint;
    var toWorldPoint = this.toWorldPoint;
    var worldDiff = this.worldDiff;


    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;


         // For panning to work at any zoom level, we use screen point to world projection
        // to work out how far we need to pan the pivotEntity in world space
        var lastFarClip;
   if (!this.yawOrientedPan) {
        camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
        camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);
       worldDiff.sub2(toWorldPoint, fromWorldPoint);
    }
    else {

      //  /*
      if (this.entity.camera.myFakeOrtho)  this.entity.camera.data.camera._projection = pc.PROJECTION_ORTHOGRAPHIC;
      camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
        camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);
       worldDiff.sub2(toWorldPoint, fromWorldPoint);
      if (this.entity.camera.myFakeOrtho)  this.entity.camera.data.camera._projection = pc.PROJECTION_PERSPECTIVE;
      // */

        /*
        var viewSizeX =  this.app.graphicsDevice.clientRect.width * 0.5;
        var viewSizeY =  this.app.graphicsDevice.clientRect.height * 0.5;
        var focalLength = Math.sqrt(viewSizeX * viewSizeX + viewSizeY * viewSizeY) / Math.tan(this.entity.camera.fov * 0.5);
        worldDiff.x = screenPoint.x - viewSizeX;
        worldDiff.y =  (1 - screenPoint.y) - viewSizeX;
        worldDiff.z = distance;
        var ratio = worldDiff.z / focalLength;
        worldDiff.x *= ratio;
        worldDiff.y *= ratio;
       //this.entity.getWorldTransform().transformPoint(worldDiff, worldDiff);
        console.log(worldDiff);
        */

        ///*
        if (!this.entity.camera.myFakeOrtho && this.entity.camera.projection === pc.PROJECTION_PERSPECTIVE) {
            var scale = worldDiff.length();
            var dx = this.lastPoint.x - screenPoint.x;
            var dy = this.lastPoint.y - screenPoint.y;
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
        //*/

    }


    this.orbitCamera.panByAmount(worldDiff);
};


MouseInput.prototype.onMouseDown = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = true;
        } break;

        case pc.MOUSEBUTTON_MIDDLE:
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = true;
        } break;
    }


    this.orbitCamera.inputDetectMask |= MouseInput.MASK_VALUE;
};


MouseInput.prototype.onMouseUp = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = false;
        } break;

        case pc.MOUSEBUTTON_MIDDLE:
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = false;

        } break;
    }


    this.orbitCamera.inputDetectMask &= ~MouseInput.MASK_VALUE;
    if (event.button === pc.MOUSEBUTTON_RIGHT) {
       this.orbitCamera.fire("panRelease");
    }

};


MouseInput.prototype.onMouseMove = function (event) {
    var mouse = pc.app.mouse;
    var mask = this.lookButtonDown ? (!this.reverseControlScheme ? 1 : 2) : 0;
    mask |= this.panButtonDown ? (!this.reverseControlScheme ? 2 : 1) : 0;

    if ( (mask & 1) ) {
        this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
        this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;

    } else if (this.panEnabled && (mask & 2)) {
        this.pan(event);
    }

    this.lastPoint.set(event.x, event.y);
};


MouseInput.prototype.onMouseWheel = function (event) {
    if (!this.entity.camera.myFakeOrtho && this.entity.camera.projection === pc.PROJECTION_PERSPECTIVE) {
        if (!this.orbitCamera.fovZooming) this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
        else {
            var curFOV = this.entity.camera.fov;
            var fov;
            fov = curFOV - event.wheel * this.distanceSensitivity;
            if (fov < this.orbitCamera.minFOV) fov = this.orbitCamera.minFOV;
            if (fov > this.orbitCamera.maxFOV) fov = this.orbitCamera.maxFOV;
            this.entity.camera.fov = fov;


            if (this.entity.originalCameraFOV) {
                var fovVal = this.entity.camera.fov * pc.math.DEG_TO_RAD * 0.5;
                var fovVal2 = this.entity.originalCameraFOV * pc.math.DEG_TO_RAD * 0.5;
                //r focalLength =  1 / Math.tan(fovVal);
                var relativeRatio = Math.tan(fovVal) / Math.tan(fovVal2);
                this.orbitSensitivity = this.originalOrbitSensitivity * relativeRatio;
            }

        }
    }
    else if (this.orbitCamera.allowOrthoZoom) {
        this.orbitCamera.orthoDistance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.orthoDistance * 0.1);
        this.orbitCamera.fire("orthoHeightChange");
    }


  //  var widthAspect =  this.app.graphicsDevice.clientRect.height /  this.app.graphicsDevice.clientRect.width;
   // var heightAspect = 1/widthAspect;
    //var viewSizeX =  this.app.graphicsDevice.clientRect.width * 0.5;
    //    var viewSizeY =  this.app.graphicsDevice.clientRect.height * 0.5;
   //  HEIGHT / 2 / Math.tan(VIEW_ANGLE/2 * Math.PI / 360);
  // var focalLength = 1 / Math.tan(this.entity.camera.fov*widthAspect*0.5*pc.math.DEG_TO_RAD);
        //var focalLength = Math.sqrt(viewSizeX * viewSizeX + viewSizeY * viewSizeY) / Math.tan(this.entity.camera.fov * 0.5 * pc.math.DEG_TO_RAD);
   // console.log(Math.tan(this.entity.camera.fov * 0.5 * pc.math.DEG_TO_RAD) * 100);
   // event.event.preventDefault();
};


MouseInput.prototype.onMouseOut = function (event) {
    this.lookButtonDown = false;
    this.panButtonDown = false;
};