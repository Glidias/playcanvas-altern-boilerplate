// Class: altern.terrain.QuadSquareChunk

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function altern_terrain_QuadChunkCornerData() {return require("./../../altern/terrain/QuadChunkCornerData");}

// Constructor

class QuadSquareChunk {
	constructor() {
		this.MinY = 2147483647;
		this.MaxY = -2147483647;
		var i;
		var arr = [];
		arr.length = 4;
		this.Child = arr;
		this.EnabledFlags = 0;
		this.SubEnabledCount = new Int32Array(2);
		this.SubEnabledCount[0] = 0;
		this.SubEnabledCount[1] = 0;
	}
	destroy() {
		if(this.Child[0] != null) {
			this.Child[0].destroy();
			this.Child[0] = null;
		}
		if(this.Child[1] != null) {
			this.Child[1].destroy();
			this.Child[1] = null;
		}
		if(this.Child[2] != null) {
			this.Child[2].destroy();
			this.Child[2] = null;
		}
		if(this.Child[3] != null) {
			this.Child[3].destroy();
			this.Child[3] = null;
		}
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
			break;
		case 1:
			q.xorg = cd.xorg;
			q.zorg = cd.zorg;
			break;
		case 2:
			q.xorg = cd.xorg;
			q.zorg = cd.zorg + half;
			break;
		case 3:
			q.xorg = cd.xorg + half;
			q.zorg = cd.zorg + half;
			break;
		}
	}
	CountNodes() {
		var count = 1;
		var i = 0;
		while(i < 4) {
			if(this.Child[i] != null) {
				count += this.Child[i].CountNodes();
			} else {
				var u = 0;
				while(u < 4) {
					if(this.Child[u] != null) {
						throw new (js__$Boot_HaxeError().default)("NOT dense!");
					}
					++u;
				}
			}
			++i;
		}
		return count;
	}
	GetNeighbor(dir,cd) {
		if(cd.Parent == null) {
			if(QuadSquareChunk.QUADTREE_GRID != null) {
				return this.getNeighborCornerData(cd,dir).Square;
			} else {
				return cd.Square;
			}
		}
		var p = null;
		var index = cd.ChildIndex ^ 1 ^ (dir & 1) << 1;
		var SameParent = (dir - cd.ChildIndex & 2) != 0;
		if(SameParent) {
			p = cd.Parent.Square;
		} else {
			p = cd.Parent.Square.GetNeighbor(dir,cd.Parent);
			if(p == null) {
				return null;
			}
		}
		return p.Child[index];
	}
	EnableEdgeVertex(index,IncrementCount,cd) {
		if((this.EnabledFlags & 1 << index) != 0 && !IncrementCount) {
			return;
		}
		this.EnabledFlags |= 1 << index;
		if(IncrementCount && (index == 0 || index == 3)) {
			this.SubEnabledCount[index & 1]++;
		}
		var p = this;
		var pcd = cd;
		var ct = 0;
		var stack = QuadSquareChunk.STACK;
		while(true) {
			var ci = pcd.ChildIndex;
			if(pcd.Parent == null || pcd.Parent.Square == null) {
				if(QuadSquareChunk.QUADTREE_GRID != null) {
					pcd = this.getNeighborCornerData(pcd,index);
				} else {
					pcd = pcd;
				}
				p = pcd.Square;
				if(ct > 0) {
					break;
				}
				index ^= 2;
				p.EnabledFlags |= 1 << index;
				if(IncrementCount && (index == 0 || index == 3)) {
					p.SubEnabledCount[index & 1]++;
				}
				return;
			}
			p = pcd.Parent.Square;
			pcd = pcd.Parent;
			var SameParent = index - ci & 2;
			ci = ci ^ 1 ^ (index & 1) << 1;
			stack[ct++] = ci;
			if(SameParent != 0) {
				break;
			}
		}
		p = p.EnableDescendant(ct,stack,pcd);
		index ^= 2;
		p.EnabledFlags |= 1 << index;
		if(IncrementCount && (index == 0 || index == 3)) {
			p.SubEnabledCount[index & 1]++;
		}
	}
	getNeighborCornerData(pcd,dir) {
		var x = pcd.xorg;
		var z = pcd.zorg;
		var half = 1 << pcd.Level;
		var full = half << 1;
		var ci = pcd.ChildIndex;
		if(dir == 0) {
			x += full;
			if(x > QuadSquareChunk.QUADTREE_GRID.originX + QuadSquareChunk.QUADTREE_GRID.cols * full - full) {
				x = 0;
			}
		} else if(dir == 1) {
			z -= full;
			if(z < QuadSquareChunk.QUADTREE_GRID.originY) {
				z = QuadSquareChunk.QUADTREE_GRID.cols * full - full;
			}
		} else if(dir == 2) {
			x -= full;
			if(x < QuadSquareChunk.QUADTREE_GRID.originX) {
				x = QuadSquareChunk.QUADTREE_GRID.cols * full - full;
			}
		} else {
			z += full;
			if(z > QuadSquareChunk.QUADTREE_GRID.originY + QuadSquareChunk.QUADTREE_GRID.cols * full - full) {
				z = 0;
			}
		}
		var _this = QuadSquareChunk.QUADTREE_GRID;
		var level = pcd.Level;
		++level;
		return _this.vec[(z - _this.originY >> level) * _this.cols + (x - _this.originX >> level)];
	}
	EnableDescendant(count,path,cd) {
		--count;
		var ChildIndex = path[count];
		if((this.EnabledFlags & 16 << ChildIndex) == 0) {
			this.EnableChild(ChildIndex,cd);
		}
		if(count > 0) {
			var q = (altern_terrain_QuadChunkCornerData().default).create();
			this.SetupCornerData(q,cd,ChildIndex);
			return this.Child[ChildIndex].EnableDescendant(count,path,q);
		} else {
			return this.Child[ChildIndex];
		}
	}
	EnableChild(index,cd) {
		if(cd.Level <= QuadSquareChunk.LOD_LVL_MIN) {
			throw new (js__$Boot_HaxeError().default)("SHOULD not allow!");
		}
		if((this.EnabledFlags & 16 << index) == 0) {
			this.EnabledFlags |= 16 << index;
			this.EnableEdgeVertex(index,true,cd);
			this.EnableEdgeVertex(index + 1 & 3,true,cd);
		}
	}
	NotifyChildDisable(cd,index) {
		this.EnabledFlags &= ~(16 << index);
		var s;
		if((index & 2) != 0) {
			s = this;
		} else {
			s = this.GetNeighbor(1,cd);
		}
		if(s != null) {
			s.SubEnabledCount[1]--;
		}
		if(index == 1 || index == 2) {
			s = this.GetNeighbor(2,cd);
		} else {
			s = this;
		}
		if(s != null) {
			s.SubEnabledCount[0]--;
		}
	}
	ResetTree() {
		if(this.Child[0] != null) {
			this.Child[0].ResetTree();
		}
		if(this.Child[1] != null) {
			this.Child[1].ResetTree();
		}
		if(this.Child[2] != null) {
			this.Child[2].ResetTree();
		}
		if(this.Child[3] != null) {
			this.Child[3].ResetTree();
		}
		this.EnabledFlags = 0;
		this.SubEnabledCount[0] = 0;
		this.SubEnabledCount[1] = 0;
	}
	BoxTest(x,z,size,miny,maxy,error,camera) {
		var half = size * 0.5;
		var dx = Math.abs(x + half - camera.x) - half;
		var dy = Math.abs((miny + maxy) * 0.5 - camera.y) - (maxy - miny) * 0.5;
		var dz = Math.abs(z + half - camera.z) - half;
		var d = dx;
		if(dy > d) {
			d = dy;
		}
		if(dz > d) {
			d = dz;
		}
		return error * QuadSquareChunk.DetailThreshold > d;
	}
	Update(cd,camera,Detail,culler,culling) {
		(altern_terrain_QuadChunkCornerData().default).BI = 0;
		QuadSquareChunk.DetailThreshold = Detail;
		this.UpdateAux(cd,camera,0,culler,culling);
	}
	UpdateAux(cd,camera,CenterError,culler,culling) {
		if(culling < 0) {
			return;
		}
		QuadSquareChunk.BlockUpdateCount++;
		var half = 1 << cd.Level;
		var whole = half << 1;
		var s;
		var succeeded = false;
		if(culling >= 0 && cd.Level > QuadSquareChunk.LOD_LVL_MIN) {
			if((this.EnabledFlags & 16) == 0) {
				if(this.BoxTest(cd.xorg + half,cd.zorg,half,this.MinY,this.MaxY,this.Child[0].error,camera)) {
					this.EnableChild(0,cd);
					succeeded = true;
				}
			}
			if((this.EnabledFlags & 32) == 0) {
				if(this.BoxTest(cd.xorg,cd.zorg,half,this.MinY,this.MaxY,this.Child[1].error,camera)) {
					this.EnableChild(1,cd);
					succeeded = true;
				}
			}
			if((this.EnabledFlags & 64) == 0) {
				if(this.BoxTest(cd.xorg,cd.zorg + half,half,this.MinY,this.MaxY,this.Child[2].error,camera)) {
					this.EnableChild(2,cd);
					succeeded = true;
				}
			}
			if((this.EnabledFlags & 128) == 0) {
				if(this.BoxTest(cd.xorg + half,cd.zorg + half,half,this.MinY,this.MaxY,this.Child[3].error,camera)) {
					this.EnableChild(3,cd);
					succeeded = true;
				}
			}
			var q;
			if((this.EnabledFlags & 32) != 0) {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				this.SetupCornerData(q,cd,1);
				s = this.Child[1];
				s.UpdateAux(q,camera,s.error,culler,culling != 0 ? culler.cullingInFrustum(culling,q.xorg,q.Square.MinY,q.zorg,q.xorg + half,q.Square.MaxY,q.zorg + half) : 0);
			}
			if((this.EnabledFlags & 16) != 0) {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				this.SetupCornerData(q,cd,0);
				s = this.Child[0];
				s.UpdateAux(q,camera,s.error,culler,culling != 0 ? culler.cullingInFrustum(culling,q.xorg,q.Square.MinY,q.zorg,q.xorg + half,q.Square.MaxY,q.zorg + half) : 0);
			}
			if((this.EnabledFlags & 64) != 0) {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				this.SetupCornerData(q,cd,2);
				s = this.Child[2];
				s.UpdateAux(q,camera,s.error,culler,culling != 0 ? culler.cullingInFrustum(culling,q.xorg,q.Square.MinY,q.zorg,q.xorg + half,q.Square.MaxY,q.zorg + half) : 0);
			}
			if((this.EnabledFlags & 128) != 0) {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				this.SetupCornerData(q,cd,3);
				s = this.Child[3];
				s.UpdateAux(q,camera,s.error,culler,culling != 0 ? culler.cullingInFrustum(culling,q.xorg,q.Square.MinY,q.zorg,q.xorg + half,q.Square.MaxY,q.zorg + half) : 0);
			}
		}
		var recursable = succeeded || this.BoxTest(cd.xorg,cd.zorg,whole,this.MinY,this.MaxY,CenterError,camera);
		if(!recursable) {
			if((this.EnabledFlags & 1) != 0 && this.SubEnabledCount[0] == 0) {
				this.EnabledFlags &= -2;
				s = this.GetNeighbor(0,cd);
				if(s != null) {
					s.EnabledFlags &= -5;
				}
			}
			if((this.EnabledFlags & 8) != 0 && this.SubEnabledCount[1] == 0) {
				this.EnabledFlags &= -9;
				s = this.GetNeighbor(3,cd);
				if(s != null) {
					s.EnabledFlags &= -3;
				}
			}
			if((this.EnabledFlags & 255) == 0 && cd.Parent != null) {
				this.EnabledFlags = 0;
				cd.Parent.Square.NotifyChildDisable(cd.Parent,cd.ChildIndex);
			}
		}
	}
	static get BlockUpdateCount() { return BlockUpdateCount; }
	static set BlockUpdateCount(value) { BlockUpdateCount = value; }
	static get DetailThreshold() { return DetailThreshold; }
	static set DetailThreshold(value) { DetailThreshold = value; }
	static get LOD_LVL_MIN() { return LOD_LVL_MIN; }
	static set LOD_LVL_MIN(value) { LOD_LVL_MIN = value; }
	static get STACK() { return STACK; }
	static set STACK(value) { STACK = value; }
}


// Meta

QuadSquareChunk.__name__ = ["altern","terrain","QuadSquareChunk"];
QuadSquareChunk.prototype.__class__ = QuadSquareChunk.prototype.constructor = $hxClasses["altern.terrain.QuadSquareChunk"] = QuadSquareChunk;

// Init



// Statics

var BlockUpdateCount = 0;
var DetailThreshold = 100;
var LOD_LVL_MIN = 12;
var STACK = (function($this) {
	var $r;
	var arr = [];
	arr.length = 32;
	$r = arr;
	return $r;
}(this));

// Export

exports.default = QuadSquareChunk;