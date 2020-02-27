import haxe_IMap from "./../../haxe/IMap";
import haxe_ds_BalancedTree from "./../../haxe/ds/BalancedTree";
import Reflect from "./../../Reflect";

declare namespace haxe.ds {

export class EnumValueMap extends haxe_ds_BalancedTree {

	constructor();
	compare(k1:any, k2:any):any;
	compareArgs(a1:any, a2:any):any;
	compareArg(v1:any, v2:any):any;


}

}

export default haxe.ds.EnumValueMap;