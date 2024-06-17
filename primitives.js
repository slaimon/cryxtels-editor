import {tsin, tcos, vec3, vector_constants} from "./util.js"
import * as THREE from "three"
export {
    vector_constants,
    Primitive,
    Link,
    Dot,
    Line,
    Rectangle,
    Box,
    Asterisk,
    Grid,
    Spiral,
    Ellipse,
    DotEllipse,
    GridSphere,
    DotSphere,
    Torus,
    Wave,
    Column
}

// if two vertices have a distance less than this, they should be merged into one
const merge_threshold = 0.0;

class Primitive {
    constructor (name="") {
        this.name = name;
        this.vertices = [];
        this.lines = [];
        this.dots = [];
    }

    VertexCount () {
        return this.vertices.length;
    }
    LineCount () {
        return this.lines.length;
    }
    DotCount () {
        return this.dots.length;
    }

    // merge this primitive with another one without vertex duplication
    Add (primitive) {
        let relocationMap = new Map();

        for (const [i, vertex] of primitive.vertices.entries()) {
            let index_new = this.vertices.findIndex(v => v.distanceTo(vertex) <= merge_threshold);
            if (index_new === -1) {
                this.vertices.push(vertex);
                relocationMap.set(i+1, this.vertices.length);
            } else {
                relocationMap.set(i+1, index_new + 1);
            }
        }

        this.lines = this.lines.concat(
            primitive.lines.map(l =>
                l.map(x=>relocationMap.get(x)))
        );

        this.dots = this.dots.concat(primitive.dots);
    }

    Translate (vector) {
        this.vertices = this.vertices.map(v => v.add(vector));
        this.dots = this.dots.map(v => v.add(vector));
    }

    Reflect (normal) {
        this.vertices = this.vertices.map(
            v => v.reflect(normal)
        );
        this.dots = this.dots.map(
            v => v.reflect(normal)
        );
    }

    Rotate (axis, angle) {
        let quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(axis, angle);

        this.vertices = this.vertices.map(
            v => v.applyQuaternion(quaternion)
        );
        this.dots = this.dots.map(
            v => v.applyQuaternion(quaternion)
        );
    }
}

// "linking" a vertex list is an operation often performed by the render functions in cryxtels.
// some models are represented as arrays of vertices and what the renderer does is simply:
// take two vertices from the array, draw a line between them, repeat.
class Link extends Primitive {
    constructor (vlist) {
        super("Link");

        let v= [];
        for (let i=0; i<=vlist.length-3; i+=3) {
            v.push(vlist.slice(i,i+3));
        }
        let l= [];
        for (let i=1; i<=vlist.length/3; i+=2) {
            l.push([i,i+1]);
        }
        
        this.vertices = v.map(v=>vec3(v));
        this.lines = l;
    }
}

class Dot extends Primitive {
    constructor (c) {
        super("Dot");
        this.dots = [vec3(c)];
    }
}

class Line extends Primitive {
    constructor (start, end) {
        super("Line");
        this.vertices = [vec3(start), vec3(end)];
        this.lines = [[1, 2]];
    }
}

/*
    Many of the primitives have a lot of duplicated code and I'd love nothing more than to simplify them,
    but I'm not good enough at geometry and at decoding arcane pseudo-assembly C++ code :)

    I'm especially talking about the plane orientation of grids, spirals and ellipses.
    I tried to use reflections and translations but the result was disastrous lol, it would've gone better
    if I was able to iterate more quickly but right now I don't have a renderer and I need to copy-paste
    the .obj files from the console to an online 3d viewer and it's soooo sloooow

    So for now I'm copying the very verbose code from the original, where it gives the formulas explicitly
    on a case-by-case basis. I suppose a switch-case was faster than doing transformations.
*/

