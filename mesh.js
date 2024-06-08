export {Mesh}

const sw_version = "cryxtels2obj v0.3";

function tsin(x) {
    x = Math.floor(x);
    if (x<0 || x>=720) {
        console.log(`TSIN WARNING: non-legacy argument ${x}`);
    }
    return Math.sin(x*Math.PI/180);
}

function tcos(x) {
    x = Math.floor(x);
    if (x<0 || x>=720) {
        console.log(`TCOS WARNING: non-legacy argument ${x}`);
    }
    return Math.cos(x*Math.PI/180);
}

function orientNewPrimitive(builderXY, plane, primitiveName) {
    let p = new Mesh();
    switch(plane) {
        case "xz": case "zx":
        case "yz": case "zy":
        case "xy": case "yx": {
            builderXY(p);
            break;
        }
        default: {
            throw new Error(`${primitiveName.toUpperCase()} ERROR: Invalid plane \"${plane}\"`);
        }
    }
    if (plane === "xz" || plane === "zx") {
        p.reflect(2, 1);
    }
    else if (plane === "yz" || plane === "zy") {
        p.reflect(0,2);
        p.reflect(1,2);
    }
    p.flatten(primitiveName);
    return p;
}

function verticesAreEqual (a, b) {
    let equal = true;
    for (let i=0; i<3; i++) {
        if (a[i] !== b[i]) {
            equal = false;
            break;
        }
    }
    return equal;
}

class Mesh {
    constructor(name="mesh") {
        this.name = name;
        this.primitives = [];
    }

    setAuthor(name) {
        this.author = name;
    }

    setName(name) {
        this.name = name;
    }

    removeDuplicateVertices () {
        for (let primitive of this.primitives) {
            let vertices_new = [];
            for (let line of primitive.lines) {
                for (let i in line) {
                    let vertex = primitive.vertices[line[i]-1];
                    if (vertex !== undefined) {
                        let index_new = vertices_new.findIndex(v => verticesAreEqual(v,vertex));
                        if (index_new === -1) {
                            vertices_new.push(vertex);
                            line[i] = vertices_new.length;
                        } else {
                            line[i] = index_new + 1;
                        }
                    }
                }
            }
            primitive.vertices = vertices_new;
        }
    }

    // squash the current mesh into a new primitive with the given name
    flatten (name="combination") {
        let v = [];
        let l = [];
        let vlen = 0;
        for (let primitive of this.primitives) {
            v = v.concat(primitive.vertices);
            for (let line of primitive.lines) {
                l.push(line.map(x=>x+vlen));
            }
            vlen += primitive.vertices.length;
        }
        this.primitives = [{
            type: name,
            vertices: v,
            lines: l
        }];
    }

    // adds the given mesh to this one
    merge (mesh) {
        this.primitives = this.primitives.concat(mesh.primitives);
    }

    // translate the mesh by vector
    // TODO I feel like this can be simplified a lot...?
    translate (vector) {
        for (let primitive of this.primitives) {
            let vlist = [];
            for (let v of primitive.vertices) {
                let v_new = Array(3);
                for (let i=0; i<3; i++) {
                    v_new[i] = v[i] + vector[i];
                }
                vlist.push(v_new);
            }
            primitive.vertices = vlist;
        }
    }

    // swap the two coordinates, reflecting the mesh along the c1 = c2 plane
    reflect (c1, c2) {
        function dest(src) {
            if (src === c1) {
                return c2;
            }
            if (src === c2) {
                return c1;
            }
            else return src;
        }
        for (let primitive of this.primitives) {
            let vlist = [];
            for (let v of primitive.vertices) {
                let v_new = Array(3);
                for (let src=0; src<3; src++) {
                    v_new[dest(src)] = v[src];
                }
                vlist.push(v_new);
            }
            primitive.vertices = vlist;
        }
    }

    // "linking" a vertex list is an operation often performed by the render functions in cryxtels.
    // some models are represented as arrays of vertices and what the renderer does is simply:
    // take two vertices from the array, draw a line between them, repeat.
    link (vlist) {
        let v= [];
        for (let i=0; i<=vlist.length-3; i+=3) {
            v.push(vlist.slice(i,i+3));
        }
        let l= [];
        for (let i=1; i<=vlist.length/3; i+=2) {
            l.push([i,i+1]);
        }
        
        this.primitives.push({
            type:"link",
            vertices:v,
            lines:l
        });
    }

    // alias rel, LINEA
    line (start, end) {
        this.primitives.push({
            type: "line",
            vertices: [start, end],
            lines: [[1, 2]]
        });
    }

