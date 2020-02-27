import Raycaster from '../../hx/altern/ray/Raycaster';
import CollisionBoundNode from '../../hx/altern/collisions/CollisionBoundNode';
import Transform3D from '../../hx/components/Transform3D';

import "./inputs/mouse-input.js";
import "./inputs/keyboard-input.js";
import "./inputs/touch-input.js";

var OrbitCamera = pc.createScript('orbitCamera');

OrbitCamera.attributes.add('raycastScene', { type: 'entity' });
OrbitCamera.attributes.add('distanceMax', {type: 'number', default: 0, title: 'Distance Max', description: 'Setting this at 0 will give an infinite distance limit'});
OrbitCamera.attributes.add('distanceMin', {type: 'number', default: 0, title: 'Distance Min'});
OrbitCamera.attributes.add('distanceInit', {type: 'number', default: 0, title: 'Distance Init'});
OrbitCamera.attributes.add('pitchAngleMax', {type: 'number', default: 90, title: 'Pitch Angle Max (degrees)'});
OrbitCamera.attributes.add('pitchAngleMin', {type: 'number', default: -90, title: 'Pitch Angle Min (degrees)'});


OrbitCamera.attributes.add('inertiaFactor', {
    type: 'number',
    default: 0,
    title: 'Inertia Factor',
    description: 'Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive.'
});

OrbitCamera.attributes.add('focusEntity', {
    type: 'entity',
    title: 'Focus Entity',
    description: 'Entity for the camera to focus on. If blank, then the camera will use the whole scene'
});

OrbitCamera.attributes.add('heightMapEntity', {
    type: 'entity',
    title: 'HeightMap Entity',
    description: 'Entity containing possible reference to .heightMap'
});

OrbitCamera.attributes.add('heightMapOffset', {type: 'number', default: 128, title: 'Heightmap Offset', description: 'Offset from heightmap clamp position'});

OrbitCamera.attributes.add('frameOnStart', {
    type: 'boolean',
    default: false,
    title: 'Frame on Start',
    description: 'Frames the entity or scene at the start of the application."'
});

OrbitCamera.attributes.add('raycastDistance', {
    type: 'boolean',
    default: false
});

OrbitCamera.attributes.add('raycastUp', {
    type: 'boolean',
    default: false
});
OrbitCamera.attributes.add('raycastRight', {
    type: 'boolean',
    default: false
});
OrbitCamera.attributes.add('rayOffsetThreshold', {
    type: 'number',
    default: 0.0000001, min:0
});

OrbitCamera.attributes.add('panTargetEntity', {
    type: 'entity',
    description: 'Target entity to perform pan movement along camera yaw oriented x/z plane (conventional top view)'
});

OrbitCamera.attributes.add('allowOrthoZoom', {
    type: 'boolean',
    default: true,
    description: 'Flag to allow orthographic zooming via input controls'
});

OrbitCamera.attributes.add('minOrthoHeight', {
    type: 'number',
    title: 'Ortho Min Height',
    default: 0,  min: 0,
    description: 'Stipulated min ortho height. Zero value will auto-calculate value from min distance/fov itself'
});

OrbitCamera.attributes.add('maxOrthoHeight', {
    type: 'number',
    title: 'Ortho Max Height',
    default: 0,  min: 0,
    description: 'Stipulated max ortho height. Zero value will auto-calculate value from max distance/fov itself'
});


// Property to get and set the distance between the pivot point and camera
// Clamped between this.distanceMin and this.distanceMax
Object.defineProperty(OrbitCamera.prototype, "distance", {
    get: function() {
        return this._targetDistance;
    },

    set: function(value) {
        this._targetDistance = this._clampDistance(value);
    }
});


Object.defineProperty(OrbitCamera.prototype, "orthoDistance", {
    get: function() {
        return this._targetOrthoDistance >= 0 ? this._targetOrthoDistance : this.getDistanceFromOrthoHeight(this.entity.camera.data.camera.orthoHeight);
    },

    set: function(value) {
        this._targetOrthoDistance = this._clampOrthoDistance(value);
        this.entity.camera.orthoHeight = Math.tan(this.entity.camera.fov * 0.5 * pc.math.DEG_TO_RAD)*this._targetOrthoDistance;
        if (this.entity.camera.myFakeOrtho) this.updateFakeOrthoProjMatrix();
    }
});


