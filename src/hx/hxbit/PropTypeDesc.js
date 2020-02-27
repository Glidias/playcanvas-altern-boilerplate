// Enum: hxbit.PropTypeDesc

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../estr_stub").default;
var $hxClasses = require("./../hxClasses_stub").default;

// Definition

var PropTypeDesc = $hxClasses["hxbit.PropTypeDesc"] = { __ename__: ["hxbit","PropTypeDesc"], __constructs__: ["PInt","PFloat","PBool","PString","PBytes","PSerializable","PEnum","PMap","PArray","PObj","PAlias","PVector","PNull","PUnknown","PDynamic","PInt64","PFlags","PStruct"] }

PropTypeDesc.PEnum = function(name) { var $x = ["PEnum",6,name]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PSerializable = function(name) { var $x = ["PSerializable",5,name]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PString = ["PString",3];
PropTypeDesc.PString.toString = $estr;
PropTypeDesc.PString.__enum__ = PropTypeDesc;

PropTypeDesc.PBool = ["PBool",2];
PropTypeDesc.PBool.toString = $estr;
PropTypeDesc.PBool.__enum__ = PropTypeDesc;

PropTypeDesc.PObj = function(fields) { var $x = ["PObj",9,fields]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PStruct = ["PStruct",17];
PropTypeDesc.PStruct.toString = $estr;
PropTypeDesc.PStruct.__enum__ = PropTypeDesc;

PropTypeDesc.PVector = function(k) { var $x = ["PVector",11,k]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PBytes = ["PBytes",4];
PropTypeDesc.PBytes.toString = $estr;
PropTypeDesc.PBytes.__enum__ = PropTypeDesc;

PropTypeDesc.PInt = ["PInt",0];
PropTypeDesc.PInt.toString = $estr;
PropTypeDesc.PInt.__enum__ = PropTypeDesc;

PropTypeDesc.PNull = function(t) { var $x = ["PNull",12,t]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PFloat = ["PFloat",1];
PropTypeDesc.PFloat.toString = $estr;
PropTypeDesc.PFloat.__enum__ = PropTypeDesc;

PropTypeDesc.PArray = function(k) { var $x = ["PArray",8,k]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PFlags = function(t) { var $x = ["PFlags",16,t]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PUnknown = ["PUnknown",13];
PropTypeDesc.PUnknown.toString = $estr;
PropTypeDesc.PUnknown.__enum__ = PropTypeDesc;

PropTypeDesc.PAlias = function(k) { var $x = ["PAlias",10,k]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PDynamic = ["PDynamic",14];
PropTypeDesc.PDynamic.toString = $estr;
PropTypeDesc.PDynamic.__enum__ = PropTypeDesc;

PropTypeDesc.PMap = function(k,v) { var $x = ["PMap",7,k,v]; $x.__enum__ = PropTypeDesc; $x.toString = $estr; return $x; }
PropTypeDesc.PInt64 = ["PInt64",15];
PropTypeDesc.PInt64.toString = $estr;
PropTypeDesc.PInt64.__enum__ = PropTypeDesc;


exports.default = PropTypeDesc;