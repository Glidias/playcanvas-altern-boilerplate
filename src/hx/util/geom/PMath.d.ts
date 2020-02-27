

declare namespace util.geom {

export class PMath {

	static isNaN(val:any):any;
	static INT8_MIN:any;
	static INT8_MAX:any;
	static UINT8_MAX:any;
	static INT16_MIN:any;
	static INT16_MAX:any;
	static UINT16_MAX:any;
	static INT32_MIN:any;
	static INT32_MAX:any;
	static UINT32_MAX:any;
	static NaN:any;
	static POSITIVE_INFINITY:any;
	static NEGATIVE_INFINITY:any;
	static FLOAT_MAX:any;
	static FLOAT_MIN:any;
	static DOUBLE_MIN:any;
	static DOUBLE_MAX:any;
	static RAD_DEG:any;
	static DEG_RAD:any;
	static LOG2E:any;
	static LN2:any;
	static PIHALF:any;
	static PI:any;
	static PI2:any;
	static EPS:any;
	static floatToInt(x:any):any;
	static intToFloat(x:any):any;
	static toRad(deg:any):any;
	static toDeg(rad:any):any;
	static min(x:any, y:any):any;
	static minF(x:any, y:any):any;
	static max(x:any, y:any):any;
	static maxF(x:any, y:any):any;
	static abs(x:any):any;
	static absI(x:any):any;
	static sgn(x:any):any;
	static clamp(x:any, min:any, max:any):any;
	static clampSym(x:any, i:any):any;
	static wrap(x:any, min:any, max:any):any;
	static fmin(x:any, y:any):any;
	static fmax(x:any, y:any):any;
	static fabs(x:any):any;
	static fsign(x:any):any;
	static fclamp(x:any, min:any, max:any):any;
	static fclampSym(x:any, i:any):any;
	static fwrap(x:any, min:any, max:any):any;
	static eqSgn(x:any, y:any):any;
	static isEven(x:any):any;
	static isPow2(x:any):any;
	static lerp(a:any, b:any, t:any):any;
	static lerp3(x:any, x1:any, x2:any, q00:any, q01:any):any;
	static biLerp(x:any, y:any, q11:any, q12:any, q21:any, q22:any, x1:any, x2:any, y1:any, y2:any):any;
	static triLerp(x:any, y:any, z:any, q000:any, q001:any, q010:any, q011:any, q100:any, q101:any, q110:any, q111:any, x1:any, x2:any, y1:any, y2:any, z1:any, z2:any):any;
	static slerp(a:any, b:any, t:any):any;
	static nextPow2(x:any):any;
	static exp(a:any, n:any):any;
	static roundTo(x:any, y:any):any;
	static round(x:any):any;
	static ceil(x:any):any;
	static floor(x:any):any;
	static invSqrt(x:any):any;
	static cmpAbs(x:any, y:any, eps:any):any;
	static cmpZero(x:any, eps:any):any;
	static snap(x:any, y:any):any;
	static inRange(x:any, min:any, max:any):any;
	static rand():any;
	static randRange(min:any, max:any):any;
	static randRangeSym(range:any):any;
	static frand():any;
	static frandRange(min:any, max:any):any;
	static frandRangeSym(range:any):any;
	static wrapToPi(x:any):any;


}

}

export default util.geom.PMath;