// Property to get and set the pitch of the camera around the pivot point (degrees)
// Clamped between this.pitchAngleMin and this.pitchAngleMax
// When set at 0, the camera angle is flat, looking along the horizon
Object.defineProperty(OrbitCamera.prototype, "pitch", {
    get: function() {
        return this._targetPitch;
    },

    set: function(value) {
        this._targetPitch = this._clampPitchAngle(value);
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(OrbitCamera.prototype, "yaw", {
    get: function() {
        return this._targetYaw;
    },

    set: function(value) {
        this._targetYaw = value;

        // Ensure that the yaw takes the shortest route by making sure that
        // the difference between the targetYaw and the actual is 180 degrees
        // in either direction
        var diff = this._targetYaw - this._yaw;
        var reminder = diff % 360;
        if (reminder > 180) {
            this._targetYaw = this._yaw - (360 - reminder);
        } else if (reminder < -180) {
            this._targetYaw = this._yaw + (360 + reminder);
        } else {
            this._targetYaw = this._yaw + reminder;
        }
    }
});

OrbitCamera.prototype.panByAmount = function(vec) {
    if (!this.panTargetEntity) {
        this.pivotPoint.x += vec.x;
        this.pivotPoint.y += vec.y;
        this.pivotPoint.z += vec.z;
    }
    else {
        var pos = this.panTargetEntity.getPosition();
        pos.x += vec.x;
        pos.y += vec.y;
        pos.z += vec.z;
        this.panTargetEntity.setPosition(pos);
    }
};

OrbitCamera.prototype.sanitizeYaw  = function() {
    this._targetYaw =  this._targetYaw % 360;
    if (Math.abs(this._targetYaw) >= 180) {
        this._targetYaw = this._targetYaw >= 0 ? this._targetYaw - 360 : this._targetYaw + 360;
    }
  //this.yaw = this._targetYaw;
    //alert(this._targetYaw);
};

OrbitCamera.prototype.getSanitizedYawVal  = function(val) {
    val =  val % 360;
    if (Math.abs(val) >= 180) {
        val =  val>= 0 ? val - 360 : val + 360;
    }
    return val;
};


// Property to get and set the world position of the pivot point that the camera orbits around
Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
    get: function() {
        return this._pivotPoint;
    },

    set: function(value) {
        this._pivotPoint.copy(value);
    }
});


OrbitCamera.prototype.resetPivotPoint = function() {
    this._pivotPoint.x = 0;
    this._pivotPoint.y = 0;
    this._pivotPoint.z = 0;

};

// Moves the camera to look at an entity and all its children so they are all in the view
OrbitCamera.prototype.focus = function (focusEntity) {
    // Calculate an bounding box that encompasses all the models to frame in the camera view
    //this._buildAabb(focusEntity, 0);

    var halfExtents = this._modelsAabb.halfExtents;

    var distance = Math.max(halfExtents.x, Math.max(halfExtents.y, halfExtents.z));
    distance = (distance / Math.tan(0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD));
    distance = (distance * 2);

    this.distance = distance;

    this._removeInertia();

    this._pivotPoint.copy(this._modelsAabb.center);
};


OrbitCamera.distanceBetween = new pc.Vec3();

// Set the camera position to a world position and look at a world position
// Useful if you have multiple viewing angles to swap between in a scene
OrbitCamera.prototype.resetAndLookAtPoint = function (resetPoint, lookAtPoint) {
    this._pivotPoint.copy(lookAtPoint);
    this.entity.setLocalPosition(resetPoint);

    this.entity.lookAt(lookAtPoint);


    var distance = OrbitCamera.distanceBetween;
   // distance.sub2(lookAtPoint, resetPoint);  // i think only for bounds?
   // this.distance = distance.length();

    //console.log("RESETING");


    this._pivotPoint.copy(lookAtPoint);

    var cameraQuat = this.entity.getRotation();
    this.yaw = this._calcYaw(cameraQuat);
    this.pitch = this._calcPitch(cameraQuat, this.yaw);

    this._removeInertia();
    this._updatePosition();
};


// Set camera position to a world position and look at an entity in the scene
// Useful if you have multiple models to swap between in a scene
OrbitCamera.prototype.resetAndLookAtEntity = function (resetPoint, entity) {
    //this._buildAabb(entity, 0);
    //this.resetAndLookAtPoint(resetPoint, this._modelsAabb.center);
    //
    this.resetAndLookAtPoint(resetPoint, (this.focusEntity || this.app.root).getLocalPosition());
};


// Set the camera at a specific, yaw, pitch and distance without inertia (instant cut)
OrbitCamera.prototype.reset = function (yaw, pitch, distance) {
    this.pitch = pitch;
    this.yaw = yaw;
    this.distance = distance;
    this._removeInertia();
};

OrbitCamera.prototype.enableControls = function (val) {
   if ((this.initControlMask & 1)) this.entity.script.mouseInput.enabled = val;
   if ((this.initControlMask & 2)) this.entity.script.touchInput.enabled = val;
   if ((this.initControlMask & 4)) this.entity.script.keyboardInput.enabled = val;
};

OrbitCamera.prototype.setSecondaryControlsEnabled = function (val) {
   if ((this.initControlMask & 1)) this.entity.script.mouseInput.panEnabled = val;
   if ((this.initControlMask & 2)) this.entity.script.touchInput.panEnabled = val;
};

OrbitCamera.prototype.setYawOrientedPan = function (val) {
   if ((this.initControlMask & 1)) this.entity.script.mouseInput.yawOrientedPan = val;
   if ((this.initControlMask & 2)) this.entity.script.touchInput.yawOrientedPan = val;
};

OrbitCamera.prototype.setRelativeSensitivities = function (ratio) {
   if ((this.initControlMask & 1)) this.entity.script.mouseInput.orbitSensitivity = this.entity.script.mouseInput.originalOrbitSensitivity;
   if ((this.initControlMask & 2)) this.entity.script.touchInput.distanceSensitivity = this.entity.script.touchInput.originalDistanceSensitivity;
};

OrbitCamera.prototype.setReverseControlScheme = function (val) {
   if ((this.initControlMask & 1)) this.entity.script.mouseInput.reverseControlScheme = val;
   if ((this.initControlMask & 2)) this.entity.script.touchInput.reverseControlScheme = val;
};

OrbitCamera.prototype.getOrthoHeightFromDistance = function (dist) {
    return Math.tan(this.entity.camera.fov * 0.5 * pc.math.DEG_TO_RAD)*dist;
};

OrbitCamera.prototype.getDistanceFromOrthoHeight = function (height) {
    return height/Math.tan(this.entity.camera.fov * 0.5 * pc.math.DEG_TO_RAD);
};

/////////////////////////////////////////////////////////////////////////////////////////////

OrbitCamera.prototype.initialize = function () {
    this.initControlMask = 0;
    this.initControlMask |= this.entity.script.mouseInput && this.entity.script.mouseInput.enabled ? 1 : 0;
    this.initControlMask |= this.entity.script.touchInput && this.entity.script.touchInput.enabled ? 2 : 0;
    this.initControlMask |= this.entity.script.keyboardInput && this.entity.script.keyboardInput.enabled ? 4 : 0;
    this.entity.originalCameraFOV = this.entity.camera.fov;

    this.inputDetectMask = 0;
};

OrbitCamera.prototype.calculateOrthoDistClamps = function() {
    var min = this.minOrthoHeight;
    var max = this.maxOrthoHeight;
    if (min > 0) this._distanceOrthoMin = this.getDistanceFromOrthoHeight(min);
    else this._distanceOrthoMin = this.distanceMin;
    if (max > 0) this._distanceOrthoMax = this.getDistanceFromOrthoHeight(max);
    else this._distanceOrthoMax = this.distanceMax;
};

OrbitCamera.prototype.notifyOrthoHeightChange = function() {
    this._targetOrthoDistance = this.getDistanceFromOrthoHeight(this.entity.camera.data.camera.orthoHeight);
    //console.log("current distance:"+this._targetOrthoDistance + " :: "+this._distanceOrthoMin + " / "+this._distanceOrthoMax + " from:"+this.entity.camera.data.camera.orthoHeight);
};


OrbitCamera.prototype.postInitialize = function () {
    var collisionScene = !this.raycastScene ? this.app.root.collisionScene || (this.app.root.children.length ? this.app.root.children[0].collisionScene : null) || ( window["Rootscene"] ? Rootscene.SCENE :  null) : this.raycastScene.collisionScene;
    var self = this;
    var onWindowResize = function () {
        self._checkAspectRatio();
    };

    this.raycaster = collisionScene ? new Raycaster( collisionScene ) : null;
    if (this.raycaster == null) {
        console.log("orbit-camera:: no Rootscene found for backray-casting!");
        this.raycaster = new Raycaster( CollisionBoundNode.create(new Transform3D()) );
    }
    this.backRay = new pc.Vec3();
    this.testVec = new pc.Vec3();

    window.addEventListener('resize', onWindowResize, false);

    this._checkAspectRatio();

    this.initialY = this.entity.getLocalPosition().y;

    this.offsetX = this.entity.getLocalPosition().x;
    var focusingEntity = this.focusEntity || this.app.root;

    // Find all the models in the scene that are under the focused entity
    //this._modelsAabb = new pc.BoundingBox();
    //this._buildAabb(this.focusEntity || this.app.root, 0);
    //this.entity.lookAt(this._modelsAabb.center);
    //
    this.entity.lookAt(focusingEntity.getLocalPosition());

    this._pivotPoint = new pc.Vec3();
    //this._pivotPoint.copy(this._modelsAabb.center);
    //
    this._pivotPoint.copy(focusingEntity.getLocalPosition());

    // Calculate the camera euler angle rotation around x and y axes
    // This allows us to place the camera at a particular rotation to begin with in the scene
    var cameraQuat = this.entity.getRotation();

    // Preset the camera
    this._yaw = this._calcYaw(cameraQuat);
    this._pitch = this._clampPitchAngle(this._calcPitch(cameraQuat, this._yaw));
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    this._distance = this._clampDistance(this.distanceInit);
    this.distanceInit = this._distance;
    this.rayClampDistance = this._distance;


    this._targetYaw = this._yaw;
    this._targetPitch = this._pitch;

    //this.initFrameOnStart();

    this._targetDistance = this._distance;

    this._targetOrthoDistance = -1;
    this.calculateOrthoDistClamps();


    // Reapply the clamps if they are changed in the editor
    //
    this.on('attr:minOrthoHeight', function (value, prev) {
       if (value > 0) this._distanceOrthoMin = this.getDistanceFromOrthoHeight(value);
       else this._distanceOrthoMin = this.distanceMin;
    });
    this.on('attr:maxOrthoHeight', function (value, prev) {
      if (value > 0) this._distanceOrthoMax = this.getDistanceFromOrthoHeight(value);
       else this._distanceOrthoMax = this.distanceMax;
    });

    this.on('attr:distanceMin', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
        if (this.minOrthoHeight === 0) this._distanceOrthoMin = value;
    });

    this.on('attr:distanceMax', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
        if (this.maxOrthoHeight === 0) this._distanceOrthoMax = value;
    });

    this.on('attr:pitchAngleMin', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    });

    this.on('attr:pitchAngleMax', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    });

    // Focus on the entity if we change the focus entity
    this.on('attr:focusEntity', function (value, prev) {
        if (this.frameOnStart) {
            this.focus(value || this.app.root);
        } else {
            this.resetAndLookAtEntity(this.entity.getLocalPosition(), value || this.app.root);
        }
    });


    this.on('attr:frameOnStart', function (value, prev) {
        if (value) {
            this.focus(this.focusEntity || this.app.root);
        }
    });

    this.on('destroy', function() {
        window.removeEventListener('resize', onWindowResize, false);
    });
};