    rect (center, hx, hy, orientation="xy") {
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
                throw new Error(`RECT ERROR: Invalid orientation \"${orientation}\"`);
            }
        }
        let l = [1, 2, 3, 4, 1];
        
        this.primitives.push({
            type: "rect",
            vertices: v,
            lines: [l]
        });
    }

    // alias SCATOLA, SOLIDBOX
    box (c, hx, hy, hz) {
        let b = new Mesh();
        b.line ([c[0]-hx, c[1]-hy, c[2]+hz], [c[0]-hx, c[1]+hy, c[2]+hz]);
        b.line ([c[0]+hx, c[1]-hy, c[2]+hz], [c[0]+hx, c[1]+hy, c[2]+hz]);
        b.line ([c[0]+hx, c[1]-hy, c[2]-hz], [c[0]+hx, c[1]+hy, c[2]-hz]);
        b.line ([c[0]-hx, c[1]-hy, c[2]-hz], [c[0]-hx, c[1]+hy, c[2]-hz]);
        b.line ([c[0]-hx, c[1]-hy, c[2]+hz], [c[0]+hx, c[1]-hy, c[2]+hz]);
        b.line ([c[0]+hx, c[1]-hy, c[2]+hz], [c[0]+hx, c[1]-hy, c[2]-hz]);
        b.line ([c[0]+hx, c[1]-hy, c[2]-hz], [c[0]-hx, c[1]-hy, c[2]-hz]);
        b.line ([c[0]-hx, c[1]-hy, c[2]-hz], [c[0]-hx, c[1]-hy, c[2]+hz]);
        b.line ([c[0]-hx, c[1]+hy, c[2]+hz], [c[0]+hx, c[1]+hy, c[2]+hz]);
        b.line ([c[0]+hx, c[1]+hy, c[2]+hz], [c[0]+hx, c[1]+hy, c[2]-hz]);
        b.line ([c[0]+hx, c[1]+hy, c[2]-hz], [c[0]-hx, c[1]+hy, c[2]-hz]);
        b.line ([c[0]-hx, c[1]+hy, c[2]-hz], [c[0]-hx, c[1]+hy, c[2]+hz]);

        b.flatten("box");
        this.primitives = this.primitives.concat(b.primitives);
    }

    // alias ASTERISCO
    asterisk (c, radius, step) {
        let s = new Mesh();
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
                s.line([c[0]-x, c[1]-z, c[2]+y], [c[0]+x, c[1]+z, c[2]-y]);
            }
        }
        s.flatten("asterisk");
        this.merge(s);
    }

    // alias GRIGLIA
    // always generates a "square" grid, but the tiles themselves may not be squares
    grid (c, width, height, tiles, plane) {
        tiles = Math.floor(tiles);
        if ( tiles < 0 )
            throw new Error(`GRID ERROR: invalid argument tiles = ${tiles}`);
        
        function gridXY (mesh) {
            c[0] -= (tiles*width) / 2;
            c[1] -= (tiles*height)/ 2;
            
            let c_0 = c[0];
            let p = c[1] + tiles*height;
            for(let a=0; a<=tiles; a++) {
                mesh.line([c[0], c[1], c[2]],
                          [c[0], p   , c[2]]);
                c[0] += width;
            }
            c[0] = c_0;
            p = c[0] + tiles*width;
            for(let a=0; a<=tiles; a++) {
                mesh.line([c[0], c[1], c[2]],
                          [p   , c[1], c[2]]);
                c[1] += height;
            }
        }
        
        let g = orientNewPrimitive(gridXY, plane, "grid");
        this.merge(g);
    }

    // alias SPIRALE
    // the number n of vertices in the spiral is n = 1080/step - 1
    // the radius of the spiral is R = increment*n
    spiral (c, increment, plane, step) {

        function spiralXY (mesh) {
            let a = step;
            let k0 = 0;
            let k1 = increment;
            let crx = step;
            let cry = 0;
            while (a<1080) {
                // I had to introduce the k0 variable to fix a "bug" (?) in the original code
                // where the spirals weren't continuous (or maybe they weren't intended to be?)
                // to reinstate the old spirals, just replace k0 with k1 in the following formula
                mesh.line([c[0]+k1*tcos(crx), c[1]+k1*tsin(crx), c[2]],
                          [c[0]+k0*tcos(cry), c[1]+k0*tsin(cry), c[2]]);
                cry = crx;
                crx = (crx + step) % 360;
                k0 = k1;
                k1 += increment;
                a += step;
            }
        }

        let s = orientNewPrimitive(spiralXY, plane, "spiral");
        this.merge(s);
    }

    // alias ELLISSE
    // Syntax: ELLIPSE, X, Y, Z, WIDTH, HEIGHT, PLANE, STEP;
    ellipse (c, width, height, plane, step) {
        if (step <= 0) {
            throw new Error(`ELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        function ellipseXY(mesh) {
            let crx, cry;
            let ux = c[0] + width;
            let uy = c[1];
            for (let i=step; i<360; i+=step) {
                crx = c[0] + width*tcos(i);
                cry = c[1] + height*tsin(i);
                mesh.line([ux, uy, c[2]], [crx, cry, c[2]]);
                ux = crx;
                uy = cry;
            }
            mesh.line([ux, uy, c[2]], [c[0]+width, c[1], c[2]]);
        }

        let e = orientNewPrimitive(ellipseXY,plane,"ellipse");
        this.merge(e);
    }

    // alias SFERA_RETICOLARE
    gridsphere (c, radius, ratio, step) {
        if (step <= 0) {
            throw new Error(`GRIDSPHERE ERROR: Invalid argument step = ${step}`);
        }
        let s = new Mesh();
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
                s.line([crx, crz, cry], [first_x, first_z, first_y]);
                s.line([k1*tcos(a+step), crz, k1*tsin(a+step)], [first_x, first_z, first_y]);
                first_x = crx;
                first_y = cry;
                first_z = crz;
            }
        }

        s.translate(c);
        s.flatten("grid_sphere");
        this.merge(s);
    }

    // alias CIAMBELLA, DONUT
    // Syntax: DONUT, X, Y, Z, RADIUS, SECTION, PLANE, STEP;
    // the original documentation omits the PLANE argument
    torus(c, radius, section, plane, step) {
        if(step > 90)
            step = 90;

        function torusXY (mesh) {
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
                    mesh.line([crx, crz, uy],
                              [first_x, first_z, first_y]);
                    first_x = crx;
                    first_y =  uy;
                    first_z = crz;
                    mesh.line([crx, crz, uy],
                              [ux*tcos(a-step), -ux*tsin(a-step), uy]);
                }
                mesh.line([crx, crz, uy],
                          [cry, (radius-section)*tsin(a), 0]);
            }
        }

        let t = orientNewPrimitive(torusXY, plane, "torus");
        t.translate(c);
        t.flatten("torus");
        this.merge(t);
    }

    // alias ONDA
    wave(c, scale, amplitude, plane, step) {
        if (step > 90)
            step = 90;

        function waveXY (mesh) {
            let  x = c[0] - scale*180 + step*scale;
            let oy = c[1];
            let ox = x - step*scale;
            let y;
            for (let i=step; i<=360; i+=step) {
                y = c[1] + tsin(i) * amplitude;
                mesh.line([x, y, c[2]], [ox, oy, c[2]]);
                oy = y;
                ox = x;
                x += step*scale;
            }
        }

        let w = orientNewPrimitive(waveXY, plane, "wave");
        w.translate(c);
        w.flatten("wave");
        this.merge(w);
    }

    // alias COLONNA
    // Syntax: COLUMN, X, Y, Z, BASE RADIUS, TIP RADIUS, HEIGHT, STEP;
    column(c, base_radius, top_radius, height, step) {
        let m = new Mesh();

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

            m.line([ux, uy, uz], [crx, cry, crz]);
            if(top_radius)
                m.line([ux,uy,uz],[ox,uy,oz]);
            if(base_radius)
                m.line([first_x,cry,first_z],[crx,cry,crz]);
        }
        ox = ux;
        oz = uz;
        first_x = crx;
        first_z = crz;
        ux  = c[0] + tcos(0)*top_radius;
        uz  = c[2] + tsin(0)*top_radius;
        crx = c[0] + tcos(0)*base_radius;
        crz = c[2] + tsin(0)*base_radius;

        m.line([ux, uy, uz], [crx, cry, crz]);
        if (top_radius)
            m.line([ux,uy,uz], [ox,uy,oz]);
        if (base_radius)
            m.line([first_x,cry,first_z], [crx,cry,crz]);

        m.flatten("column");
        this.merge(m);
    }

    // generate the .obj file for the mesh
    print() {
        let obj = `# generated with ${sw_version} by Simone Bertolucci\n`;
        if (this.author !== undefined) {
            obj += `# this pixel was created by ${this.author}\n`;
        }
        obj += `# ${new Date().toISOString()}\n`
        obj += `o ${this.name}\n`;
        this.flatten(this.name);
        this.removeDuplicateVertices();
        let p = this.primitives[0];
        for (let v of p.vertices) {
            obj += `v ${v[0]} ${v[1]} ${v[2]}`;
            obj += "\n";
        }
        for (let line of p.lines) {
            obj += "l";
            for (let index of line) {
                obj += ` ${index}`;
            }
            obj += "\n";
        }
        
        return obj;
    }
}