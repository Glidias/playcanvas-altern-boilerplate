// Class: haxe.macro.Printer

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./../../hxClasses_stub").default;
var $import = require("./../../import_stub").default;
var $bind = require("./../../bind_stub").default;
function StringTools() {return require("./../../StringTools");}
function js__$Boot_HaxeError() {return require("./../../js/_Boot/HaxeError");}

// Constructor

class Printer {
	constructor(tabString) {
		if(tabString == null) {
			tabString = "\t";
		}
		this.tabs = "";
		this.tabString = tabString;
	}
	printUnop(op) {
		switch(op[1]) {
		case 0:
			return "++";
		case 1:
			return "--";
		case 2:
			return "!";
		case 3:
			return "-";
		case 4:
			return "~";
		}
	}
	printBinop(op) {
		switch(op[1]) {
		case 0:
			return "+";
		case 1:
			return "*";
		case 2:
			return "/";
		case 3:
			return "-";
		case 4:
			return "=";
		case 5:
			return "==";
		case 6:
			return "!=";
		case 7:
			return ">";
		case 8:
			return ">=";
		case 9:
			return "<";
		case 10:
			return "<=";
		case 11:
			return "&";
		case 12:
			return "|";
		case 13:
			return "^";
		case 14:
			return "&&";
		case 15:
			return "||";
		case 16:
			return "<<";
		case 17:
			return ">>";
		case 18:
			return ">>>";
		case 19:
			return "%";
		case 20:
			var op1 = op[2];
			return this.printBinop(op1) + "=";
		case 21:
			return "...";
		case 22:
			return "=>";
		}
	}
	escapeString(s,delim) {
		return delim + (StringTools().default).replace((StringTools().default).replace((StringTools().default).replace((StringTools().default).replace(s,"\n","\\n"),"\t","\\t"),"'","\\'"),"\"","\\\"") + delim;
	}
	printFormatString(s) {
		return this.escapeString(s,"'");
	}
	printString(s) {
		return this.escapeString(s,"\"");
	}
	printConstant(c) {
		switch(c[1]) {
		case 0:
			var s = c[2];
			return s;
		case 1:
			var s1 = c[2];
			return s1;
		case 2:
			var s2 = c[2];
			return this.printString(s2);
		case 3:
			var s3 = c[2];
			return s3;
		case 4:
			var opt = c[3];
			var s4 = c[2];
			return "~/" + s4 + "/" + opt;
		}
	}
	printTypeParam(param) {
		switch(param[1]) {
		case 0:
			var ct = param[2];
			return this.printComplexType(ct);
		case 1:
			var e = param[2];
			return this.printExpr(e);
		}
	}
	printTypePath(tp) {
		return (tp.pack.length > 0 ? tp.pack.join(".") + "." : "") + tp.name + (tp.sub != null ? "." + tp.sub : "") + (tp.params == null ? "" : tp.params.length > 0 ? "<" + tp.params.map($bind(this,this.printTypeParam)).join(", ") + ">" : "");
	}
	printComplexType(ct) {
		var _gthis = this;
		switch(ct[1]) {
		case 0:
			var tp = ct[2];
			return this.printTypePath(tp);
		case 1:
			var ret = ct[3];
			var args = ct[2];
			var printArg = function(ct1) {
				if(ct1[1] == 1) {
					return "(" + _gthis.printComplexType(ct1) + ")";
				} else {
					return _gthis.printComplexType(ct1);
				}
			};
			return (args.length > 0 ? args.map(printArg).join(" -> ") : "Void") + " -> " + this.printComplexType(ret);
		case 2:
			var fields = ct[2];
			var _g = [];
			var _g1 = 0;
			while(_g1 < fields.length) {
				var f = fields[_g1];
				++_g1;
				_g.push(this.printField(f) + "; ");
			}
			return "{ " + _g.join("") + "}";
		case 3:
			var ct2 = ct[2];
			return "(" + this.printComplexType(ct2) + ")";
		case 4:
			var fields1 = ct[3];
			var tpl = ct[2];
			return "{> " + tpl.map($bind(this,this.printTypePath)).join(" >, ") + ", " + fields1.map($bind(this,this.printField)).join(", ") + " }";
		case 5:
			var ct3 = ct[2];
			return "?" + this.printComplexType(ct3);
		}
	}
	printMetadata(meta) {
		return "@" + meta.name + (meta.params != null && meta.params.length > 0 ? "(" + this.printExprs(meta.params,", ") + ")" : "");
	}
	printAccess(access) {
		switch(access[1]) {
		case 0:
			return "public";
		case 1:
			return "private";
		case 2:
			return "static";
		case 3:
			return "override";
		case 4:
			return "dynamic";
		case 5:
			return "inline";
		case 6:
			return "macro";
		}
	}
	printField(field) {
		var tmp = (field.doc != null && field.doc != "" ? "/**\n" + this.tabs + this.tabString + (StringTools().default).replace(field.doc,"\n","\n" + this.tabs + this.tabString) + "\n" + this.tabs + "**/\n" + this.tabs : "") + (field.meta != null && field.meta.length > 0 ? field.meta.map($bind(this,this.printMetadata)).join("\n" + this.tabs) + ("\n" + this.tabs) : "") + (field.access != null && field.access.length > 0 ? field.access.map($bind(this,this.printAccess)).join(" ") + " " : "");
		var _g = field.kind;
		var tmp1;
		switch(_g[1]) {
		case 0:
			var eo = _g[3];
			var t = _g[2];
			tmp1 = "var " + field.name + this.opt(t,$bind(this,this.printComplexType)," : ") + this.opt(eo,$bind(this,this.printExpr)," = ");
			break;
		case 1:
			var func = _g[2];
			tmp1 = "function " + field.name + this.printFunction(func);
			break;
		case 2:
			var eo1 = _g[5];
			var t1 = _g[4];
			var set = _g[3];
			var get = _g[2];
			tmp1 = "var " + field.name + "(" + get + ", " + set + ")" + this.opt(t1,$bind(this,this.printComplexType)," : ") + this.opt(eo1,$bind(this,this.printExpr)," = ");
			break;
		}
		return tmp + tmp1;
	}
	printTypeParamDecl(tpd) {
		return tpd.name + (tpd.params != null && tpd.params.length > 0 ? "<" + tpd.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + (tpd.constraints != null && tpd.constraints.length > 0 ? ":(" + tpd.constraints.map($bind(this,this.printComplexType)).join(", ") + ")" : "");
	}
	printFunctionArg(arg) {
		return (arg.opt ? "?" : "") + arg.name + this.opt(arg.type,$bind(this,this.printComplexType),":") + this.opt(arg.value,$bind(this,this.printExpr)," = ");
	}
	printFunction(func) {
		return (func.params == null ? "" : func.params.length > 0 ? "<" + func.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + "(" + func.args.map($bind(this,this.printFunctionArg)).join(", ") + ")" + this.opt(func.ret,$bind(this,this.printComplexType),":") + this.opt(func.expr,$bind(this,this.printExpr)," ");
	}
	printVar(v) {
		return v.name + this.opt(v.type,$bind(this,this.printComplexType),":") + this.opt(v.expr,$bind(this,this.printExpr)," = ");
	}
	printExpr(e) {
		var _gthis = this;
		if(e == null) {
			return "#NULL";
		} else {
			var _g = e.expr;
			switch(_g[1]) {
			case 0:
				var c = _g[2];
				return this.printConstant(c);
			case 1:
				var e2 = _g[3];
				var e1 = _g[2];
				return "" + this.printExpr(e1) + "[" + this.printExpr(e2) + "]";
			case 2:
				var e21 = _g[4];
				var e11 = _g[3];
				var op = _g[2];
				return "" + this.printExpr(e11) + " " + this.printBinop(op) + " " + this.printExpr(e21);
			case 3:
				var n = _g[3];
				var e12 = _g[2];
				return "" + this.printExpr(e12) + "." + n;
			case 4:
				var e13 = _g[2];
				return "(" + this.printExpr(e13) + ")";
			case 5:
				var fl = _g[2];
				return "{ " + fl.map(function(fld) {
					return "" + fld.field + " : " + _gthis.printExpr(fld.expr);
				}).join(", ") + " }";
			case 6:
				var el = _g[2];
				return "[" + this.printExprs(el,", ") + "]";
			case 7:
				var el1 = _g[3];
				var e14 = _g[2];
				return "" + this.printExpr(e14) + "(" + this.printExprs(el1,", ") + ")";
			case 8:
				var el2 = _g[3];
				var tp = _g[2];
				return "new " + this.printTypePath(tp) + "(" + this.printExprs(el2,", ") + ")";
			case 9:
				switch(_g[3]) {
				case false:
					var e15 = _g[4];
					var op1 = _g[2];
					return this.printUnop(op1) + this.printExpr(e15);
				case true:
					var e16 = _g[4];
					var op2 = _g[2];
					return this.printExpr(e16) + this.printUnop(op2);
				}
				break;
			case 10:
				var vl = _g[2];
				return "var " + vl.map($bind(this,this.printVar)).join(", ");
			case 11:
				var func = _g[3];
				var no = _g[2];
				if(no != null) {
					return "function " + no + this.printFunction(func);
				} else {
					var func1 = _g[3];
					return "function" + this.printFunction(func1);
				}
				break;
			case 12:
				if(_g[2].length == 0) {
					return "{ }";
				} else {
					var el3 = _g[2];
					var old = this.tabs;
					this.tabs += this.tabString;
					var s = "{\n" + this.tabs + this.printExprs(el3,";\n" + this.tabs);
					this.tabs = old;
					return s + (";\n" + this.tabs + "}");
				}
				break;
			case 13:
				var e22 = _g[3];
				var e17 = _g[2];
				return "for (" + this.printExpr(e17) + ") " + this.printExpr(e22);
			case 14:
				var e23 = _g[3];
				var e18 = _g[2];
				return "" + this.printExpr(e18) + " in " + this.printExpr(e23);
			case 15:
				if(_g[4] == null) {
					var econd = _g[2];
					var eif = _g[3];
					return "if (" + this.printExpr(econd) + ") " + this.printExpr(eif);
				} else {
					var econd1 = _g[2];
					var eif1 = _g[3];
					var eelse = _g[4];
					return "if (" + this.printExpr(econd1) + ") " + this.printExpr(eif1) + " else " + this.printExpr(eelse);
				}
				break;
			case 16:
				switch(_g[4]) {
				case false:
					var econd2 = _g[2];
					var e19 = _g[3];
					return "do " + this.printExpr(e19) + " while (" + this.printExpr(econd2) + ")";
				case true:
					var econd3 = _g[2];
					var e110 = _g[3];
					return "while (" + this.printExpr(econd3) + ") " + this.printExpr(e110);
				}
				break;
			case 17:
				var edef = _g[4];
				var cl = _g[3];
				var e111 = _g[2];
				var old1 = this.tabs;
				this.tabs += this.tabString;
				var s1 = "switch " + this.printExpr(e111) + " {\n" + this.tabs + cl.map(function(c1) {
					return "case " + _gthis.printExprs(c1.values,", ") + (c1.guard != null ? " if (" + _gthis.printExpr(c1.guard) + "):" : ":") + (c1.expr != null ? _gthis.opt(c1.expr,$bind(_gthis,_gthis.printExpr)) + ";" : "");
				}).join("\n" + this.tabs);
				if(edef != null) {
					s1 += "\n" + this.tabs + "default:" + (edef.expr == null ? "" : this.printExpr(edef) + ";");
				}
				this.tabs = old1;
				return s1 + ("\n" + this.tabs + "}");
			case 18:
				var cl1 = _g[3];
				var e112 = _g[2];
				return "try " + this.printExpr(e112) + cl1.map(function(c2) {
					return " catch(" + c2.name + ":" + _gthis.printComplexType(c2.type) + ") " + _gthis.printExpr(c2.expr);
				}).join("");
			case 19:
				var eo = _g[2];
				return "return" + this.opt(eo,$bind(this,this.printExpr)," ");
			case 20:
				return "break";
			case 21:
				return "continue";
			case 22:
				var e113 = _g[2];
				return "untyped " + this.printExpr(e113);
			case 23:
				var e114 = _g[2];
				return "throw " + this.printExpr(e114);
			case 24:
				var cto = _g[3];
				var e115 = _g[2];
				if(cto != null) {
					return "cast(" + this.printExpr(e115) + ", " + this.printComplexType(cto) + ")";
				} else {
					var e116 = _g[2];
					return "cast " + this.printExpr(e116);
				}
				break;
			case 25:
				var e117 = _g[2];
				return "#DISPLAY(" + this.printExpr(e117) + ")";
			case 26:
				var tp1 = _g[2];
				return "#DISPLAY(" + this.printTypePath(tp1) + ")";
			case 27:
				var eelse1 = _g[4];
				var eif2 = _g[3];
				var econd4 = _g[2];
				return "" + this.printExpr(econd4) + " ? " + this.printExpr(eif2) + " : " + this.printExpr(eelse1);
			case 28:
				var ct = _g[3];
				var e118 = _g[2];
				return "(" + this.printExpr(e118) + " : " + this.printComplexType(ct) + ")";
			case 29:
				var e119 = _g[3];
				var meta = _g[2];
				return this.printMetadata(meta) + " " + this.printExpr(e119);
			}
		}
	}
	printExprs(el,sep) {
		return el.map($bind(this,this.printExpr)).join(sep);
	}
	printExtension(tpl,fields) {
		return "{\n" + this.tabs + ">" + tpl.map($bind(this,this.printTypePath)).join(",\n" + this.tabs + ">") + "," + (fields.length > 0 ? "\n" + this.tabs + fields.map($bind(this,this.printField)).join(";\n" + this.tabs) + ";\n}" : "\n}");
	}
	printStructure(fields) {
		if(fields.length == 0) {
			return "{ }";
		} else {
			return "{\n" + this.tabs + fields.map($bind(this,this.printField)).join(";\n" + this.tabs) + ";\n}";
		}
	}
	printTypeDefinition(t,printPackage) {
		if(printPackage == null) {
			printPackage = true;
		}
		var old = this.tabs;
		this.tabs = this.tabString;
		var str;
		if(t == null) {
			str = "#NULL";
		} else {
			var str1 = (printPackage && t.pack.length > 0 && t.pack[0] != "" ? "package " + t.pack.join(".") + ";\n" : "") + (t.meta != null && t.meta.length > 0 ? t.meta.map($bind(this,this.printMetadata)).join(" ") + " " : "") + (t.isExtern ? "extern " : "");
			var _g = t.kind;
			var str2;
			switch(_g[1]) {
			case 0:
				var str3 = "enum " + t.name + (t.params != null && t.params.length > 0 ? "<" + t.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + " {\n";
				var _g1 = [];
				var _g11 = 0;
				var _g2 = t.fields;
				while(_g11 < _g2.length) {
					var field = _g2[_g11];
					++_g11;
					var str4 = this.tabs + (field.doc != null && field.doc != "" ? "/**\n" + this.tabs + this.tabString + (StringTools().default).replace(field.doc,"\n","\n" + this.tabs + this.tabString) + "\n" + this.tabs + "**/\n" + this.tabs : "") + (field.meta != null && field.meta.length > 0 ? field.meta.map($bind(this,this.printMetadata)).join(" ") + " " : "");
					var _g3 = field.kind;
					var str5;
					switch(_g3[1]) {
					case 0:
						var t1 = _g3[2];
						str5 = field.name + this.opt(t1,$bind(this,this.printComplexType),":");
						break;
					case 1:
						var func = _g3[2];
						str5 = field.name + this.printFunction(func);
						break;
					case 2:
						throw new (js__$Boot_HaxeError().default)("FProp is invalid for TDEnum.");
						break;
					}
					_g1.push(str4 + str5 + ";");
				}
				str2 = str3 + _g1.join("\n") + "\n}";
				break;
			case 1:
				var str6 = "typedef " + t.name + (t.params != null && t.params.length > 0 ? "<" + t.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + " = {\n";
				var _g4 = [];
				var _g12 = 0;
				var _g21 = t.fields;
				while(_g12 < _g21.length) {
					var f = _g21[_g12];
					++_g12;
					_g4.push(this.tabs + this.printField(f) + ";");
				}
				str2 = str6 + _g4.join("\n") + "\n}";
				break;
			case 2:
				var isInterface = _g[4];
				var interfaces = _g[3];
				var superClass = _g[2];
				var str7 = (isInterface ? "interface " : "class ") + t.name + (t.params != null && t.params.length > 0 ? "<" + t.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + (superClass != null ? " extends " + this.printTypePath(superClass) : "");
				var str8;
				if(interfaces != null) {
					var str9;
					if(isInterface) {
						var _g5 = [];
						var _g13 = 0;
						while(_g13 < interfaces.length) {
							var tp = interfaces[_g13];
							++_g13;
							_g5.push(" extends " + this.printTypePath(tp));
						}
						str9 = _g5;
					} else {
						var _g6 = [];
						var _g14 = 0;
						while(_g14 < interfaces.length) {
							var tp1 = interfaces[_g14];
							++_g14;
							_g6.push(" implements " + this.printTypePath(tp1));
						}
						str9 = _g6;
					}
					str8 = str9.join("");
				} else {
					str8 = "";
				}
				var str10 = str7 + str8 + " {\n";
				var _g7 = [];
				var _g15 = 0;
				var _g22 = t.fields;
				while(_g15 < _g22.length) {
					var f1 = _g22[_g15];
					++_g15;
					_g7.push(this.tabs + this.printFieldWithDelimiter(f1));
				}
				str2 = str10 + _g7.join("\n") + "\n}";
				break;
			case 3:
				var ct = _g[2];
				var str11 = "typedef " + t.name + (t.params != null && t.params.length > 0 ? "<" + t.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + " = ";
				var str12;
				switch(ct[1]) {
				case 2:
					var fields = ct[2];
					str12 = this.printStructure(fields);
					break;
				case 4:
					var fields1 = ct[3];
					var tpl = ct[2];
					str12 = this.printExtension(tpl,fields1);
					break;
				default:
					str12 = this.printComplexType(ct);
				}
				str2 = str11 + str12 + ";";
				break;
			case 4:
				var to = _g[4];
				var from = _g[3];
				var tthis = _g[2];
				var str13 = "abstract " + t.name + (t.params != null && t.params.length > 0 ? "<" + t.params.map($bind(this,this.printTypeParamDecl)).join(", ") + ">" : "") + (tthis == null ? "" : "(" + this.printComplexType(tthis) + ")");
				var str14;
				if(from == null) {
					str14 = "";
				} else {
					var _g8 = [];
					var _g16 = 0;
					while(_g16 < from.length) {
						var f2 = from[_g16];
						++_g16;
						_g8.push(" from " + this.printComplexType(f2));
					}
					str14 = _g8.join("");
				}
				var str15 = str13 + str14;
				var str16;
				if(to == null) {
					str16 = "";
				} else {
					var _g9 = [];
					var _g17 = 0;
					while(_g17 < to.length) {
						var t2 = to[_g17];
						++_g17;
						_g9.push(" to " + this.printComplexType(t2));
					}
					str16 = _g9.join("");
				}
				var str17 = str15 + str16 + " {\n";
				var _g10 = [];
				var _g18 = 0;
				var _g23 = t.fields;
				while(_g18 < _g23.length) {
					var f3 = _g23[_g18];
					++_g18;
					_g10.push(this.tabs + this.printFieldWithDelimiter(f3));
				}
				str2 = str17 + _g10.join("\n") + "\n}";
				break;
			}
			str = str1 + str2;
		}
		this.tabs = old;
		return str;
	}
	printFieldWithDelimiter(f) {
		var tmp = this.printField(f);
		var _g = f.kind;
		var tmp1;
		switch(_g[1]) {
		case 1:
			if(_g[2].expr == null) {
				tmp1 = ";";
			} else if(_g[2].expr.expr[1] == 12) {
				tmp1 = "";
			} else {
				tmp1 = ";";
			}
			break;
		case 0:case 2:
			tmp1 = ";";
			break;
		}
		return tmp + tmp1;
	}
	opt(v,f,prefix) {
		if(prefix == null) {
			prefix = "";
		}
		if(v == null) {
			return "";
		} else {
			return prefix + f(v);
		}
	}
}


// Meta

Printer.__name__ = ["haxe","macro","Printer"];
Printer.prototype.__class__ = Printer.prototype.constructor = $hxClasses["haxe.macro.Printer"] = Printer;

// Init



// Statics



// Export

exports.default = Printer;