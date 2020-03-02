// Class: systems.collisions.EllipsoidCollider

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}
function systems_collisions_CollisionEvent() {return require("./../../systems/collisions/CollisionEvent");}
function components_Transform3D() {return require("./../../components/Transform3D");}

// Constructor

class EllipsoidCollider {
	constructor(radiusX,radiusY,radiusZ,threshold,requireEvents) {
		if(requireEvents == null) {
			requireEvents = false;
		}
		if(threshold == null) {
			threshold = 0.001;
		}
		this.threshold = threshold;
		this.timestamp = 0;
		this.requireEvents = requireEvents;
		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.radiusZ = radiusZ;
		this.matrix = new (components_Transform3D().default)();
		this.inverseMatrix = new (components_Transform3D().default)();
		this.sphere = new (jeash_geom_Vector3D().default)();
		this.cornerA = new (jeash_geom_Vector3D().default)();
		this.cornerB = new (jeash_geom_Vector3D().default)();
		this.cornerC = new (jeash_geom_Vector3D().default)();
		this.cornerD = new (jeash_geom_Vector3D().default)();
		this.resultVector = new (jeash_geom_Vector3D().default)();
		this.collisionPoint = new (jeash_geom_Vector3D().default)();
		this.collisionPlane = new (jeash_geom_Vector3D().default)();
		this.resCollisionPoint = new (jeash_geom_Vector3D().default)();
		this.resCollisionPlane = new (jeash_geom_Vector3D().default)();
		this.geometries = EllipsoidCollider.GEOMETRIES;
		this.transforms = EllipsoidCollider.TRANSFORMS;
		this.numGeometries = 0;
		this.vertices = EllipsoidCollider.VERTICES;
		this.normals = EllipsoidCollider.NORMALS;
		this.indices = EllipsoidCollider.INDICES;
		this.numI = 0;
		this.displ = new (jeash_geom_Vector3D().default)();
		this.dest = new (jeash_geom_Vector3D().default)();
		this.src = new (jeash_geom_Vector3D().default)();
	}
	purge() {
		this.transforms.length = 0;
		this.geometries.length = 0;
		this.normals.length = 0;
		this.indices.length = 0;
		this.vertices.length = 0;
	}
	calculateSphere(transform) {
		this.sphere.x = transform.d;
		this.sphere.y = transform.h;
		this.sphere.z = transform.l;
		var sax = transform.a * this.cornerA.x + transform.b * this.cornerA.y + transform.c * this.cornerA.z + transform.d;
		var say = transform.e * this.cornerA.x + transform.f * this.cornerA.y + transform.g * this.cornerA.z + transform.h;
		var saz = transform.i * this.cornerA.x + transform.j * this.cornerA.y + transform.k * this.cornerA.z + transform.l;
		var sbx = transform.a * this.cornerB.x + transform.b * this.cornerB.y + transform.c * this.cornerB.z + transform.d;
		var sby = transform.e * this.cornerB.x + transform.f * this.cornerB.y + transform.g * this.cornerB.z + transform.h;
		var sbz = transform.i * this.cornerB.x + transform.j * this.cornerB.y + transform.k * this.cornerB.z + transform.l;
		var scx = transform.a * this.cornerC.x + transform.b * this.cornerC.y + transform.c * this.cornerC.z + transform.d;
		var scy = transform.e * this.cornerC.x + transform.f * this.cornerC.y + transform.g * this.cornerC.z + transform.h;
		var scz = transform.i * this.cornerC.x + transform.j * this.cornerC.y + transform.k * this.cornerC.z + transform.l;
		var sdx = transform.a * this.cornerD.x + transform.b * this.cornerD.y + transform.c * this.cornerD.z + transform.d;
		var sdy = transform.e * this.cornerD.x + transform.f * this.cornerD.y + transform.g * this.cornerD.z + transform.h;
		var sdz = transform.i * this.cornerD.x + transform.j * this.cornerD.y + transform.k * this.cornerD.z + transform.l;
		var dx = sax - this.sphere.x;
		var dy = say - this.sphere.y;
		var dz = saz - this.sphere.z;
		this.sphere.w = dx * dx + dy * dy + dz * dz;
		dx = sbx - this.sphere.x;
		dy = sby - this.sphere.y;
		dz = sbz - this.sphere.z;
		var dxyz = dx * dx + dy * dy + dz * dz;
		if(dxyz > this.sphere.w) {
			this.sphere.w = dxyz;
		}
		dx = scx - this.sphere.x;
		dy = scy - this.sphere.y;
		dz = scz - this.sphere.z;
		dxyz = dx * dx + dy * dy + dz * dz;
		if(dxyz > this.sphere.w) {
			this.sphere.w = dxyz;
		}
		dx = sdx - this.sphere.x;
		dy = sdy - this.sphere.y;
		dz = sdz - this.sphere.z;
		dxyz = dx * dx + dy * dy + dz * dz;
		if(dxyz > this.sphere.w) {
			this.sphere.w = dxyz;
		}
		this.sphere.w = Math.sqrt(this.sphere.w);
	}
	prepare(source,displacement) {
		this.radius = this.radiusX;
		if(this.radiusY > this.radius) {
			this.radius = this.radiusY;
		}
		if(this.radiusZ > this.radius) {
			this.radius = this.radiusZ;
		}
		this.matrix.compose(source.x,source.y,source.z,0,0,0,this.radiusX / this.radius,this.radiusY / this.radius,this.radiusZ / this.radius);
		this.inverseMatrix.copy(this.matrix);
		this.inverseMatrix.invert();
		this.src.x = 0;
		this.src.y = 0;
		this.src.z = 0;
		this.displ.x = this.inverseMatrix.a * displacement.x + this.inverseMatrix.b * displacement.y + this.inverseMatrix.c * displacement.z;
		this.displ.y = this.inverseMatrix.e * displacement.x + this.inverseMatrix.f * displacement.y + this.inverseMatrix.g * displacement.z;
		this.displ.z = this.inverseMatrix.i * displacement.x + this.inverseMatrix.j * displacement.y + this.inverseMatrix.k * displacement.z;
		this.dest.x = this.src.x + this.displ.x;
		this.dest.y = this.src.y + this.displ.y;
		this.dest.z = this.src.z + this.displ.z;
		var _this = this.displ;
		var rad = this.radius + Math.sqrt(_this.x * _this.x + _this.y * _this.y + _this.z * _this.z);
		this.cornerA.x = -rad;
		this.cornerA.y = -rad;
		this.cornerA.z = -rad;
		this.cornerB.x = rad;
		this.cornerB.y = -rad;
		this.cornerB.z = -rad;
		this.cornerC.x = rad;
		this.cornerC.y = rad;
		this.cornerC.z = -rad;
		this.cornerD.x = -rad;
		this.cornerD.y = rad;
		this.cornerD.z = -rad;
		this.rad = rad;
	}
	loopGeometries() {
		var rad = this.rad;
		this.numFaces = 0;
		var indicesLength = 0;
		var normalsLength = 0;
		var j;
		var mapOffset = 0;
		var verticesLength = 0;
		var geometriesLength = this.numGeometries;
		var _g1 = 0;
		var _g = geometriesLength;
		while(_g1 < _g) {
			var i = _g1++;
			var geometry = this.geometries[i];
			var transform = this.transforms[i];
			var geomNumVertices = geometry.numVertices;
			var geometryIndicesLength = geometry.numIndices;
			var geomVertices = geometry.vertices;
			if(geomNumVertices == 0 || geometryIndicesLength == 0) {
				continue;
			}
			j = 0;
			var geomVertLen = geomNumVertices * 3;
			while(j < geomVertLen) {
				var vx = geomVertices[j];
				var vy = geomVertices[j + 1];
				var vz = geomVertices[j + 2];
				this.vertices[verticesLength] = transform.a * vx + transform.b * vy + transform.c * vz + transform.d;
				++verticesLength;
				this.vertices[verticesLength] = transform.e * vx + transform.f * vy + transform.g * vz + transform.h;
				++verticesLength;
				this.vertices[verticesLength] = transform.i * vx + transform.j * vy + transform.k * vz + transform.l;
				++verticesLength;
				j += 3;
			}
			var geometryIndices = geometry.indices;
			j = 0;
			while(j < geometryIndicesLength) {
				var a = geometryIndices[j] + mapOffset;
				++j;
				var index = a * 3;
				var ax = this.vertices[index];
				++index;
				var ay = this.vertices[index];
				++index;
				var az = this.vertices[index];
				var b = geometryIndices[j] + mapOffset;
				++j;
				index = b * 3;
				var bx = this.vertices[index];
				++index;
				var by = this.vertices[index];
				++index;
				var bz = this.vertices[index];
				var c = geometryIndices[j] + mapOffset;
				++j;
				index = c * 3;
				var cx = this.vertices[index];
				++index;
				var cy = this.vertices[index];
				++index;
				var cz = this.vertices[index];
				if(ax > rad && bx > rad && cx > rad || ax < -rad && bx < -rad && cx < -rad) {
					continue;
				}
				if(ay > rad && by > rad && cy > rad || ay < -rad && by < -rad && cy < -rad) {
					continue;
				}
				if(az > rad && bz > rad && cz > rad || az < -rad && bz < -rad && cz < -rad) {
					continue;
				}
				var abx = bx - ax;
				var aby = by - ay;
				var abz = bz - az;
				var acx = cx - ax;
				var acy = cy - ay;
				var acz = cz - az;
				var normalX = acz * aby - acy * abz;
				var normalY = acx * abz - acz * abx;
				var normalZ = acy * abx - acx * aby;
				var len = normalX * normalX + normalY * normalY + normalZ * normalZ;
				if(len < 0.001) {
					continue;
				}
				len = 1 / Math.sqrt(len);
				normalX *= len;
				normalY *= len;
				normalZ *= len;
				var offset = ax * normalX + ay * normalY + az * normalZ;
				if(offset > rad || offset < -rad) {
					continue;
				}
				this.indices[indicesLength] = a;
				++indicesLength;
				this.indices[indicesLength] = b;
				++indicesLength;
				this.indices[indicesLength] = c;
				++indicesLength;
				this.normals[normalsLength] = normalX;
				++normalsLength;
				this.normals[normalsLength] = normalY;
				++normalsLength;
				this.normals[normalsLength] = normalZ;
				++normalsLength;
				this.normals[normalsLength] = offset;
				++normalsLength;
				this.numFaces++;
			}
			mapOffset += geomNumVertices;
		}
		this.numGeometries = 0;
		this.numI = indicesLength;
	}
	loopGeometriesNaive() {
		var rad = this.rad;
		this.numFaces = 0;
		var indicesLength = 0;
		var normalsLength = 0;
		var j;
		var mapOffset = 0;
		var verticesLength = 0;
		var geometriesLength = this.numGeometries;
		var _g1 = 0;
		var _g = geometriesLength;
		while(_g1 < _g) {
			var i = _g1++;
			var geometry = this.geometries[i];
			var transform = this.matrix;
			var geomNumVertices = geometry.numVertices;
			var geometryIndicesLength = geometry.numIndices;
			var geomVertices = geometry.vertices;
			if(geomNumVertices == 0 || geometryIndicesLength == 0) {
				continue;
			}
			j = 0;
			var geomVertLen = geomNumVertices * 3;
			while(j < geomVertLen) {
				var vx = geomVertices[j];
				var vy = geomVertices[j + 1];
				var vz = geomVertices[j + 2];
				this.vertices[verticesLength] = transform.a * vx + transform.b * vy + transform.c * vz + transform.d;
				++verticesLength;
				this.vertices[verticesLength] = transform.e * vx + transform.f * vy + transform.g * vz + transform.h;
				++verticesLength;
				this.vertices[verticesLength] = transform.i * vx + transform.j * vy + transform.k * vz + transform.l;
				++verticesLength;
				j += 3;
			}
			var geometryIndices = geometry.indices;
			j = 0;
			while(j < geometryIndicesLength) {
				var a = geometryIndices[j] + mapOffset;
				++j;
				var index = a * 3;
				var ax = this.vertices[index];
				++index;
				var ay = this.vertices[index];
				++index;
				var az = this.vertices[index];
				var b = geometryIndices[j] + mapOffset;
				++j;
				index = b * 3;
				var bx = this.vertices[index];
				++index;
				var by = this.vertices[index];
				++index;
				var bz = this.vertices[index];
				var c = geometryIndices[j] + mapOffset;
				++j;
				index = c * 3;
				var cx = this.vertices[index];
				++index;
				var cy = this.vertices[index];
				++index;
				var cz = this.vertices[index];
				var abx = bx - ax;
				var aby = by - ay;
				var abz = bz - az;
				var acx = cx - ax;
				var acy = cy - ay;
				var acz = cz - az;
				var normalX = acz * aby - acy * abz;
				var normalY = acx * abz - acz * abx;
				var normalZ = acy * abx - acx * aby;
				var len = normalX * normalX + normalY * normalY + normalZ * normalZ;
				len = 1 / Math.sqrt(len);
				normalX *= len;
				normalY *= len;
				normalZ *= len;
				var offset = ax * normalX + ay * normalY + az * normalZ;
				this.indices[indicesLength] = a;
				++indicesLength;
				this.indices[indicesLength] = b;
				++indicesLength;
				this.indices[indicesLength] = c;
				++indicesLength;
				this.normals[normalsLength] = normalX;
				++normalsLength;
				this.normals[normalsLength] = normalY;
				++normalsLength;
				this.normals[normalsLength] = normalZ;
				++normalsLength;
				this.normals[normalsLength] = offset;
				++normalsLength;
				this.numFaces++;
			}
			mapOffset += geomNumVertices;
		}
		this.numGeometries = 0;
		this.numI = indicesLength;
	}
	calculateCollidableGeometry(source,collidable) {
		this.prepare(source,EllipsoidCollider.ZERO_VECTOR);
		collidable.collectGeometry(this);
		this.loopGeometriesNaive();
	}
	addGeometry(geometry,transform) {
		this.geometries[this.numGeometries] = geometry;
		this.transforms[this.numGeometries] = transform;
		this.numGeometries++;
	}
	calculateDestination(source,displacement,collidable,timeFrame,fromTime) {
		if(fromTime == null) {
			fromTime = 0;
		}
		if(timeFrame == null) {
			timeFrame = 1;
		}
		if(Math.sqrt(displacement.x * displacement.x + displacement.y * displacement.y + displacement.z * displacement.z) <= this.threshold) {
			this.gotMoved = false;
			return new (jeash_geom_Vector3D().default)(source.x,source.y,source.z,source.w);
		}
		this.gotMoved = true;
		this.timestamp++;
		this.prepare(source,displacement);
		collidable.collectGeometry(this);
		this.loopGeometries();
		var timeLeft = timeFrame;
		var timeCollide = fromTime;
		this.collisions = null;
		var t;
		if(this.numFaces > 0) {
			var i = 0;
			while(i++ < 50) {
				t = this.checkCollision();
				if(t < 1) {
					var timeElapsed = t * timeLeft;
					timeCollide += timeElapsed;
					timeLeft -= timeElapsed;
					this.resCollisionPoint.x = this.matrix.a * this.collisionPoint.x + this.matrix.b * this.collisionPoint.y + this.matrix.c * this.collisionPoint.z + this.matrix.d;
					this.resCollisionPoint.y = this.matrix.e * this.collisionPoint.x + this.matrix.f * this.collisionPoint.y + this.matrix.g * this.collisionPoint.z + this.matrix.h;
					this.resCollisionPoint.z = this.matrix.i * this.collisionPoint.x + this.matrix.j * this.collisionPoint.y + this.matrix.k * this.collisionPoint.z + this.matrix.l;
					var abx;
					var aby;
					var abz;
					if(this.collisionPlane.x < this.collisionPlane.y) {
						if(this.collisionPlane.x < this.collisionPlane.z) {
							abx = 0;
							aby = -this.collisionPlane.z;
							abz = this.collisionPlane.y;
						} else {
							abx = -this.collisionPlane.y;
							aby = this.collisionPlane.x;
							abz = 0;
						}
					} else if(this.collisionPlane.y < this.collisionPlane.z) {
						abx = this.collisionPlane.z;
						aby = 0;
						abz = -this.collisionPlane.x;
					} else {
						abx = -this.collisionPlane.y;
						aby = this.collisionPlane.x;
						abz = 0;
					}
					var acx = this.collisionPlane.z * aby - this.collisionPlane.y * abz;
					var acy = this.collisionPlane.x * abz - this.collisionPlane.z * abx;
					var acz = this.collisionPlane.y * abx - this.collisionPlane.x * aby;
					var abx2 = this.matrix.a * abx + this.matrix.b * aby + this.matrix.c * abz;
					var aby2 = this.matrix.e * abx + this.matrix.f * aby + this.matrix.g * abz;
					var abz2 = this.matrix.i * abx + this.matrix.j * aby + this.matrix.k * abz;
					var acx2 = this.matrix.a * acx + this.matrix.b * acy + this.matrix.c * acz;
					var acy2 = this.matrix.e * acx + this.matrix.f * acy + this.matrix.g * acz;
					var acz2 = this.matrix.i * acx + this.matrix.j * acy + this.matrix.k * acz;
					this.resCollisionPlane.x = abz2 * acy2 - aby2 * acz2;
					this.resCollisionPlane.y = abx2 * acz2 - abz2 * acx2;
					this.resCollisionPlane.z = aby2 * acx2 - abx2 * acy2;
					var _this = this.resCollisionPlane;
					var l = Math.sqrt(_this.x * _this.x + _this.y * _this.y + _this.z * _this.z);
					if(l != 0) {
						_this.x /= l;
						_this.y /= l;
						_this.z /= l;
					}
					this.resCollisionPlane.w = this.resCollisionPoint.x * this.resCollisionPlane.x + this.resCollisionPoint.y * this.resCollisionPlane.y + this.resCollisionPoint.z * this.resCollisionPlane.z;
					var offset = this.radius + this.threshold + this.collisionPlane.w - this.dest.x * this.collisionPlane.x - this.dest.y * this.collisionPlane.y - this.dest.z * this.collisionPlane.z;
					this.dest.x += this.collisionPlane.x * offset;
					this.dest.y += this.collisionPlane.y * offset;
					this.dest.z += this.collisionPlane.z * offset;
					this.src.x = this.collisionPoint.x + this.collisionPlane.x * (this.radius + this.threshold);
					this.src.y = this.collisionPoint.y + this.collisionPlane.y * (this.radius + this.threshold);
					this.src.z = this.collisionPoint.z + this.collisionPlane.z * (this.radius + this.threshold);
					if(this.requireEvents) {
						this.resultVector.x = this.matrix.a * this.src.x + this.matrix.b * this.src.y + this.matrix.c * this.src.z + this.matrix.d;
						this.resultVector.y = this.matrix.e * this.src.x + this.matrix.f * this.src.y + this.matrix.g * this.src.z + this.matrix.h;
						this.resultVector.z = this.matrix.i * this.src.x + this.matrix.j * this.src.y + this.matrix.k * this.src.z + this.matrix.l;
						var coll = (systems_collisions_CollisionEvent().default).GetAs3(this.resCollisionPoint,this.resCollisionPlane,this.resCollisionPlane.w,timeCollide,this.resultVector,3);
						coll.next = this.collisions;
						this.collisions = coll;
					}
					var e = this.collisionPlane.x * this.displ.x + this.collisionPlane.y * this.displ.y + this.collisionPlane.z * this.displ.z;
					this.displ.x -= this.collisionPlane.x * e;
					this.displ.y -= this.collisionPlane.y * e;
					this.displ.z -= this.collisionPlane.z * e;
					var _this1 = this.displ;
					if(Math.sqrt(_this1.x * _this1.x + _this1.y * _this1.y + _this1.z * _this1.z) < this.threshold) {
						break;
					}
				} else {
					break;
				}
			}
			this.resultVector.x = this.matrix.a * this.dest.x + this.matrix.b * this.dest.y + this.matrix.c * this.dest.z + this.matrix.d;
			this.resultVector.y = this.matrix.e * this.dest.x + this.matrix.f * this.dest.y + this.matrix.g * this.dest.z + this.matrix.h;
			this.resultVector.z = this.matrix.i * this.dest.x + this.matrix.j * this.dest.y + this.matrix.k * this.dest.z + this.matrix.l;
		} else {
			this.resultVector.x = source.x + displacement.x;
			this.resultVector.y = source.y + displacement.y;
			this.resultVector.z = source.z + displacement.z;
		}
		var a = this.resultVector.x;
		if(a != a) {
			return new (jeash_geom_Vector3D().default)(source.x,source.y,source.z,source.w);
		} else {
			return this.resultVector;
		}
	}
	getCollision(source,displacement,resCollisionPoint,resCollisionPlane,collidable) {
		if(Math.sqrt(displacement.x * displacement.x + displacement.y * displacement.y + displacement.z * displacement.z) <= this.threshold) {
			return false;
		}
		this.prepare(source,displacement);
		collidable.collectGeometry(this);
		this.loopGeometries();
		if(this.numFaces > 0) {
			if(this.checkCollision() < 1) {
				resCollisionPoint.x = this.matrix.a * this.collisionPoint.x + this.matrix.b * this.collisionPoint.y + this.matrix.c * this.collisionPoint.z + this.matrix.d;
				resCollisionPoint.y = this.matrix.e * this.collisionPoint.x + this.matrix.f * this.collisionPoint.y + this.matrix.g * this.collisionPoint.z + this.matrix.h;
				resCollisionPoint.z = this.matrix.i * this.collisionPoint.x + this.matrix.j * this.collisionPoint.y + this.matrix.k * this.collisionPoint.z + this.matrix.l;
				var abx;
				var aby;
				var abz;
				if(this.collisionPlane.x < this.collisionPlane.y) {
					if(this.collisionPlane.x < this.collisionPlane.z) {
						abx = 0;
						aby = -this.collisionPlane.z;
						abz = this.collisionPlane.y;
					} else {
						abx = -this.collisionPlane.y;
						aby = this.collisionPlane.x;
						abz = 0;
					}
				} else if(this.collisionPlane.y < this.collisionPlane.z) {
					abx = this.collisionPlane.z;
					aby = 0;
					abz = -this.collisionPlane.x;
				} else {
					abx = -this.collisionPlane.y;
					aby = this.collisionPlane.x;
					abz = 0;
				}
				var acx = this.collisionPlane.z * aby - this.collisionPlane.y * abz;
				var acy = this.collisionPlane.x * abz - this.collisionPlane.z * abx;
				var acz = this.collisionPlane.y * abx - this.collisionPlane.x * aby;
				var abx2 = this.matrix.a * abx + this.matrix.b * aby + this.matrix.c * abz;
				var aby2 = this.matrix.e * abx + this.matrix.f * aby + this.matrix.g * abz;
				var abz2 = this.matrix.i * abx + this.matrix.j * aby + this.matrix.k * abz;
				var acx2 = this.matrix.a * acx + this.matrix.b * acy + this.matrix.c * acz;
				var acy2 = this.matrix.e * acx + this.matrix.f * acy + this.matrix.g * acz;
				var acz2 = this.matrix.i * acx + this.matrix.j * acy + this.matrix.k * acz;
				resCollisionPlane.x = abz2 * acy2 - aby2 * acz2;
				resCollisionPlane.y = abx2 * acz2 - abz2 * acx2;
				resCollisionPlane.z = aby2 * acx2 - abx2 * acy2;
				var l = Math.sqrt(resCollisionPlane.x * resCollisionPlane.x + resCollisionPlane.y * resCollisionPlane.y + resCollisionPlane.z * resCollisionPlane.z);
				if(l != 0) {
					resCollisionPlane.x /= l;
					resCollisionPlane.y /= l;
					resCollisionPlane.z /= l;
				}
				resCollisionPlane.w = resCollisionPoint.x * resCollisionPlane.x + resCollisionPoint.y * resCollisionPlane.y + resCollisionPoint.z * resCollisionPlane.z;
				return true;
			} else {
				return false;
			}
		}
		return false;
	}
	checkCollision() {
		var t;
		var minTime = 1;
		var _this = this.displ;
		var displacementLength = Math.sqrt(_this.x * _this.x + _this.y * _this.y + _this.z * _this.z);
		var indicesLength = this.numFaces * 3;
		var j = 0;
		var i = 0;
		while(i < indicesLength) {
			var index = this.indices[i] * 3;
			++i;
			var ax = this.vertices[index];
			++index;
			var ay = this.vertices[index];
			++index;
			var az = this.vertices[index];
			index = this.indices[i] * 3;
			++i;
			var bx = this.vertices[index];
			++index;
			var by = this.vertices[index];
			++index;
			var bz = this.vertices[index];
			index = this.indices[i] * 3;
			++i;
			var cx = this.vertices[index];
			++index;
			var cy = this.vertices[index];
			++index;
			var cz = this.vertices[index];
			var normalX = this.normals[j];
			++j;
			var normalY = this.normals[j];
			++j;
			var normalZ = this.normals[j];
			++j;
			var offset = this.normals[j];
			++j;
			var distance = this.src.x * normalX + this.src.y * normalY + this.src.z * normalZ - offset;
			var pointX;
			var pointY;
			var pointZ;
			if(distance < this.radius) {
				pointX = this.src.x - normalX * distance;
				pointY = this.src.y - normalY * distance;
				pointZ = this.src.z - normalZ * distance;
			} else {
				t = (distance - this.radius) / (distance - this.dest.x * normalX - this.dest.y * normalY - this.dest.z * normalZ + offset);
				pointX = this.src.x + this.displ.x * t - normalX * this.radius;
				pointY = this.src.y + this.displ.y * t - normalY * this.radius;
				pointZ = this.src.z + this.displ.z * t - normalZ * this.radius;
			}
			var faceX = 0;
			var faceY = 0;
			var faceZ = 0;
			var min = 1e+22;
			var inside = true;
			var _g = 0;
			while(_g < 3) {
				var k = _g++;
				var p1x;
				var p1y;
				var p1z;
				var p2x;
				var p2y;
				var p2z;
				if(k == 0) {
					p1x = ax;
					p1y = ay;
					p1z = az;
					p2x = bx;
					p2y = by;
					p2z = bz;
				} else if(k == 1) {
					p1x = bx;
					p1y = by;
					p1z = bz;
					p2x = cx;
					p2y = cy;
					p2z = cz;
				} else {
					p1x = cx;
					p1y = cy;
					p1z = cz;
					p2x = ax;
					p2y = ay;
					p2z = az;
				}
				var abx = p2x - p1x;
				var aby = p2y - p1y;
				var abz = p2z - p1z;
				var acx = pointX - p1x;
				var acy = pointY - p1y;
				var acz = pointZ - p1z;
				var crx = acz * aby - acy * abz;
				var cry = acx * abz - acz * abx;
				var crz = acy * abx - acx * aby;
				if(crx * normalX + cry * normalY + crz * normalZ < 0) {
					var edgeLength = abx * abx + aby * aby + abz * abz;
					var edgeDistanceSqr = (crx * crx + cry * cry + crz * crz) / edgeLength;
					if(edgeDistanceSqr < min) {
						edgeLength = Math.sqrt(edgeLength);
						abx /= edgeLength;
						aby /= edgeLength;
						abz /= edgeLength;
						t = abx * acx + aby * acy + abz * acz;
						var acLen;
						if(t < 0) {
							acLen = acx * acx + acy * acy + acz * acz;
							if(acLen < min) {
								min = acLen;
								faceX = p1x;
								faceY = p1y;
								faceZ = p1z;
							}
						} else if(t > edgeLength) {
							acx = pointX - p2x;
							acy = pointY - p2y;
							acz = pointZ - p2z;
							acLen = acx * acx + acy * acy + acz * acz;
							if(acLen < min) {
								min = acLen;
								faceX = p2x;
								faceY = p2y;
								faceZ = p2z;
							}
						} else {
							min = edgeDistanceSqr;
							faceX = p1x + abx * t;
							faceY = p1y + aby * t;
							faceZ = p1z + abz * t;
						}
					}
					inside = false;
				}
			}
			if(inside) {
				faceX = pointX;
				faceY = pointY;
				faceZ = pointZ;
			}
			var deltaX = this.src.x - faceX;
			var deltaY = this.src.y - faceY;
			var deltaZ = this.src.z - faceZ;
			if(deltaX * this.displ.x + deltaY * this.displ.y + deltaZ * this.displ.z <= 0) {
				var backX = -this.displ.x / displacementLength;
				var backY = -this.displ.y / displacementLength;
				var backZ = -this.displ.z / displacementLength;
				var deltaLength = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
				var projectionLength = deltaX * backX + deltaY * backY + deltaZ * backZ;
				var projectionInsideLength = this.radius * this.radius - deltaLength + projectionLength * projectionLength;
				if(projectionInsideLength > 0) {
					var time = (projectionLength - Math.sqrt(projectionInsideLength)) / displacementLength;
					if(time < minTime) {
						minTime = time;
						this.collisionPoint.x = faceX;
						this.collisionPoint.y = faceY;
						this.collisionPoint.z = faceZ;
						if(inside) {
							this.collisionPlane.x = normalX;
							this.collisionPlane.y = normalY;
							this.collisionPlane.z = normalZ;
							this.collisionPlane.w = offset;
						} else {
							deltaLength = Math.sqrt(deltaLength);
							this.collisionPlane.x = deltaX / deltaLength;
							this.collisionPlane.y = deltaY / deltaLength;
							this.collisionPlane.z = deltaZ / deltaLength;
							this.collisionPlane.w = this.collisionPoint.x * this.collisionPlane.x + this.collisionPoint.y * this.collisionPlane.y + this.collisionPoint.z * this.collisionPlane.z;
						}
					}
				}
			}
		}
		return minTime;
	}
	static get TRANSFORMS() { return TRANSFORMS; }
	static set TRANSFORMS(value) { TRANSFORMS = value; }
	static get GEOMETRIES() { return GEOMETRIES; }
	static set GEOMETRIES(value) { GEOMETRIES = value; }
	static get VERTICES() { return VERTICES; }
	static set VERTICES(value) { VERTICES = value; }
	static get NORMALS() { return NORMALS; }
	static set NORMALS(value) { NORMALS = value; }
	static get INDICES() { return INDICES; }
	static set INDICES(value) { INDICES = value; }
	static purgeBuffers() {
		EllipsoidCollider.TRANSFORMS.length = 0;
		EllipsoidCollider.GEOMETRIES.length = 0;
		EllipsoidCollider.NORMALS.length = 0;
		EllipsoidCollider.INDICES.length = 0;
		EllipsoidCollider.VERTICES.length = 0;
	}
	static get ZERO_VECTOR() { return ZERO_VECTOR; }
	static set ZERO_VECTOR(value) { ZERO_VECTOR = value; }
	static isNaN2(a) {
		return a != a;
	}
}


// Meta

EllipsoidCollider.__name__ = ["systems","collisions","EllipsoidCollider"];
EllipsoidCollider.prototype.__class__ = EllipsoidCollider.prototype.constructor = $hxClasses["systems.collisions.EllipsoidCollider"] = EllipsoidCollider;

// Init



// Statics

var TRANSFORMS = [];
var GEOMETRIES = [];
var VERTICES = [];
var NORMALS = [];
var INDICES = [];
var ZERO_VECTOR = new (jeash_geom_Vector3D().default)();

// Export

exports.default = EllipsoidCollider;