class Rectangle extends Primitive {
    constructor (center, hx, hy, orientation="xy") {
        super("Rectangle");

        let v = [];
        switch (orientation) {
            case "yx":
            case "xy": {
                v.push([center[0]+hx, center[1]+hy, center[2]]);
                v.push([center[0]+hx, center[1]-hy, center[2]]);
                v.push([center[0]-hx, center[1]-hy, center[2]]);
                v.push([center[0]-hx, center[1]+hy, center[2]]);
                break;
            }
            case "zx":
            case "xz": {
                v.push([center[0]+hx, center[1], center[2]+hy]);
                v.push([center[0]+hx, center[1], center[2]-hy]);
                v.push([center[0]-hx, center[1], center[2]-hy]);
                v.push([center[0]-hx, center[1], center[2]+hy]);
                break;
            }
            case "zy":
            case "yz": {
                v.push([center[0], center[1]+hx, center[2]+hy]);
                v.push([center[0], center[1]+hx, center[2]-hy]);
                v.push([center[0], center[1]-hx, center[2]-hy]);
                v.push([center[0], center[1]-hx, center[2]+hy]);
                break;
            }
            default: {
                throw new Error(`RECTANGLE ERROR: Invalid orientation \"${orientation}\"`);
            }
        }
        let l = [1, 2, 3, 4, 1];
        
        this.vertices = v.map(v=>vec3(v));
        this.lines = [l];
    }
}

class Box extends Primitive {
    constructor (c, hx, hy, hz) {
        super("Box");

        this.Add(new Line([c[0]-hx, c[1]-hy, c[2]+hz], [c[0]-hx, c[1]+hy, c[2]+hz]));
        this.Add(new Line([c[0]+hx, c[1]-hy, c[2]+hz], [c[0]+hx, c[1]+hy, c[2]+hz]));
        this.Add(new Line([c[0]+hx, c[1]-hy, c[2]-hz], [c[0]+hx, c[1]+hy, c[2]-hz]));
        this.Add(new Line([c[0]-hx, c[1]-hy, c[2]-hz], [c[0]-hx, c[1]+hy, c[2]-hz]));
        this.Add(new Line([c[0]-hx, c[1]-hy, c[2]+hz], [c[0]+hx, c[1]-hy, c[2]+hz]));
        this.Add(new Line([c[0]+hx, c[1]-hy, c[2]+hz], [c[0]+hx, c[1]-hy, c[2]-hz]));
        this.Add(new Line([c[0]+hx, c[1]-hy, c[2]-hz], [c[0]-hx, c[1]-hy, c[2]-hz]));
        this.Add(new Line([c[0]-hx, c[1]-hy, c[2]-hz], [c[0]-hx, c[1]-hy, c[2]+hz]));
        this.Add(new Line([c[0]-hx, c[1]+hy, c[2]+hz], [c[0]+hx, c[1]+hy, c[2]+hz]));
        this.Add(new Line([c[0]+hx, c[1]+hy, c[2]+hz], [c[0]+hx, c[1]+hy, c[2]-hz]));
        this.Add(new Line([c[0]+hx, c[1]+hy, c[2]-hz], [c[0]-hx, c[1]+hy, c[2]-hz]));
        this.Add(new Line([c[0]-hx, c[1]+hy, c[2]-hz], [c[0]-hx, c[1]+hy, c[2]+hz]));
    }
}

class Asterisk extends Primitive {
    constructor (c, radius, step) {
        super("Asterisk");

        radius = -radius;
        if (step > 90)
            step = 90;
        let x,y,z;
        let z2;
        for (let a=0; a<180; a+=step) {
            for (let b=step; b<180; b+=step) {
                z = radius * tcos(b);
                z2 = radius * tsin(b);
                x = z2 * tcos(a);
                y = z2 * tsin(a);
                this.Add(new Line([c[0]-x, c[1]-z, c[2]+y], [c[0]+x, c[1]+z, c[2]-y]));
            }
        }
    }
}

