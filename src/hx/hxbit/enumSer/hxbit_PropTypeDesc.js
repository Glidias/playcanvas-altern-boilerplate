// Class: hxbit.enumSer.hxbit_PropTypeDesc

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
function haxe_io_Bytes() {return require("./../../haxe/io/Bytes");}
function hxbit_PropTypeDesc() {return require("./../../hxbit/PropTypeDesc");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}
function hxbit_Schema() {return require("./../../hxbit/Schema");}

// Constructor

class hxbit_PropTypeDesc {
	constructor(){}
	static doSerialize(ctx,v) {
		if(v == null) {
			ctx.out.b.push(0);
		} else {
			switch(v[1]) {
			case 0:
				ctx.out.b.push(1);
				break;
			case 1:
				ctx.out.b.push(2);
				break;
			case 2:
				ctx.out.b.push(3);
				break;
			case 3:
				ctx.out.b.push(4);
				break;
			case 4:
				ctx.out.b.push(5);
				break;
			case 5:
				var name = v[2];
				ctx.out.b.push(6);
				if(name == null) {
					ctx.out.b.push(0);
				} else {
					var b = (haxe_io_Bytes().default).ofString(name);
					var v1 = b.length + 1;
					if(v1 >= 0 && v1 < 128) {
						ctx.out.b.push(v1);
					} else {
						ctx.out.b.push(128);
						ctx.out.addInt32(v1);
					}
					var _this = ctx.out;
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
			case 6:
				var name1 = v[2];
				ctx.out.b.push(7);
				if(name1 == null) {
					ctx.out.b.push(0);
				} else {
					var b3 = (haxe_io_Bytes().default).ofString(name1);
					var v2 = b3.length + 1;
					if(v2 >= 0 && v2 < 128) {
						ctx.out.b.push(v2);
					} else {
						ctx.out.b.push(128);
						ctx.out.addInt32(v2);
					}
					var _this1 = ctx.out;
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
			case 7:
				var v3 = v[3];
				var k = v[2];
				ctx.out.b.push(8);
				hxbit_PropTypeDesc.doSerialize(ctx,k);
				hxbit_PropTypeDesc.doSerialize(ctx,v3);
				break;
			case 8:
				var k1 = v[2];
				ctx.out.b.push(9);
				hxbit_PropTypeDesc.doSerialize(ctx,k1);
				break;
			case 9:
				var fields = v[2];
				ctx.out.b.push(10);
				if(fields == null) {
					ctx.out.b.push(0);
				} else {
					var v4 = fields.length + 1;
					if(v4 >= 0 && v4 < 128) {
						ctx.out.b.push(v4);
					} else {
						ctx.out.b.push(128);
						ctx.out.addInt32(v4);
					}
					var _g3 = 0;
					while(_g3 < fields.length) {
						var v5 = fields[_g3];
						++_g3;
						var v6 = v5;
						if(v6 == null) {
							ctx.out.b.push(0);
						} else {
							var fbits = 0;
							if(v6.name != null) {
								fbits |= 1;
							}
							if(v6.type != null) {
								fbits |= 2;
							}
							var v7 = fbits + 1;
							if(v7 >= 0 && v7 < 128) {
								ctx.out.b.push(v7);
							} else {
								ctx.out.b.push(128);
								ctx.out.addInt32(v7);
							}
							if((fbits & 1) != 0) {
								var s = v6.name;
								if(s == null) {
									ctx.out.b.push(0);
								} else {
									var b4 = (haxe_io_Bytes().default).ofString(s);
									var v8 = b4.length + 1;
									if(v8 >= 0 && v8 < 128) {
										ctx.out.b.push(v8);
									} else {
										ctx.out.b.push(128);
										ctx.out.addInt32(v8);
									}
									var _this2 = ctx.out;
									var b12 = _this2.b;
									var b22 = b4.b;
									var _g12 = 0;
									var _g4 = b4.length;
									while(_g12 < _g4) {
										var i2 = _g12++;
										_this2.b.push(b22[i2]);
									}
								}
							}
							ctx.out.b.push(v6.opt ? 1 : 0);
							if((fbits & 2) != 0) {
								hxbit_PropTypeDesc.doSerialize(ctx,v6.type);
							}
						}
					}
				}
				break;
			case 10:
				var k2 = v[2];
				ctx.out.b.push(11);
				hxbit_PropTypeDesc.doSerialize(ctx,k2);
				break;
			case 11:
				var k3 = v[2];
				ctx.out.b.push(12);
				hxbit_PropTypeDesc.doSerialize(ctx,k3);
				break;
			case 12:
				var t = v[2];
				ctx.out.b.push(13);
				hxbit_PropTypeDesc.doSerialize(ctx,t);
				break;
			case 13:
				ctx.out.b.push(14);
				break;
			case 14:
				ctx.out.b.push(15);
				break;
			case 15:
				ctx.out.b.push(16);
				break;
			case 16:
				var t1 = v[2];
				ctx.out.b.push(17);
				hxbit_PropTypeDesc.doSerialize(ctx,t1);
				break;
			case 17:
				ctx.out.b.push(18);
				break;
			}
		}
	}
	static doUnserialize(ctx) {
		var b = ctx.input.b[ctx.inPos++];
		if(b == 0) {
			return null;
		}
		switch(b) {
		case 1:
			return (hxbit_PropTypeDesc().default).PInt;
		case 2:
			return (hxbit_PropTypeDesc().default).PFloat;
		case 3:
			return (hxbit_PropTypeDesc().default).PBool;
		case 4:
			return (hxbit_PropTypeDesc().default).PString;
		case 5:
			return (hxbit_PropTypeDesc().default).PBytes;
		case 6:
			var _name;
			var v = ctx.input.b[ctx.inPos++];
			if(v == 128) {
				v = ctx.input.getInt32(ctx.inPos);
				ctx.inPos += 4;
			}
			var len = v;
			if(len == 0) {
				_name = null;
			} else {
				--len;
				var s = ctx.input.getString(ctx.inPos,len);
				ctx.inPos += len;
				_name = s;
			}
			return (hxbit_PropTypeDesc().default).PSerializable(_name);
		case 7:
			var _name1;
			var v1 = ctx.input.b[ctx.inPos++];
			if(v1 == 128) {
				v1 = ctx.input.getInt32(ctx.inPos);
				ctx.inPos += 4;
			}
			var len1 = v1;
			if(len1 == 0) {
				_name1 = null;
			} else {
				--len1;
				var s1 = ctx.input.getString(ctx.inPos,len1);
				ctx.inPos += len1;
				_name1 = s1;
			}
			return (hxbit_PropTypeDesc().default).PEnum(_name1);
		case 8:
			var _k;
			var __e = hxbit_PropTypeDesc.doUnserialize(ctx);
			_k = __e;
			var _v;
			var __e1 = hxbit_PropTypeDesc.doUnserialize(ctx);
			_v = __e1;
			return (hxbit_PropTypeDesc().default).PMap(_k,_v);
		case 9:
			var _k1;
			var __e2 = hxbit_PropTypeDesc.doUnserialize(ctx);
			_k1 = __e2;
			return (hxbit_PropTypeDesc().default).PArray(_k1);
		case 10:
			var _fields;
			var e0;
			var v2 = ctx.input.b[ctx.inPos++];
			if(v2 == 128) {
				v2 = ctx.input.getInt32(ctx.inPos);
				ctx.inPos += 4;
			}
			var len2 = v2;
			if(len2 == 0) {
				_fields = null;
			} else {
				--len2;
				var a = [];
				var _g1 = 0;
				var _g = len2;
				while(_g1 < _g) {
					var i = _g1++;
					var v3 = ctx.input.b[ctx.inPos++];
					if(v3 == 128) {
						v3 = ctx.input.getInt32(ctx.inPos);
						ctx.inPos += 4;
					}
					var fbits = v3;
					if(fbits == 0) {
						e0 = null;
					} else {
						--fbits;
						var type = null;
						var opt;
						var name = null;
						if((fbits & 1) != 0) {
							var v4 = ctx.input.b[ctx.inPos++];
							if(v4 == 128) {
								v4 = ctx.input.getInt32(ctx.inPos);
								ctx.inPos += 4;
							}
							var len3 = v4;
							if(len3 == 0) {
								name = null;
							} else {
								--len3;
								var s2 = ctx.input.getString(ctx.inPos,len3);
								ctx.inPos += len3;
								name = s2;
							}
						}
						opt = ctx.input.b[ctx.inPos++] != 0;
						if((fbits & 2) != 0) {
							var __e3 = hxbit_PropTypeDesc.doUnserialize(ctx);
							type = __e3;
						}
						e0 = { name : name, opt : opt, type : type};
					}
					a[i] = e0;
				}
				_fields = a;
			}
			return (hxbit_PropTypeDesc().default).PObj(_fields);
		case 11:
			var _k2;
			var __e4 = hxbit_PropTypeDesc.doUnserialize(ctx);
			_k2 = __e4;
			return (hxbit_PropTypeDesc().default).PAlias(_k2);
		case 12:
			var _k3;
			var __e5 = hxbit_PropTypeDesc.doUnserialize(ctx);
			_k3 = __e5;
			return (hxbit_PropTypeDesc().default).PVector(_k3);
		case 13:
			var _t;
			var __e6 = hxbit_PropTypeDesc.doUnserialize(ctx);
			_t = __e6;
			return (hxbit_PropTypeDesc().default).PNull(_t);
		case 14:
			return (hxbit_PropTypeDesc().default).PUnknown;
		case 15:
			return (hxbit_PropTypeDesc().default).PDynamic;
		case 16:
			return (hxbit_PropTypeDesc().default).PInt64;
		case 17:
			var _t1;
			var __e7 = hxbit_PropTypeDesc.doUnserialize(ctx);
			_t1 = __e7;
			return (hxbit_PropTypeDesc().default).PFlags(_t1);
		case 18:
			return (hxbit_PropTypeDesc().default).PStruct;
		default:
			throw new (js__$Boot_HaxeError().default)("Invalid enum index " + b);
		}
	}
	static getSchema() {
		var s = new (hxbit_Schema().default)();
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PInt");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PFloat");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PBool");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PString");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PBytes");
		var s1 = s.fieldsTypes;
		var _g = [];
		var _g1 = 0;
		var v;
		var _g2 = [(hxbit_PropTypeDesc().default).PString];
		while(_g1 < _g2.length) {
			var t = _g2[_g1];
			++_g1;
			_g.push({ name : "", type : t, opt : false});
		}
		s1.push((hxbit_PropTypeDesc().default).PObj(_g));
		s.fieldsNames.push("PSerializable");
		var s2 = s.fieldsTypes;
		var _g11 = [];
		var _g21 = 0;
		var v1;
		var _g3 = [(hxbit_PropTypeDesc().default).PString];
		while(_g21 < _g3.length) {
			var t1 = _g3[_g21];
			++_g21;
			_g11.push({ name : "", type : t1, opt : false});
		}
		s2.push((hxbit_PropTypeDesc().default).PObj(_g11));
		s.fieldsNames.push("PEnum");
		var s3 = s.fieldsTypes;
		var _g22 = [];
		var _g31 = 0;
		var v2;
		var v3;
		var _g4 = [(hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")];
		while(_g31 < _g4.length) {
			var t2 = _g4[_g31];
			++_g31;
			_g22.push({ name : "", type : t2, opt : false});
		}
		s3.push((hxbit_PropTypeDesc().default).PObj(_g22));
		s.fieldsNames.push("PMap");
		var s4 = s.fieldsTypes;
		var _g32 = [];
		var _g41 = 0;
		var v4;
		var _g5 = [(hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")];
		while(_g41 < _g5.length) {
			var t3 = _g5[_g41];
			++_g41;
			_g32.push({ name : "", type : t3, opt : false});
		}
		s4.push((hxbit_PropTypeDesc().default).PObj(_g32));
		s.fieldsNames.push("PArray");
		var s5 = s.fieldsTypes;
		var _g42 = [];
		var _g51 = 0;
		var v5;
		var _g6 = [(hxbit_PropTypeDesc().default).PArray((hxbit_PropTypeDesc().default).PObj([{ opt : false, type : (hxbit_PropTypeDesc().default).PString, name : "name"},{ opt : false, type : (hxbit_PropTypeDesc().default).PBool, name : "opt"},{ opt : false, type : (hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc"), name : "type"}]))];
		while(_g51 < _g6.length) {
			var t4 = _g6[_g51];
			++_g51;
			_g42.push({ name : "", type : t4, opt : false});
		}
		s5.push((hxbit_PropTypeDesc().default).PObj(_g42));
		s.fieldsNames.push("PObj");
		var s6 = s.fieldsTypes;
		var _g52 = [];
		var _g61 = 0;
		var v6;
		var _g7 = [(hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")];
		while(_g61 < _g7.length) {
			var t5 = _g7[_g61];
			++_g61;
			_g52.push({ name : "", type : t5, opt : false});
		}
		s6.push((hxbit_PropTypeDesc().default).PObj(_g52));
		s.fieldsNames.push("PAlias");
		var s7 = s.fieldsTypes;
		var _g62 = [];
		var _g71 = 0;
		var v7;
		var _g8 = [(hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")];
		while(_g71 < _g8.length) {
			var t6 = _g8[_g71];
			++_g71;
			_g62.push({ name : "", type : t6, opt : false});
		}
		s7.push((hxbit_PropTypeDesc().default).PObj(_g62));
		s.fieldsNames.push("PVector");
		var s8 = s.fieldsTypes;
		var _g72 = [];
		var _g81 = 0;
		var v8;
		var _g9 = [(hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")];
		while(_g81 < _g9.length) {
			var t7 = _g9[_g81];
			++_g81;
			_g72.push({ name : "", type : t7, opt : false});
		}
		s8.push((hxbit_PropTypeDesc().default).PObj(_g72));
		s.fieldsNames.push("PNull");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PUnknown");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PDynamic");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PInt64");
		var s9 = s.fieldsTypes;
		var _g82 = [];
		var _g91 = 0;
		var v9;
		var _g10 = [(hxbit_PropTypeDesc().default).PEnum("hxbit.PropTypeDesc")];
		while(_g91 < _g10.length) {
			var t8 = _g10[_g91];
			++_g91;
			_g82.push({ name : "", type : t8, opt : false});
		}
		s9.push((hxbit_PropTypeDesc().default).PObj(_g82));
		s.fieldsNames.push("PFlags");
		s.fieldsTypes.push(null);
		s.fieldsNames.push("PStruct");
		return s;
	}
}


// Meta

hxbit_PropTypeDesc.__name__ = ["hxbit","enumSer","hxbit_PropTypeDesc"];
hxbit_PropTypeDesc.prototype.__class__ = hxbit_PropTypeDesc.prototype.constructor = $hxClasses["hxbit.enumSer.hxbit_PropTypeDesc"] = hxbit_PropTypeDesc;

// Init



// Statics



// Export

exports.default = hxbit_PropTypeDesc;