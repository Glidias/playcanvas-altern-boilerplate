// Class: altern.terrain.HeightMapInfo

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}

// Constructor

class HeightMapInfo {
	constructor() {
		this.Scale = 8;
		this.ZOrigin = 0;
		this.XOrigin = 0;
	}
	getData(ix,iz) {
		return this.Data[ix + iz * this.RowWidth];
	}
	fillDataWithValue(val) {
		var i = this.Data.length;
		while(--i > -1) this.Data[i] = val;
	}
	setFixed(val) {
		this.Data.length = this.Data.length;
	}
	BoxFilterHeightMap(smoothEdges) {
		if(smoothEdges == null) {
			smoothEdges = true;
		}
		var x = 0;
		var z = 0;
		var width = this.XSize;
		var height = width;
		var widthClamp = smoothEdges ? width : width - 1;
		var heightClamp = smoothEdges ? height : height - 1;
		var bounds = widthClamp * heightClamp;
		var result = new Int32Array(this.Data.length);
		var heightMap = this.Data;
		if(smoothEdges) {
			z = 0;
		} else {
			z = 1;
		}
		while(z < heightClamp) {
			if(smoothEdges) {
				x = 0;
			} else {
				x = 1;
			}
			while(x < widthClamp) {
				var value = 0.0;
				var cellAverage = 1.0;
				if(x - 1 + (z - 1) * width >= 0 && x - 1 + (z - 1) * width < bounds) {
					value += heightMap[x - 1 + (z - 1) * width];
					++cellAverage;
				}
				if(x + (z - 1) * width >= 0 && x + (z - 1) * width < bounds) {
					value += heightMap[x + (z - 1) * width];
					++cellAverage;
				}
				if(x + 1 + (z - 1) * width >= 0 && x + 1 + (z - 1) * width < bounds) {
					value += heightMap[x + 1 + (z - 1) * width];
					++cellAverage;
				}
				if(x - 1 + z * width >= 0 && x - 1 + z * width < bounds) {
					value += heightMap[x - 1 + z * width];
					++cellAverage;
				}
				value += heightMap[x + z * width];
				if(x + 1 + z * width >= 0 && x + 1 + z * width < bounds) {
					value += heightMap[x + 1 + z * width];
					++cellAverage;
				}
				if(x - 1 + (z + 1) * width >= 0 && x - 1 + (z + 1) * width < bounds) {
					value += heightMap[x - 1 + (z + 1) * width];
					++cellAverage;
				}
				if(x + (z + 1) * width >= 0 && x + (z + 1) * width < bounds) {
					value += heightMap[x + (z + 1) * width];
					++cellAverage;
				}
				if(x + 1 + (z + 1) * width >= 0 && x + 1 + (z + 1) * width < bounds) {
					value += heightMap[x + 1 + (z + 1) * width];
					++cellAverage;
				}
				result[x + z * width] = value / cellAverage | 0;
				++x;
			}
			++z;
		}
		this.Data = result;
	}
	Sample(x,z) {
		var ix = x - this.XOrigin >> this.Scale;
		var iz = z - this.ZOrigin >> this.Scale;
		var mask = (1 << this.Scale) - 1;
		var rx = x - this.XOrigin & mask;
		var rz = z - this.ZOrigin & mask;
		if(ix < 0 || ix > this.XSize - 1 || iz < 0 || iz > this.ZSize - 1) {
			if(ix < 0) {
				ix = 0;
			}
			if(iz < 0) {
				iz = 0;
			}
			if(ix >= this.XSize) {
				ix = this.XSize - 1;
			}
			if(iz >= this.ZSize) {
				iz = this.ZSize - 1;
			}
		}
		var fx = rx / (mask + 1);
		var fz = rz / (mask + 1);
		var xSizeAdd = ix < this.XSize - 1 ? 1 : 0;
		var zSizeAdd = iz < this.ZSize - 1 ? 1 : 0;
		var s00 = this.Data[ix + iz * this.RowWidth];
		var s01 = this.Data[ix + xSizeAdd + iz * this.RowWidth];
		var s10 = this.Data[ix + (iz + zSizeAdd) * this.RowWidth];
		var s11 = this.Data[ix + xSizeAdd + (iz + zSizeAdd) * this.RowWidth];
		return (s00 * (1 - fx) + s01 * fx) * (1 - fz) + (s10 * (1 - fx) + s11 * fx) * fz | 0;
	}
	SampleInd(xi,zi) {
		return this.Data[zi * this.RowWidth + xi];
	}
	clone() {
		var result = new HeightMapInfo();
		result.XOrigin = this.XOrigin;
		result.ZOrigin = this.ZOrigin;
		result.XSize = this.XSize;
		result.ZSize = this.ZSize;
		result.RowWidth = this.RowWidth;
		result.Scale = this.Scale;
		var src = this.Data;
		var len = src.length;
		var dst = new Int32Array(len);
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			dst[i] = src[i];
		}
		result.Data = dst;
		return result;
	}
	flatten(val) {
		if(val == null) {
			val = 0;
		}
		var len = this.Data.length;
		var i = 0;
		while(i < len) {
			this.Data[i] = val;
			++i;
		}
	}
	slopeAlongXY(val,multiplier) {
		if(multiplier == null) {
			multiplier = 1;
		}
		var len = this.Data.length;
		var y = 0;
		while(y < this.ZSize) {
			var x = 0;
			while(x < this.XSize) {
				this.Data[y * this.XSize + x] += (val * x + val * y) * multiplier | 0;
				++x;
			}
			++y;
		}
	}
	slopeAlongY(val) {
		var len = this.Data.length;
		var y = 0;
		while(y < this.ZSize) {
			var x = 0;
			while(x < this.XSize) {
				this.Data[y * this.XSize + x] += val * y;
				++x;
			}
			++y;
		}
	}
	slopeAltAlongY(val) {
		var len = this.Data.length;
		var y = 0;
		while(y < this.ZSize) {
			var x = 0;
			while(x < this.XSize) this.Data[y * this.XSize + x] += ((y & 1) != 0 ? 1 : -1) * val;
		}
	}
	randomise(val) {
		val *= 0;
		var len = this.Data.length;
		var i = 0;
		while(i < len) {
			this.Data[i] += -Math.random() * val + val * 2 | 0;
			++i;
		}
	}
	copyData(xStart,yStart,width,height,hm,destX,destY) {
		if(destY == null) {
			destY = 0;
		}
		if(destX == null) {
			destX = 0;
		}
		var vec = hm.Data;
		var xEnd = xStart + width;
		var yEnd = yStart + height;
		var y = yStart;
		while(y < yEnd) {
			var x = xStart;
			while(x < xEnd) {
				var cx = x < 0 ? 0 : x >= hm.XSize ? hm.XSize - 1 : x;
				var cy = y < 0 ? 0 : y >= hm.ZSize ? hm.ZSize - 1 : y;
				this.Data[(y - yStart + destY) * this.XSize + x - xStart + destX] = vec[cy * hm.XSize + cx];
				++x;
			}
			++y;
		}
	}
	setFromBytes(bytes,heightMult,patchesAcross,heightMin,tileSize) {
		if(tileSize == null) {
			tileSize = 256;
		}
		if(heightMin == null) {
			heightMin = 0;
		}
		if(!HeightMapInfo.isBase2(tileSize)) {
			throw new (js__$Boot_HaxeError().default)("Tile size isn't base 2!");
		}
		this.Scale = Math.round(Math.log(tileSize) * 1.4426950408889634);
		var vertsX = patchesAcross + 1;
		var vertsY = patchesAcross + 1;
		this.RowWidth = vertsX;
		this.XSize = this.RowWidth;
		this.ZSize = vertsY;
		var rootLen = Math.sqrt(bytes.length);
		var srcDim = rootLen | 0;
		var stride = 1;
		if(srcDim != rootLen) {
			throw new (js__$Boot_HaxeError().default)("Non-square Bytes length detected!");
		} else {
			stride = srcDim / patchesAcross | 0;
			if(stride != srcDim / patchesAcross) {
				throw new (js__$Boot_HaxeError().default)("MAP_SIZE(patchesAcross) must be divisible by SRC_SIZE(bytes)");
			}
		}
		var data = this.Data = new Int32Array(vertsX * vertsX);
		var by = patchesAcross + 1;
		var lastValue = 0;
		var x;
		var y = 0;
		var pos = 0;
		while(y < by) {
			var x1 = 0;
			while(x1 < by) {
				var xb = x1 * stride;
				var yb = y * stride;
				var xer = xb < srcDim ? xb : srcDim - 1;
				var yer = yb < srcDim ? yb : srcDim - 1;
				var tmp = xer * srcDim + yer == bytes.length - 1;
				if(xer * srcDim + yer >= bytes.length) {
					throw new (js__$Boot_HaxeError().default)("Buffer overflow:" + (xer * srcDim + yer));
				}
				lastValue = bytes.b[xer * srcDim + yer];
				data[y * by + x1] = heightMin + lastValue * heightMult | 0;
				++x1;
			}
			++y;
		}
	}
	setFlat(numTilesAcross,tileSize) {
		if(tileSize == null) {
			tileSize = 256;
		}
		this.Scale = Math.round(Math.log(tileSize) * 1.4426950408889634);
		var vertX = numTilesAcross + 1;
		this.RowWidth = vertX;
		this.XSize = vertX;
		this.ZSize = vertX;
		if(this.Data == null) {
			this.Data = new Int32Array(vertX * vertX);
		} else {
			this.flatten();
		}
	}
	reset() {
		this.Data = new Int32Array(this.RowWidth * this.RowWidth);
	}
	paddEdgeDataValues() {
		var x;
		var y;
		var cap;
		x = this.XSize - 1;
		cap = this.ZSize - 1;
		var y1 = 0;
		while(y1 < cap) {
			this.Data[y1 * this.RowWidth + x] = this.Data[y1 * this.RowWidth + x - 1];
			++y1;
		}
		y1 = this.ZSize - 1;
		cap = this.XSize - 1;
		x = 0;
		while(x < cap) {
			this.Data[y1 * this.RowWidth + x] = this.Data[(y1 - 1) * this.RowWidth + x];
			++x;
		}
		x = this.XSize - 1;
		y1 = this.ZSize - 1;
		this.Data[y1 * this.RowWidth + x] = this.Data[(y1 - 1) * this.RowWidth + x - 1];
	}
	static isBase2(val) {
		return Math.pow(2,Math.round(Math.log(val) * 1.4426950408889634)) == val;
	}
	static createFlat(patchesAcross,tileSize) {
		if(tileSize == null) {
			tileSize = 256;
		}
		var me = new HeightMapInfo();
		me.Scale = Math.round(Math.log(tileSize) * 1.4426950408889634);
		var RowWidth = patchesAcross + 1;
		me.RowWidth = RowWidth;
		me.XSize = RowWidth;
		me.ZSize = RowWidth;
		me.Data = new Int32Array(RowWidth * RowWidth);
		return me;
	}
	static createFromBytes(x,y,bytes,heightMult,patchesAcross,heightMin,tileSize) {
		if(tileSize == null) {
			tileSize = 256;
		}
		if(heightMin == null) {
			heightMin = 0;
		}
		var result = new HeightMapInfo();
		result.XOrigin = x;
		result.ZOrigin = y;
		result.setFromBytes(bytes,heightMult,patchesAcross,heightMin,tileSize);
		return result;
	}
}


// Meta

HeightMapInfo.__name__ = ["altern","terrain","HeightMapInfo"];
HeightMapInfo.prototype.__class__ = HeightMapInfo.prototype.constructor = $hxClasses["altern.terrain.HeightMapInfo"] = HeightMapInfo;

// Init



// Statics



// Export

exports.default = HeightMapInfo;