// Class: util.geom.GeomUtil

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;

// Constructor

class GeomUtil {
	constructor(){}
	static transformVertices(vertices,t,len) {
		if(len == null) {
			len = -1;
		}
		if(len < 0) {
			len = vertices.length;
		}
		var i = 0;
		while(i < len) {
			var x = vertices[i];
			var y = vertices[i + 1];
			var z = vertices[i + 2];
			vertices[i] = t.a * x + t.b * y + t.c * z + t.d;
			vertices[i + 1] = t.e * x + t.f * y + t.g * z + t.h;
			vertices[i + 2] = t.i * x + t.j * y + t.k * z + t.l;
			i += 3;
		}
	}
	static boundIntersectSphere(sphere,minX,minY,minZ,maxX,maxY,maxZ) {
		if(sphere.x + sphere.w > minX && sphere.x - sphere.w < maxX && sphere.y + sphere.w > minY && sphere.y - sphere.w < maxY && sphere.z + sphere.w > minZ) {
			return sphere.z - sphere.w < maxZ;
		} else {
			return false;
		}
	}
	static boundIntersectRay(origin,direction,minX,minY,minZ,maxX,maxY,maxZ,result) {
		if(origin.x >= minX && origin.x <= maxX && origin.y >= minY && origin.y <= maxY && origin.z >= minZ && origin.z <= maxZ) {
			return true;
		}
		if(origin.x < minX && direction.x <= 0) {
			return false;
		}
		if(origin.x > maxX && direction.x >= 0) {
			return false;
		}
		if(origin.y < minY && direction.y <= 0) {
			return false;
		}
		if(origin.y > maxY && direction.y >= 0) {
			return false;
		}
		if(origin.z < minZ && direction.z <= 0) {
			return false;
		}
		if(origin.z > maxZ && direction.z >= 0) {
			return false;
		}
		var a;
		var b;
		var c;
		var d;
		var threshold = 0.000001;
		if(direction.x > threshold) {
			a = (minX - origin.x) / direction.x;
			b = (maxX - origin.x) / direction.x;
		} else if(direction.x < -threshold) {
			a = (maxX - origin.x) / direction.x;
			b = (minX - origin.x) / direction.x;
		} else {
			a = -1e+22;
			b = 1e+22;
		}
		if(direction.y > threshold) {
			c = (minY - origin.y) / direction.y;
			d = (maxY - origin.y) / direction.y;
		} else if(direction.y < -threshold) {
			c = (maxY - origin.y) / direction.y;
			d = (minY - origin.y) / direction.y;
		} else {
			c = -1e+22;
			d = 1e+22;
		}
		if(c >= b || d <= a) {
			return false;
		}
		if(c < a) {
			if(d < b) {
				b = d;
			}
		} else {
			a = c;
			if(d < b) {
				b = d;
			}
		}
		if(direction.z > threshold) {
			c = (minZ - origin.z) / direction.z;
			d = (maxZ - origin.z) / direction.z;
		} else if(direction.z < -threshold) {
			c = (maxZ - origin.z) / direction.z;
			d = (minZ - origin.z) / direction.z;
		} else {
			c = -1e+22;
			d = 1e+22;
		}
		if(c > a) {
			c = c;
		} else {
			c = a;
		}
		if(d < b) {
			d = d;
		} else {
			d = b;
		}
		if(direction.w > 0 && c >= direction.w || result.w > 0 && c >= result.w) {
			return false;
		}
		if(c >= b || d <= a) {
			return false;
		}
		return true;
	}
	static intersectRayTri(result,ox,oy,oz,dx,dy,dz,ax,ay,az,bx,by,bz,cx,cy,cz) {
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
		if(len > 0.001) {
			len = 1 / Math.sqrt(len);
			normalX *= len;
			normalY *= len;
			normalZ *= len;
		}
		var dot = dx * normalX + dy * normalY + dz * normalZ;
		if(dot < 0) {
			var offset = ox * normalX + oy * normalY + oz * normalZ - (ax * normalX + ay * normalY + az * normalZ);
			if(offset > 0) {
				var time = -offset / dot;
				var rx = ox + dx * time;
				var ry = oy + dy * time;
				var rz = oz + dz * time;
				abx = bx - ax;
				aby = by - ay;
				abz = bz - az;
				acx = rx - ax;
				acy = ry - ay;
				acz = rz - az;
				if((acz * aby - acy * abz) * normalX + (acx * abz - acz * abx) * normalY + (acy * abx - acx * aby) * normalZ >= 0) {
					abx = cx - bx;
					aby = cy - by;
					abz = cz - bz;
					acx = rx - bx;
					acy = ry - by;
					acz = rz - bz;
					if((acz * aby - acy * abz) * normalX + (acx * abz - acz * abx) * normalY + (acy * abx - acx * aby) * normalZ >= 0) {
						abx = ax - cx;
						aby = ay - cy;
						abz = az - cz;
						acx = rx - cx;
						acy = ry - cy;
						acz = rz - cz;
						if((acz * aby - acy * abz) * normalX + (acx * abz - acz * abx) * normalY + (acy * abx - acx * aby) * normalZ >= 0) {
							result.w = time;
							result.x = rx;
							result.y = ry;
							result.z = rz;
							return true;
						}
					}
				}
			}
		}
		return false;
	}
}


// Meta

GeomUtil.__name__ = ["util","geom","GeomUtil"];
GeomUtil.prototype.__class__ = GeomUtil.prototype.constructor = $hxClasses["util.geom.GeomUtil"] = GeomUtil;

// Init



// Statics



// Export

exports.default = GeomUtil;