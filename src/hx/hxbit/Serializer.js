// Class: hxbit.Serializer

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../hxClasses_stub").default;
var $import = require("./../import_stub").default;
var $bind = require("./../bind_stub").default;
function haxe_ds_ObjectMap() {return require("./../haxe/ds/ObjectMap");}
function haxe_io_BytesBuffer() {return require("./../haxe/io/BytesBuffer");}
function haxe_ds_IntMap() {return require("./../haxe/ds/IntMap");}
function haxe_io_FPHelper() {return require("./../haxe/io/FPHelper");}
function Lambda() {return require("./../Lambda");}
function haxe_io_Bytes() {return require("./../haxe/io/Bytes");}
function js__$Boot_HaxeError() {return require("./../js/_Boot/HaxeError");}
function haxe_io_Error() {return require("./../haxe/io/Error");}
function Type() {return require("./../Type");}
function Reflect() {return require("./../Reflect");}
function Std() {return require("./../Std");}
function js_Boot() {return require("./../js/Boot");}
function hxbit_Serializable() {return require("./../hxbit/Serializable");}
function hxbit_Schema() {return require("./../hxbit/Schema");}
function haxe_ds_StringMap() {return require("./../haxe/ds/StringMap");}
function hxbit_Convert() {return require("./../hxbit/Convert");}
function haxe_rtti_Meta() {return require("./../haxe/rtti/Meta");}
function haxe_ds_EnumValueMap() {return require("./../haxe/ds/EnumValueMap");}

// Constructor

