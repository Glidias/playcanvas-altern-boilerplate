import "./orbit-camera";

var TransitZooms = pc.createScript('transitZooms');
TransitZooms.attributes.add('zooms', { array:true, type:'vec4',
    description:'{x:offsetX, y:initialY, z:distance, w:fov}. If z and/or w is negative, they represent max/min zoom levels respective instead by magnification coeffecient. Zero z and w values indicate defaults.' }); //
TransitZooms.attributes.add('zoomLevel', { type:'number', precision:1, min:0, default:0 });
TransitZooms.attributes.add('transitionDuration', {type:'number', default:0.3, min:0} );

// initialize code called once per entity
TransitZooms.prototype.initialize = function() {
    this.transitionEnabled = false;
    this._transiting = false;
    this.originalPivotX = 0;
    this.originalPivotY = 0;
    this.originalPivotZ = 0;
    this.on("attr:zoomLevel", this.onZoomLevelChange);
};

TransitZooms.prototype.postInitialize = function() {
     this.setOriginals();
    if (this.zoomLevel > 0) {
      this.onZoomLevelChange(this.zoomLevel);
    }

    this.transitionEnabled = true;
};


TransitZooms.prototype.setOriginals = function() {
    this.distMinOrig = this.entity.script.orbitCamera.distanceMin;
    this.distMaxOrig = this.entity.script.orbitCamera.distanceMax;

    this.offsetXOrig =  this.entity.script.orbitCamera.offsetX;
    this.initialYOrig =  this.entity.script.orbitCamera.initialY;
    this.fovOrig =  this.entity.camera.fov;
    this.distOrig = this.entity.script.orbitCamera._targetDistance;

    this.originalPivotX = this.entity.script.orbitCamera.pivotPoint.x;
    this.originalPivotY = this.entity.script.orbitCamera.pivotPoint.y;
    this.originalPivotZ = this.entity.script.orbitCamera.pivotPoint.z;

};

TransitZooms.prototype.gotOriginalPivotDisplace = function() {
    return this.originalPivotX * this.originalPivotX + this.originalPivotY*this.originalPivotY + this.originalPivotZ*this.originalPivotZ > 0;
};

TransitZooms.prototype.getFOVFromMagnification = function(mag) {
   var factor  = 2.0 * Math.tan(0.5 * this.fovOrig * pc.math.DEG_TO_RAD);
   return 2.0 * Math.atan(factor / (2.0 * mag))  * pc.math.RAD_TO_DEG;
};

TransitZooms.prototype.forceResetPivot = function() {

    this.onZoomLevelChange(0, this.zoomLevel, true);
};

