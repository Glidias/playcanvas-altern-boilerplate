import StringTools from "./../../StringTools";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";

declare namespace haxe.macro {

export class Printer {

	constructor(tabString?:any);
	tabs:any;
	tabString:any;
	printUnop(op:any):any;
	printBinop(op:any):any;
	escapeString(s:any, delim:any):any;
	printFormatString(s:any):any;
	printString(s:any):any;
	printConstant(c:any):any;
	printTypeParam(param:any):any;
	printTypePath(tp:any):any;
	printComplexType(ct:any):any;
	printMetadata(meta:any):any;
	printAccess(access:any):any;
	printField(field:any):any;
	printTypeParamDecl(tpd:any):any;
	printFunctionArg(arg:any):any;
	printFunction(func:any):any;
	printVar(v:any):any;
	printExpr(e:any):any;
	printExprs(el:any, sep:any):any;
	printExtension(tpl:any, fields:any):any;
	printStructure(fields:any):any;
	printTypeDefinition(t:any, printPackage?:any):any;
	printFieldWithDelimiter(f:any):any;
	opt(v:any, f:any, prefix?:any):any;


}

}

export default haxe.macro.Printer;