// always generates a "square" grid, but the tiles themselves may not be squares
class Grid extends Primitive {
    constructor (c, width, height, tiles, plane) {
        super("Grid");

        tiles = Math.floor(tiles);
        if ( tiles < 0 )
            throw new Error(`GRID ERROR: invalid argument tiles = ${tiles}`);
        
        switch (plane) {
            case "xy": {
                c[0] -= (tiles*width) / 2;
                c[1] -= (tiles*height)/ 2;
                
                let c_0 = c[0];
                let p   = c[1] + tiles*height;
                for(let a=0; a<=tiles; a++) {
                    this.Add(new Line([c[0], c[1], c[2]],
                                      [c[0], p   , c[2]]));
                    c[0] += width;
                }
                c[0] = c_0;
                p    = c[0] + tiles*width;
                for(let a=0; a<=tiles; a++) {
                    this.Add(new Line([c[0], c[1], c[2]],
                                      [p   , c[1], c[2]]));
                    c[1] += height;
                }
                break;
            }
            case "xz": {
                c[0] -= (tiles*width) / 2;
                c[2] -= (tiles*height) / 2;
    
                let c_0 = c[0];
                let p   = c[2] + tiles*height;
                for (let a=0; a<=tiles; a++) {
                    this.Add(new Line([c[0], c[1], c[2]],
                                      [c[0], c[1], p   ]));
                    c[0] += width;
                }
                c[0] = c_0;
                p    = c[0] + tiles*width;
                for (let a=0; a<=tiles; a++) {
                    this.Add(new Line([c[0], c[1], c[2]], 
                                      [p   , c[1], c[2]]));
                    c[2] += height;
                }
                break;
            }
            case "yz": {
                c[2] -= (tiles*width) / 2;
                c[1] -= (tiles*height) / 2;

                let c_2 = c[2];
                let p   = c[1] + tiles*height;
                for (let a=0; a<=tiles; a++) {
                    this.Add(new Line([c[0], c[1], c[2]],
                                      [c[0], p   , c[2]]));
                    c[2] += width;
                }
                c[2] = c_2;
                p    = c[2] + tiles*width;
                for (let a=0; a<=tiles; a++) {
                    this.Add(new Line([c[0], c[1], c[2]],
                                      [c[0], c[1], p   ]));
                    c[1] += height;
                }
                break;
            }
            default: {
                throw new Error(`GRID ERROR: Invalid plane "${plane}"`);
            }
        }
    }
}

class Spiral extends Primitive {
    // the number n of vertices in the spiral is n = 1080/step - 1
    // the radius of the spiral is R = increment*n
    constructor (c, increment, plane, step) {
        super("Spiral");

        if (step<=0) {
            throw new Error(`SPIRAL ERROR: Invalid argument step = ${step}`);
        }
        let a = step;
        let k0 = 0;
        let k1 = increment;
        let crx = step;
        let cry = 0;

        switch (plane) {
            case "xy": {
                while (a<1080) {
                    // I had to introduce the k0 variable to fix a "bug" in the original code
                    // where the segments weren't adjacent (or maybe they weren't intended to be?)
                    // to reinstate the old spirals, just replace k0 with k1 in the following formula
                    this.Add(new Line([c[0]+k1*tcos(crx), c[1]+k1*tsin(crx), c[2]],
                                      [c[0]+k0*tcos(cry), c[1]+k0*tsin(cry), c[2]]));
                    cry = crx;
                    crx = (crx + step) % 360;
                    k0 = k1;
                    k1 += increment;
                    a += step;
                }
                break;
            }
            case "xz": {
                while (a<1080) {
                    this.Add(new Line([c[0]+k1*tcos(crx), c[1], c[2]+k1*tsin(crx)],
                                      [c[0]+k0*tcos(cry), c[1], c[2]+k0*tsin(cry)]));
                    cry = crx;
                    crx = (crx + step) % 360;
                    k0 = k1;
                    k1 += increment;
                    a += step;
                }
                break;
            }
            case "yz": {
                while (a<1080) {
                    this.Add(new Line([c[0], c[1]+k1*tcos(crx), c[2]+k1*tsin(crx)],
                                      [c[0], c[1]+k0*tcos(cry), c[2]+k0*tsin(cry)]));
                    cry = crx;
                    crx = (crx + step) % 360;
                    k0 = k1;
                    k1 += increment;
                    a += step;
                }
                break;
            }
            default: {
                throw new Error(`SPIRAL ERROR: Invalid plane "${plane}"`);
            }
        }
    }
}

