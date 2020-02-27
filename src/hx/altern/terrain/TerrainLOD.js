// Class: altern.terrain.TerrainLOD

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function altern_ray_IRaycastImpl() {return require("./../../altern/ray/IRaycastImpl");}
function altern_terrain_ICuller() {return require("./../../altern/terrain/ICuller");}
function altern_terrain_NoCulling() {return require("./../../altern/terrain/NoCulling");}
function altern_terrain_WaterClipCulling() {return require("./../../altern/terrain/WaterClipCulling");}
function altern_terrain_TerrainGeomTools() {return require("./../../altern/terrain/TerrainGeomTools");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function altern_terrain_TerrainChunkState() {return require("./../../altern/terrain/TerrainChunkState");}
function altern_terrain_QuadTreePage() {return require("./../../altern/terrain/QuadTreePage");}
function altern_terrain_QuadChunkCornerData() {return require("./../../altern/terrain/QuadChunkCornerData");}
function altern_terrain_QuadSquareChunk() {return require("./../../altern/terrain/QuadSquareChunk");}
function jeash_geom_Vector3D() {return require("./../../jeash/geom/Vector3D");}
function altern_terrain_QuadCornerData() {return require("./../../altern/terrain/QuadCornerData");}
function altern_terrain_TerrainChunkStateList() {return require("./../../altern/terrain/TerrainChunkStateList");}

// Constructor

class TerrainLOD {
	constructor() {
		this.numCollisionTriangles = 0;
		this.currentLookupIndex = 0;
		this.lodLvlMin = 12;
		this._patchHeights = new Int32Array(12);
		this._squaredDistUpdate = 0;
		this.waterLevel = -3.40282346638528e+38;
		this.detail = 5;
		this._data32PerVertex = 3;
		this.handedness = 1;
		this._lastUpdateCameraPos = new (jeash_geom_Vector3D().default)();
		this._cameraPos = new (jeash_geom_Vector3D().default)();
		this.cached_retrieved = 0;
		this.pool_retrieved = 0;
		this.newly_instantiated = 0;
		this.lastDrawnChunks = 0;
		this.drawnChunks = 0;
		this.activeChunks = new (altern_terrain_TerrainChunkStateList().default)();
		this.chunkPool = new (altern_terrain_TerrainChunkStateList().default)();
		this.culler = this;
		this._patchHeights[0] = 0;
		this._patchHeights[1] = 0;
		this._patchHeights[3] = 1;
		this._patchHeights[4] = 0;
		this._patchHeights[6] = 0;
		this._patchHeights[7] = 1;
		this._patchHeights[9] = 1;
		this._patchHeights[10] = 1;
		this._lastUpdateCameraPos.x = -1e22;
		this._lastUpdateCameraPos.y = -1e22;
		this._lastUpdateCameraPos.z = -1e22;
		this.cornerMask = new Int32Array(4);
		this.cornerMask[0] = 12;
		this.cornerMask[1] = 9;
		this.cornerMask[2] = 3;
		this.cornerMask[3] = 6;
	}
	setDetail(val) {
		this.detail = val;
		this._lastUpdateCameraPos.x = -1e22;
		this._lastUpdateCameraPos.y = -1e22;
		this._lastUpdateCameraPos.z = -1e22;
	}
	setupUpdateCullingMode(mode) {
		this.culler = mode == 0 ? new (altern_terrain_NoCulling().default)() : mode == 1 ? new (altern_terrain_WaterClipCulling().default)(this) : this;
	}
	setUpdateRadius(val) {
		this._squaredDistUpdate = val * val;
	}
	setupIndexReferences(indexLookup,patchesAcross) {
		TerrainLOD.numTrianglesLookup = new Int32Array(9);
		TerrainLOD.indexSideLookup = new Int32Array(16);
		var count = 0;
		var indices = [];
		(altern_terrain_TerrainGeomTools().default).writeInnerIndicesToByteArray(patchesAcross,indexLookup,indices);
		var startEdgesPosition = indices.length;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,0);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[15] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,1);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[14] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,2);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[13] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,4);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[11] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,8);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[7] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,3);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[12] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,6);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[9] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,12);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[3] = count;
		++count;
		indices.length = startEdgesPosition;
		(altern_terrain_TerrainGeomTools().default).writeEdgeVerticesToByteArray(patchesAcross,indexLookup,indices,9);
		TerrainLOD.numTrianglesLookup[count] = indices.length / 3 | 0;
		this.setupIndexBuffer(indices,count);
		TerrainLOD.indexSideLookup[6] = count;
		++count;
	}
	setupPreliminaries(quadCornerChunk,requirements,tileSize,uvTileSize) {
		if(Math.pow(2,Math.round(Math.log(tileSize) * 1.4426950408889634)) != tileSize) {
			throw new (js__$Boot_HaxeError().default)("tileSize must be base 2!");
		}
		this.lodLvlMin = Math.round(Math.log(tileSize * 32) * 1.4426950408889634) - 1;
		if(TerrainLOD.PROTO_32 == null) {
			TerrainLOD.PROTO_32 = (altern_terrain_TerrainGeomTools().default).createLODTerrainChunkForMesh(32,tileSize);
		}
		if(TerrainLOD.indexSideLookup == null) {
			this.setupIndexReferences(TerrainLOD.PROTO_32.indexLookup,32);
		}
		this.tileSize = tileSize;
		this.tileSizeInv = 1 / tileSize;
		this.tileShift = Math.round(Math.log(tileSize) * 1.4426950408889634);
		this.tileMod = tileSize - 1;
		if(uvTileSize > 0 && Math.pow(2,Math.round(Math.log(uvTileSize) * 1.4426950408889634)) != uvTileSize) {
			throw new (js__$Boot_HaxeError().default)("uvTileSize must be base 2!");
		}
	}
	setupPostliminaries(requirements,tileSize,uvTileSize,rootLevel) {
		var injectUV = false;
		var repeatUV = false;
		if(uvTileSize > 0) {
			if(uvTileSize <= tileSize * 32) {
				repeatUV = true;
			} else {
				injectUV = true;
				requirements |= 4;
				if(this.tree != null) {
					this.tree.requirements |= 4;
				}
				if(this.gridPagesVector != null) {
					var i = this.gridPagesVector.length;
					while(--i > -1) this.gridPagesVector[i].requirements |= 4;
				}
			}
		}
		this.setupVertexUpload(requirements,tileSize);
	}
	setupVertexUpload(requirements,tileSize) {
		var len;
		var i;
		var vAcross = 33;
		this._vertexUpload = new Float32Array(vAcross * vAcross * this._data32PerVertex);
	}
	getNewChunkState() {
		var state = new (altern_terrain_TerrainChunkState().default)();
		return state;
	}
	loadSinglePage(page,uvTileSize,requirements,tileSize) {
		if(tileSize == null) {
			tileSize = 256;
		}
		if(requirements == null) {
			requirements = -1;
		}
		if(uvTileSize == null) {
			uvTileSize = 0;
		}
		this.runSinglePage(page.heightMap,page,requirements >= 0 ? requirements : page.requirements,uvTileSize != 0 ? uvTileSize : page.uvTileSize,tileSize);
	}
	runSinglePage(heightMap,quadCornerChunk,requirements,uvTileSize,tileSize) {
		if(tileSize == null) {
			tileSize = 256;
		}
		if(uvTileSize == null) {
			uvTileSize = 0;
		}
		this.setupPreliminaries(quadCornerChunk,requirements,tileSize,uvTileSize);
		var chunk = quadCornerChunk.Square;
		var str;
		this.tree = new (altern_terrain_QuadTreePage().default)();
		this.tree.heightMap = heightMap;
		this.tree.requirements = requirements;
		this.tree.uvTileSize = uvTileSize != 0 ? uvTileSize : this.tree.uvTileSize;
		this.tree.Square = chunk;
		this.tree.Level = quadCornerChunk.Level;
		this.tree.xorg = quadCornerChunk.xorg;
		this.tree.zorg = quadCornerChunk.zorg;
		this.setupPostliminaries(requirements,tileSize,uvTileSize,this.tree.Level);
	}
	calculateFrustum(camera) {
	}
	setupIndexBuffer(indices,id) {
	}
	setupVertexChunkState(state,vertices,cd) {
	}
	drawChunkState(state,indexBufferId,cd) {
	}
	sampleHeights(requirements,heightMap,square) {
		var len;
		var i;
		var offset;
		var stride = this._data32PerVertex;
		var heightData = heightMap.Data;
		var xorg = square.xorg;
		var zorg = square.zorg;
		var hXOrigin = heightMap.XOrigin;
		var hZOrigin = heightMap.ZOrigin;
		xorg -= hXOrigin;
		zorg -= hZOrigin;
		xorg = xorg / this.tileSize | 0;
		zorg = zorg / this.tileSize | 0;
		var limit = 1 << square.Level << 1 >> this.tileShift;
		var vAcross = 33;
		var tStride = limit >> 5;
		var yLimit = zorg + limit + 1;
		var xLimit = xorg + limit + 1;
		var RowWidth = heightMap.RowWidth;
		var indexLookup = TerrainLOD.PROTO_32.indexLookup;
		var pos;
		var xi;
		var yi;
		var y;
		var x;
		yi = 0;
		y = zorg;
		while(y < yLimit) {
			xi = 0;
			x = xorg;
			while(x < xLimit) {
				pos = indexLookup[yi * vAcross + xi] * stride;
				this._vertexUpload[pos] = x * this.tileSize + hXOrigin;
				this._vertexUpload[pos + 1] = heightData[y * RowWidth + x];
				this._vertexUpload[pos + 2] = y * this.tileSize + hZOrigin;
				++xi;
				x += tStride;
			}
			++yi;
			y += tStride;
		}
		var attribId;
		var divisor;
	}
	drawLeaf(cd,s,camera) {
		var state;
		var id = cd.Parent != null ? TerrainLOD.indexSideLookup[cd.Parent.Square.EnabledFlags & 15 | this.cornerMask[cd.ChildIndex]] : 0;
		state = s.state;
		if(state == null) {
			this.newly_instantiated++;
			var state1 = new (altern_terrain_TerrainChunkState().default)();
			state = state1;
			s.state = state;
			this.sampleHeights(this._currentPage.requirements,this._currentPage.heightMap,cd);
			this.setupVertexChunkState(state,this._vertexUpload,cd);
		} else {
			this.cached_retrieved++;
		}
		this.drawChunkState(state,id,cd);
		if(state.parent != null) {
			state.parent.remove(state);
		}
		this.activeChunks.append(state);
		this.drawnChunks++;
	}
	drawQuad(cd,camera,culling) {
		var q;
		var s = cd.Square;
		var c;
		var index;
		var half;
		var full;
		var cCulling;
		var state;
		var orderedIndices;
		if(cd.Level <= this.lodLvlMin) {
			this.drawLeaf(cd,s,camera);
			return;
		}
		if((s.EnabledFlags & 15) != 0) {
			half = 1 << cd.Level;
			full = half << 1;
			var halfX = cd.xorg + half;
			var halfY = cd.zorg + half;
			index = 0;
			index |= this._cameraPos.x < halfX ? 1 : 0;
			index |= this._cameraPos.z < halfY ? 2 : 0;
			orderedIndices = this.quadOrderTable[index];
			var o;
			index = orderedIndices[0];
			o = TerrainLOD.QUAD_OFFSETS[index];
			c = s.Child[index];
			if((s.EnabledFlags & 16 << index) != 0) {
				if(culling == 0) {
					cCulling = 0;
				} else {
					cCulling = this.cullingInFrustum(culling,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half));
				}
				if(cCulling >= 0) {
					q = (altern_terrain_QuadChunkCornerData().default).create();
					s.SetupCornerData(q,cd,index);
					this.drawQuad(q,camera,cCulling);
				}
			} else {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				s.SetupCornerData(q,cd,index);
				this.drawLeaf(q,c,camera);
			}
			index = orderedIndices[1];
			o = TerrainLOD.QUAD_OFFSETS[index];
			c = s.Child[index];
			if((s.EnabledFlags & 16 << index) != 0) {
				if(culling == 0) {
					cCulling = 0;
				} else {
					cCulling = this.cullingInFrustum(culling,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half));
				}
				if(cCulling >= 0) {
					q = (altern_terrain_QuadChunkCornerData().default).create();
					s.SetupCornerData(q,cd,index);
					this.drawQuad(q,camera,cCulling);
				}
			} else {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				s.SetupCornerData(q,cd,index);
				this.drawLeaf(q,c,camera);
			}
			index = orderedIndices[2];
			o = TerrainLOD.QUAD_OFFSETS[index];
			c = s.Child[index];
			if((s.EnabledFlags & 16 << index) != 0) {
				if(culling == 0) {
					cCulling = 0;
				} else {
					cCulling = this.cullingInFrustum(culling,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half));
				}
				if(cCulling >= 0) {
					q = (altern_terrain_QuadChunkCornerData().default).create();
					s.SetupCornerData(q,cd,index);
					this.drawQuad(q,camera,cCulling);
				}
			} else {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				s.SetupCornerData(q,cd,index);
				this.drawLeaf(q,c,camera);
			}
			index = orderedIndices[3];
			o = TerrainLOD.QUAD_OFFSETS[index];
			c = s.Child[index];
			if((s.EnabledFlags & 16 << index) != 0) {
				if(culling == 0) {
					cCulling = 0;
				} else {
					cCulling = this.cullingInFrustum(culling,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half));
				}
				if(cCulling >= 0) {
					q = (altern_terrain_QuadChunkCornerData().default).create();
					s.SetupCornerData(q,cd,index);
					this.drawQuad(q,camera,cCulling);
				}
			} else {
				q = (altern_terrain_QuadChunkCornerData().default).create();
				s.SetupCornerData(q,cd,index);
				this.drawLeaf(q,c,camera);
			}
		} else {
			this.drawLeaf(cd,s,camera);
		}
	}
	collectDraws(camera) {
		var c;
		var full;
		var half;
		this.drawnChunks = 0;
		this.newly_instantiated = 0;
		this.cached_retrieved = 0;
		this.pool_retrieved = 0;
		var i;
		(altern_terrain_QuadSquareChunk().default).LOD_LVL_MIN = this.lodLvlMin;
		this.quadOrderTable = TerrainLOD.QUAD_ORDER2;
		var tx;
		var ty;
		var tz;
		this._cameraPos.x = camera.x;
		this._cameraPos.y = camera.y;
		this._cameraPos.z = camera.z;
		tx = this._cameraPos.x - this._lastUpdateCameraPos.x;
		ty = this._cameraPos.y - this._lastUpdateCameraPos.y;
		tz = this._cameraPos.z - this._lastUpdateCameraPos.z;
		var doUpdate = false;
		if(tx * tx + ty * ty + tz * tz > this._squaredDistUpdate) {
			this._lastUpdateCameraPos.x = this._cameraPos.x;
			this._lastUpdateCameraPos.y = this._cameraPos.y;
			this._lastUpdateCameraPos.z = this._cameraPos.z;
			doUpdate = true;
		}
		this.calculateFrustum(camera);
		var culling = 0;
		var cd;
		if(this.tree != null) {
			this._currentPage = this.tree;
			cd = this.tree;
			c = cd.Square;
			half = 1 << cd.Level;
			full = half << 1;
			culling = this.cullingInFrustum(63,cd.xorg,c.MinY,cd.zorg,cd.xorg + full,c.MaxY,cd.zorg + full);
			if(doUpdate) {
				(altern_terrain_QuadChunkCornerData().default).BI = 0;
				this.tree.Square.Update(this.tree,this._cameraPos,this.detail,this.culler,culling);
				(altern_terrain_QuadChunkCornerData().default).BI = 0;
			}
			if(culling >= 0) {
				this.drawQuad(this.tree,camera,culling);
			}
			(altern_terrain_QuadChunkCornerData().default).BI = 0;
		}
		if(this.gridPagesVector != null) {
			cd = this.gridPagesVector[0];
			half = 1 << cd.Level;
			full = half << 1;
			i = this.gridPagesVector.length;
			while(--i > -1) {
				cd = this.gridPagesVector[i];
				this._currentPage = cd;
				c = cd.Square;
				var curCulling = this.cullingInFrustum(63,cd.xorg,c.MinY,cd.zorg,cd.xorg + full,c.MaxY,cd.zorg + full);
				if(curCulling >= 0) {
					(altern_terrain_QuadChunkCornerData().default).BI = 0;
					c.Update(cd,this._cameraPos,this.detail,this.culler,curCulling);
					(altern_terrain_QuadChunkCornerData().default).BI = 0;
					if(curCulling >= 0) {
						this.drawQuad(cd,camera,curCulling);
					}
				}
			}
			(altern_terrain_QuadChunkCornerData().default).BI = 0;
		}
		if(this.activeChunks.head != null) {
			this.chunkPool.appendList(this.activeChunks.head,this.activeChunks.tail);
			this.activeChunks.head = null;
			this.activeChunks.tail = null;
		}
	}
	cullingInFrustum(culling,minX,minY,minZ,maxX,maxY,maxZ) {
		if(maxY < this.waterLevel) {
			return -1;
		}
		var frustum = this.frustum;
		var side = 1;
		var plane = frustum;
		while(plane != null) {
			if((culling & side) != 0) {
				if(plane.x >= 0) {
					if(plane.y >= 0) {
						if(plane.z >= 0) {
							if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.offset) {
								return -1;
							}
							if(minX * plane.x + minY * plane.y + minZ * plane.z > plane.offset) {
								culling &= 63 & ~side;
							}
						} else {
							if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.offset) {
								return -1;
							}
							if(minX * plane.x + minY * plane.y + maxZ * plane.z > plane.offset) {
								culling &= 63 & ~side;
							}
						}
					} else if(plane.z >= 0) {
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.offset) {
							return -1;
						}
						if(minX * plane.x + maxY * plane.y + minZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					} else {
						if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.offset) {
							return -1;
						}
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					}
				} else if(plane.y >= 0) {
					if(plane.z >= 0) {
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.offset) {
							return -1;
						}
						if(maxX * plane.x + minY * plane.y + minZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					} else {
						if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.offset) {
							return -1;
						}
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z > plane.offset) {
							culling &= 63 & ~side;
						}
					}
				} else if(plane.z >= 0) {
					if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.offset) {
						return -1;
					}
					if(maxX * plane.x + maxY * plane.y + minZ * plane.z > plane.offset) {
						culling &= 63 & ~side;
					}
				} else {
					if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.offset) {
						return -1;
					}
					if(maxX * plane.x + maxY * plane.y + maxZ * plane.z > plane.offset) {
						culling &= 63 & ~side;
					}
				}
			}
			side <<= 1;
			plane = plane.next;
		}
		return culling;
	}
	intersectRay(origin,direction,result) {
		if(this.tree == null && this.gridPagesVector == null) {
			return null;
		}
		var data = null;
		this._boundRayTime = 0;
		if(this.tree != null && this.boundIntersectRay(origin,direction,this.tree.xorg,this.tree.Square.MinY,this.tree.zorg,this.tree.xorg + (1 << this.tree.Level << 1),this.tree.Square.MaxY,this.tree.zorg + (1 << this.tree.Level << 1),result)) {
			this._currentPage = this.tree;
			data = this.intersectRayQuad(result,this.tree,origin,direction);
		}
		if(this.gridPagesVector != null) {
			throw new (js__$Boot_HaxeError().default)("Not yet done gridPagesVector for intersectRay!");
		}
		return data;
	}
	intersectRayQuad(result,cd,origin,direction) {
		var sq;
		var stackStart = (altern_terrain_QuadChunkCornerData().default).BI;
		var index;
		var buffer = TerrainLOD.QD_STACK;
		sq = cd.Square;
		var childList = sq.Child;
		var c;
		var half = 1 << cd.Level;
		var full = half << 1;
		var newCD;
		var orderedIndices;
		var quadOrderTable = TerrainLOD.QUAD_ORDER2;
		var quadOffsets = TerrainLOD.QUAD_OFFSETS;
		var o;
		var bi = 1;
		buffer[0] = cd;
		while(bi > 0) {
			cd = buffer[--bi];
			sq = cd.Square;
			childList = sq.Child;
			half = 1 << cd.Level;
			full = half << 1;
			if(childList[0] == null) {
				if(this.calculateDDAIntersect(result,this._currentPage.heightMap,cd,origin,direction)) {
					return result;
				}
				continue;
			}
			var halfX = cd.xorg + half;
			var halfY = cd.zorg + half;
			index = 0;
			index |= origin.x < halfX ? 1 : 0;
			index |= origin.z < halfY ? 2 : 0;
			orderedIndices = quadOrderTable[index];
			index = orderedIndices[0];
			c = childList[index];
			o = quadOffsets[index];
			if(this.boundIntersectRay(origin,direction,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half),result)) {
				newCD = (altern_terrain_QuadChunkCornerData().default).create();
				sq.SetupCornerData(newCD,cd,index);
				buffer[bi++] = newCD;
			}
			index = orderedIndices[1];
			c = childList[index];
			o = quadOffsets[index];
			if(this.boundIntersectRay(origin,direction,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half),result)) {
				newCD = (altern_terrain_QuadChunkCornerData().default).create();
				sq.SetupCornerData(newCD,cd,index);
				buffer[bi++] = newCD;
			}
			index = orderedIndices[2];
			c = childList[index];
			o = quadOffsets[index];
			if(this.boundIntersectRay(origin,direction,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half),result)) {
				newCD = (altern_terrain_QuadChunkCornerData().default).create();
				sq.SetupCornerData(newCD,cd,index);
				buffer[bi++] = newCD;
			}
			index = orderedIndices[3];
			c = childList[index];
			o = quadOffsets[index];
			if(this.boundIntersectRay(origin,direction,cd.xorg + ((o & 1) != 0 ? half : 0),c.MinY,cd.zorg + ((o & 2) != 0 ? half : 0),cd.xorg + ((o & 1) != 0 ? full : half),c.MaxY,cd.zorg + ((o & 2) != 0 ? full : half),result)) {
				newCD = (altern_terrain_QuadChunkCornerData().default).create();
				sq.SetupCornerData(newCD,cd,index);
				buffer[bi++] = newCD;
			}
		}
		(altern_terrain_QuadChunkCornerData().default).BI = stackStart;
		return null;
	}
	calculateDDAIntersect(result,hm,cd,origin,direction) {
		var dx = direction.x;
		var dy = direction.z * this.handedness;
		var xt;
		var dxt;
		var yt;
		var dyt;
		var dxi;
		var dyi;
		var t;
		var xorg = this._currentPage.xorg;
		var zorg = this._currentPage.zorg;
		var fullC = 1 << cd.Level << 1;
		var P_ACROSS = fullC >> this.tileShift;
		var px = origin.x;
		var py = origin.z * this.handedness;
		var zValStart = origin.y;
		var xi;
		var yi;
		if(px < cd.xorg || px >= cd.xorg + fullC || py < cd.zorg || py >= cd.zorg + fullC) {
			t = this.calcBoundIntersection(result,origin,direction,cd.xorg,cd.Square.MinY,cd.zorg,cd.xorg + fullC,cd.Square.MaxY,cd.zorg + fullC);
			if(t > 0) {
				if(t >= (direction.w > 0 ? direction.w : 1e22) || t >= (result.w > 0 ? result.w : 1e22)) {
					return false;
				}
				px = result.x;
				py = result.z * this.handedness;
				py -= dy < 0 ? 1 : -1;
				px -= dx < 0 ? 1 : -1;
				zValStart = result.y;
				this._boundRayTime = t;
				xi = (px - xorg | 0) >> this.tileShift;
				yi = (py - zorg | 0) >> this.tileShift;
			} else {
				t = 3.40282346638528e+38;
				return false;
			}
		} else {
			xi = (px - xorg | 0) >> this.tileShift;
			yi = (py - zorg | 0) >> this.tileShift;
		}
		var minxi = cd.xorg - xorg >> this.tileShift;
		var minyi = cd.zorg - zorg >> this.tileShift;
		var maxxi = minxi + P_ACROSS;
		var maxyi = minyi + P_ACROSS;
		var xoff = px / this.tileSize;
		xoff -= xoff | 0;
		var yoff = py / this.tileSize;
		yoff -= yoff | 0;
		var maxt = direction.w > 0 ? (direction.w - this._boundRayTime) * this.tileSizeInv : 1e22;
		t = 0;
		if(dx < 0) {
			xt = -xoff / dx;
			dxt = -1 / dx;
			dxi = -1;
		} else {
			xt = (1 - xoff) / dx;
			dxt = 1 / dx;
			dxi = 1;
		}
		if(dy < 0) {
			yt = -yoff / dy;
			dyt = -1 / dy;
			dyi = -1;
		} else {
			yt = (1 - yoff) / dy;
			dyt = 1 / dy;
			dyi = 1;
		}
		if(xi < minxi || xi >= maxxi || yi < minyi || yi >= maxyi) {
			return false;
		}
		if(this.checkHitPatch(result,hm,xi,yi,direction.y < 0 ? xt < yt ? zValStart + xt * direction.y * this.tileSize : zValStart + yt * direction.y * this.tileSize : zValStart + t * direction.y * this.tileSize,origin,direction)) {
			return true;
		}
		while(true) {
			if(xt < yt) {
				xi += dxi;
				t = xt;
				xt += dxt;
			} else {
				yi += dyi;
				t = yt;
				yt += dyt;
			}
			if(t >= maxt || xi < minxi || xi >= maxxi || yi < minyi || yi >= maxyi) {
				return false;
			}
			if(this.checkHitPatch(result,hm,xi,yi,direction.y < 0 ? xt < yt ? zValStart + xt * direction.y * this.tileSize : zValStart + yt * direction.y * this.tileSize : zValStart + t * direction.y * this.tileSize,origin,direction)) {
				return true;
			}
		}
	}
	intersectRayTri(result,ox,oy,oz,dx,dy,dz,ax,ay,az,bx,by,bz,cx,cy,cz) {
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
	checkHitPatch(result,hm,xi,yi,zVal,origin,direction) {
		var highestPoint = hm.Data[xi + yi * hm.RowWidth];
		var cxorg = this._currentPage.heightMap.XOrigin;
		var czorg = this._currentPage.heightMap.ZOrigin;
		var hp;
		this._patchHeights[2] = highestPoint;
		hp = hm.Data[xi + 1 + yi * hm.RowWidth];
		if(hp > highestPoint) {
			highestPoint = hp;
		}
		this._patchHeights[5] = hp;
		hp = hm.Data[xi + (yi + 1) * hm.RowWidth];
		if(hp > highestPoint) {
			highestPoint = hp;
		}
		this._patchHeights[8] = hp;
		hp = hm.Data[xi + 1 + (yi + 1) * hm.RowWidth];
		if(hp > highestPoint) {
			highestPoint = hp;
		}
		this._patchHeights[11] = hp;
		if(zVal > highestPoint) {
			return false;
		}
		var whichFan = (xi & 1) != (yi & 1) ? TerrainLOD.TRI_ORDER_TRUE : TerrainLOD.TRI_ORDER_FALSE;
		var ax;
		var ay;
		var az;
		var bx;
		var by;
		var bz;
		var cx;
		var cy;
		var cz;
		ax = (this._patchHeights[whichFan[0] * 3] + xi) * this.tileSize + cxorg;
		az = (this._patchHeights[whichFan[0] * 3 + 1] + yi) * this.tileSize + czorg;
		az *= this.handedness;
		ay = this._patchHeights[whichFan[0] * 3 + 2];
		bx = (this._patchHeights[whichFan[1] * 3] + xi) * this.tileSize + cxorg;
		bz = (this._patchHeights[whichFan[1] * 3 + 1] + yi) * this.tileSize + czorg;
		bz *= this.handedness;
		by = this._patchHeights[whichFan[1] * 3 + 2];
		cx = (this._patchHeights[whichFan[2] * 3] + xi) * this.tileSize + cxorg;
		cz = (this._patchHeights[whichFan[2] * 3 + 1] + yi) * this.tileSize + czorg;
		cz *= this.handedness;
		cy = this._patchHeights[whichFan[2] * 3 + 2];
		if(this.intersectRayTri(result,origin.x,origin.y,origin.z,direction.x,direction.y,direction.z,ax,ay,az,bx,by,bz,cx,cy,cz)) {
			return true;
		}
		ax = (this._patchHeights[whichFan[3] * 3] + xi) * this.tileSize + cxorg;
		az = (this._patchHeights[whichFan[3] * 3 + 1] + yi) * this.tileSize + czorg;
		az *= this.handedness;
		ay = this._patchHeights[whichFan[3] * 3 + 2];
		bx = (this._patchHeights[whichFan[4] * 3] + xi) * this.tileSize + cxorg;
		bz = (this._patchHeights[whichFan[4] * 3 + 1] + yi) * this.tileSize + czorg;
		bz *= this.handedness;
		by = this._patchHeights[whichFan[4] * 3 + 2];
		cx = (this._patchHeights[whichFan[5] * 3] + xi) * this.tileSize + cxorg;
		cz = (this._patchHeights[whichFan[5] * 3 + 1] + yi) * this.tileSize + czorg;
		cz *= this.handedness;
		cy = this._patchHeights[whichFan[5] * 3 + 2];
		if(this.intersectRayTri(result,origin.x,origin.y,origin.z,direction.x,direction.y,direction.z,ax,ay,az,bx,by,bz,cx,cy,cz)) {
			return true;
		}
		return false;
	}
	collectTrisForTree2D(tree,sphere,vertices,indices,vi,ii) {
		var hm = tree.heightMap;
		var radius = sphere.w;
		var hxorg = hm.XOrigin;
		var hzorg = hm.ZOrigin;
		if(radius < this.tileSize >> 1) {
			radius = this.tileSize >> 1;
		} else {
			radius = radius;
		}
		var startX = (sphere.x - hxorg - radius) * this.tileSizeInv - 1 | 0;
		var startY = (sphere.z * this.handedness - hzorg - radius) * this.tileSizeInv - 1 | 0;
		if(startX < 0) {
			startX = 0;
		} else if(startX >= hm.XSize) {
			--startX;
		} else {
			startX = startX;
		}
		if(startY < 0) {
			startY = 0;
		} else if(startY >= hm.ZSize) {
			--startY;
		} else {
			startY = startY;
		}
		var data = hm.Data;
		var len = radius * 2 * this.tileSizeInv + 2 | 0;
		var xtmax = startX + len;
		var ytmax = startY + len;
		var yi;
		var xi;
		var whichFan;
		var RowWidth = hm.RowWidth;
		var ax;
		var ay;
		var az;
		var bx;
		var by;
		var bz;
		var cx;
		var cy;
		var cz;
		var vMult = 0.33333333333333331;
		yi = startY;
		while(yi < ytmax) {
			xi = startX;
			while(xi < xtmax) {
				this._patchHeights[2] = data[xi + yi * RowWidth];
				this._patchHeights[5] = data[xi + 1 + yi * RowWidth];
				this._patchHeights[8] = data[xi + (yi + 1) * RowWidth];
				this._patchHeights[11] = data[xi + 1 + (yi + 1) * RowWidth];
				if((xi & 1) != (yi & 1)) {
					whichFan = TerrainLOD.TRI_ORDER_TRUE;
				} else {
					whichFan = TerrainLOD.TRI_ORDER_FALSE;
				}
				ax = (this._patchHeights[whichFan[0] * 3] + xi) * this.tileSize + hxorg;
				az = (this._patchHeights[whichFan[0] * 3 + 1] + yi) * this.tileSize + hzorg;
				az *= this.handedness;
				ay = this._patchHeights[whichFan[0] * 3 + 2];
				bx = (this._patchHeights[whichFan[1] * 3] + xi) * this.tileSize + hxorg;
				bz = (this._patchHeights[whichFan[1] * 3 + 1] + yi) * this.tileSize + hzorg;
				bz *= this.handedness;
				by = this._patchHeights[whichFan[1] * 3 + 2];
				cx = (this._patchHeights[whichFan[2] * 3] + xi) * this.tileSize + hxorg;
				cz = (this._patchHeights[whichFan[2] * 3 + 1] + yi) * this.tileSize + hzorg;
				cz *= this.handedness;
				cy = this._patchHeights[whichFan[2] * 3 + 2];
				indices[ii++] = vi * vMult | 0;
				vertices[vi++] = ax;
				vertices[vi++] = ay;
				vertices[vi++] = az;
				indices[ii++] = vi * vMult | 0;
				vertices[vi++] = bx;
				vertices[vi++] = by;
				vertices[vi++] = bz;
				indices[ii++] = vi * vMult | 0;
				vertices[vi++] = cx;
				vertices[vi++] = cy;
				vertices[vi++] = cz;
				this.numCollisionTriangles++;
				ax = (this._patchHeights[whichFan[3] * 3] + xi) * this.tileSize + hxorg;
				az = (this._patchHeights[whichFan[3] * 3 + 1] + yi) * this.tileSize + hzorg;
				az *= this.handedness;
				ay = this._patchHeights[whichFan[3] * 3 + 2];
				bx = (this._patchHeights[whichFan[4] * 3] + xi) * this.tileSize + hxorg;
				bz = (this._patchHeights[whichFan[4] * 3 + 1] + yi) * this.tileSize + hzorg;
				bz *= this.handedness;
				by = this._patchHeights[whichFan[4] * 3 + 2];
				cx = (this._patchHeights[whichFan[5] * 3] + xi) * this.tileSize + hxorg;
				cz = (this._patchHeights[whichFan[5] * 3 + 1] + yi) * this.tileSize + hzorg;
				cz *= this.handedness;
				cy = this._patchHeights[whichFan[5] * 3 + 2];
				indices[ii++] = vi * vMult | 0;
				vertices[vi++] = ax;
				vertices[vi++] = ay;
				vertices[vi++] = az;
				indices[ii++] = vi * vMult | 0;
				vertices[vi++] = bx;
				vertices[vi++] = by;
				vertices[vi++] = bz;
				indices[ii++] = vi * vMult | 0;
				vertices[vi++] = cx;
				vertices[vi++] = cy;
				vertices[vi++] = cz;
				this.numCollisionTriangles++;
				++xi;
			}
			++yi;
		}
	}
	setupCollisionGeometry(sphere,vertices,indices,vi,ii) {
		if(ii == null) {
			ii = 0;
		}
		if(vi == null) {
			vi = 0;
		}
		this.numCollisionTriangles = 0;
		if(this.tree != null) {
			this._currentPage = this.tree;
			this.collectTrisForTree2D(this.tree,sphere,vertices,indices,vi,ii);
		}
		if(this.gridPagesVector != null) {
			var _g1 = 0;
			var _g = this.gridPagesVector.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._currentPage = this.gridPagesVector[i];
				this.collectTrisForTree2D(this._currentPage,sphere,vertices,indices,vi,ii);
			}
		}
	}
	boundIntersectSphere(sphere,minX,minY,minZ,maxX,maxY,maxZ) {
		if(sphere.x + sphere.w > minX && sphere.x - sphere.w < maxX && sphere.y + sphere.w > minY && sphere.y - sphere.w < maxY && sphere.z + sphere.w > minZ) {
			return sphere.z - sphere.w < maxZ;
		} else {
			return false;
		}
	}
	boundIntersectRay(origin,direction,minX,minY,minZ,maxX,maxY,maxZ,result) {
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
	calcBoundIntersection(point,origin,direction,minX,minY,minZ,maxX,maxY,maxZ) {
		if(origin.x >= minX && origin.x <= maxX && origin.y >= minY && origin.y <= maxY && origin.z >= minZ && origin.z <= maxZ) {
			return 0;
		}
		if(origin.x < minX && direction.x <= 0) {
			return -1;
		}
		if(origin.x > maxX && direction.x >= 0) {
			return -1;
		}
		if(origin.y < minY && direction.y <= 0) {
			return -1;
		}
		if(origin.y > maxY && direction.y >= 0) {
			return -1;
		}
		if(origin.z < minZ && direction.z <= 0) {
			return -1;
		}
		if(origin.z > maxZ && direction.z >= 0) {
			return -1;
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
			return -1;
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
		if(c >= b || d <= a) {
			return -1;
		}
		point.x = origin.x + direction.x * c;
		point.y = origin.y + direction.y * c;
		point.z = origin.z + direction.z * c;
		return c;
	}
	static get PATCHES_ACROSS() { return PATCHES_ACROSS; }
	static set PATCHES_ACROSS(value) { PATCHES_ACROSS = value; }
	static get NUM_VERTICES() { return NUM_VERTICES; }
	static set NUM_VERTICES(value) { NUM_VERTICES = value; }
	static get PATCHES_SHIFT() { return PATCHES_SHIFT; }
	static set PATCHES_SHIFT(value) { PATCHES_SHIFT = value; }
	static get VERTEX_INCLUDE_UVS() { return VERTEX_INCLUDE_UVS; }
	static set VERTEX_INCLUDE_UVS(value) { VERTEX_INCLUDE_UVS = value; }
	static get UV_STEPWISE() { return UV_STEPWISE; }
	static set UV_STEPWISE(value) { UV_STEPWISE = value; }
	static get UV_NORMALIZED() { return UV_NORMALIZED; }
	static set UV_NORMALIZED(value) { UV_NORMALIZED = value; }
	static get CULL_NONE() { return CULL_NONE; }
	static set CULL_NONE(value) { CULL_NONE = value; }
	static get CULL_WATER() { return CULL_WATER; }
	static set CULL_WATER(value) { CULL_WATER = value; }
	static get CULL_FULL() { return CULL_FULL; }
	static set CULL_FULL(value) { CULL_FULL = value; }
	static get TRI_ORDER_TRUE() { return TRI_ORDER_TRUE; }
	static set TRI_ORDER_TRUE(value) { TRI_ORDER_TRUE = value; }
	static get TRI_ORDER_FALSE() { return TRI_ORDER_FALSE; }
	static set TRI_ORDER_FALSE(value) { TRI_ORDER_FALSE = value; }
	static get DIAG_NORM_ORDER_TRUE() { return DIAG_NORM_ORDER_TRUE; }
	static set DIAG_NORM_ORDER_TRUE(value) { DIAG_NORM_ORDER_TRUE = value; }
	static get DIAG_NORM_ORDER_FALSE() { return DIAG_NORM_ORDER_FALSE; }
	static set DIAG_NORM_ORDER_FALSE(value) { DIAG_NORM_ORDER_FALSE = value; }
	static createTriOrderIndiceTable(positive) {
		var indices = new Int32Array(6);
		if(positive) {
			indices[0] = 0;
			indices[1] = 2;
			indices[2] = 1;
			indices[3] = 2;
			indices[4] = 3;
			indices[5] = 1;
		} else {
			indices[0] = 0;
			indices[1] = 3;
			indices[2] = 1;
			indices[3] = 0;
			indices[4] = 2;
			indices[5] = 3;
		}
		return indices;
	}
	static get QUAD_ORDER() { return QUAD_ORDER; }
	static set QUAD_ORDER(value) { QUAD_ORDER = value; }
	static get QUAD_ORDER2() { return QUAD_ORDER2; }
	static set QUAD_ORDER2(value) { QUAD_ORDER2 = value; }
	static get QUAD_OFFSETS() { return QUAD_OFFSETS; }
	static set QUAD_OFFSETS(value) { QUAD_OFFSETS = value; }
	static createQuadOrderIndiceTable(reversed) {
		var arr = [];
		arr.length = 4;
		var result = arr;
		var src = !reversed ? [3,2,0,1] : [1,0,2,3];
		var out = new Int32Array(src.length);
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			out[i] = src[i];
		}
		result[0] = out;
		var src1 = !reversed ? [2,3,1,0] : [0,1,3,2];
		var out1 = new Int32Array(src1.length);
		var _g11 = 0;
		var _g2 = src1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			out1[i1] = src1[i1];
		}
		result[1] = out1;
		var src2 = !reversed ? [0,1,3,2] : [2,3,1,0];
		var out2 = new Int32Array(src2.length);
		var _g12 = 0;
		var _g3 = src2.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			out2[i2] = src2[i2];
		}
		result[2] = out2;
		var src3 = !reversed ? [1,2,0,3] : [3,0,2,1];
		var out3 = new Int32Array(src3.length);
		var _g13 = 0;
		var _g4 = src3.length;
		while(_g13 < _g4) {
			var i3 = _g13++;
			out3[i3] = src3[i3];
		}
		result[3] = out3;
		return result;
	}
	static createQuadOffsetTable() {
		var result = new Int32Array(4);
		result[0] = 1;
		result[1] = 0;
		result[2] = 2;
		result[3] = 3;
		return result;
	}
	static installQuadTreePageHeightmap(heightMap,offsetX,offsetY,tileSize,sampleSize) {
		if(sampleSize == null) {
			sampleSize = 0;
		}
		if(tileSize == null) {
			tileSize = 256;
		}
		if(offsetY == null) {
			offsetY = 0;
		}
		if(offsetX == null) {
			offsetX = 0;
		}
		var rootData = (altern_terrain_QuadCornerData().default).createRoot(offsetX,offsetY,sampleSize == 0 ? tileSize * (heightMap.XSize - 1) : sampleSize);
		rootData.Square.AddHeightMap(rootData,heightMap);
		var cd = new (altern_terrain_QuadTreePage().default)();
		cd.Level = rootData.Level;
		cd.xorg = rootData.xorg;
		cd.zorg = rootData.zorg;
		cd.Square = rootData.Square.GetQuadSquareChunk(rootData,rootData.Square.RecomputeErrorAndLighting(rootData));
		cd.heightMap = heightMap;
		return cd;
	}
	static get QD_STACK() { return QD_STACK; }
	static set QD_STACK(value) { QD_STACK = value; }
}