/*  // old function might reinstate or forget..
OrbitCamera.prototype.initFrameOnStart = function() {
   // If we have ticked focus on start, then attempt to position the camera where it frames
    // the focused entity and move the pivot point to entity's position otherwise, set the distance
    // to be between the camera position in the scene and the pivot point
    if (this.frameOnStart) {
        this.focus(this.focusEntity || this.app.root);
    } else {
        var distanceBetween = new pc.Vec3();
        distanceBetween.sub2(this.entity.getLocalPosition(), this._pivotPoint);
        this._distance = this._clampDistance(distanceBetween.length());
    }
};
*/

OrbitCamera.prototype.update = function(dt) {
    // Add inertia, if any
    var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

    var initialY = this.initialY;
    this._updatePosition(  this.raycastDistance && this._distance > 0 ? this.doRaycastDist(initialY) : null);
};

OrbitCamera.prototype.updateFakeOrthoProjMatrix = function() {
    var y = this.entity.camera.data.camera.orthoHeight;
    var x = y * this.entity.camera.aspectRatio;
    this.entity.camera.projectionMatrix.setOrtho(-x, x, -y, y, this.entity.camera.nearClip, this.entity.camera.farClip);
};

OrbitCamera.prototype.doRaycastDist = function(initY) {

    var pos = null;
    //var lastPos = this.entity.getPosition();
    //this._updatePosition();
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);
    var forward = this.entity.forward;
    var back = this.backRay;
    back.copy(forward);
    back.x *=-1;
    back.y *=-1;
    back.z *=-1;


    this.entity.setLocalPosition(this._pivotPoint.x, this._pivotPoint.y + initY,  this._pivotPoint.z);
    /*
    var wt = this.entity.getWorldTransform();
    this.testVec.x = this._pivotPoint.x;
    this.testVec.y = this._pivotPoint.y + initY;
    this.testVec.z = this._pivotPoint.z;


    wt.transformPoint(this.testVec, this.testVec);
    */
    var srcPos = this.entity.getPosition();
    //srcPos.x -= forward.x * _;
    //srcPos.y -= forward.x;
    //srcPos.z -= forward.x;


    //srcPos.add(forward.scale(this._distance));
    // TODO: Re-enable this only when Haxe codebase scales distances of w property
    this.raycaster.setIgnoreDistance(this._distance);

    pos = this.raycaster.positionAndDirection(srcPos.x, srcPos.y, srcPos.z, back.x, back.y, back.z).gotHit();
    var d = null;


    // for now, ignore distance
    if (pos && pos.w < this._targetDistance) {
      d = this._clampDistanceAbs(pos.w-this.rayOffsetThreshold);
      this.rayClampDistance = d;
    }
    else {
        this.rayClampDistance = this._targetDistance;
    }

   // this.entity.setPosition(lastPos.x, lastPos.y, lastPos.z);
    return d;

};

