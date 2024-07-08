import {tsin, tcos, vec3, vector_constants} from "./util.js"
import * as THREE from "three"
export {
    Shape,
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

class Shape {
    constructor (name="Shape") {
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
    Add (shape) {
        let relocationMap = new Map();

        for (const [i, vertex] of shape.vertices.entries()) {
            let index_new = this.vertices.findIndex(v => v.distanceTo(vertex) <= merge_threshold);
            if (index_new === -1) {
                this.vertices.push(vertex);
                relocationMap.set(i+1, this.vertices.length);
            } else {
                relocationMap.set(i+1, index_new + 1);
            }
        }

        this.lines = this.lines.concat(
            shape.lines.map(l =>
                l.map(x=>relocationMap.get(x)))
        );

        this.dots = this.dots.concat(shape.dots);
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

    // rotation type B (default)
    Orientation (plane) {
        switch (plane) {
            case "xy": break;
            case "xz": {
                this.Rotate(vector_constants.XAxis, Math.PI/2.0);
                break;
            }
            case "yz": {
                this.Rotate(vector_constants.XAxis, Math.PI/2.0);
                this.Rotate(vector_constants.ZAxis, Math.PI/2.0);
                break;
            }
            default: throw new Error(`${this.name} Error: invalid orientation plane "${plane}"`);
        }
    }
}

// "linking" a vertex list is an operation often performed by the render functions in cryxtels.
// some models are represented as arrays of vertices and what the renderer does is simply:
// take two vertices from the array, draw a line between them, repeat.
class Link extends Shape {
    constructor (vlist, name="Link") {
        super(name);

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

class Dot extends Shape {
    constructor (c) {
        super("Dot");
        this.dots = [vec3(c)];
    }
}

class Line extends Shape {
    constructor (start, end) {
        super("Line");
        this.vertices = [vec3(start), vec3(end)];
        this.lines = [[1, 2]];
    }
}

class Rectangle extends Shape {
    constructor (c, hx, hy, plane="xy") {
        super("Rectangle");

        let v = [];
        v.push([ hx,  hy, 0]);
        v.push([ hx, -hy, 0]);
        v.push([-hx, -hy, 0]);
        v.push([-hx,  hy, 0]);
        let l = [1, 2, 3, 4, 1];

        this.vertices = v.map(v=>vec3(v));
        this.lines = [l];
        this.Orientation(plane);
        this.Translate(vec3(c));
    }

    // override in order to maintain compatibility (rotation type A)
    Orientation (plane) {
        switch (plane) {
            case "xy": break;
            case "xz": {
                this.Rotate(vector_constants.XAxis, Math.PI/2.0);
                break;
            }
            case "yz": {
                this.Rotate(vector_constants.YAxis, Math.PI/2.0);
                break;
            }
            default: throw new Error(`${this.name} Error: invalid orientation plane "${plane}"`);
        }
    }
}

class Box extends Shape {
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

class Asterisk extends Shape {
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
class Grid extends Shape {
    constructor (c, width, height, tiles, plane) {
        super("Grid");

        tiles = Math.floor(tiles);
        if ( tiles < 0 )
            throw new Error(`GRID ERROR: invalid argument tiles = ${tiles}`);
        
        let r = [0, 0, 0];
        r[0] -= (tiles*width) / 2;
        r[1] -= (tiles*height)/ 2;
        
        let r_0 = r[0];
        let p   = r[1] + tiles*height;
        for(let a=0; a<=tiles; a++) {
            this.Add(new Line([r[0], r[1], r[2]],
                              [r[0], p   , r[2]]));
            r[0] += width;
        }
        r[0] = r_0;
        p    = r[0] + tiles*width;
        for(let a=0; a<=tiles; a++) {
            this.Add(new Line([r[0], r[1], r[2]],
                              [p   , r[1], r[2]]));
            r[1] += height;
        }

        this.Orientation(plane);
        this.Translate(vec3(c));
    }

    // override in order to maintain compatibility (rotation type A)
    Orientation (plane) {
        switch (plane) {
            case "xy": break;
            case "xz": {
                this.Rotate(vector_constants.XAxis, Math.PI/2.0);
                break;
            }
            case "yz": {
                this.Rotate(vector_constants.YAxis, Math.PI/2.0);
                break;
            }
            default: throw new Error(`${this.name} Error: invalid orientation plane "${plane}"`);
        }
    }
}

class Spiral extends Shape {
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

        while (a<1080) {
            // I had to introduce the k0 variable to fix a "bug" in the original code
            // where the segments weren't adjacent (or maybe they weren't intended to be?)
            // to reinstate the old spirals, just replace k0 with k1 in the following formula
            this.Add(new Line([k1*tcos(crx), k1*tsin(crx), 0],
                              [k0*tcos(cry), k0*tsin(cry), 0]));
            cry = crx;
            crx = (crx + step) % 360;
            k0 = k1;
            k1 += increment;
            a += step;
        }

        this.Orientation(plane);
        this.Translate(vec3(c));
    }
}

class Ellipse extends Shape {
    constructor (c, width, height, plane, step) {
        super("Ellipse");

        if (step <= 0) {
            throw new Error(`ELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        let crx, cry;
        let ux = width;
        let uy = 0;
        for (let i=step; i<360; i+=step) {
            crx = width*tcos(i);
            cry = height*tsin(i);
            this.Add(new Line([ux, uy, 0], [crx, cry, 0]));
            ux = crx;
            uy = cry;
        }
        this.Add(new Line([ux, uy, 0], [width, 0, 0]));

        this.Orientation(plane);
        this.Translate(vec3(c));
    }
}

class DotEllipse extends Shape {
    constructor (c, width, height, plane, step) {
        super("DotEllipse");

        if (step <= 0) {
            throw new Error(`DOTELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        for (let i=0; i<360; i+=step)
            this.Add(new Dot([width*tcos(i), height*tsin(i), 0]));

        this.Orientation(plane);
        this.Translate(vec3(c));
    }
}

class DotSphere extends Shape {
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

class GridSphere extends Shape {
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

class Torus extends Shape {
    // the original documentation omits the PLANE argument
    constructor (c, radius, section, plane, step) {
        super("Torus");

        if(step > 90)
            step = 90;
        
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

        this.Orientation(plane);
        this.Translate(vec3(c));
    }
}

class Wave extends Shape {
    constructor (c, scale, amplitude, plane, step) {
        super("Wave");

        if (step > 90)
            step = 90;

        let ux, uy;
        let ox, oy;
        ux = -scale*180 + step*scale;
        oy = 0;
        ox = ux - step*scale;
        for (let i=step; i<=360; i+=step) {
            uy = tsin(i) * amplitude;
            this.Add(new Line([ux, uy, 0], [ox, oy, 0]));
            oy = uy;
            ox = ux;
            ux += step*scale;
        }

        this.Orientation(plane);
        this.Translate(vec3(c));
    }
    
    // override in order to maintain compatibility (rotation type C)
    Orientation (plane) {
        switch (plane) {
            case "xy": break;
            case "xz": {
                this.Rotate(vector_constants.YAxis, Math.PI/2.0);
                this.Rotate(vector_constants.ZAxis, Math.PI/2.0);
                break;
            }
            case "yz": {
                this.Rotate(vector_constants.YAxis, -Math.PI/2.0);
                break;
            }
            default: throw new Error(`${this.name} Error: invalid orientation plane "${plane}"`);
        }
    }
}

class Column extends Shape {
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