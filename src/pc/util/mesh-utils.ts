import AABBUtils from "../../hx/util/geom/AABBUtils";
import BoundingBox from "../../hx/components/BoundBox";
import Transform3D from "../../hx/components/Transform3D";
import Geometry from "../../hx/util/geom/Geometry";

export function getAltTransform(mat:pc.Mat4, t?:Transform3D) {
    let lt = mat.data;
    t = t ? t : new Transform3D();
    t.a = lt[0]; t.b = lt[4]; t.c = lt[8];  t.d = lt[12];
    t.e = lt[1]; t.f = lt[5]; t.g = lt[9]; t.h = lt[13];
    t.i = lt[2]; t.j = lt[6]; t.k = lt[10];  t.l = lt[14];
    return t;
};

export function getAltGeometryFromModel(model: pc.Model, filteredIndexList?: number[], entryBounds?: BoundingBox, globalSpace:boolean =false) {
    var meshInstances = model.meshInstances;
    var i;
    var geom = new Geometry();
    var myVertices:number[] = [];
    var myIndices:number[] = [];
    var m;
    var t = new Transform3D();
    var tt = new Transform3D();
    var r;
    var len = filteredIndexList ? filteredIndexList.length : meshInstances.length;
    for (i=0; i< len; i++) {
        m = filteredIndexList ? meshInstances[filteredIndexList[i]] : meshInstances[i];
        getAltTransform(m.node.getLocalTransform(), t);
        r = m.node;
        while( (r=r.parent) && (globalSpace || !(r instanceof pc.Entity)) ) {
            t.append( getAltTransform(r.getLocalTransform(), tt) );
         }
        collectAltGeometryFromMesh(m.mesh, t, entryBounds, myVertices.length, myIndices.length, myVertices, myIndices );
    }
    geom.setVertices(myVertices);
    geom.setIndices(myIndices);
    return geom;
}

export function weldGeometry(geometry: Geometry) {
    var vertices = [];
    var len;
    var i;
    var count = 0;
    var hash: any = {};
    var index = 0;
    len = geometry.vertices.length;
    var key: string
    for (i=0; i<len; i+=3) {
        key = geometry.vertices[i] + "," + geometry.vertices[i+1] + "," + geometry.vertices[i+2];
        if (hash[key]===undefined) {
            hash[key]=count;
            vertices.push(geometry.vertices[i],  geometry.vertices[i+1],  geometry.vertices[i+2]);
            count++;
        }
        index++;
    }
    len = geometry.indices.length;
    for (i=0; i<len; i++) {
        index = geometry.indices[i];
        index*=3;
         key = geometry.vertices[index] + "," + geometry.vertices[index+1] + "," + geometry.vertices[index+2];  
         geometry.indices[i] = hash[key];
    }
    geometry.setVertices(vertices);
};

export function collectAltGeometryFromMesh(mesh:pc.Mesh, transform:Transform3D=null, boundBox:BoundingBox=null, vi:number, ii:number, myVertices:number[], myIndices:number[]) {
    var baseI = vi/3;

    var t= transform;

    var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
    var vb = mesh.vertexBuffer;

    var format = vb.getFormat();
    var stride = (format as any).size / 4; 
    var positions;
    for (let j = 0; j < (format as any).elements.length; j++) {
        var element = (format as any).elements[j]; 
        if (element.name === pc.SEMANTIC_POSITION) {
            positions = new Float32Array(vb.lock(), element.offset);
        }
    }

    var indices = new Uint16Array(ib.lock());
    var numTriangles = (mesh.primitive[0] as any).count / 3;

    var i1, i2, i3;
    var x; var y; var z;
    var px; var py; var pz;

    var base = (mesh.primitive[0] as any).base; 

   for (let j =0; j< positions.length; j+=stride) {
       px = positions[j];
       py = positions[j+1];
       pz = positions[j+2];
       if (t) {
          x = px; y=py; z=pz;
          px= t.a * x + t.b * y + t.c * z + t.d;
          py = t.e * x + t.f * y + t.g * z + t.h;
          pz= t.i * x + t.j * y + t.k * z + t.l;
       }
       if (boundBox) {
           AABBUtils.expand(px,py,pz,boundBox);
       }
       myVertices[vi++] = px;  myVertices[vi++] = py;  myVertices[vi++] = pz;
   }

    for (let j = 0; j < numTriangles; j++) {
        i1 = indices[base + j * 3];
        i2 = indices[base + j * 3 + 1];
        i3 = indices[base + j * 3 + 2];
        myIndices[ii++] = baseI + i1;  myIndices[ii++] = baseI + i2;  myIndices[ii++] = baseI + i3;
    }
}