if (typeof importScripts !== 'function') {
    OrbitCamera.DUMMY_ENTITY = new pc.Entity();  // a dummy parentless entity for quick transform calculations
}

OrbitCamera.prototype._updatePosition = function (useDistance) {

    if (useDistance==null) useDistance = this._distance;

    // Work out the camera position based on the pivot point, pitch, yaw and distance
    this.entity.setLocalPosition(0,0,0);
   //
    //var dummy =OrbitCamera.DUMMY_ENTITY;
    // hack to get forward vector initially in global coordinate space based off pitch and yaw
    //dummy.setLocalEulerAngles(this._pitch, this._yaw, 0);


    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);
     var forward = this.entity.forward;
    var right = this.entity.right;

    var position = this.entity.getLocalPosition();

    position.x = forward.x * -useDistance;
    position.y = forward.y * -useDistance;
    position.z = forward.z * -useDistance;

    //this.entity.getLocalTransform().transformVector()

    position.y += this.initialY;


  // this.testVec.set(this.initialY, 0, 0);

    //position.add(this._pivotPoint);
    position.x += this._pivotPoint.x;
    position.y += this._pivotPoint.y;
    position.z += this._pivotPoint.z;

    var w = this.offsetX;
     if (this.raycastRight && w !== 0) {
         this.entity.setLocalPosition(position);
        var gPos = this.entity.getPosition();
        // TODO: Re-enable this only when Haxe codebase scales distances of w property
        this.raycaster.setIgnoreDistance(w);
        pos = this.raycaster.positionAndDirection(gPos.x, gPos.y, gPos.z, right.x, right.y, right.z).gotHit();
         if (pos && pos.w < w) {
             w = pos.w;
             w -= this.rayOffsetThreshold;
             if (w < 0) w = 0;
         }
    }
    position.x += right.x*w;
    position.y += right.y*w;
    position.z += right.z*w;

 // check for heightmap
    if (this.heightMapEntity!= null && this.heightMapEntity.heightMap != null) {
        var yPosClamp = this.heightMapEntity.heightMap.Sample(position.x, position.z);
        yPosClamp += this.heightMapOffset;
        if (position.y < yPosClamp) position.y = yPosClamp;
    }

    this.entity.setLocalPosition(position);
};


