export {Mesh}

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

const sw_version = "cryxtels2obj v0.3";
const validChars = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`";

const charWidth = 4;
const symbol = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3,  0, -2,  0,  1, -1,  1,  1,  2,  1,  1, -1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -1, -2, -1, -1,  1, -2,  1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -1, -2, -1,  2,  1, -2,  1,  2, -2,  1,  2,  1, -2, -1,  2, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 8,  1, -2, -1, -2, -1, -2, -2, -1, -2, -1, -2,  0, -2,  0,  1,  0,  1,  0,  1,  1,  1,  1,  0,  2,  0,  2, -2,  2,  0, -3,  0,  3,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 7, -2, -1, -1, -1, -1, -1, -1, -2, -1, -2, -2, -1, -1,  2,  1, -2,  1,  2,  2,  1,  2,  1,  2,  2,  2,  2,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 6,  2,  0,  0,  2,  0,  2, -1,  1, -1,  1,  1, -1,  1, -1,  0, -2,  0, -2, -1, -1, -1, -1,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 1,  0, -2, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4,  1, -3,  0, -2,  0, -2, -1,  0, -1,  0,  0,  2,  0,  2,  1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -1, -3,  0, -2,  0, -2,  1,  0,  1,  0,  0,  2,  0,  2, -1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -3,  0,  3,  0,  0, -3,  0,  3, -2, -2,  2,  2,  2, -2, -2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -1,  0,  1,  0,  0, -1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 1, -1,  1, -2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 1, -1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -1,  2,  0,  2,  0,  2,  0,  1,  0,  1, -1,  1, -1,  1, -1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 1,  1, -2, -1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 9, -1, -2,  1, -2,  1, -2,  2, -1,  2, -1,  2,  1,  2,  1,  1,  2,  1,  2, -1,  2, -1,  2, -2,  1, -2,  1, -2, -1, -2, -1, -1, -2,  0, -1,  0,  1,  0,  0,  0,  0 ],
    [ 2, -1, -1,  0, -2,  0, -2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 5, -2, -1, -1, -2, -1, -2,  0, -2,  0, -2,  1, -1,  1, -1, -2,  2, -2,  2,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 6, -2, -2,  0, -2,  0, -2,  1, -1,  1, -1, -1,  0, -1,  0,  1,  1,  1,  1,  0,  2,  0,  2, -2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3,  0,  2,  0, -2,  0, -2, -2,  1, -2,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 5,  1, -2, -2, -2, -2, -2, -2,  0, -2,  0,  1,  0,  1,  0,  1,  2,  1,  2, -2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 8,  1, -2, -1, -2, -1, -2, -2, -1, -2, -1, -2,  1, -2,  1, -1,  2, -1,  2,  0,  2,  0,  2,  1,  1,  1,  1,  0,  0,  0,  0, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -2, -2,  1, -2,  1, -2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 10,-1, -2,  1, -2,  1, -2,  2, -1,  2, -1,  1,  0,  1,  0,  2,  1,  2,  1,  1,  2,  1,  2, -1,  2, -1,  2, -2,  1, -2,  1, -1,  0, -1,  0, -2, -1, -2, -1, -1, -2 ],
    [ 8, -2, -1, -1, -2, -1, -2,  0, -2,  0, -2,  1, -1,  1, -1,  1,  1,  1,  1,  0,  2,  0,  2, -2,  2, -2, -1, -1,  0, -1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 6,  0,  0,  0, -1,  0, -1, -1,  0, -1,  0,  0,  0,  0,  2, -1,  2, -1,  2,  0,  1,  0,  1,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 6,  0,  0,  1,  0,  1,  0, -1,  2, -1,  2,  0,  0,  0, -2,  1, -2,  1, -2,  0, -1,  0, -1,  0, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -1,  0,  1, -1, -1,  0,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -1, -1,  1, -1, -1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -1, -1,  1,  0, -1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 7, -2, -2, -1, -3, -1, -3,  0, -3,  0, -3,  1, -2,  1, -2,  1, -1,  1, -1,  0, -1,  0, -1,  0,  0,  0,  1,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 10, 0,  1,  1,  0,  1,  0,  0, -1,  0, -1, -1,  0, -1,  0,  0,  1,  0,  1,  2,  0,  2,  0,  1, -2,  1, -2, -1, -2, -1, -2, -2,  0, -2,  0, -1,  2, -1,  2,  1,  2 ],
    [ 3, -2,  2,  0, -2,  0, -2,  2,  2, -1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 8, -2, -2,  0, -2,  0, -2,  1, -1,  1, -1,  0,  0,  0,  0,  1,  1,  1,  1,  0,  2,  0,  2, -2,  2, -2,  2, -2, -2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 5,  1, -2, -1, -2, -1, -2, -2, -1, -2, -1, -2,  1, -2,  1, -1,  2, -1,  2,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 6, -2, -2,  0, -2,  0, -2,  1, -1,  1, -1,  1,  1,  1,  1,  0,  2,  0,  2, -2,  2, -2,  2, -2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4,  1, -2, -2, -2, -2, -2, -2,  2, -2,  2,  1,  2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -2, -2,  1, -2, -2, -2, -2,  2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 7,  1, -2, -1, -2, -1, -2, -2, -1, -2, -1, -2,  1, -2,  1, -1,  2, -1,  2,  1,  2,  1,  2,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -2, -2, -2,  2,  1, -2,  1,  2, -2,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -1, -2,  1, -2,  0, -2,  0,  2, -1,  2,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 5, -2,  1, -1,  2, -1,  2,  0,  2,  0,  2,  1,  1,  1,  1,  1, -2,  0, -2,  2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -2, -2, -2,  2, -2,  0,  1, -2, -2,  0,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -2, -2, -1, -2, -1, -2, -1,  2, -2,  2,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -2,  2, -2, -2, -2, -2,  0,  0,  0,  0,  2, -2,  2, -2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -2,  2, -2, -2, -2, -2,  2,  2,  2,  2,  2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 8, -1, -2,  1, -2,  1, -2,  2, -1,  2, -1,  2,  1,  2,  1,  1,  2,  1,  2, -1,  2, -1,  2, -2,  1, -2,  1, -2, -1, -2, -1, -1, -2,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 5, -2, -2,  0, -2,  0, -2,  1, -1,  1, -1,  1,  0,  1,  0, -2,  0, -2,  2, -2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 10,-1, -2,  1, -2,  1, -2,  2, -1,  2, -1,  2,  1,  2,  1,  1,  2,  1,  2, -1,  2, -1,  2, -2,  1, -2,  1, -2, -1, -2, -1, -1, -2,  1,  1,  2,  2,  2,  2,  3,  2 ],
    [ 6, -2, -2,  0, -2,  0, -2,  1, -1,  1, -1,  1,  0,  1,  0, -2,  0, -2,  2, -2, -2, -1,  0,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 7,  1, -2, -1, -2, -1, -2, -2, -1, -2, -1, -2,  0, -2,  0,  1,  0,  1,  0,  1,  1,  1,  1,  0,  2,  0,  2, -2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -2, -2,  2, -2,  0, -2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -2, -2, -2,  1, -2,  1, -1,  2, -1,  2,  1,  2,  1,  2,  1, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -2, -2,  0,  2,  0,  2,  2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -2, -2, -1,  2, -1,  2,  1, -1, -1, -1,  1,  2,  1,  2,  2, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -2, -2,  2,  2,  2, -2, -2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -2, -2,  0,  0,  1, -2, -1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3, -2, -2,  2, -2,  2, -2, -2,  2, -2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3,  0, -2, -1, -2, -1, -2, -1,  2, -1,  2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 1, -1, -2,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 3,  0, -2,  1, -2,  1, -2,  1,  2,  1,  2,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 2, -1, -1,  0, -2,  0, -2,  1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 1, -2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 4, -1, -2,  1, -1,  1, -1,  0, -1,  0, -1, -1, -1, -1, -1, -1, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
]

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
                    if (!vertex) {
                        continue;
                    }
                    let index_new = vertices_new.findIndex(v => verticesAreEqual(v,vertex));
                    if (index_new === -1) {
                        vertices_new.push(vertex);
                        line[i] = vertices_new.length;
                    } else {
                        line[i] = index_new + 1;
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
        let d = [];
        let vlen = 0;
        for (let primitive of this.primitives) {
            d = d.concat(primitive.dots);
            v = v.concat(primitive.vertices);
            for (let line of primitive.lines) {
                l.push(line.map(x=>x+vlen));
            }
            vlen += primitive.vertices.length;
        }
        this.primitives = [{
            type: name,
            vertices: v,
            lines: l,
            dots: d
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

            let dlist = [];
            for (let d of primitive.dots) {
                let d_new = Array(3);
                for(let i=0; i<3; i++) {
                    d_new[i] = d[i] + vector[i];
                }
                dlist.push(d_new);
            }
            primitive.dots = dlist;
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
            lines:l,
            dots: []
        });
    }

    // alias PUNTO
    dot (c) {
        this.primitives.push({
            type: "dot",
            vertices: [],
            lines: [],
            dots: [c]
        });
    }

    // alias rel, LINEA
    line (start, end) {
        this.primitives.push({
            type: "line",
            vertices: [start, end],
            lines: [[1, 2]],
            dots: []
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
            lines: [l],
            dots: []
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
        
        let mesh = new Mesh();
        switch (plane) {
            case "xy": {
                c[0] -= (tiles*width) / 2;
                c[1] -= (tiles*height)/ 2;
                
                let c_0 = c[0];
                let p   = c[1] + tiles*height;
                for(let a=0; a<=tiles; a++) {
                    mesh.line([c[0], c[1], c[2]],
                              [c[0], p   , c[2]]);
                    c[0] += width;
                }
                c[0] = c_0;
                p    = c[0] + tiles*width;
                for(let a=0; a<=tiles; a++) {
                    mesh.line([c[0], c[1], c[2]],
                              [p   , c[1], c[2]]);
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
                    mesh.line([c[0], c[1], c[2]],
                              [c[0], c[1], p   ]);
                    c[0] += width;
                }
                c[0] = c_0;
                p    = c[0] + tiles*width;
                for (let a=0; a<=tiles; a++) {
                    mesh.line([c[0], c[1], c[2]], 
                              [p   , c[1], c[2]]);
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
                    mesh.line([c[0], c[1], c[2]],
                              [c[0], p   , c[2]]);
                    c[2] += width;
                }
                c[2] = c_2;
                p    = c[2] + tiles*width;
                for (let a=0; a<=tiles; a++) {
                    mesh.line([c[0], c[1], c[2]],
                              [c[0], c[1], p   ]);
                    c[1] += height;
                }
                break;
            }
            default: {
                throw new Error(`GRID ERROR: Invalid plane "${plane}"`);
            }
        }

        mesh.flatten("grid");
        this.merge(mesh);
    }

    // alias SPIRALE
    // the number n of vertices in the spiral is n = 1080/step - 1
    // the radius of the spiral is R = increment*n
    spiral (c, increment, plane, step) {
        if (step<=0) {
            throw new Error(`SPIRAL ERROR: Invalid argument step = ${step}`);
        }
        let a = step;
        let k0 = 0;
        let k1 = increment;
        let crx = step;
        let cry = 0;

        let mesh = new Mesh()
        switch (plane) {
            case "xy": {
                while (a<1080) {
                    // I had to introduce the k0 variable to fix a "bug" (?) in the original code
                    // where the segments weren't adjacent (or maybe they weren't intended to be?)
                    // to reinstate the old spirals, just replace k0 with k1 in the following formula
                    mesh.line([c[0]+k1*tcos(crx), c[1]+k1*tsin(crx), c[2]],
                              [c[0]+k0*tcos(cry), c[1]+k0*tsin(cry), c[2]]);
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
                    mesh.line([c[0]+k1*tcos(crx), c[1], c[2]+k1*tsin(crx)],
                              [c[0]+k0*tcos(cry), c[1], c[2]+k0*tsin(cry)]);
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
                    mesh.line([c[0], c[1]+k1*tcos(crx), c[2]+k1*tsin(crx)],
                              [c[0], c[1]+k0*tcos(cry), c[2]+k0*tsin(cry)]);
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

        mesh.flatten("spiral");
        this.merge(mesh);
    }

    // alias ELLISSE
    // Syntax: ELLIPSE, X, Y, Z, WIDTH, HEIGHT, PLANE, STEP;
    ellipse (c, width, height, plane, step) {
        if (step <= 0) {
            throw new Error(`ELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;
        
        let crx, cry, crz;
        let mesh = new Mesh();
        switch (plane) {
            case "xy": {
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
                break;
            }
            case "xz": {
                let ux = c[0] + width;
                let uz = c[2];
                for (let i=step; i<360; i+=step) {
                    crx = c[0] + width*tcos(i);
                    crz = c[2] + height*tsin(i);
                    mesh.line([ux, c[1], uz], [crx, c[1], crz]);
                    ux = crx;
                    uz = crz;
                }
                mesh.line([ux, c[1], uz], [c[0]+width, c[1], c[2]]);
                break;
            }
            case "yz": {
                let uy = c[1] + width;
                let uz = c[2];
                for (let i=step; i<360; i+=step) {
                    cry = c[1] + width*tcos(i);
                    crz = c[2] + height*tsin(i);
                    mesh.line([c[0], uy, uz], [c[0], cry, crz]);
                    uy = cry;
                    uz = crz;
                }
                mesh.line([c[0], uy, uz], [c[0], c[1]+width, c[2]]);
                break;
            }
            default: {
                throw new Error(`ELLIPSE ERROR: Invalid plane "${plane}"`);
            }
        }

        mesh.flatten("ellipse");
        this.merge(mesh);
    }

    // alias DISEGNO_ELLITTICO, DOTTED_ELLIPSE
    dotellipse (c, width, height, plane, step) {
        if (step <= 0) {
            throw new Error(`DOTELLIPSE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        let e = new Mesh(); 
        switch (plane) {
            case "xy": {
                for (let i=0; i<360; i+=step)
                    e.dot([width*tcos(i), height*tsin(i), 0]);
                break;
            }
            case "xz": {
                for (let i=0; i<360; i+=step)
                    e.dot([width*tcos(i), 0, height*tsin(i)]);
                break;
            }
            case "yz": {
                for (let i=0; i<360; i+=step)
                    e.dot([0, height*tsin(i), width*tcos(i)]);
                break;
            }
        }

        e.flatten("dotellipse");
        e.translate(c);
        this.merge(e);
    }

    // alias SFERA, SPHERE
    dotsphere (c, radius, ratio, step) {
        if (step <= 0) {
            throw new Error(`DOTSPHERE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        let dots = [];
        radius = -radius;
        let ox, oy, oz, z2;
        for (let a=0; a<360; a+=step) {
            for (let b=step; b<180; b+=step) {
                oz = radius * tcos(b) * ratio;
                z2 = radius * tsin(b);
                ox = z2 * tcos(a);
                oy = z2 * tsin(a);
                dots.push([ox+c[0], oz+c[1], c[2]-oy]);
            }
        }

        this.primitives.push({
            type:"dotsphere",
            vertices: [],
            lines: [],
            dots: dots
        });
    }

    // alias SFERA_RETICOLARE
    gridsphere (c, radius, ratio, step) {
        if (step <= 0) {
            throw new Error(`GRIDSPHERE ERROR: Invalid argument step = ${step}`);
        }
        if (step > 90)
            step = 90;

        let s = new Mesh();

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
    torus (c, radius, section, plane, step) {
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
    wave (c, scale, amplitude, plane, step) {
        if (step > 90)
            step = 90;
        let ux, uy, uz;
        let ox, oy, oz;

        let mesh = new Mesh();
        switch (plane) {
            case "xy": {
                ux = c[0] - scale*180 + step*scale;
                oy = c[1];
                ox = ux - step*scale;
                for (let i=step; i<=360; i+=step) {
                    uy = c[1] + tsin(i) * amplitude;
                    mesh.line([ux, uy, c[2]], [ox, oy, c[2]]);
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
                    mesh.line([ux, c[1], uz], [ox, c[1], oz]);
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
                    mesh.line([c[0], uy, uz], [c[0], oy, oz]);
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

        mesh.flatten("wave");
        this.merge(mesh);
    }

    // alias COLONNA
    // Syntax: COLUMN, X, Y, Z, BASE RADIUS, TIP RADIUS, HEIGHT, STEP;
    column (c, base_radius, top_radius, height, step) {
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

    text (str, c, scale_x, scale_y, alpha, beta)  {
        let m = new Mesh();
        let fx=0, fy=0, px=0, py=0;
        let sx=0, sy=0, sz=0;
        let lx=0, ly=0, lz=0;
        let f,  z2;

        let step_x = charWidth * scale_x * tcos(beta);
        let step_z = charWidth * scale_x * tsin(beta);

        scale_x *= 0.8;
        scale_y *= 0.8;

        str = prepareValidString(str);
        for (let char of str) {
            let t = validChars.indexOf(char);
            if (t === -1) {
                throw new Error(`TEXT ERROR: Invalid character encountered`);
            }
            px = 1000;
            f  = 1;
            
            for (let i=0; i<symbol[t][0]; i++) {
                fx = symbol[t][f+0] * scale_x;
                fy = symbol[t][f+1] * scale_y;
                if (fx===px && fy===py) {
                    sx = lx;
                    sy = ly;
                    sz = lz;
                }
                else {
                    z2 = fy * tsin(alpha);
                    sx = fx * tcos(beta)  + z2 * tsin(beta) + c[0];
                    sy = fy * tcos(alpha)                   + c[1];
                    sz = z2 * tcos(beta)  - fx * tsin(beta) + c[2];
                }
                px = symbol[t][f+2] * scale_x;
                py = symbol[t][f+3] * scale_y;
                z2 = py * tsin(alpha);
                lz = z2 * tcos(beta) - px * tsin(beta) + c[2];
                ly = py * tcos(alpha)                  + c[1];
                lx = px * tcos(beta) + z2 * tsin(beta) + c[0];

                m.line([sx, sy, sz], [lx, ly, lz]);
                f += 4;
            }

            c[0] += step_x;
            c[2] += step_z;
        }

        m.flatten(`text:"${str}"`);
        this.merge(m);
    }

    // generate the .obj file for the mesh
    print () {
        let obj = `# generated with ${sw_version} by Simone Bertolucci\n`;
        if (this.author !== undefined) {
            obj += `# this pixel was created by ${this.author}\n`;
        }
        obj += `# ${new Date().toISOString()}\n`
        obj += `o ${this.name}\n`;
        this.flatten(this.name);
        this.removeDuplicateVertices();
        let p = this.primitives[0];
        for (let v of p.vertices.concat(p.dots)) {
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


/* ------------ HELPER FUNCTIONS ------------ */

//  note i replace the underscore with a space. i don't know how, but the game always replaces underscores with spaces.
//  meanwhile if i use them here they get replaced with carets '^', and i don't know the reason for this either.
function prepareValidString(str) {
    // we replace all unsupported chars with whitespace, as in the original
    str = str.toUpperCase().replaceAll("_", " ");
    for (let char of str) {
        if (validChars.indexOf(char) === -1) {
            console.log(`Warning: unsupported character '${char}', skipping`);
            str = str.replaceAll(char, " ");
        }
    }
    return str;
}

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