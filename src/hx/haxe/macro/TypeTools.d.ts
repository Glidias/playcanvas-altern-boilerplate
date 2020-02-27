import haxe_macro_ComplexType from "./../../haxe/macro/ComplexType";
import haxe_macro_TypeParam from "./../../haxe/macro/TypeParam";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import haxe_macro_Access from "./../../haxe/macro/Access";
import haxe_macro_FieldType from "./../../haxe/macro/FieldType";
import Lambda from "./../../Lambda";

declare namespace haxe.macro {

export class TypeTools {

	static nullable(complexType:any):any;
	static toField(cf:any):any;
	static toComplexType(type:any):any;
	static toTypePath(baseType:any, params:any):any;
	static findField(c:any, name:any, isStatic?:any):any;


}

}

export default haxe.macro.TypeTools;