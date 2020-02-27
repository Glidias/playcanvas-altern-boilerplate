// Class: altern.terrain.TerrainGeomTools

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function util_geom_Geometry() {return require("./../../util/geom/Geometry");}
function altern_terrain_GeometryResult() {return require("./../../altern/terrain/GeometryResult");}

// Constructor

class TerrainGeomTools {
	constructor(){}
	static get NORTH_EAST() { return NORTH_EAST; }
	static set NORTH_EAST(value) { NORTH_EAST = value; }
	static get NORTH_WEST() { return NORTH_WEST; }
	static set NORTH_WEST(value) { NORTH_WEST = value; }
	static get SOUTH_WEST() { return SOUTH_WEST; }
	static set SOUTH_WEST(value) { SOUTH_WEST = value; }
	static get SOUTH_EAST() { return SOUTH_EAST; }
	static set SOUTH_EAST(value) { SOUTH_EAST = value; }
	static get MASK_EAST() { return MASK_EAST; }
	static set MASK_EAST(value) { MASK_EAST = value; }
	static get MASK_NORTH() { return MASK_NORTH; }
	static set MASK_NORTH(value) { MASK_NORTH = value; }
	static get MASK_WEST() { return MASK_WEST; }
	static set MASK_WEST(value) { MASK_WEST = value; }
	static get MASK_SOUTH() { return MASK_SOUTH; }
	static set MASK_SOUTH(value) { MASK_SOUTH = value; }
	static createLODTerrainChunkForMesh(patchesAcross,patchSize) {
		if(patchSize == null) {
			patchSize = 256;
		}
		if(patchesAcross == null) {
			patchesAcross = 32;
		}
		var vAcross = patchesAcross + 1;
		var i;
		var geom = new (util_geom_Geometry().default)();
		geom.vertices.length = vAcross * vAcross;
		var vertices = [];
		var indices = [];
		var x;
		var y;
		var segUVSize = 1 / patchesAcross;
		var offsetAdditionalData = 0;
		var vIndexLookup = new Int32Array(vAcross * vAcross);
		var count = 0;
		y = 2;
		while(y < vAcross - 2) {
			x = 2;
			while(x < vAcross - 2) {
				TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
				vIndexLookup[y * vAcross + x] = count++;
				++x;
			}
			++y;
		}
		x = vAcross - 2;
		y = vAcross - 3;
		while(y >= 2) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y -= 2;
		}
		y = 1;
		x = vAcross - 3;
		while(x >= 2) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x -= 2;
		}
		x = 1;
		y = 2;
		while(y <= vAcross - 3) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y += 2;
		}
		y = vAcross - 2;
		x = 2;
		while(x <= vAcross - 3) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x += 2;
		}
		y = vAcross - 2;
		x = vAcross - 1;
		while(y >= 1) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y -= 2;
		}
		y = 0;
		x = vAcross - 2;
		while(x >= 1) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x -= 2;
		}
		x = 0;
		y = 1;
		while(y <= vAcross - 2) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y += 2;
		}
		x = 1;
		y = vAcross - 1;
		while(x <= vAcross - 2) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x += 2;
		}
		var noChangeVertexCount = count;
		x = vAcross - 2;
		y = vAcross - 2;
		while(y >= 1) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y -= 2;
		}
		x = vAcross - 1;
		y = vAcross - 1;
		while(y >= 0) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y -= 2;
		}
		y = 1;
		x = vAcross - 4;
		while(x >= 1) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x -= 2;
		}
		y = 0;
		x = vAcross - 3;
		while(x >= 0) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x -= 2;
		}
		x = 1;
		y = 3;
		while(y <= vAcross - 2) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y += 2;
		}
		x = 0;
		y = 2;
		while(y <= vAcross - 1) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			y += 2;
		}
		y = vAcross - 2;
		x = 3;
		while(x <= vAcross - 4) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x += 2;
		}
		y = vAcross - 1;
		x = 2;
		while(x <= vAcross - 3) {
			TerrainGeomTools.writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData);
			vIndexLookup[y * vAcross + x] = count++;
			x += 2;
		}
		y = 0;
		while(y < patchesAcross) {
			x = 0;
			while(x < patchesAcross) {
				TerrainGeomTools.createFace(indices,vertices,vIndexLookup[y * vAcross + x + 2],vIndexLookup[y * vAcross + x + 1],vIndexLookup[(y + 1) * vAcross + x + 1],vIndexLookup[(y + 1) * vAcross + x + 2],0,0,1,1,0,0,-1,true);
				TerrainGeomTools.createFace(indices,vertices,vIndexLookup[y * vAcross + x],vIndexLookup[(y + 1) * vAcross + x],vIndexLookup[(y + 1) * vAcross + x + 1],vIndexLookup[y * vAcross + x + 1],0,0,1,1,0,0,-1,true);
				TerrainGeomTools.createFace(indices,vertices,vIndexLookup[(y + 1) * vAcross + x + 1],vIndexLookup[(y + 1) * vAcross + x],vIndexLookup[(y + 2) * vAcross + x],vIndexLookup[(y + 2) * vAcross + x + 1],0,0,1,1,0,0,-1,true);
				TerrainGeomTools.createFace(indices,vertices,vIndexLookup[(y + 1) * vAcross + x + 1],vIndexLookup[(y + 2) * vAcross + x + 1],vIndexLookup[(y + 2) * vAcross + x + 2],vIndexLookup[(y + 1) * vAcross + x + 2],0,0,1,1,0,0,-1,true);
				x += 2;
			}
			y += 2;
		}
		geom.indices = indices;
		geom.numIndices = indices.length;
		geom.vertices = vertices;
		geom.numVertices = vertices.length / 3 | 0;
		var result = new (altern_terrain_GeometryResult().default)();
		result.geometry = geom;
		result.edgeChangeVertexIndex = noChangeVertexCount;
		result.uvSeg = segUVSize;
		result.indexLookup = vIndexLookup;
		result.verticesAcross = vAcross;
		result.patchSize = patchSize;
		return result;
	}
	static writeVertices(vertices,x,y,patchSize,segUVSize,offsetAdditionalData) {
		vertices.push(x * patchSize);
		vertices.push(0);
		vertices.push(-y * patchSize);
		while(--offsetAdditionalData > -1) vertices.push(0);
	}
	static createFace(indices,vertices,a,b,c,d,nx,ny,nz,tx,ty,tz,tw,reverse) {
		var temp;
		if(reverse) {
			nx = -nx;
			ny = -ny;
			nz = -nz;
			tw = -tw;
			temp = a;
			a = d;
			d = temp;
			temp = b;
			b = c;
			c = temp;
		}
		indices.push(a);
		indices.push(b);
		indices.push(c);
		indices.push(a);
		indices.push(c);
		indices.push(d);
	}
	static writeInnerIndicesToByteArray(patchesAcross,vIndexLookup,indices,addInnerPadding) {
		if(addInnerPadding == null) {
			addInnerPadding = 0;
		}
		var x;
		var y;
		var count = 0;
		var vAcross = patchesAcross + 1;
		y = 2 + addInnerPadding;
		while(y < patchesAcross - 2 - addInnerPadding) {
			x = 2 + addInnerPadding;
			while(x < patchesAcross - 2 - addInnerPadding) {
				TerrainGeomTools.writeRegularQuad(x,y,vAcross,indices,vIndexLookup);
				++count;
				x += 2;
			}
			y += 2;
		}
	}
	static writeEdgeVerticesToByteArray(patchesAcross,vIndexLookup,indices,edgeMask) {
		var x;
		var y;
		var vAcross = patchesAcross + 1;
		var count;
		x = vAcross - 3;
		count = 0;
		y = vAcross - 5;
		while(y >= 2) {
			TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 1);
			++count;
			y -= 2;
		}
		y = 0;
		TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 3);
		count = 0;
		x = vAcross - 5;
		while(x >= 2) {
			TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 2);
			++count;
			x -= 2;
		}
		x = 0;
		TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 6);
		count = 0;
		y = 2;
		while(y <= vAcross - 5) {
			TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 4);
			++count;
			y += 2;
		}
		y = vAcross - 3;
		TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 12);
		count = 0;
		y = vAcross - 3;
		x = 2;
		while(x <= vAcross - 5) {
			TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 8);
			++count;
			x += 2;
		}
		x = vAcross - 3;
		TerrainGeomTools.writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,edgeMask & 9);
	}
	static writeRegularQuad(x,y,vAcross,indices,vIndexLookup) {
		var a;
		var b;
		var c;
		var d;
		a = vIndexLookup[y * vAcross + x + 2];
		b = vIndexLookup[y * vAcross + x + 1];
		c = vIndexLookup[(y + 1) * vAcross + x + 1];
		d = vIndexLookup[(y + 1) * vAcross + x + 2];
		indices.push(a);
		indices.push(b);
		indices.push(c);
		indices.push(a);
		indices.push(c);
		indices.push(d);
		a = vIndexLookup[y * vAcross + x];
		b = vIndexLookup[(y + 1) * vAcross + x];
		c = vIndexLookup[(y + 1) * vAcross + x + 1];
		d = vIndexLookup[y * vAcross + x + 1];
		indices.push(a);
		indices.push(b);
		indices.push(c);
		indices.push(a);
		indices.push(c);
		indices.push(d);
		a = vIndexLookup[(y + 1) * vAcross + x + 1];
		b = vIndexLookup[(y + 1) * vAcross + x];
		c = vIndexLookup[(y + 2) * vAcross + x];
		d = vIndexLookup[(y + 2) * vAcross + x + 1];
		indices.push(a);
		indices.push(b);
		indices.push(c);
		indices.push(a);
		indices.push(c);
		indices.push(d);
		a = vIndexLookup[(y + 1) * vAcross + x + 1];
		b = vIndexLookup[(y + 2) * vAcross + x + 1];
		c = vIndexLookup[(y + 2) * vAcross + x + 2];
		d = vIndexLookup[(y + 1) * vAcross + x + 2];
		indices.push(a);
		indices.push(b);
		indices.push(c);
		indices.push(a);
		indices.push(c);
		indices.push(d);
	}
	static writeConditionalQuad(x,y,vAcross,indices,vIndexLookup,disabledEdgeVertices) {
		var a;
		var b;
		var c;
		var d;
		a = vIndexLookup[y * vAcross + x + 2];
		b = vIndexLookup[y * vAcross + x + 1];
		c = vIndexLookup[(y + 1) * vAcross + x + 1];
		d = vIndexLookup[(y + 1) * vAcross + x + 2];
		if((disabledEdgeVertices & 3) != 0) {
			if((disabledEdgeVertices & 2) == 0) {
				indices.push(c);
				indices.push(a);
				indices.push(b);
			}
			if((disabledEdgeVertices & 1) == 0) {
				indices.push(c);
				indices.push(d);
				indices.push(a);
			}
		} else {
			indices.push(a);
			indices.push(b);
			indices.push(c);
			indices.push(a);
			indices.push(c);
			indices.push(d);
		}
		a = vIndexLookup[y * vAcross + x];
		b = vIndexLookup[(y + 1) * vAcross + x];
		c = vIndexLookup[(y + 1) * vAcross + x + 1];
		d = vIndexLookup[y * vAcross + x + 1];
		if((disabledEdgeVertices & 6) != 0) {
			if((disabledEdgeVertices & 2) == 0) {
				indices.push(c);
				indices.push(d);
				indices.push(a);
			}
			if((disabledEdgeVertices & 4) == 0) {
				indices.push(c);
				indices.push(a);
				indices.push(b);
			}
		} else {
			indices.push(a);
			indices.push(b);
			indices.push(c);
			indices.push(a);
			indices.push(c);
			indices.push(d);
		}
		a = vIndexLookup[(y + 1) * vAcross + x + 1];
		b = vIndexLookup[(y + 1) * vAcross + x];
		c = vIndexLookup[(y + 2) * vAcross + x];
		d = vIndexLookup[(y + 2) * vAcross + x + 1];
		if((disabledEdgeVertices & 12) != 0) {
			if((disabledEdgeVertices & 8) == 0) {
				indices.push(a);
				indices.push(c);
				indices.push(d);
			}
			if((disabledEdgeVertices & 4) == 0) {
				indices.push(a);
				indices.push(b);
				indices.push(c);
			}
		} else {
			indices.push(a);
			indices.push(b);
			indices.push(c);
			indices.push(a);
			indices.push(c);
			indices.push(d);
		}
		a = vIndexLookup[(y + 1) * vAcross + x + 1];
		b = vIndexLookup[(y + 2) * vAcross + x + 1];
		c = vIndexLookup[(y + 2) * vAcross + x + 2];
		d = vIndexLookup[(y + 1) * vAcross + x + 2];
		if((disabledEdgeVertices & 9) != 0) {
			if((disabledEdgeVertices & 8) == 0) {
				indices.push(a);
				indices.push(b);
				indices.push(c);
			}
			if((disabledEdgeVertices & 1) == 0) {
				indices.push(a);
				indices.push(c);
				indices.push(d);
			}
		} else {
			indices.push(a);
			indices.push(b);
			indices.push(c);
			indices.push(a);
			indices.push(c);
			indices.push(d);
		}
		a = vIndexLookup[(y + 1) * vAcross + x + 1];
		if((disabledEdgeVertices & 1) != 0) {
			b = vIndexLookup[(y + 2) * vAcross + x + 2];
			c = vIndexLookup[y * vAcross + x + 2];
			indices.push(a);
			indices.push(b);
			indices.push(c);
		}
		if((disabledEdgeVertices & 2) != 0) {
			b = vIndexLookup[y * vAcross + x + 2];
			c = vIndexLookup[y * vAcross + x];
			indices.push(a);
			indices.push(b);
			indices.push(c);
		}
		if((disabledEdgeVertices & 4) != 0) {
			b = vIndexLookup[y * vAcross + x];
			c = vIndexLookup[(y + 2) * vAcross + x];
			indices.push(a);
			indices.push(b);
			indices.push(c);
		}
		if((disabledEdgeVertices & 8) != 0) {
			b = vIndexLookup[(y + 2) * vAcross + x];
			c = vIndexLookup[(y + 2) * vAcross + x + 2];
			indices.push(a);
			indices.push(b);
			indices.push(c);
		}
	}
}


// Meta

TerrainGeomTools.__name__ = ["altern","terrain","TerrainGeomTools"];
TerrainGeomTools.prototype.__class__ = TerrainGeomTools.prototype.constructor = $hxClasses["altern.terrain.TerrainGeomTools"] = TerrainGeomTools;

// Init



// Statics

var NORTH_EAST = 0;
var NORTH_WEST = 1;
var SOUTH_WEST = 2;
var SOUTH_EAST = 3;
var MASK_EAST = 1;
var MASK_NORTH = 2;
var MASK_WEST = 4;
var MASK_SOUTH = 8;

// Export

exports.default = TerrainGeomTools;