TransitZooms.prototype.onZoomLevelChange = function(val, lastVal, resettingPivot) {
    if (lastVal === 0) {
        this.setOriginals();
    }
    if (resettingPivot) {
         this.originalPivotX = 0;
        this.originalPivotY = 0;
        this.originalPivotZ = 0;
    }
   this.fire("transitionBegin");

    if (val > 0) {
        val--;
        val = val >= 0 ? val < this.zooms.length ? val : this.zooms.length -1 : 0;
        var zm = this.zooms[val];

        this._tarOffsetX = zm.x;
        this._tarInitialY = zm.y;
         this._tarPivotX = 0;
         this._tarPivotY = 0;
         this._tarPivotZ = 0;
        if (zm.z >= 0) {
            this._tarFovZooming = false;
            this._tarDistance = zm.z > 0 ? zm.z : this.distOrig;
            this._tarFOV = zm.w ? zm.w > 0 ? zm.w : this.getFOVFromMagnification(-zm.w) : this.fovOrig;

        }
        else {
            this._tarDistance = 0.000001;
            this._tarFovZooming = true;
             this.entity.script.orbitCamera.minFOV = this.getFOVFromMagnification(-zm.z);
            this._tarFOV =   this.entity.script.orbitCamera.maxFOV = zm.w ? zm.w > 0 ? zm.w : this.getFOVFromMagnification(-zm.w) : this.fovOrig;

        }
    }
    else {
        this._tarFovZooming = false;
        this._tarDistance = this.distOrig;
        this._tarInitialY = this.initialYOrig;
        this._tarOffsetX = this.offsetXOrig;
        this._tarFOV = this.fovOrig;
        this._tarPivotX = this.originalPivotX;
        this._tarPivotY = this.originalPivotY;
        this._tarPivotZ = this.originalPivotZ;
        this._tarDistMin = this.distMinOrig;
        this._tarDistMax = this.distMaxOrig;
    }

    if  (!this.transitionEnabled || this.transitionDuration === 0) {
        this.entity.script.orbitCamera.fovZooming = this._tarFovZooming;
        this.entity.script.orbitCamera._targetDistance = this._tarDistance;
        this.entity.script.orbitCamera.initialY = this._tarInitialY;
        this.entity.script.orbitCamera.offsetX = this._tarOffsetX;
         this.entity.script.orbitCamera.pivotPoint.x = this._tarPivotX;
         this.entity.script.orbitCamera.pivotPoint.y = this._tarPivotY;
         this.entity.script.orbitCamera.pivotPoint.z = this._tarPivotZ;
        this.entity.camera.fov = this._tarFOV;

         this.entity.script.orbitCamera.distanceMin = this._tarDistMin;
        this.entity.script.orbitCamera.distanceMax = this._tarDistMax;

        this._transiting = false;

    }
    else {
        this._startDistance = this.entity.script.orbitCamera._targetDistance;
        this._startInitialY = this.entity.script.orbitCamera.initialY;
        this._startOffsetX = this.entity.script.orbitCamera.offsetX;
        this._startFOV = this.entity.camera.fov;
        this._startPivotX = this.entity.script.orbitCamera.pivotPoint.x;
        this._startPivotY = this.entity.script.orbitCamera.pivotPoint.y;
        this._startPivotZ = this.entity.script.orbitCamera.pivotPoint.z;
        this._time = 0;
        this._duration = this.transitionDuration;
        this._transiting = true;
    }

};

TransitZooms.prototype.lerp = function(a, b, ratio) {
   return a + (b - a) * ratio;
};

// update code called every frame

TransitZooms.prototype.update = function(dt) {
    if (!this._transiting) return;
    this._time += dt;


    var t = this._time / this._duration;
    var isEnd = t>=1;
    t = isEnd ? 1 : t;


    var useRatio = (--t)*t*t+1;
        this.entity.script.orbitCamera._targetDistance = this.lerp(this._startDistance, this._tarDistance, useRatio);
        this.entity.script.orbitCamera.initialY = this.lerp(this._startInitialY, this._tarInitialY, useRatio);
        this.entity.script.orbitCamera.offsetX = this.lerp(this._startOffsetX, this._tarOffsetX, useRatio);
        this.entity.script.orbitCamera.pivotPoint.x = this.lerp(this._startPivotX, this._tarPivotX, useRatio);
        this.entity.script.orbitCamera.pivotPoint.y = this.lerp(this._startPivotY, this._tarPivotY, useRatio);
        this.entity.script.orbitCamera.pivotPoint.z = this.lerp(this._startPivotZ, this._tarPivotZ, useRatio);
        this.entity.camera.fov = this.lerp(this._startFOV, this._tarFOV, useRatio);

    if (isEnd) {
         t = 1;
        this._transiting = false;
        this.entity.script.orbitCamera.fovZooming = this._tarFovZooming;
        if (this.entity.originalCameraFOV) {
            this.entity.script.orbitCamera.setRelativeSensitivities( Math.tan(this.entity.originalCameraFOV*0.5*pc.math.DEG_TO_RAD)/Math.tan(this.entity.originalCameraFOV*0.5*pc.math.DEG_TO_RAD) );
        }
        if (this.zoomLevel !== 0) {
            this.entity.script.orbitCamera.distanceMin = this._tarDistance;
            this.entity.script.orbitCamera.distanceMax = this._tarDistance;
        }
        else {
             this.entity.script.orbitCamera.distanceMin = this.distMinOrig;
            this.entity.script.orbitCamera.distanceMax = this.distMaxOrig;
        }
        this.fire("transitionComplete");
    }


};


