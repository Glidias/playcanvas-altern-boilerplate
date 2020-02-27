// Enum: hxbit.RpcMode

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

// Imports

var $estr = require("./../estr_stub").default;
var $hxClasses = require("./../hxClasses_stub").default;

// Definition

var RpcMode = $hxClasses["hxbit.RpcMode"] = { __ename__: ["hxbit","RpcMode"], __constructs__: ["All","Clients","Server","Owner","Immediate"] }

RpcMode.Clients = ["Clients",1];
RpcMode.Clients.toString = $estr;
RpcMode.Clients.__enum__ = RpcMode;

RpcMode.Server = ["Server",2];
RpcMode.Server.toString = $estr;
RpcMode.Server.__enum__ = RpcMode;

RpcMode.Immediate = ["Immediate",4];
RpcMode.Immediate.toString = $estr;
RpcMode.Immediate.__enum__ = RpcMode;

RpcMode.All = ["All",0];
RpcMode.All.toString = $estr;
RpcMode.All.__enum__ = RpcMode;

RpcMode.Owner = ["Owner",3];
RpcMode.Owner.toString = $estr;
RpcMode.Owner.__enum__ = RpcMode;


exports.default = RpcMode;