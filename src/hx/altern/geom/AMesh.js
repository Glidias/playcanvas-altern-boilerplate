// Class: altern.geom.AMesh

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function altern_geom_Vertex() {return require("./../../altern/geom/Vertex");}
function altern_geom_Face() {return require("./../../altern/geom/Face");}
function altern_geom_Wrapper() {return require("./../../altern/geom/Wrapper");}
function haxe_ds_ObjectMap() {return require("./../../haxe/ds/ObjectMap");}
function altern_geom_Edge() {return require("./../../altern/geom/Edge");}
function altern_culling_CullingPlane() {return require("./../../altern/culling/CullingPlane");}

// Constructor

class AMesh {
	constructor() {
	}
	createForm(geometry,options,distanceThreshold,angleThreshold,convexThreshold) {
		if(convexThreshold == null) {
			convexThreshold = 0;
		}
		if(angleThreshold == null) {
			angleThreshold = 0;
		}
		if(distanceThreshold == null) {
			distanceThreshold = 0;
		}
		var i;
		this.faceList = null;
		this.edgeList = null;
		this.vertexList = null;
		var geometryIndicesLength = geometry.indices.length;
		if(geometry.numVertices == 0 || geometryIndicesLength == 0) {
			throw new (js__$Boot_HaxeError().default)("The supplied geometry is empty.");
		}
		var vertices = [];
		geometryIndicesLength = geometry.numVertices * 3;
		i = 0;
		while(i < geometryIndicesLength) {
			var vertex = new (altern_geom_Vertex().default)();
			vertex.x = geometry.vertices[i++];
			vertex.y = geometry.vertices[i++];
			vertex.z = geometry.vertices[i++];
			vertices.push(vertex);
		}
		geometryIndicesLength = geometry.indices.length;
		i = 0;
		while(i < geometryIndicesLength) {
			var a = geometry.indices[i++];
			var b = geometry.indices[i++];
			var c = geometry.indices[i++];
			var face = new (altern_geom_Face().default)();
			face.wrapper = new (altern_geom_Wrapper().default)();
			face.wrapper.vertex = vertices[a];
			face.wrapper.next = new (altern_geom_Wrapper().default)();
			face.wrapper.next.vertex = vertices[b];
			face.wrapper.next.next = new (altern_geom_Wrapper().default)();
			face.wrapper.next.next.vertex = vertices[c];
			face.calculateBestSequenceAndNormal();
			face.next = this.faceList;
			this.faceList = face;
		}
		this.vertexList = (options & 4) != 0 ? this.weldVertices(vertices,distanceThreshold) : this.getVerticesFromArray(vertices);
		if((options & 8) != 0) {
			this.weldFaces(angleThreshold,convexThreshold);
		}
		if((options & 3) != 0) {
			this.createEdges(options);
		}
	}
	checkConvex() {
		return this.calculateEdges() == null;
	}
	createEdges(options) {
		if(options == null) {
			options = 3;
		}
		var error = this.calculateEdges();
		if((options & 1) != 0 && error != null) {
			this.faceList = null;
			this.edgeList = null;
			this.vertexList = null;
			throw new (js__$Boot_HaxeError().default)(error);
		}
		if((options & 2) == 0) {
			this.edgeList = null;
		}
	}
	getVerticesFromArray(vertices) {
		var vList;
		if(vertices.length == 0) {
			return null;
		}
		vList = vertices[0];
		var v = vList;
		var _g1 = 1;
		var _g = vertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			v = v.next = vertices[i];
		}
		return vList;
	}
	destroyForm() {
		this.faceList = null;
		this.edgeList = null;
		this.vertexList = null;
	}
	weldVertices(vertices,distanceThreshold) {
		var vertex;
		var verticesLength = vertices.length;
		this.group(vertices,0,verticesLength,0,distanceThreshold,[]);
		var face = this.faceList;
		while(face != null) {
			var wrapper = face.wrapper;
			while(wrapper != null) {
				if(wrapper.vertex.value != null) {
					wrapper.vertex = wrapper.vertex.value;
				}
				wrapper = wrapper.next;
			}
			face = face.next;
		}
		var res = null;
		var _g1 = 0;
		var _g = verticesLength;
		while(_g1 < _g) {
			var i = _g1++;
			vertex = vertices[i];
			if(vertex.value == null) {
				vertex.next = res;
				res = vertex;
			}
		}
		return res;
	}
	group(verts,begin,end,depth,threshold,stack) {
		var i;
		var j;
		var vertex;
		switch(depth) {
		case 0:
			var _g1 = begin;
			var _g = end;
			while(_g1 < _g) {
				var i1 = _g1++;
				vertex = verts[i1];
				vertex.offset = vertex.x;
			}
			break;
		case 1:
			var _g11 = begin;
			var _g2 = end;
			while(_g11 < _g2) {
				var i2 = _g11++;
				vertex = verts[i2];
				vertex.offset = vertex.y;
			}
			break;
		case 2:
			var _g12 = begin;
			var _g3 = end;
			while(_g12 < _g3) {
				var i3 = _g12++;
				vertex = verts[i3];
				vertex.offset = vertex.z;
			}
			break;
		}
		stack[0] = begin;
		stack[1] = end - 1;
		var index = 2;
		while(index > 0) {
			--index;
			var r = stack[index];
			j = r;
			--index;
			var l = stack[index];
			i = l;
			vertex = verts[r + l >> 1];
			var median = vertex.offset;
			while(i <= j) {
				var left = verts[i];
				while(left.offset > median) {
					++i;
					left = verts[i];
				}
				var right = verts[j];
				while(right.offset < median) {
					--j;
					right = verts[j];
				}
				if(i <= j) {
					verts[i] = right;
					verts[j] = left;
					++i;
					--j;
				}
			}
			if(l < j) {
				stack[index] = l;
				++index;
				stack[index] = j;
				++index;
			}
			if(i < r) {
				stack[index] = i;
				++index;
				stack[index] = r;
				++index;
			}
		}
		i = begin;
		vertex = verts[i];
		var compared = null;
		var _g13 = i + 1;
		var _g4 = end + 1;
		while(_g13 < _g4) {
			var j1 = _g13++;
			if(j1 < end) {
				compared = verts[j1];
			}
			if(j1 == end || vertex.offset - compared.offset > threshold) {
				if(depth < 2 && j1 - i > 1) {
					this.group(verts,i,j1,depth + 1,threshold,stack);
				}
				if(j1 < end) {
					i = j1;
					vertex = verts[i];
				}
			} else if(depth == 2) {
				compared.value = vertex;
			}
		}
	}
	weldFaces(angleThreshold,convexThreshold) {
		if(convexThreshold == null) {
			convexThreshold = 0;
		}
		if(angleThreshold == null) {
			angleThreshold = 0;
		}
		var i;
		var j;
		var sibling;
		var face;
		var next;
		var wp;
		var sp;
		var w;
		var s;
		var wn;
		var sn;
		var wm;
		var sm;
		var vertex;
		var a;
		var b;
		var c;
		var abx;
		var aby;
		var abz;
		var acx;
		var acy;
		var acz;
		var nx;
		var ny;
		var nz;
		var nl;
		var dictionary;
		var digitThreshold = AMesh.DIGIT_THRESHOLD;
		angleThreshold = Math.cos(angleThreshold) - digitThreshold;
		convexThreshold = Math.cos(Math.PI - convexThreshold) - digitThreshold;
		var faceSet = new (haxe_ds_ObjectMap().default)();
		var map = new (haxe_ds_ObjectMap().default)();
		face = this.faceList;
		while(face != null) {
			next = face.next;
			face.next = null;
			faceSet.set(face,true);
			wn = face.wrapper;
			while(wn != null) {
				vertex = wn.vertex;
				dictionary = map.h[vertex.__id__];
				if(dictionary == null) {
					dictionary = new (haxe_ds_ObjectMap().default)();
					map.set(vertex,dictionary);
				}
				dictionary.set(face,true);
				wn = wn.next;
			}
			face = next;
		}
		this.faceList = null;
		var island = [];
		var siblings = new (haxe_ds_ObjectMap().default)();
		var unfit = new (haxe_ds_ObjectMap().default)();
		while(true) {
			face = null;
			var key = faceSet.keys();
			while(key.hasNext()) {
				var key1 = key.next();
				face = key1;
				faceSet.remove(key1);
				break;
			}
			if(face == null) {
				break;
			}
			var num = 0;
			island[num] = face;
			++num;
			nx = face.normalX;
			ny = face.normalY;
			nz = face.normalZ;
			var key2 = unfit.keys();
			while(key2.hasNext()) {
				var key3 = key2.next();
				unfit.remove(key3);
			}
			var _g1 = 0;
			var _g = num;
			while(_g1 < _g) {
				var i1 = _g1++;
				face = island[i1];
				var key4 = siblings.keys();
				while(key4.hasNext()) {
					var key5 = key4.next();
					siblings.remove(key5);
				}
				w = face.wrapper;
				while(w != null) {
					var key6 = map.h[w.vertex.__id__].keys();
					while(key6.hasNext()) {
						var key7 = key6.next();
						if(faceSet.h[key7.__id__] && !unfit.h[key7.__id__]) {
							siblings.set(key7,true);
						}
					}
					w = w.next;
				}
				var key8 = siblings.keys();
				while(key8.hasNext()) {
					var key9 = key8.next();
					sibling = key9;
					if(nx * sibling.normalX + ny * sibling.normalY + nz * sibling.normalZ >= angleThreshold) {
						w = face.wrapper;
						while(w != null) {
							if(w.next != null) {
								wn = w.next;
							} else {
								wn = face.wrapper;
							}
							s = sibling.wrapper;
							while(s != null) {
								if(s.next != null) {
									sn = s.next;
								} else {
									sn = sibling.wrapper;
								}
								if(w.vertex == sn.vertex && wn.vertex == s.vertex) {
									break;
								}
							}
							if(s != null) {
								break;
							}
							w = w.next;
							s = s.next;
						}
						if(w != null) {
							island[num] = sibling;
							++num;
							faceSet.remove(sibling);
						}
					} else {
						unfit.set(sibling,true);
					}
				}
			}
			if(num == 1) {
				face = island[0];
				face.next = this.faceList;
				this.faceList = face;
			} else {
				while(true) {
					var weld = false;
					var _g11 = 0;
					var _g2 = num - 1;
					while(_g11 < _g2) {
						var i2 = _g11++;
						face = island[i2];
						if(face != null) {
							var _g3 = 1;
							var _g21 = num;
							while(_g3 < _g21) {
								var j1 = _g3++;
								sibling = island[j1];
								if(sibling != null) {
									w = face.wrapper;
									while(w != null) {
										if(w.next != null) {
											wn = w.next;
										} else {
											wn = face.wrapper;
										}
										s = sibling.wrapper;
										while(s != null) {
											if(s.next != null) {
												sn = s.next;
											} else {
												sn = sibling.wrapper;
											}
											if(w.vertex == sn.vertex && wn.vertex == s.vertex) {
												break;
											}
											s = s.next;
										}
										if(s != null) {
											break;
										}
										w = w.next;
									}
									if(w != null) {
										while(true) {
											if(wn.next != null) {
												wm = wn.next;
											} else {
												wm = face.wrapper;
											}
											sp = sibling.wrapper;
											while(sp.next != s && sp.next != null) sp = sp.next;
											if(wm.vertex == sp.vertex) {
												wn = wm;
												s = sp;
											} else {
												break;
											}
										}
										while(true) {
											wp = face.wrapper;
											while(wp.next != w && wp.next != null) wp = wp.next;
											if(sn.next != null) {
												sm = sn.next;
											} else {
												sm = sibling.wrapper;
											}
											if(wp.vertex == sm.vertex) {
												w = wp;
												sn = sm;
											} else {
												break;
											}
										}
										a = w.vertex;
										b = sm.vertex;
										c = wp.vertex;
										abx = b.x - a.x;
										aby = b.y - a.y;
										abz = b.z - a.z;
										acx = c.x - a.x;
										acy = c.y - a.y;
										acz = c.z - a.z;
										nx = acz * aby - acy * abz;
										ny = acx * abz - acz * abx;
										nz = acy * abx - acx * aby;
										if(nx < digitThreshold && nx > -digitThreshold && ny < digitThreshold && ny > -digitThreshold && nz < digitThreshold && nz > -digitThreshold) {
											if(abx * acx + aby * acy + abz * acz > 0) {
												continue;
											}
										} else if(face.normalX * nx + face.normalY * ny + face.normalZ * nz < 0) {
											continue;
										}
										nl = 1 / Math.sqrt(abx * abx + aby * aby + abz * abz);
										abx *= nl;
										aby *= nl;
										abz *= nl;
										nl = 1 / Math.sqrt(acx * acx + acy * acy + acz * acz);
										acx *= nl;
										acy *= nl;
										acz *= nl;
										if(abx * acx + aby * acy + abz * acz < convexThreshold) {
											continue;
										}
										a = s.vertex;
										b = wm.vertex;
										c = sp.vertex;
										abx = b.x - a.x;
										aby = b.y - a.y;
										abz = b.z - a.z;
										acx = c.x - a.x;
										acy = c.y - a.y;
										acz = c.z - a.z;
										nx = acz * aby - acy * abz;
										ny = acx * abz - acz * abx;
										nz = acy * abx - acx * aby;
										if(nx < digitThreshold && nx > -digitThreshold && ny < digitThreshold && ny > -digitThreshold && nz < digitThreshold && nz > -digitThreshold) {
											if(abx * acx + aby * acy + abz * acz > 0) {
												continue;
											}
										} else if(face.normalX * nx + face.normalY * ny + face.normalZ * nz < 0) {
											continue;
										}
										nl = 1 / Math.sqrt(abx * abx + aby * aby + abz * abz);
										abx *= nl;
										aby *= nl;
										abz *= nl;
										nl = 1 / Math.sqrt(acx * acx + acy * acy + acz * acz);
										acx *= nl;
										acy *= nl;
										acz *= nl;
										if(abx * acx + aby * acy + abz * acz < convexThreshold) {
											continue;
										}
										weld = true;
										var newFace = new (altern_geom_Face().default)();
										newFace.normalX = face.normalX;
										newFace.normalY = face.normalY;
										newFace.normalZ = face.normalZ;
										newFace.offset = face.offset;
										wm = null;
										while(wn != w) {
											sm = new (altern_geom_Wrapper().default)();
											sm.vertex = wn.vertex;
											if(wm != null) {
												wm.next = sm;
											} else {
												newFace.wrapper = sm;
											}
											wm = sm;
											if(wn.next != null) {
												wn = wn.next;
											} else {
												wn = face.wrapper;
											}
										}
										while(sn != s) {
											sm = new (altern_geom_Wrapper().default)();
											sm.vertex = sn.vertex;
											if(wm != null) {
												wm.next = sm;
											} else {
												newFace.wrapper = sm;
											}
											wm = sm;
											if(sn.next != null) {
												sn = sn.next;
											} else {
												sn = sibling.wrapper;
											}
										}
										island[i2] = newFace;
										island[j1] = null;
										face = newFace;
									}
								}
							}
						}
					}
					if(!weld) {
						break;
					}
				}
				var _g12 = 0;
				var _g4 = num;
				while(_g12 < _g4) {
					var i3 = _g12++;
					face = island[i3];
					if(face != null) {
						face.calculateBestSequenceAndNormal();
						face.next = this.faceList;
						this.faceList = face;
					}
				}
			}
		}
	}
	calculateEdges() {
		var face;
		var wrapper;
		var edge;
		face = this.faceList;
		while(face != null) {
			var a;
			var b;
			wrapper = face.wrapper;
			while(wrapper != null) {
				a = wrapper.vertex;
				if(wrapper.next != null) {
					b = wrapper.next.vertex;
				} else {
					b = face.wrapper.vertex;
				}
				edge = this.edgeList;
				while(edge != null) {
					if(edge.a == a && edge.b == b) {
						return "The supplied geometry is not valid.";
					}
					if(edge.a == b && edge.b == a) {
						break;
					}
					edge = edge.next;
				}
				if(edge != null) {
					edge.right = face;
				} else {
					edge = new (altern_geom_Edge().default)();
					edge.a = a;
					edge.b = b;
					edge.left = face;
					edge.next = this.edgeList;
					this.edgeList = edge;
				}
				wrapper = wrapper.next;
				a = b;
			}
			face = face.next;
		}
		var edge1 = this.edgeList;
		while(edge1 != null) {
			if(edge1.left == null || edge1.right == null) {
				return "The supplied geometry is non whole.";
			}
			var abx = edge1.b.x - edge1.a.x;
			var aby = edge1.b.y - edge1.a.y;
			var abz = edge1.b.z - edge1.a.z;
			var crx = edge1.right.normalZ * edge1.left.normalY - edge1.right.normalY * edge1.left.normalZ;
			var cry = edge1.right.normalX * edge1.left.normalZ - edge1.right.normalZ * edge1.left.normalX;
			var crz = edge1.right.normalY * edge1.left.normalX - edge1.right.normalX * edge1.left.normalY;
			if(abx * crx + aby * cry + abz * crz < 0) {
				return "The supplied geometry is non convex.";
			}
			edge1 = edge1.next;
		}
		return null;
	}
	clearPlanes() {
		var plane;
		if(this.planeList != null) {
			plane = this.planeList;
			while(plane.next != null) plane = plane.next;
			plane.next = (altern_culling_CullingPlane().default).collector;
			(altern_culling_CullingPlane().default).collector = this.planeList;
			this.planeList = null;
		}
	}
	calculatePlanes(position) {
		var a;
		var b;
		var c;
		var face;
		var plane;
		var plane1;
		if(this.planeList != null) {
			plane1 = this.planeList;
			while(plane1.next != null) plane1 = plane1.next;
			plane1.next = (altern_culling_CullingPlane().default).collector;
			(altern_culling_CullingPlane().default).collector = this.planeList;
			this.planeList = null;
		}
		if(this.faceList == null || this.edgeList == null) {
			return;
		}
		var cameraInside = true;
		face = this.faceList;
		while(face != null) {
			if(face.normalX * position.x + face.normalY * position.y + face.normalZ * position.z > face.offset) {
				face.visible = true;
				cameraInside = false;
			} else {
				face.visible = false;
			}
			face = face.next;
		}
		if(cameraInside) {
			return;
		}
		var t;
		var ax;
		var ay;
		var az;
		var bx;
		var by;
		var bz;
		var ox;
		var oy;
		var occludeAll = true;
		var d;
		var edge = this.edgeList;
		while(edge != null) if(edge.left.visible != edge.right.visible) {
			if(edge.left.visible) {
				a = edge.a;
				b = edge.b;
			} else {
				a = edge.b;
				b = edge.a;
			}
			ax = a.x;
			ay = a.y;
			az = a.z;
			bx = b.x;
			by = b.y;
			bz = b.z;
			plane = (altern_culling_CullingPlane().default).create();
			plane.next = this.planeList;
			this.planeList = plane;
		}
	}
	static get OPTION_CONVEX() { return OPTION_CONVEX; }
	static set OPTION_CONVEX(value) { OPTION_CONVEX = value; }
	static get OPTION_CALCULATE_EDGES() { return OPTION_CALCULATE_EDGES; }
	static set OPTION_CALCULATE_EDGES(value) { OPTION_CALCULATE_EDGES = value; }
	static get OPTION_WELD_VERTICES() { return OPTION_WELD_VERTICES; }
	static set OPTION_WELD_VERTICES(value) { OPTION_WELD_VERTICES = value; }
	static get OPTION_WELD_FACES() { return OPTION_WELD_FACES; }
	static set OPTION_WELD_FACES(value) { OPTION_WELD_FACES = value; }
	static get USE_OPTION_OCCLUDER_LEAST_0() { return USE_OPTION_OCCLUDER_LEAST_0; }
	static set USE_OPTION_OCCLUDER_LEAST_0(value) { USE_OPTION_OCCLUDER_LEAST_0 = value; }
	static get USE_OPTION_OCCLUDER_LEAST_1() { return USE_OPTION_OCCLUDER_LEAST_1; }
	static set USE_OPTION_OCCLUDER_LEAST_1(value) { USE_OPTION_OCCLUDER_LEAST_1 = value; }
	static get USE_OPTION_OCCLUDER() { return USE_OPTION_OCCLUDER; }
	static set USE_OPTION_OCCLUDER(value) { USE_OPTION_OCCLUDER = value; }
	static get DIGIT_THRESHOLD() { return DIGIT_THRESHOLD; }
	static set DIGIT_THRESHOLD(value) { DIGIT_THRESHOLD = value; }
}


// Meta

AMesh.__name__ = ["altern","geom","AMesh"];
AMesh.prototype.__class__ = AMesh.prototype.constructor = $hxClasses["altern.geom.AMesh"] = AMesh;

// Init



// Statics

var OPTION_CONVEX = 1;
var OPTION_CALCULATE_EDGES = 2;
var OPTION_WELD_VERTICES = 4;
var OPTION_WELD_FACES = 8;
var USE_OPTION_OCCLUDER_LEAST_0 = 3;
var USE_OPTION_OCCLUDER_LEAST_1 = 11;
var USE_OPTION_OCCLUDER = 15;
var DIGIT_THRESHOLD = 0.001;

// Export

exports.default = AMesh;