class Serializer {
	constructor() {
		this.usedClasses = [];
		if(Serializer.CLIDS == null) {
			Serializer.initClassIDS();
		}
	}
	set_remapIds(b) {
		this.remapObjs = b ? new (haxe_ds_ObjectMap().default)() : null;
		return b;
	}
	get_remapIds() {
		return this.remapObjs != null;
	}
	remap(s) {
		if(this.remapObjs.h.__keys__[s.__id__] != null) {
			return;
		}
		this.remapObjs.set(s,s.__uid);
		s.__uid = Serializer.SEQ << 24 | ++Serializer.UID;
	}
	begin() {
		this.out = new (haxe_io_BytesBuffer().default)();
		this.refs = new (haxe_ds_IntMap().default)();
		this.knownStructs = [];
	}
	end() {
		var bytes = this.out.getBytes();
		this.out = null;
		this.refs = null;
		this.knownStructs = null;
		return bytes;
	}
	setInput(data,pos) {
		this.input = data;
		this.inPos = pos;
		if(this.refs == null) {
			this.refs = new (haxe_ds_IntMap().default)();
		}
		if(this.knownStructs == null) {
			this.knownStructs = [];
		}
	}
	serialize(s) {
		this.begin();
		this.addKnownRef(s);
		return this.out.getBytes();
	}
	unserialize(data,c,startPos) {
		if(startPos == null) {
			startPos = 0;
		}
		this.refs = new (haxe_ds_IntMap().default)();
		this.knownStructs = [];
		this.setInput(data,startPos);
		return this.getRef(c,c.__clid);
	}
	getByte() {
		return this.input.b[this.inPos++];
	}
	addByte(v) {
		this.out.b.push(v);
	}
	addInt(v) {
		if(v >= 0 && v < 128) {
			this.out.b.push(v);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v);
		}
	}
	addInt32(v) {
		this.out.addInt32(v);
	}
	addInt64(v) {
		this.out.addInt64(v);
	}
	addFloat(v) {
		this.out.addInt32((haxe_io_FPHelper().default).floatToI32(v));
	}
	addDouble(v) {
		this.out.addInt64((haxe_io_FPHelper().default).doubleToI64(v));
	}
	addBool(v) {
		this.out.b.push(v ? 1 : 0);
	}
	addArray(a,f) {
		if(a == null) {
			this.out.b.push(0);
			return;
		}
		var v = a.length + 1;
		if(v >= 0 && v < 128) {
			this.out.b.push(v);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v);
		}
		var _g = 0;
		while(_g < a.length) {
			var v1 = a[_g];
			++_g;
			f(v1);
		}
	}
	addVector(a,f) {
		if(a == null) {
			this.out.b.push(0);
			return;
		}
		var v = a.length + 1;
		if(v >= 0 && v < 128) {
			this.out.b.push(v);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v);
		}
		var _g = 0;
		while(_g < a.length) {
			var v1 = a[_g];
			++_g;
			f(v1);
		}
	}
	getArray(f) {
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		var len = v;
		if(len == 0) {
			return null;
		}
		--len;
		var a = [];
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			a[i] = f();
		}
		return a;
	}
	getVector(f) {
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		var len = v;
		if(len == 0) {
			return null;
		}
		--len;
		var this1 = new Array(len);
		var a = this1;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			a[i] = f();
		}
		return a;
	}
	addMap(a,fk,ft) {
		if(a == null) {
			this.out.b.push(0);
			return;
		}
		var _e = a;
		var keys = (Lambda().default).array({ iterator : function() {
			return _e.keys();
		}});
		var v = keys.length + 1;
		if(v >= 0 && v < 128) {
			this.out.b.push(v);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v);
		}
		var _g = 0;
		while(_g < keys.length) {
			var k = keys[_g];
			++_g;
			fk(k);
			ft(a.get(k));
		}
	}
	getBool() {
		return this.input.b[this.inPos++] != 0;
	}
	getInt() {
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		return v;
	}
	skip(size) {
		this.inPos += size;
	}
	getInt32() {
		var v = this.input.getInt32(this.inPos);
		this.inPos += 4;
		return v;
	}
	getInt64() {
		var v = this.input.getInt64(this.inPos);
		this.inPos += 8;
		return v;
	}
	getDouble() {
		var v = this.input.getDouble(this.inPos);
		this.inPos += 8;
		return v;
	}
	getFloat() {
		var v = this.input.getFloat(this.inPos);
		this.inPos += 4;
		return v;
	}
	addString(s) {
		if(s == null) {
			this.out.b.push(0);
		} else {
			var b = (haxe_io_Bytes().default).ofString(s);
			var v = b.length + 1;
			if(v >= 0 && v < 128) {
				this.out.b.push(v);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v);
			}
			var _this = this.out;
			var b1 = _this.b;
			var b2 = b.b;
			var _g1 = 0;
			var _g = b.length;
			while(_g1 < _g) {
				var i = _g1++;
				_this.b.push(b2[i]);
			}
		}
	}
	addBytes(b) {
		if(b == null) {
			this.out.b.push(0);
		} else {
			var v = b.length + 1;
			if(v >= 0 && v < 128) {
				this.out.b.push(v);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v);
			}
			var _this = this.out;
			var b1 = _this.b;
			var b2 = b.b;
			var _g1 = 0;
			var _g = b.length;
			while(_g1 < _g) {
				var i = _g1++;
				_this.b.push(b2[i]);
			}
		}
	}
	addBytesSub(b,pos,len) {
		if(b == null) {
			this.out.b.push(0);
		} else {
			var v = len + 1;
			if(v >= 0 && v < 128) {
				this.out.b.push(v);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v);
			}
			var _this = this.out;
			if(pos < 0 || len < 0 || pos + len > b.length) {
				throw new (js__$Boot_HaxeError().default)((haxe_io_Error().default).OutsideBounds);
			}
			var b1 = _this.b;
			var b2 = b.b;
			var _g1 = pos;
			var _g = pos + len;
			while(_g1 < _g) {
				var i = _g1++;
				_this.b.push(b2[i]);
			}
		}
	}
	getString() {
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		var len = v;
		if(len == 0) {
			return null;
		}
		--len;
		var s = this.input.getString(this.inPos,len);
		this.inPos += len;
		return s;
	}
	getBytes() {
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		var len = v;
		if(len == 0) {
			return null;
		}
		--len;
		var s = this.input.sub(this.inPos,len);
		this.inPos += len;
		return s;
	}
	getDynamic() {
		var _g = this.input.b[this.inPos++];
		switch(_g) {
		case 0:
			return null;
		case 1:
			return false;
		case 2:
			return true;
		case 3:
			var v = this.input.b[this.inPos++];
			if(v == 128) {
				v = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			return v;
		case 4:
			var v1 = this.input.getFloat(this.inPos);
			this.inPos += 4;
			return v1;
		case 5:
			var o = { };
			var _g1 = 0;
			var v2 = this.input.b[this.inPos++];
			if(v2 == 128) {
				v2 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var _g2 = v2;
			while(_g1 < _g2) {
				var i = _g1++;
				var v3 = this.input.b[this.inPos++];
				if(v3 == 128) {
					v3 = this.input.getInt32(this.inPos);
					this.inPos += 4;
				}
				var len = v3;
				var field;
				if(len == 0) {
					field = null;
				} else {
					--len;
					var s = this.input.getString(this.inPos,len);
					this.inPos += len;
					field = s;
				}
				o[field] = this.getDynamic();
			}
			return o;
		case 6:
			var v4 = this.input.b[this.inPos++];
			if(v4 == 128) {
				v4 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len1 = v4;
			if(len1 == 0) {
				return null;
			} else {
				--len1;
				var s1 = this.input.getString(this.inPos,len1);
				this.inPos += len1;
				return s1;
			}
			break;
		case 7:
			var _g3 = [];
			var _g21 = 0;
			var v5 = this.input.b[this.inPos++];
			if(v5 == 128) {
				v5 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var _g11 = v5;
			while(_g21 < _g11) {
				var i1 = _g21++;
				_g3.push(this.getDynamic());
			}
			return _g3;
		case 8:
			var v6 = this.input.b[this.inPos++];
			if(v6 == 128) {
				v6 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len2 = v6;
			if(len2 == 0) {
				return null;
			} else {
				--len2;
				var s2 = this.input.sub(this.inPos,len2);
				this.inPos += len2;
				return s2;
			}
			break;
		default:
			var x = _g;
			throw new (js__$Boot_HaxeError().default)("Invalid dynamic prefix " + x);
		}
	}
	addDynamic(v) {
		if(v == null) {
			this.out.b.push(0);
			return;
		}
		var _g = (Type().default)["typeof"](v);
		switch(_g[1]) {
		case 1:
			this.out.b.push(3);
			var v1 = v;
			if(v1 >= 0 && v1 < 128) {
				this.out.b.push(v1);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v1);
			}
			break;
		case 2:
			this.out.b.push(4);
			this.out.addInt32((haxe_io_FPHelper().default).floatToI32(v));
			break;
		case 3:
			this.out.b.push(v ? 2 : 1);
			break;
		case 4:
			var fields = (Reflect().default).fields(v);
			this.out.b.push(5);
			var v2 = fields.length;
			if(v2 >= 0 && v2 < 128) {
				this.out.b.push(v2);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v2);
			}
			var _g1 = 0;
			while(_g1 < fields.length) {
				var f = fields[_g1];
				++_g1;
				if(f == null) {
					this.out.b.push(0);
				} else {
					var b = (haxe_io_Bytes().default).ofString(f);
					var v3 = b.length + 1;
					if(v3 >= 0 && v3 < 128) {
						this.out.b.push(v3);
					} else {
						this.out.b.push(128);
						this.out.addInt32(v3);
					}
					var _this = this.out;
					var b1 = _this.b;
					var b2 = b.b;
					var _g11 = 0;
					var _g2 = b.length;
					while(_g11 < _g2) {
						var i = _g11++;
						_this.b.push(b2[i]);
					}
				}
				this.addDynamic((Reflect().default).field(v,f));
			}
			break;
		case 6:
			var c = _g[2];
			switch(c) {
			case Array:
				this.out.b.push(7);
				var a = v;
				var v4 = a.length;
				if(v4 >= 0 && v4 < 128) {
					this.out.b.push(v4);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v4);
				}
				var _g3 = 0;
				while(_g3 < a.length) {
					var v5 = a[_g3];
					++_g3;
					this.addDynamic(v5);
				}
				break;
			case String:
				this.out.b.push(6);
				var s = v;
				if(s == null) {
					this.out.b.push(0);
				} else {
					var b3 = (haxe_io_Bytes().default).ofString(s);
					var v6 = b3.length + 1;
					if(v6 >= 0 && v6 < 128) {
						this.out.b.push(v6);
					} else {
						this.out.b.push(128);
						this.out.addInt32(v6);
					}
					var _this1 = this.out;
					var b11 = _this1.b;
					var b21 = b3.b;
					var _g12 = 0;
					var _g4 = b3.length;
					while(_g12 < _g4) {
						var i1 = _g12++;
						_this1.b.push(b21[i1]);
					}
				}
				break;
			case (haxe_io_Bytes().default):
				this.out.b.push(8);
				var b4 = v;
				if(b4 == null) {
					this.out.b.push(0);
				} else {
					var v7 = b4.length + 1;
					if(v7 >= 0 && v7 < 128) {
						this.out.b.push(v7);
					} else {
						this.out.b.push(128);
						this.out.addInt32(v7);
					}
					var _this2 = this.out;
					var b12 = _this2.b;
					var b22 = b4.b;
					var _g13 = 0;
					var _g5 = b4.length;
					while(_g13 < _g5) {
						var i2 = _g13++;
						_this2.b.push(b22[i2]);
					}
				}
				break;
			default:
				throw new (js__$Boot_HaxeError().default)("Unsupported dynamic " + (Std().default).string(c));
			}
			break;
		default:
			var t = _g;
			throw new (js__$Boot_HaxeError().default)("Unsupported dynamic " + (Std().default).string(t));
		}
	}
	addCLID(clid) {
		this.out.b.push(clid >> 8);
		this.out.b.push(clid & 255);
	}
	getCLID() {
		return this.input.b[this.inPos++] << 8 | this.input.b[this.inPos++];
	}
	addStruct(s) {
		if(s == null) {
			this.out.b.push(0);
			return;
		}
		var c = (js_Boot().default).__instanceof(s,(hxbit_Serializable().default)) ? s : null;
		if(c != null) {
			this.out.b.push(1);
			this.addAnyRef(c);
			return;
		}
		var index = this.knownStructs.indexOf(s);
		if(index >= 0) {
			this.out.b.push(2);
			if(index >= 0 && index < 128) {
				this.out.b.push(index);
			} else {
				this.out.b.push(128);
				this.out.addInt32(index);
			}
			return;
		}
		this.knownStructs.push(s);
		this.out.b.push(3);
		var c1 = s == null ? null : (js_Boot().default).getClass(s);
		if(c1 == null) {
			throw new (js__$Boot_HaxeError().default)((Std().default).string(s) + " does not have a class ?");
		}
		var s1 = (Type().default).getClassName(c1);
		if(s1 == null) {
			this.out.b.push(0);
		} else {
			var b = (haxe_io_Bytes().default).ofString(s1);
			var v = b.length + 1;
			if(v >= 0 && v < 128) {
				this.out.b.push(v);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v);
			}
			var _this = this.out;
			var b1 = _this.b;
			var b2 = b.b;
			var _g1 = 0;
			var _g = b.length;
			while(_g1 < _g) {
				var i = _g1++;
				_this.b.push(b2[i]);
			}
		}
		s.customSerialize(this);
		this.out.b.push(255);
	}
	getStruct() {
		var _g = this.input.b[this.inPos++];
		switch(_g) {
		case 0:
			return null;
		case 1:
			return this.getAnyRef();
		case 2:
			var tmp = this.knownStructs;
			var v = this.input.b[this.inPos++];
			if(v == 128) {
				v = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			return tmp[v];
		case 3:
			var v1 = this.input.b[this.inPos++];
			if(v1 == 128) {
				v1 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len = v1;
			var cname;
			if(len == 0) {
				cname = null;
			} else {
				--len;
				var s = this.input.getString(this.inPos,len);
				this.inPos += len;
				cname = s;
			}
			var cl = (Type().default).resolveClass(cname);
			if(cl == null) {
				throw new (js__$Boot_HaxeError().default)("Missing struct class " + cname);
			}
			var s1 = (Type().default).createEmptyInstance(cl);
			this.knownStructs.push(s1);
			s1.customUnserialize(this);
			if(this.input.b[this.inPos++] != 255) {
				throw new (js__$Boot_HaxeError().default)("Invalid customUnserialize for " + (Std().default).string(s1));
			}
			return s1;
		default:
			throw new (js__$Boot_HaxeError().default)("assert");
		}
	}
	addObjRef(s) {
		var v = s.__uid;
		if(v >= 0 && v < 128) {
			this.out.b.push(v);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v);
		}
	}
	getObjRef() {
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		return v;
	}
	addAnyRef(s) {
		if(s == null) {
			this.out.b.push(0);
			return;
		}
		if(this.remapObjs != null) {
			this.remap(s);
		}
		this.addObjRef(s);
		if(this.refs.h[s.__uid] != null) {
			return;
		}
		this.refs.h[s.__uid] = s;
		var index = s.getCLID();
		this.usedClasses[index] = true;
		this.out.b.push(index >> 8);
		this.out.b.push(index & 255);
		s.serialize(this);
	}
	addKnownRef(s) {
		if(s == null) {
			this.out.b.push(0);
			return;
		}
		if(this.remapObjs != null) {
			this.remap(s);
		}
		this.addObjRef(s);
		if(this.refs.h[s.__uid] != null) {
			return;
		}
		this.refs.h[s.__uid] = s;
		var index = s.getCLID();
		this.usedClasses[index] = true;
		var clid = Serializer.CLIDS[index];
		if(clid != 0) {
			this.out.b.push(clid >> 8);
			this.out.b.push(clid & 255);
		}
		s.serialize(this);
	}
	getAnyRef() {
		var id = this.getObjRef();
		if(id == 0) {
			return null;
		}
		if(this.refs.h[id] != null) {
			return this.refs.h[id];
		}
		var rid = id & 16777215;
		if(Serializer.UID < rid) {
			Serializer.UID = rid;
		}
		var clidx = this.input.b[this.inPos++] << 8 | this.input.b[this.inPos++];
		if(this.mapIndexes != null) {
			clidx = this.mapIndexes[clidx];
		}
		var i = (Type().default).createEmptyInstance(Serializer.CLASSES[clidx]);
		if(this.newObjects != null) {
			this.newObjects.push(i);
		}
		i.__uid = id;
		i.unserializeInit();
		this.refs.h[id] = i;
		if(this.convert != null && this.convert[clidx] != null) {
			this.convertRef(i,this.convert[clidx]);
		} else {
			i.unserialize(this);
		}
		return i;
	}
	getRef(c,clidx) {
		var id = this.getObjRef();
		if(id == 0) {
			return null;
		}
		if(this.refs.h[id] != null) {
			return this.refs.h[id];
		}
		var rid = id & 16777215;
		if(Serializer.UID < rid) {
			Serializer.UID = rid;
		}
		if(Serializer.CLIDS[clidx] != 0) {
			var realIdx = this.input.b[this.inPos++] << 8 | this.input.b[this.inPos++];
			c = Serializer.CL_BYID[realIdx];
			if(this.convert != null) {
				clidx = c.__clid;
			}
		}
		var i = (Type().default).createEmptyInstance(c);
		if(this.newObjects != null) {
			this.newObjects.push(i);
		}
		i.__uid = id;
		i.unserializeInit();
		this.refs.h[id] = i;
		if(this.convert != null && this.convert[clidx] != null) {
			this.convertRef(i,this.convert[clidx]);
		} else {
			i.unserialize(this);
		}
		return i;
	}
	getKnownRef(c) {
		return this.getRef(c,c.__clid);
	}
	beginSave() {
		this.begin();
		this.usedClasses = [];
	}
	endSave(savePosition) {
		if(savePosition == null) {
			savePosition = 0;
		}
		var content = this.end();
		this.begin();
		var classes = [];
		var schemas = [];
		var sidx = Serializer.CLASSES.indexOf((hxbit_Schema().default));
		var _g1 = 0;
		var _g = this.usedClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!this.usedClasses[i] || i == sidx) {
				continue;
			}
			var c = Serializer.CLASSES[i];
			var schema = (Type().default).createEmptyInstance(c).getSerializeSchema();
			schemas.push(schema);
			classes.push(i);
			this.addKnownRef(schema);
			this.refs.remove(schema.__uid);
		}
		var schemaData = this.end();
		this.begin();
		var _this = this.out;
		if(savePosition < 0 || savePosition > content.length) {
			throw new (js__$Boot_HaxeError().default)((haxe_io_Error().default).OutsideBounds);
		}
		var b1 = _this.b;
		var b2 = content.b;
		var _g11 = 0;
		var _g2 = savePosition;
		while(_g11 < _g2) {
			var i1 = _g11++;
			_this.b.push(b2[i1]);
		}
		var b = (haxe_io_Bytes().default).ofString("HXS");
		var v = b.length + 1;
		if(v >= 0 && v < 128) {
			this.out.b.push(v);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v);
		}
		var _this1 = this.out;
		var b11 = _this1.b;
		var b21 = b.b;
		var _g12 = 0;
		var _g3 = b.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			_this1.b.push(b21[i2]);
		}
		this.out.b.push(1);
		var _g13 = 0;
		var _g4 = classes.length;
		while(_g13 < _g4) {
			var i3 = _g13++;
			var index = classes[i3];
			var s = (Type().default).getClassName(Serializer.CLASSES[index]);
			if(s == null) {
				this.out.b.push(0);
			} else {
				var b3 = (haxe_io_Bytes().default).ofString(s);
				var v1 = b3.length + 1;
				if(v1 >= 0 && v1 < 128) {
					this.out.b.push(v1);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v1);
				}
				var _this2 = this.out;
				var b12 = _this2.b;
				var b22 = b3.b;
				var _g14 = 0;
				var _g5 = b3.length;
				while(_g14 < _g5) {
					var i4 = _g14++;
					_this2.b.push(b22[i4]);
				}
			}
			this.out.b.push(index >> 8);
			this.out.b.push(index & 255);
			var v2 = schemas[i3].get_checkSum();
			this.out.addInt32(v2);
		}
		this.out.b.push(0);
		var v3 = schemaData.length;
		if(v3 >= 0 && v3 < 128) {
			this.out.b.push(v3);
		} else {
			this.out.b.push(128);
			this.out.addInt32(v3);
		}
		var _this3 = this.out;
		var b13 = _this3.b;
		var b23 = schemaData.b;
		var _g15 = 0;
		var _g6 = schemaData.length;
		while(_g15 < _g6) {
			var i5 = _g15++;
			_this3.b.push(b23[i5]);
		}
		var _this4 = this.out;
		var len = content.length - savePosition;
		if(savePosition < 0 || len < 0 || savePosition + len > content.length) {
			throw new (js__$Boot_HaxeError().default)((haxe_io_Error().default).OutsideBounds);
		}
		var b14 = _this4.b;
		var b24 = content.b;
		var _g16 = savePosition;
		var _g7 = savePosition + len;
		while(_g16 < _g7) {
			var i6 = _g16++;
			_this4.b.push(b24[i6]);
		}
		return this.end();
	}
	beginLoad(bytes,position) {
		if(position == null) {
			position = 0;
		}
		this.setInput(bytes,position);
		var classByName = new (haxe_ds_StringMap().default)();
		var schemas = [];
		var mapIndexes = [];
		var indexes = [];
		var needConvert = false;
		var needReindex = false;
		var _g1 = 0;
		var _g = Serializer.CLASSES.length;
		while(_g1 < _g) {
			var i = _g1++;
			var key = (Type().default).getClassName(Serializer.CLASSES[i]);
			if(__map_reserved[key] != null) {
				classByName.setReserved(key,i);
			} else {
				classByName.h[key] = i;
			}
			mapIndexes[i] = i;
		}
		var v = this.input.b[this.inPos++];
		if(v == 128) {
			v = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		var len = v;
		var tmp;
		if(len == 0) {
			tmp = null;
		} else {
			--len;
			var s = this.input.getString(this.inPos,len);
			this.inPos += len;
			tmp = s;
		}
		if(tmp != "HXS") {
			throw new (js__$Boot_HaxeError().default)("Invalid HXS data");
		}
		var version = this.input.b[this.inPos++];
		if(version != 1) {
			throw new (js__$Boot_HaxeError().default)("Unsupported HXS version " + version);
		}
		while(true) {
			var v1 = this.input.b[this.inPos++];
			if(v1 == 128) {
				v1 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len1 = v1;
			var clname;
			if(len1 == 0) {
				clname = null;
			} else {
				--len1;
				var s1 = this.input.getString(this.inPos,len1);
				this.inPos += len1;
				clname = s1;
			}
			if(clname == null) {
				break;
			}
			var index = this.input.b[this.inPos++] << 8 | this.input.b[this.inPos++];
			var v2 = this.input.getInt32(this.inPos);
			this.inPos += 4;
			var crc = v2;
			var ourClassIndex = __map_reserved[clname] != null ? classByName.getReserved(clname) : classByName.h[clname];
			if(ourClassIndex == null) {
				throw new (js__$Boot_HaxeError().default)("Missing class " + clname + " found in HXS data");
			}
			var ourSchema = (Type().default).createEmptyInstance(Serializer.CLASSES[ourClassIndex]).getSerializeSchema();
			if(ourSchema.get_checkSum() != crc) {
				needConvert = true;
				schemas[index] = ourSchema;
			}
			if(index != ourClassIndex) {
				needReindex = true;
				mapIndexes[index] = ourClassIndex;
			}
			indexes.push(index);
		}
		var v3 = this.input.b[this.inPos++];
		if(v3 == 128) {
			v3 = this.input.getInt32(this.inPos);
			this.inPos += 4;
		}
		var schemaDataSize = v3;
		if(needConvert) {
			this.convert = [];
			var _g2 = 0;
			while(_g2 < indexes.length) {
				var index1 = indexes[_g2];
				++_g2;
				var ourSchema1 = schemas[index1];
				var c = (hxbit_Schema().default)
				var schema = this.getRef(c,c.__clid);
				this.refs.remove(schema.__uid);
				if(ourSchema1 != null) {
					this.convert[mapIndexes[index1]] = new (hxbit_Convert().default)(ourSchema1,schema);
				}
			}
		} else {
			this.inPos += schemaDataSize;
		}
		if(needReindex) {
			this.mapIndexes = mapIndexes;
		}
	}
	endLoad() {
		this.convert = null;
		this.mapIndexes = null;
		this.setInput(null,0);
	}
	convertRef(i,c) {
		var length = c.read.length;
		var this1 = new Array(length);
		var values = this1;
		var writePos = 0;
		var _g = 0;
		var _g1 = c.read;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			values[r.index] = this.readValue(r.from);
		}
		var oldOut = this.out;
		this.out = new (haxe_io_BytesBuffer().default)();
		var _g2 = 0;
		var _g11 = c.write;
		while(_g2 < _g11.length) {
			var w = _g11[_g2];
			++_g2;
			var v;
			if(w.from == null) {
				v = w.defaultValue;
			} else {
				v = values[w.index];
				if(!w.same) {
					if(v == null) {
						v = w.defaultValue;
					} else {
						v = this.convertValue(v,w.from,w.to);
					}
				}
			}
			this.writeValue(v,w.to);
		}
		var bytes = this.out.getBytes();
		this.out = oldOut;
		var oldIn = this.input;
		var oldPos = this.inPos;
		this.setInput(bytes,0);
		i.unserialize(this);
		this.setInput(oldIn,oldPos);
	}
	isNullable(t) {
		switch(t[1]) {
		case 0:case 1:case 2:
			return false;
		default:
			return true;
		}
	}
	convertValue(v,from,to) {
		if(v == null && this.isNullable(to)) {
			return null;
		}
		if((hxbit_Convert().default).sameType(from,to)) {
			return v;
		}
		if(from[1] == 9) {
			if(to[1] == 9) {
				var obj1 = from[2];
				var obj2 = to[2];
				var v2 = { };
				var _g = 0;
				while(_g < obj2.length) {
					var f = obj2[_g];
					++_g;
					var found = false;
					var field = null;
					var _g1 = 0;
					while(_g1 < obj1.length) {
						var f2 = obj1[_g1];
						++_g1;
						if(f2.name == f.name) {
							found = true;
							field = this.convertValue((Reflect().default).field(v,f2.name),f2.type,f.type);
							break;
						}
					}
					if(!found) {
						if(f.opt) {
							continue;
						}
						field = (hxbit_Convert().default).getDefault(f.type);
					} else if(field == null && f.opt) {
						continue;
					}
					v2[f.name] = field;
				}
				return v2;
			}
		}
		throw new (js__$Boot_HaxeError().default)("Cannot convert " + (Std().default).string(v) + " from " + (Std().default).string(from) + " to " + (Std().default).string(to));
	}
	readValue(t) {
		var _gthis = this;
		switch(t[1]) {
		case 0:
			var v = this.input.b[this.inPos++];
			if(v == 128) {
				v = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			return v;
		case 1:
			var v1 = this.input.getFloat(this.inPos);
			this.inPos += 4;
			return v1;
		case 2:
			return this.input.b[this.inPos++] != 0;
		case 3:
			var v2 = this.input.b[this.inPos++];
			if(v2 == 128) {
				v2 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len = v2;
			if(len == 0) {
				return null;
			} else {
				--len;
				var s = this.input.getString(this.inPos,len);
				this.inPos += len;
				return s;
			}
			break;
		case 4:
			var v3 = this.input.b[this.inPos++];
			if(v3 == 128) {
				v3 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len1 = v3;
			if(len1 == 0) {
				return null;
			} else {
				--len1;
				var s1 = this.input.sub(this.inPos,len1);
				this.inPos += len1;
				return s1;
			}
			break;
		case 5:
			var name = t[2];
			return this.getKnownRef((Type().default).resolveClass(name));
		case 6:
			var name1 = t[2];
			var ser = (Type().default).resolveClass("hxbit.enumSer." + name1.split(".").join("_"));
			if(ser == null) {
				var e = (Type().default).resolveEnum(name1);
				var tmp;
				if(e != null) {
					var o = (haxe_rtti_Meta().default).getType(e);
					tmp = Object.prototype.hasOwnProperty.call(o,"skipSerialize");
				} else {
					tmp = false;
				}
				if(tmp) {
					var v4 = this.input.b[this.inPos++];
					if(v4 == 128) {
						v4 = this.input.getInt32(this.inPos);
						this.inPos += 4;
					}
					return null;
				}
				throw new (js__$Boot_HaxeError().default)("No enum unserializer found for " + name1);
			}
			return ser.doUnserialize(this);
		case 7:
			var v5 = t[3];
			var k = t[2];
			switch(k[1]) {
			case 0:
				var v6 = this.input.b[this.inPos++];
				if(v6 == 128) {
					v6 = this.input.getInt32(this.inPos);
					this.inPos += 4;
				}
				var len2 = v6;
				var tmp1;
				if(len2 == 0) {
					tmp1 = null;
				} else {
					var m = new (haxe_ds_IntMap().default)();
					while(--len2 > 0) {
						var k1 = _gthis.readValue(k);
						var v7 = _gthis.readValue(v5);
						m.h[k1] = v7;
					}
					tmp1 = m;
				}
				return tmp1;
			case 3:
				var v8 = this.input.b[this.inPos++];
				if(v8 == 128) {
					v8 = this.input.getInt32(this.inPos);
					this.inPos += 4;
				}
				var len3 = v8;
				var tmp2;
				if(len3 == 0) {
					tmp2 = null;
				} else {
					var m1 = new (haxe_ds_StringMap().default)();
					while(--len3 > 0) {
						var k2 = _gthis.readValue(k);
						var v9 = _gthis.readValue(v5);
						if(__map_reserved[k2] != null) {
							m1.setReserved(k2,v9);
						} else {
							m1.h[k2] = v9;
						}
					}
					tmp2 = m1;
				}
				return tmp2;
			case 6:
				var v10 = this.input.b[this.inPos++];
				if(v10 == 128) {
					v10 = this.input.getInt32(this.inPos);
					this.inPos += 4;
				}
				var len4 = v10;
				if(len4 == 0) {
					return null;
				}
				var m2 = new (haxe_ds_EnumValueMap().default)();
				while(--len4 > 0) {
					var k3 = this.readValue(k);
					var v11 = this.readValue(v5);
					m2.set(k3,v11);
				}
				return m2;
			default:
				var v12 = this.input.b[this.inPos++];
				if(v12 == 128) {
					v12 = this.input.getInt32(this.inPos);
					this.inPos += 4;
				}
				var len5 = v12;
				var tmp3;
				if(len5 == 0) {
					tmp3 = null;
				} else {
					var m3 = new (haxe_ds_ObjectMap().default)();
					while(--len5 > 0) {
						var k4 = _gthis.readValue(k);
						var v13 = _gthis.readValue(v5);
						m3.set(k4,v13);
					}
					tmp3 = m3;
				}
				return tmp3;
			}
			break;
		case 8:
			var t1 = t[2];
			var v14 = this.input.b[this.inPos++];
			if(v14 == 128) {
				v14 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len6 = v14;
			if(len6 == 0) {
				return null;
			} else {
				--len6;
				var a = [];
				var _g1 = 0;
				var _g = len6;
				while(_g1 < _g) {
					var i = _g1++;
					a[i] = _gthis.readValue(t1);
				}
				return a;
			}
			break;
		case 9:
			var fields = t[2];
			var v15 = this.input.b[this.inPos++];
			if(v15 == 128) {
				v15 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var bits = v15;
			if(bits == 0) {
				return null;
			}
			var o1 = { };
			--bits;
			var _g2 = [];
			var _g11 = 0;
			while(_g11 < fields.length) {
				var f = fields[_g11];
				++_g11;
				if(this.isNullable(f.type)) {
					_g2.push(f);
				}
			}
			var nullables = _g2;
			var _g12 = 0;
			while(_g12 < fields.length) {
				var f1 = fields[_g12];
				++_g12;
				var nidx = nullables.indexOf(f1);
				if(nidx >= 0 && (bits & 1 << nidx) == 0) {
					continue;
				}
				o1[f1.name] = this.readValue(f1.type);
			}
			return o1;
		case 10:
			var t2 = t[2];
			return this.readValue(t2);
		case 11:
			var t3 = t[2];
			var v16 = this.input.b[this.inPos++];
			if(v16 == 128) {
				v16 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			var len7 = v16;
			if(len7 == 0) {
				return null;
			} else {
				--len7;
				var this1 = new Array(len7);
				var a1 = this1;
				var _g13 = 0;
				var _g3 = len7;
				while(_g13 < _g3) {
					var i1 = _g13++;
					a1[i1] = _gthis.readValue(t3);
				}
				return a1;
			}
			break;
		case 12:
			var t4 = t[2];
			if(this.input.b[this.inPos++] == 0) {
				return null;
			} else {
				return this.readValue(t4);
			}
			break;
		case 13:
			throw new (js__$Boot_HaxeError().default)("assert");
			break;
		case 14:
			return this.getDynamic();
		case 15:
			var v17 = this.input.getInt64(this.inPos);
			this.inPos += 8;
			return v17;
		case 16:
			var v18 = this.input.b[this.inPos++];
			if(v18 == 128) {
				v18 = this.input.getInt32(this.inPos);
				this.inPos += 4;
			}
			return v18;
		case 17:
			return this.getStruct();
		}
	}
	writeValue(v,t) {
		var _gthis = this;
		switch(t[1]) {
		case 0:
			var v1 = v;
			if(v1 >= 0 && v1 < 128) {
				this.out.b.push(v1);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v1);
			}
			break;
		case 1:
			this.out.addInt32((haxe_io_FPHelper().default).floatToI32(v));
			break;
		case 2:
			this.out.b.push(v ? 1 : 0);
			break;
		case 3:
			var s = v;
			if(s == null) {
				this.out.b.push(0);
			} else {
				var b = (haxe_io_Bytes().default).ofString(s);
				var v2 = b.length + 1;
				if(v2 >= 0 && v2 < 128) {
					this.out.b.push(v2);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v2);
				}
				var _this = this.out;
				var b1 = _this.b;
				var b2 = b.b;
				var _g1 = 0;
				var _g = b.length;
				while(_g1 < _g) {
					var i = _g1++;
					_this.b.push(b2[i]);
				}
			}
			break;
		case 4:
			var b3 = v;
			if(b3 == null) {
				this.out.b.push(0);
			} else {
				var v3 = b3.length + 1;
				if(v3 >= 0 && v3 < 128) {
					this.out.b.push(v3);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v3);
				}
				var _this1 = this.out;
				var b11 = _this1.b;
				var b21 = b3.b;
				var _g11 = 0;
				var _g2 = b3.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					_this1.b.push(b21[i1]);
				}
			}
			break;
		case 5:
			this.addKnownRef(v);
			break;
		case 6:
			var name = t[2];
			var ser = "hxbit.enumSer." + name.split(".").join("_");
			if(ser == null) {
				throw new (js__$Boot_HaxeError().default)("No enum unserializer found for " + name);
			}
			(Type().default).resolveClass(ser).doSerialize(this,v);
			break;
		case 7:
			var t1 = t[3];
			var k = t[2];
			switch(k[1]) {
			case 0:
				var v4 = v;
				if(v4 == null) {
					this.out.b.push(0);
				} else {
					var _e = v4;
					var keys = (Lambda().default).array({ iterator : function() {
						return _e.keys();
					}});
					var v5 = keys.length + 1;
					if(v5 >= 0 && v5 < 128) {
						this.out.b.push(v5);
					} else {
						this.out.b.push(128);
						this.out.addInt32(v5);
					}
					var _g3 = 0;
					while(_g3 < keys.length) {
						var k1 = keys[_g3];
						++_g3;
						_gthis.writeValue(k1,k);
						_gthis.writeValue(v4.h[k1],t1);
					}
				}
				break;
			case 3:
				var v6 = v;
				if(v6 == null) {
					this.out.b.push(0);
				} else {
					var _e1 = v6;
					var keys1 = (Lambda().default).array({ iterator : function() {
						return _e1.keys();
					}});
					var v7 = keys1.length + 1;
					if(v7 >= 0 && v7 < 128) {
						this.out.b.push(v7);
					} else {
						this.out.b.push(128);
						this.out.addInt32(v7);
					}
					var _g4 = 0;
					while(_g4 < keys1.length) {
						var k2 = keys1[_g4];
						++_g4;
						_gthis.writeValue(k2,k);
						_gthis.writeValue(__map_reserved[k2] != null ? v6.getReserved(k2) : v6.h[k2],t1);
					}
				}
				break;
			case 6:
				var v8 = v;
				if(v8 == null) {
					this.out.b.push(0);
					return;
				}
				var keys2 = (Lambda().default).array({ iterator : $bind(v8,v8.keys)});
				var v9 = keys2.length + 1;
				if(v9 >= 0 && v9 < 128) {
					this.out.b.push(v9);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v9);
				}
				var _g5 = 0;
				while(_g5 < keys2.length) {
					var vk = keys2[_g5];
					++_g5;
					this.writeValue(vk,k);
					this.writeValue(v8.get(vk),t1);
				}
				break;
			default:
				var v10 = v;
				if(v10 == null) {
					this.out.b.push(0);
				} else {
					var _e2 = v10;
					var keys3 = (Lambda().default).array({ iterator : function() {
						return _e2.keys();
					}});
					var v11 = keys3.length + 1;
					if(v11 >= 0 && v11 < 128) {
						this.out.b.push(v11);
					} else {
						this.out.b.push(128);
						this.out.addInt32(v11);
					}
					var _g6 = 0;
					while(_g6 < keys3.length) {
						var k3 = keys3[_g6];
						++_g6;
						_gthis.writeValue(k3,k);
						_gthis.writeValue(v10.h[k3.__id__],t1);
					}
				}
			}
			break;
		case 8:
			var t2 = t[2];
			var a = v;
			if(a == null) {
				this.out.b.push(0);
			} else {
				var v12 = a.length + 1;
				if(v12 >= 0 && v12 < 128) {
					this.out.b.push(v12);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v12);
				}
				var _g7 = 0;
				while(_g7 < a.length) {
					var v13 = a[_g7];
					++_g7;
					_gthis.writeValue(v13,t2);
				}
			}
			break;
		case 9:
			var fields = t[2];
			if(v == null) {
				this.out.b.push(0);
			} else {
				var fbits = 0;
				var _g8 = [];
				var _g12 = 0;
				while(_g12 < fields.length) {
					var f = fields[_g12];
					++_g12;
					if(this.isNullable(f.type)) {
						_g8.push(f);
					}
				}
				var nullables = _g8;
				var _g21 = 0;
				var _g13 = nullables.length;
				while(_g21 < _g13) {
					var i2 = _g21++;
					if((Reflect().default).field(v,nullables[i2].name) != null) {
						fbits |= 1 << i2;
					}
				}
				var v14 = fbits + 1;
				if(v14 >= 0 && v14 < 128) {
					this.out.b.push(v14);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v14);
				}
				var _g14 = 0;
				while(_g14 < fields.length) {
					var f1 = fields[_g14];
					++_g14;
					var nidx = nullables.indexOf(f1);
					if(nidx >= 0 && (fbits & 1 << nidx) == 0) {
						continue;
					}
					this.writeValue((Reflect().default).field(v,f1.name),f1.type);
				}
			}
			break;
		case 10:
			var t3 = t[2];
			this.writeValue(v,t3);
			break;
		case 11:
			var t4 = t[2];
			var a1 = v;
			if(a1 == null) {
				this.out.b.push(0);
			} else {
				var v15 = a1.length + 1;
				if(v15 >= 0 && v15 < 128) {
					this.out.b.push(v15);
				} else {
					this.out.b.push(128);
					this.out.addInt32(v15);
				}
				var _g9 = 0;
				while(_g9 < a1.length) {
					var v16 = a1[_g9];
					++_g9;
					_gthis.writeValue(v16,t4);
				}
			}
			break;
		case 12:
			var t5 = t[2];
			if(v == null) {
				this.out.b.push(0);
			} else {
				this.out.b.push(1);
				this.writeValue(v,t5);
			}
			break;
		case 13:
			throw new (js__$Boot_HaxeError().default)("assert");
			break;
		case 14:
			this.addDynamic(v);
			break;
		case 15:
			this.out.addInt64(v);
			break;
		case 16:
			var v17 = v;
			if(v17 >= 0 && v17 < 128) {
				this.out.b.push(v17);
			} else {
				this.out.b.push(128);
				this.out.addInt32(v17);
			}
			break;
		case 17:
			this.addStruct(v);
			break;
		}
	}
	static get UID() { return UID; }
	static set UID(value) { UID = value; }
	static get SEQ() { return SEQ; }
	static set SEQ(value) { SEQ = value; }
	static get SEQ_BITS() { return SEQ_BITS; }
	static set SEQ_BITS(value) { SEQ_BITS = value; }
	static get SEQ_MASK() { return SEQ_MASK; }
	static set SEQ_MASK(value) { SEQ_MASK = value; }
	static resetCounters() {
		Serializer.UID = 0;
		Serializer.SEQ = 0;
	}
	static allocUID() {
		return Serializer.SEQ << 24 | ++Serializer.UID;
	}
	static get CLASSES() { return CLASSES; }
	static set CLASSES(value) { CLASSES = value; }
	static get CL_BYID() { return CL_BYID; }
	static set CL_BYID(value) { CL_BYID = value; }
	static get CLIDS() { return CLIDS; }
	static set CLIDS(value) { CLIDS = value; }
	static registerClass(c) {
		if(Serializer.CLIDS != null) {
			throw new (js__$Boot_HaxeError().default)("Too late to register class");
		}
		var idx = Serializer.CLASSES.length;
		Serializer.CLASSES.push(c);
		return idx;
	}
	static hash(name) {
		var v = 1;
		var _g1 = 0;
		var _g = name.length;
		while(_g1 < _g) {
			var i = _g1++;
			v = v * 223 + name.charCodeAt(i) | 0;
		}
		v = 1 + (v & 1073741823) % 65423;
		return v;
	}
	static initClassIDS() {
		var cl = Serializer.CLASSES;
		var _g = [];
		var _g1 = 0;
		while(_g1 < cl.length) {
			var c = cl[_g1];
			++_g1;
			_g.push([]);
		}
		var subClasses = _g;
		var isSub = [];
		var _g2 = 0;
		var _g11 = cl.length;
		while(_g2 < _g11) {
			var i = _g2++;
			var c1 = cl[i];
			while(true) {
				c1 = (Type().default).getSuperClass(c1);
				if(c1 == null) {
					break;
				}
				var idx = cl.indexOf(c1);
				if(idx < 0) {
					break;
				}
				subClasses[idx].push(i);
				isSub[i] = true;
			}
		}
		var _g12 = [];
		var _g3 = 0;
		var _g21 = Serializer.CLASSES.length;
		while(_g3 < _g21) {
			var i1 = _g3++;
			var tmp;
			if(subClasses[i1].length == 0 && !isSub[i1]) {
				tmp = 0;
			} else {
				var name = (Type().default).getClassName(cl[i1]);
				var v = 1;
				var _g13 = 0;
				var _g4 = name.length;
				while(_g13 < _g4) {
					var i2 = _g13++;
					v = v * 223 + name.charCodeAt(i2) | 0;
				}
				v = 1 + (v & 1073741823) % 65423;
				tmp = v;
			}
			_g12.push(tmp);
		}
		Serializer.CLIDS = _g12;
		Serializer.CL_BYID = [];
		var _g31 = 0;
		var _g22 = Serializer.CLIDS.length;
		while(_g31 < _g22) {
			var i3 = _g31++;
			var cid = Serializer.CLIDS[i3];
			if(cid == 0) {
				continue;
			}
			if(Serializer.CL_BYID[cid] != null) {
				throw new (js__$Boot_HaxeError().default)("Conflicting CLID between " + (Type().default).getClassName(Serializer.CL_BYID[cid]) + " and " + (Type().default).getClassName(cl[i3]));
			}
			Serializer.CL_BYID[cid] = cl[i3];
		}
	}
	static isClassFinal(index) {
		return Serializer.CLIDS[index] == 0;
	}
}


// Meta

Serializer.__name__ = ["hxbit","Serializer"];
Serializer.prototype.__class__ = Serializer.prototype.constructor = $hxClasses["hxbit.Serializer"] = Serializer;

// Init



// Statics

var UID = 0;
var SEQ = 0;
var SEQ_BITS = 8;
var SEQ_MASK = 16777215;
var CLASSES = [];
var CL_BYID = null;
var CLIDS = null;

// Export

exports.default = Serializer;