class Ellipse extends Primitive {
    constructor (c, width, height, plane, step) {
        super("Ellipse");

        if (step <= 0) {
            throw new Error(`ELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;
        
        let crx, cry, crz;
        switch (plane) {
            case "xy": {
                let ux = c[0] + width;
                let uy = c[1];
                for (let i=step; i<360; i+=step) {
                    crx = c[0] + width*tcos(i);
                    cry = c[1] + height*tsin(i);
                    this.Add(new Line([ux, uy, c[2]], [crx, cry, c[2]]));
                    ux = crx;
                    uy = cry;
                }
                this.Add(new Line([ux, uy, c[2]], [c[0]+width, c[1], c[2]]));
                break;
            }
            case "xz": {
                let ux = c[0] + width;
                let uz = c[2];
                for (let i=step; i<360; i+=step) {
                    crx = c[0] + width*tcos(i);
                    crz = c[2] + height*tsin(i);
                    this.Add(new Line([ux, c[1], uz], [crx, c[1], crz]));
                    ux = crx;
                    uz = crz;
                }
                this.Add(new Line([ux, c[1], uz], [c[0]+width, c[1], c[2]]));
                break;
            }
            case "yz": {
                let uy = c[1] + width;
                let uz = c[2];
                for (let i=step; i<360; i+=step) {
                    cry = c[1] + width*tcos(i);
                    crz = c[2] + height*tsin(i);
                    this.Add(new Line([c[0], uy, uz], [c[0], cry, crz]));
                    uy = cry;
                    uz = crz;
                }
                this.Add(new Line([c[0], uy, uz], [c[0], c[1]+width, c[2]]));
                break;
            }
            default: {
                throw new Error(`ELLIPSE ERROR: Invalid plane "${plane}"`);
            }
        }
    }
}

class DotEllipse extends Primitive {
    constructor (c, width, height, plane, step) {
        super("DotEllipse");

        if (step <= 0) {
            throw new Error(`DOTELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        switch (plane) {
            case "xy": {
                for (let i=0; i<360; i+=step)
                    this.Add(new Dot([width*tcos(i), height*tsin(i), 0]));
                break;
            }
            case "xz": {
                for (let i=0; i<360; i+=step)
                    this.Add(new Dot([width*tcos(i), 0, height*tsin(i)]));
                break;
            }
            case "yz": {
                for (let i=0; i<360; i+=step)
                    this.Add(new Dot([0, height*tsin(i), width*tcos(i)]));
                break;
            }
        }

        this.Translate(vec3(c));
    }
}

class DotSphere extends Primitive {
    constructor (c, radius, ratio, step) {
        super("DotSphere");

        if (step <= 0) {
            throw new Error(`DOTSPHERE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        radius = -radius;
        let ox, oy, oz, z2;
        for (let a=0; a<360; a+=step) {
            for (let b=step; b<180; b+=step) {
                oz = radius * tcos(b) * ratio;
                z2 = radius * tsin(b);
                ox = z2 * tcos(a);
                oy = z2 * tsin(a);
                this.Add(new Dot([ox+c[0], oz+c[1], c[2]-oy]));
            }
        }
    }
}

class GridSphere extends Primitive {
    constructor (c, radius, ratio, step) {
        super("GridSphere");

        if (step <= 0) {
            throw new Error(`GRIDSPHERE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        radius = -radius;
        let first_x, first_y, first_z;
        let crx, cry, crz;
        let k1, z2;
        for (let a=0; a<360; a+=step) {
            first_z = radius * tcos(step) * ratio;
            z2 = radius * tsin(step);
            first_x = z2 * tcos(a);
            first_y = z2 * tsin(a);
            for (let b=2*step; b<180; b+=step) {
                crz = radius * tcos(b) * ratio;
                k1 = radius * tsin(b);
                crx = k1 * tcos(a);
                cry = k1 * tsin(a);
                this.Add(new Line([crx, crz, cry], [first_x, first_z, first_y]));
                this.Add(new Line([k1*tcos(a+step), crz, k1*tsin(a+step)], [first_x, first_z, first_y]));
                first_x = crx;
                first_y = cry;
                first_z = crz;
            }
        }

        this.Translate(vec3(c));
    }
}

class Torus extends Primitive {
    // the original documentation omits the PLANE argument
    // TODO I'm still unsure whether this actually works for all orientations and centers 
    constructor (c, radius, section, plane, step) {
        super("Torus");

        if(step > 90)
            step = 90;
        
        switch (plane) {
            case "yx": case "xy":
            case "xz": case "zx":
            case "zy": case "yz": {
                let first_x, first_y, first_z;
                let crx, cry, crz;
                let ux, uy;

                for (let a=step; a<360+step; a+=step) {
                    first_x = (section-radius)*tcos(a);
                    first_z = (radius-section)*tsin(a);
                    first_y = 0;
                    cry = first_x;
                    for (let i=step; i<360; i+=step*2) {
                        ux = tcos(i)*section - radius;
                        uy = tsin(i)*section;
                        crx =  ux*tcos(a);
                        crz = -ux*tsin(a);
                        this.Add(new Line([crx, crz, uy],
                                          [first_x, first_z, first_y]));
                        first_x = crx;
                        first_y =  uy;
                        first_z = crz;
                        this.Add(new Line([crx, crz, uy],
                                          [ux*tcos(a-step), -ux*tsin(a-step), uy]));
                    }
                    this.Add(new Line([crx, crz, uy],
                                      [cry, (radius-section)*tsin(a), 0]));
                }
                break;
            }
            default: {
                  throw new Error(`TORUS ERROR: Invalid plane "${plane}"`);  
            }
        }
        if (plane === "xz" || plane === "zx") {
            this.Rotate(vector_constants.XAxis, Math.PI/2.0);
        }
        else if (plane === "yz" || plane === "zy") {
            this.Rotate(vector_constants.YAxis, Math.PI/2.0);
        }
        this.Translate(vec3(c));
    }
}

class Wave extends Primitive {
    constructor (c, scale, amplitude, plane, step) {
        super("Wave");

        if (step > 90)
            step = 90;

        let ux, uy, uz;
        let ox, oy, oz;
        switch (plane) {
            case "xy": {
                ux = c[0] - scale*180 + step*scale;
                oy = c[1];
                ox = ux - step*scale;
                for (let i=step; i<=360; i+=step) {
                    uy = c[1] + tsin(i) * amplitude;
                    this.Add(new Line([ux, uy, c[2]], [ox, oy, c[2]]));
                    oy = uy;
                    ox = ux;
                    ux += step*scale;
                }
                break;
            }
            case "xz": {
                uz = c[2] - scale*180 + step*scale;
                ox = c[0];
                oz = uz - step*scale;
                for (let i=step; i<=360; i+=step) {
                    ux = tsin(i) * amplitude;
                    this.Add(new Line([ux, c[1], uz], [ox, c[1], oz]));
                    ox = ux;
                    oz = uz;
                    uz += step*scale;
                }
                break;
            }
            case "yz": {
                uz = c[2] - scale*180 + step*scale;
                oy = c[1];
                oz = uz - step*scale;
                for (let i=step; i<=360; i+=step) {
                    uy = c[1] + tsin(i) * amplitude;
                    this.Add(new Line([c[0], uy, uz], [c[0], oy, oz]));
                    oy = uy;
                    oz = uz;
                    uz += step*scale;
                }
                break;
            }
            default: {
                throw new Error(`WAVE ERROR: Invalid plane "${plane}"`);
            }
        }
    }
}

class Column extends Primitive {
    constructor (c, base_radius, top_radius, height, step) {
        super("Column");

        if (step <= 0) {
            throw new Error(`COLUMN ERROR: invalid argument step = ${step}`);
        }
        if (step > 90) {
            step = 90;
        }

        let  ux = c[0] + tcos(0)*top_radius;
        let  uz = c[2] + tsin(0)*top_radius;
        let  uy = c[1] - height / 2;
        let crx = c[0] + tcos(0)*base_radius;
        let crz = c[2] + tsin(0)*base_radius;
        let cry = c[1] + height / 2;
        let ox, oz;
        let first_x, first_z;
        for (let a=step; a<360; a+=step) {
            ox = ux;
            oz = uz;
            first_x = crx;
            first_z = crz;
            ux  = c[0] + tcos(a)*top_radius;
            uz  = c[2] + tsin(a)*top_radius;
            crx = c[0] + tcos(a)*base_radius;
            crz = c[2] + tsin(a)*base_radius;

            this.Add(new Line([ux, uy, uz], [crx, cry, crz]));
            if(top_radius)
                this.Add(new Line([ux,uy,uz],[ox,uy,oz]));
            if(base_radius)
                this.Add(new Line([first_x,cry,first_z],[crx,cry,crz]));
        }
        ox = ux;
        oz = uz;
        first_x = crx;
        first_z = crz;
        ux  = c[0] + tcos(0)*top_radius;
        uz  = c[2] + tsin(0)*top_radius;
        crx = c[0] + tcos(0)*base_radius;
        crz = c[2] + tsin(0)*base_radius;

        this.Add(new Line([ux, uy, uz], [crx, cry, crz]));
        if (top_radius)
            this.Add(new Line([ux,uy,uz], [ox,uy,oz]));
        if (base_radius)
            this.Add(new Line([first_x,cry,first_z], [crx,cry,crz]));
    }
}