OrbitCamera.prototype._removeInertia = function () {
    this._yaw = this._targetYaw;
    this._pitch = this._targetPitch;
    this._distance = this._targetDistance;
};


OrbitCamera.prototype._checkAspectRatio = function () {
    var height = this.app.graphicsDevice.height;
    var width = this.app.graphicsDevice.width;

    // Match the axis of FOV to match the aspect ratio of the canvas so
    // the focused entities is always in frame
    this.entity.camera.horizontalFov = height > width;
};


OrbitCamera.prototype._buildAabb = function (entity, modelsAdded) {
    var i = 0;

    if (entity.model) {
        var mi = entity.model.meshInstances;
        for (i = 0; i < mi.length; i++) {
            if (modelsAdded === 0) {
                this._modelsAabb.copy(mi[i].aabb);
            } else {
                this._modelsAabb.add(mi[i].aabb);
            }

            modelsAdded += 1;
        }
    }

    for (i = 0; i < entity.children.length; ++i) {
        modelsAdded += this._buildAabb(entity.children[i], modelsAdded);
    }

    return modelsAdded;
};


OrbitCamera.prototype._calcYaw = function (quat) {
    var transformedForward = new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
};


OrbitCamera.prototype._clampDistanceAbs = function (distance) {
    if (this.distanceMax > 0) {
        return pc.math.clamp(distance, 0, this.distanceMax);
    } else {
        return Math.max(distance, 0);
    }
};