// Meta

TerrainLOD.__name__ = ["altern","terrain","TerrainLOD"];
TerrainLOD.__interfaces__ = [(altern_ray_IRaycastImpl().default),(altern_terrain_ICuller().default)];
TerrainLOD.prototype.__class__ = TerrainLOD.prototype.constructor = $hxClasses["altern.terrain.TerrainLOD"] = TerrainLOD;

// Init



// Statics

var PATCHES_ACROSS = 32;
var NUM_VERTICES = 1089;
var PATCHES_SHIFT = 5;
var VERTEX_INCLUDE_UVS = 4;
var UV_STEPWISE = 0;
var UV_NORMALIZED = -1;
var CULL_NONE = 0;
var CULL_WATER = 1;
var CULL_FULL = 2;
var TRI_ORDER_TRUE = TerrainLOD.createTriOrderIndiceTable(true);
var TRI_ORDER_FALSE = TerrainLOD.createTriOrderIndiceTable(false);
var DIAG_NORM_ORDER_TRUE = new (jeash_geom_Vector3D().default)(-0.70710678118654752440084436210485,0.70710678118654752440084436210485,0);
var DIAG_NORM_ORDER_FALSE = new (jeash_geom_Vector3D().default)(0.70710678118654752440084436210485,0.70710678118654752440084436210485,0);
var QUAD_ORDER = TerrainLOD.createQuadOrderIndiceTable(false);
var QUAD_ORDER2 = TerrainLOD.createQuadOrderIndiceTable(true);
var QUAD_OFFSETS = TerrainLOD.createQuadOffsetTable();
var QD_STACK = [];

// Export

exports.default = TerrainLOD;