// Class: altern.geom.IntersectSlopeUtil

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}

// Constructor

class IntersectSlopeUtil {
	constructor() {
		this.intersectZ = new Float32Array(2);
		this.intersectTimes = new Float32Array(2);
		this.intersectSides = new Array(2);
		this.startPosition = new (jeash_geom_Vector3D().default)();
		this.velocity = new (jeash_geom_Vector3D().default)();
		this.pt3 = new (jeash_geom_Vector3D().default)(70,180,100);
		this.pt1 = new (jeash_geom_Vector3D().default)(100,60,60);
		this.pt2 = new (jeash_geom_Vector3D().default)(90,60,80);
		this.endPt = new (jeash_geom_Vector3D().default)();
		this.startPt = new (jeash_geom_Vector3D().default)(30,60);
	}
	sqDistBetween2DVector(a,b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		return dx * dx + dy * dy;
	}
	rBetween2DVec(a,b,c) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dx2 = c.x - a.x;
		var dy2 = c.y - a.y;
		return dx * dx2 + dy * dy2;
	}
	setupRay(origin,direction) {
		this.startPt.x = origin.x;
		this.startPt.y = origin.y;
		this.startPt.z = origin.z;
		this.velocity.x = direction.x;
		this.velocity.y = direction.y;
		this.velocity.z = 0;
		this.endPt.x = this.startPt.x + this.velocity.x;
		this.endPt.y = this.startPt.y + this.velocity.y;
		this.endPt.z = 0;
	}
	getTriSlopeTrajTime(direction,gravity,strength) {
		var unitDist = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
		this._unitDist = unitDist;
		this.velocity.x = unitDist;
		this.velocity.y = direction.z;
		this.velocity.z = 0;
		var _this = this.velocity;
		var l = Math.sqrt(_this.x * _this.x + _this.y * _this.y + _this.z * _this.z);
		if(l != 0) {
			_this.x /= l;
			_this.y /= l;
			_this.z /= l;
		}
		this.velocity.x *= strength;
		this.velocity.y *= strength;
		this.startPosition.x = -this.intersectTimes[0];
		this.startPosition.y = this.startPt.z - this.intersectZ[0];
		return this.getTrajectoryTimeOfFlight2(this.startPosition.y,this.velocity.y,gravity);
	}
	setupTri(ax,ay,az,bx,by,bz,cx,cy,cz) {
		this.pt1.x = ax;
		this.pt1.y = ay;
		this.pt1.z = az;
		this.pt2.x = bx;
		this.pt2.y = by;
		this.pt2.z = bz;
		this.pt3.x = cx;
		this.pt3.y = cy;
		this.pt3.z = cz;
	}
	getTrajHeightAtTime(velocity,gravity,t) {
		return this.startPt.z - .5 * gravity * t * t + velocity.y * t;
	}
	getTrajHeightAtTime2(direction,gravity,strength,t) {
		return this.startPt.z - .5 * gravity * t * t + direction.y * strength * t;
	}
	getGradHeightAtTime(t) {
		return this.intersectZ[0] + (t - this.intersectTimes[0]) * this.gradient;
	}
	getFlatTrajTime(direction,gravity,strength,grad) {
		if(grad == null) {
			grad = 0;
		}
		this.velocity.x = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
		this.velocity.y = direction.z;
		this.velocity.z = 0;
		var _this = this.velocity;
		var l = Math.sqrt(_this.x * _this.x + _this.y * _this.y + _this.z * _this.z);
		if(l != 0) {
			_this.x /= l;
			_this.y /= l;
			_this.z /= l;
		}
		this.velocity.x *= strength;
		this.velocity.y *= strength;
		this.startPosition.x = 0;
		this.startPosition.y = 0;
		this.gradient = grad;
		return this.getTrajectoryTimeOfFlight2(this.startPosition.y,this.velocity.y,gravity);
	}
	getTrajectoryTimeOfFlight2(yo,vyo,g) {
		var t1 = vyo / g;
		var t2 = Math.sqrt(vyo * vyo + g * 2 * yo) / g;
		this._tRise = t1;
		this._h = yo + vyo * vyo / (2 * g);
		var slope = this.gradient;
		var yIntercept = -this.startPosition.x * this.gradient;
		var A = g / 2;
		var B = -vyo;
		var C = -yo;
		var a = 0.0;
		var b = 0.0;
		var c = 0.0;
		var x1 = 0.0;
		var y1 = 0.0;
		var x2 = 0.0;
		var y2 = 0.0;
		a = A;
		b = B + slope * this.velocity.x;
		c = C - yIntercept;
		var discriminant = b * b - 4 * a * c;
		if(discriminant > 0.0) {
			x1 = (-b + Math.sqrt(discriminant)) / (2.0 * a);
			x2 = (-b - Math.sqrt(discriminant)) / (2.0 * a);
			y1 = slope * x1 + yIntercept;
			y2 = slope * x2 + yIntercept;
			if(x1 > x2) {
				return x1;
			} else {
				return x2;
			}
		} else if(discriminant == 0.0) {
			x1 = -b / (2.0 * a);
			y1 = slope * x1 + yIntercept;
			return x1;
		}
		return -1;
	}
	getTriIntersections() {
		var rd;
		var gotIntersect;
		var count = 0;
		this._coincident = false;
		gotIntersect = this.IsIntersecting(this.startPt,this.endPt,this.pt1,this.pt2);
		if(gotIntersect) {
			this.intersectTimes[count] = this.r;
			this.intersectZ[count] = this.pt2.z * this.s - this.pt1.z * this.s + this.pt1.z;
			this.intersectSides[count] = 3;
			++count;
		}
		gotIntersect = this.IsIntersecting(this.startPt,this.endPt,this.pt2,this.pt3);
		if(gotIntersect) {
			this.intersectTimes[count] = this.r;
			this.intersectZ[count] = this.pt3.z * this.s - this.pt2.z * this.s + this.pt2.z;
			this.intersectSides[count] = 6;
			++count;
		}
		gotIntersect = this.IsIntersecting(this.startPt,this.endPt,this.pt3,this.pt1);
		if(gotIntersect) {
			if(count < 2) {
				this.intersectTimes[count] = this.r;
				this.intersectZ[count] = this.pt1.z * this.s - this.pt3.z * this.s + this.pt3.z;
				this.intersectSides[count] = 5;
				++count;
			}
		}
		var dx = this.endPt.x - this.startPt.x;
		var dy = this.endPt.y - this.startPt.y;
		var temp = this.intersectTimes[0];
		var temp2 = this.intersectZ[0];
		var temp3 = this.intersectSides[0];
		if(this.intersectTimes[1] < temp) {
			this.intersectTimes[0] = this.intersectTimes[1];
			this.intersectZ[0] = this.intersectZ[1];
			this.intersectSides[0] = this.intersectSides[1];
			this.intersectTimes[1] = temp;
			this.intersectZ[1] = temp2;
			this.intersectSides[1] = temp3;
		}
		if(this.intersectTimes[0] < 0) {
			this.intersectZ[0] -= this.intersectTimes[0] / (this.intersectTimes[1] - this.intersectTimes[0]) * (this.intersectZ[1] - this.intersectZ[0]);
			this.intersectTimes[0] = 0;
		}
		if(this._coincident) {
			if(count > 1) {
				rd = this.intersectTimes[1] - this.intersectTimes[0];
				this.gradient = (this.intersectZ[1] - this.intersectZ[0]) / rd;
				return 2;
			} else {
				return -2;
			}
		} else if(count != 0) {
			rd = this.intersectTimes[1] - this.intersectTimes[0];
			if(count > 1) {
				if(rd > 0) {
					this.gradient = (this.intersectZ[1] - this.intersectZ[0]) / rd;
					return 1;
				} else {
					return -1;
				}
			} else {
				return -3;
			}
		} else {
			return 0;
		}
	}
	IsIntersecting(a,b,c,d) {
		var denominator = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
		var numerator1 = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
		var numerator2 = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);
		if(denominator == 0) {
			var tmp;
			var dx = c.x - a.x;
			var dy = c.y - a.y;
			var dx1 = d.x - a.x;
			var dy1 = d.y - a.y;
			if(dx * dx + dy * dy < dx1 * dx1 + dy1 * dy1) {
				tmp = 0;
			} else {
				tmp = 1;
			}
			this.s = tmp;
			var tmp1;
			if(this.s != 0) {
				var dx2 = b.x - a.x;
				var dy2 = b.y - a.y;
				var dx21 = d.x - a.x;
				var dy21 = d.y - a.y;
				tmp1 = dx2 * dx21 + dy2 * dy21;
			} else {
				var dx3 = b.x - a.x;
				var dy3 = b.y - a.y;
				var dx22 = c.x - a.x;
				var dy22 = c.y - a.y;
				tmp1 = dx3 * dx22 + dy3 * dy22;
			}
			this.r = tmp1;
			this._coincident = true;
			return false;
		}
		this.r = numerator1 / denominator;
		this.s = numerator2 / denominator;
		if(this.s >= 0) {
			return this.s <= 1;
		} else {
			return false;
		}
	}
	static get RESULT_NONE() { return RESULT_NONE; }
	static set RESULT_NONE(value) { RESULT_NONE = value; }
	static get RESULT_SLOPE() { return RESULT_SLOPE; }
	static set RESULT_SLOPE(value) { RESULT_SLOPE = value; }
	static get RESULT_WALL() { return RESULT_WALL; }
	static set RESULT_WALL(value) { RESULT_WALL = value; }
	static get RESULT_COLLINEAR() { return RESULT_COLLINEAR; }
	static set RESULT_COLLINEAR(value) { RESULT_COLLINEAR = value; }
	static get RESULT_COLLINEAR_VALID() { return RESULT_COLLINEAR_VALID; }
	static set RESULT_COLLINEAR_VALID(value) { RESULT_COLLINEAR_VALID = value; }
	static get RESULT_ERROR() { return RESULT_ERROR; }
	static set RESULT_ERROR(value) { RESULT_ERROR = value; }
}


// Meta

IntersectSlopeUtil.__name__ = ["altern","geom","IntersectSlopeUtil"];
IntersectSlopeUtil.prototype.__class__ = IntersectSlopeUtil.prototype.constructor = $hxClasses["altern.geom.IntersectSlopeUtil"] = IntersectSlopeUtil;

// Init



// Statics

var RESULT_NONE = 0;
var RESULT_SLOPE = 1;
var RESULT_WALL = -1;
var RESULT_COLLINEAR = -2;
var RESULT_COLLINEAR_VALID = 2;
var RESULT_ERROR = -3;

// Export

exports.default = IntersectSlopeUtil;