// Class: altern.terrain.QuadSquare

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_terrain_QuadCornerData() {return require("./../../altern/terrain/QuadCornerData");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function altern_terrain_QuadSquareChunk() {return require("./../../altern/terrain/QuadSquareChunk");}

// Constructor

class QuadSquare {
	constructor(pcd) {
		var arr = [];
		arr.length = 6;
		this.errorList = arr;
		var arr1 = [];
		arr1.length = 5;
		this.Vertex = arr1;
		this.Child = [];
		pcd.Square = this;
		this.MinY = 32767;
		this.MaxY = -32768;
		var i;
		this.Vertex[0] = 0.25 * (pcd.Verts[0] + pcd.Verts[1] + pcd.Verts[2] + pcd.Verts[3]) | 0;
		this.Vertex[1] = 0.5 * (pcd.Verts[3] + pcd.Verts[0]) | 0;
		this.Vertex[2] = 0.5 * (pcd.Verts[0] + pcd.Verts[1]) | 0;
		this.Vertex[3] = 0.5 * (pcd.Verts[1] + pcd.Verts[2]) | 0;
		this.Vertex[4] = 0.5 * (pcd.Verts[2] + pcd.Verts[3]) | 0;
		var i1 = 0;
		while(i1 < 2) {
			this.errorList[i1] = 0;
			++i1;
		}
		i1 = 0;
		while(i1 < 4) {
			this.errorList[i1 + 2] = Math.abs(this.Vertex[0] + pcd.Verts[i1] - (this.Vertex[i1 + 1] + this.Vertex[(i1 + 1 & 3) + 1])) * 0.25 | 0;
			++i1;
		}
		this.MinY = this.MaxY = pcd.Verts[0];
		i1 = 0;
		while(i1 < 4) {
			var y = pcd.Verts[i1];
			if(y < this.MinY) {
				this.MinY = y;
			}
			if(y > this.MaxY) {
				this.MaxY = y;
			}
			++i1;
		}
	}
	destroy() {
		var i = 0;
		while(i < 4) {
			if(this.Child[i] != null) {
				this.Child[i].destroy();
				this.Child[i] = null;
			}
			++i;
		}
		this.Child = null;
		this.Vertex = null;
		this.errorList = null;
	}
	SetupCornerData(q,cd,ChildIndex) {
		var half = 1 << cd.Level;
		q.Parent = cd;
		q.Square = this.Child[ChildIndex];
		q.Level = cd.Level - 1;
		q.ChildIndex = ChildIndex;
		switch(ChildIndex) {
		case 0:
			q.xorg = cd.xorg + half;
			q.zorg = cd.zorg;
			q.Verts[0] = cd.Verts[0];
			q.Verts[1] = this.Vertex[2];
			q.Verts[2] = this.Vertex[0];
			q.Verts[3] = this.Vertex[1];
			break;
		case 1:
			q.xorg = cd.xorg;
			q.zorg = cd.zorg;
			q.Verts[0] = this.Vertex[2];
			q.Verts[1] = cd.Verts[1];
			q.Verts[2] = this.Vertex[3];
			q.Verts[3] = this.Vertex[0];
			break;
		case 2:
			q.xorg = cd.xorg;
			q.zorg = cd.zorg + half;
			q.Verts[0] = this.Vertex[0];
			q.Verts[1] = this.Vertex[3];
			q.Verts[2] = cd.Verts[2];
			q.Verts[3] = this.Vertex[4];
			break;
		case 3:
			q.xorg = cd.xorg + half;
			q.zorg = cd.zorg + half;
			q.Verts[0] = this.Vertex[1];
			q.Verts[1] = this.Vertex[0];
			q.Verts[2] = this.Vertex[4];
			q.Verts[3] = cd.Verts[3];
			break;
		}
	}
	SampleFromHeightMap(cd,hm) {
		var BlockSize = 2 << cd.Level;
		if(cd.xorg > hm.XOrigin + (hm.XSize + 2 << hm.Scale) || cd.xorg + BlockSize < hm.XOrigin - (1 << hm.Scale) || cd.zorg > hm.ZOrigin + (hm.ZSize + 2 << hm.Scale) || cd.zorg + BlockSize < hm.ZOrigin - (1 << hm.Scale)) {
			return;
		}
		cd.Verts[0] = hm.Sample(cd.xorg + BlockSize,cd.zorg);
		cd.Verts[1] = hm.Sample(cd.xorg,cd.zorg);
		cd.Verts[2] = hm.Sample(cd.xorg,cd.zorg + BlockSize);
		cd.Verts[3] = hm.Sample(cd.xorg + BlockSize,cd.zorg + BlockSize);
		var i;
		var half = 1 << cd.Level;
		var size = half << 1;
		var arr = [];
		arr.length = 5;
		var s = arr;
		s[0] = hm.Sample(cd.xorg + half,cd.zorg + half);
		s[1] = hm.Sample(cd.xorg + (half << 1),cd.zorg + half);
		s[2] = hm.Sample(cd.xorg + half,cd.zorg);
		s[3] = hm.Sample(cd.xorg,cd.zorg + half);
		s[4] = hm.Sample(cd.xorg + half,cd.zorg + (half << 1));
		i = 0;
		while(i < 5) {
			this.Vertex[i] = s[i];
			++i;
		}
	}
	AddHeightMap(cd,hm) {
		var BlockSize = 2 << cd.Level;
		if(cd.xorg > hm.XOrigin + (hm.XSize + 2 << hm.Scale) || cd.xorg + BlockSize < hm.XOrigin - (1 << hm.Scale) || cd.zorg > hm.ZOrigin + (hm.ZSize + 2 << hm.Scale) || cd.zorg + BlockSize < hm.ZOrigin - (1 << hm.Scale)) {
			return;
		}
		cd.Verts[0] = hm.Sample(cd.xorg + BlockSize,cd.zorg);
		cd.Verts[1] = hm.Sample(cd.xorg,cd.zorg);
		cd.Verts[2] = hm.Sample(cd.xorg,cd.zorg + BlockSize);
		cd.Verts[3] = hm.Sample(cd.xorg + BlockSize,cd.zorg + BlockSize);
		var i;
		var half = 1 << cd.Level;
		var size = half << 1;
		if(cd.Level >= hm.Scale) {
			i = 0;
			while(i < 4) {
				var q = new (altern_terrain_QuadCornerData().default)();
				this.SetupCornerData(q,cd,i);
				if(this.Child[i] == null) {
					this.Child[i] = new QuadSquare(q);
				}
				this.Child[i].AddHeightMap(q,hm);
				++i;
			}
		}
		this.Vertex[0] = hm.Sample(cd.xorg + half,cd.zorg + half);
		this.Vertex[1] = hm.Sample(cd.xorg + (half << 1),cd.zorg + half);
		this.Vertex[2] = hm.Sample(cd.xorg + half,cd.zorg);
		this.Vertex[3] = hm.Sample(cd.xorg,cd.zorg + half);
		this.Vertex[4] = hm.Sample(cd.xorg + half,cd.zorg + (half << 1));
	}
	GetQuadSquareChunk(cd,error,targetChunkLevel) {
		if(targetChunkLevel == null) {
			targetChunkLevel = 12;
		}
		if(cd.Level < targetChunkLevel) {
			throw new (js__$Boot_HaxeError().default)("LOD of current quad square is too fine for target chunk LOD level!");
		}
		var chunk = new (altern_terrain_QuadSquareChunk().default)();
		chunk.MinY = this.MinY;
		chunk.MaxY = this.MaxY;
		if(this.MaxY == this.MinY) {
			chunk.MaxY = chunk.MinY + 1;
		}
		chunk.error = error;
		if(cd.Level == targetChunkLevel) {
			return chunk;
		}
		var q = new (altern_terrain_QuadCornerData().default)();
		this.SetupCornerData(q,cd,0);
		chunk.Child[0] = this.GetQuadSquareChunk(q,this.errorList[0],targetChunkLevel);
		q = new (altern_terrain_QuadCornerData().default)();
		this.SetupCornerData(q,cd,1);
		chunk.Child[1] = this.GetQuadSquareChunk(q,this.errorList[1],targetChunkLevel);
		q = new (altern_terrain_QuadCornerData().default)();
		this.SetupCornerData(q,cd,2);
		chunk.Child[2] = this.GetQuadSquareChunk(q,this.errorList[2],targetChunkLevel);
		q = new (altern_terrain_QuadCornerData().default)();
		this.SetupCornerData(q,cd,3);
		chunk.Child[3] = this.GetQuadSquareChunk(q,this.errorList[3],targetChunkLevel);
		return chunk;
	}
	RecomputeErrorAndLighting(cd) {
		var i;
		var y;
		var maxerror = 0;
		var e;
		if((cd.ChildIndex & 1) != 0) {
			e = Math.round(Math.abs(this.Vertex[0] - (cd.Verts[1] + cd.Verts[3]) * 0.5));
		} else {
			e = Math.round(Math.abs(this.Vertex[0] - (cd.Verts[0] + cd.Verts[2]) * 0.5));
		}
		if(e > maxerror) {
			maxerror = e;
		}
		this.MaxY = this.Vertex[0];
		this.MinY = this.Vertex[0];
		i = 0;
		while(i < 4) {
			y = cd.Verts[i];
			if(y < this.MinY) {
				this.MinY = y;
			}
			if(y > this.MaxY) {
				this.MaxY = y;
			}
			++i;
		}
		e = Math.round(Math.abs(this.Vertex[1] - (cd.Verts[0] + cd.Verts[3]) * 0.5));
		if(e > maxerror) {
			maxerror = e;
		}
		this.errorList[0] = e;
		e = Math.round(Math.abs(this.Vertex[4] - (cd.Verts[2] + cd.Verts[3]) * 0.5));
		if(e > maxerror) {
			maxerror = e;
		}
		this.errorList[1] = e;
		i = 0;
		while(i < 4) {
			y = this.Vertex[1 + i];
			if(y < this.MinY) {
				this.MinY = y;
			}
			if(y > this.MaxY) {
				this.MaxY = y;
			}
			++i;
		}
		i = 0;
		while(i < 4) {
			if(this.Child[i] != null) {
				var q = new (altern_terrain_QuadCornerData().default)();
				this.SetupCornerData(q,cd,i);
				this.errorList[i + 2] = this.Child[i].RecomputeErrorAndLighting(q) | 0;
				if(this.Child[i].MinY < this.MinY) {
					this.MinY = this.Child[i].MinY;
				}
				if(this.Child[i].MaxY > this.MaxY) {
					this.MaxY = this.Child[i].MaxY;
				}
			} else {
				this.errorList[i + 2] = Math.abs(this.Vertex[0] + cd.Verts[i] - (this.Vertex[i + 1] + this.Vertex[(i + 1 & 3) + 1])) * 0.25 | 0;
			}
			if(this.errorList[i + 2] > maxerror) {
				maxerror = this.errorList[i + 2];
			}
			++i;
		}
		return maxerror;
	}
}


// Meta

QuadSquare.__name__ = ["altern","terrain","QuadSquare"];
QuadSquare.prototype.__class__ = QuadSquare.prototype.constructor = $hxClasses["altern.terrain.QuadSquare"] = QuadSquare;

// Init



// Statics



// Export

exports.default = QuadSquare;