OrbitCamera.prototype._clampDistance = function (distance) {
    if (this.distanceMax > 0) {
        return pc.math.clamp(distance, this.distanceMin, this.distanceMax);
    } else {
        return Math.max(distance, this.distanceMin);
    }
};

OrbitCamera.prototype._clampOrthoDistance = function (distance) {
    if (this._distanceOrthoMax > 0) {
        return pc.math.clamp(distance, this._distanceOrthoMin, this._distanceOrthoMax);
    } else {
        return Math.max(distance, this._distanceOrthoMin);
    }
};


OrbitCamera.prototype._clampPitchAngle = function (pitch) {
    // Negative due as the pitch is inversed since the camera is orbiting the entity
    return pc.math.clamp(pitch, -this.pitchAngleMax, -this.pitchAngleMin);
};


OrbitCamera.quatWithoutYaw = new pc.Quat();
OrbitCamera.yawOffset = new pc.Quat();

OrbitCamera.prototype._calcPitch = function(quat, yaw) {
    var quatWithoutYaw = OrbitCamera.quatWithoutYaw;
    var yawOffset = OrbitCamera.yawOffset;

    yawOffset.setFromEulerAngles(0, -yaw, 0);
    quatWithoutYaw.mul2(yawOffset, quat);

    var transformedForward = new pc.Vec3();

    quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
};