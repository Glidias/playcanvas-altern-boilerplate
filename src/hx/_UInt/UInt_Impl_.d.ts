import Std from "./../Std";

declare namespace _UInt {

export class UInt_Impl_ {

	static add(a:any, b:any):any;
	static div(a:any, b:any):any;
	static mul(a:any, b:any):any;
	static sub(a:any, b:any):any;
	static gt(a:any, b:any):any;
	static gte(a:any, b:any):any;
	static lt(a:any, b:any):any;
	static lte(a:any, b:any):any;
	static and(a:any, b:any):any;
	static or(a:any, b:any):any;
	static xor(a:any, b:any):any;
	static shl(a:any, b:any):any;
	static shr(a:any, b:any):any;
	static ushr(a:any, b:any):any;
	static mod(a:any, b:any):any;
	static addWithFloat(a:any, b:any):any;
	static mulWithFloat(a:any, b:any):any;
	static divFloat(a:any, b:any):any;
	static floatDiv(a:any, b:any):any;
	static subFloat(a:any, b:any):any;
	static floatSub(a:any, b:any):any;
	static gtFloat(a:any, b:any):any;
	static equalsInt(a:any, b:any):any;
	static notEqualsInt(a:any, b:any):any;
	static equalsFloat(a:any, b:any):any;
	static notEqualsFloat(a:any, b:any):any;
	static gteFloat(a:any, b:any):any;
	static floatGt(a:any, b:any):any;
	static floatGte(a:any, b:any):any;
	static ltFloat(a:any, b:any):any;
	static lteFloat(a:any, b:any):any;
	static floatLt(a:any, b:any):any;
	static floatLte(a:any, b:any):any;
	static modFloat(a:any, b:any):any;
	static floatMod(a:any, b:any):any;
	static negBits(this:any):any;
	static prefixIncrement(this:any):any;
	static postfixIncrement(this:any):any;
	static prefixDecrement(this:any):any;
	static postfixDecrement(this:any):any;
	static toString(this:any, radix?:any):any;
	static toInt(this:any):any;
	static toFloat(this:any):any;


}

}

export default _UInt.UInt_Impl_;