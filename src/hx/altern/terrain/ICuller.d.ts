


declare namespace altern.terrain {

interface ICuller {
cullingInFrustum(culling: number, boundMinX: number, boundMinY: number, boundMinZ: number, boundMaxX: number, boundMaxY: number, boundMaxZ: number): number;

}

}

export default ICuller;