# Crystal Pixels Online Editor

This is an online viewer and editor for Crystal Pixels definitions. It supports loading the game assets, creating your own and also exporting the shapes you create into Wavefront OBJ files to download.

You can play with it on the [project page](https://slaimon.github.io/cryxtels-editor).

## What is Crystal Pixels?

Crystal Pixels, or Cryxtels for short, is a game created by Alessandro Ghignola around 1994. You can check out a modern port [here](https://github.com/Enet4/cryxtels).

The game takes place in a vast empty space in which little islands, called _Pixels_, float around and are decorated by random objects, called _Models_. You can define your own Pixels and Models using a simple language in the game configuration files.

## How does this tool work?

I still haven't found the time to write a proper documentation, unfortunately. The original documentation for the language can be found in the above cryxtels repo, in the file `pixels definition.txt`. You can understand the jist of it by taking a look at the examples provided in the **Load** menu.

The Pixels will have a spaceship on them by default, for scale; to disable this, change the "TYPE" command into a "MODEL" command (this is a workaround and I aim to add a cleaner solution soon).

### Language extensions

I made a couple extensions to the original language in order to make it easier to write definitions. To see these language extensions in action you can go into Load -> Model, then scroll to the bottom and click on "Table (using Language Extensions)".

* The `NAME` keyword specifies a name for your model; the original only allowed to assign them a number.

* The `define` keyword works like the `#define` preprocessor directive in C: it takes a keyword and a value, and replaces all instances of the specified keyword in the code with the given value. For example, this code creates a line 300 units (1 metre) long in the X direction:
    ```
    define length 300;

    MODEL 0;
    line, 0,0,0, length,0,0;
    endpixel;
    ```

    All code has an implicit command at the top: `define %d N`, where `N` is a number chosen randomly everytime you run the code. This is to emulate the way the game displays a different number on each pixel wherever a text primitive contains the string `%d`.

    Moreover, the following implicit substitutions take place:
    ```
    define xy 0;
    define xz 1;
    define yz 2;
    ```
    This way, you can specify the plane of orientation of a primitive using letters instead of numbers.

* Some keywords have aliases that I remember better. For example `torus` is an alias for `donut`. All aliased keywords are listed here:
    ```
    donut, torus
    asterisk, star
    dotted ellipse, dotellipse
    sphere, dotsphere
    ```
    Only the first keyword is accepted by the original game, while the second will be rejected if encountered. In the future, conversion to legacy syntax will be performed automatically when you click on Save -> Compile and copy.

* Integration with `math.js` allows commands to accept arithmetic expressions in place of numeric literals. See the above mentioned "Table" example to see this in practice.

## Known issues and Backlog

There are a lot of problems big and small that I'd like to fix if I had the time:
* An obvious issue with the tool is it doesn't display dot primitives, like `grid sphere`. This is an intrinsic limitation of using o3dv.
* Error messages are output to the browser console where they aren't visible if you don't have developer tools open.
* "Reset Camera" button doesn't do anything, it's just a placeholder.
* The camera is reset every time you reload the object by pressing "Draw".
* Pressing a button every time you edit the code shouldn't even be required, it should refresh automatically.
* When you download an OBJ file, the spaceship is saved as well. I want to add a setting to disable this.
* The Y axis is reversed in the game; that is, all pixels are built with features above the ground having a negative Y position value. I'd like to add an option to write your code with an upwards-pointing Y axis and _then_ have all values reversed during "compilation".

Furthermore, the interface is still crude. There are two major changes I'd like to apply:
* A new object viewer, reimplemented in THREE.js, to display not only dot primitives but also collision boxes and a skybox.
* Integration with a web editor like CodeMirror to display hints, line numbers, syntax highlighting and errors. My target would be to create a user experience similar to the [shader editor](https://editor.thebookofshaders.com/) by Patricio Gonzalez Vivo. 

## Aknowledgements

This tool uses [o3dv](https://github.com/kovacsv/Online3DViewer/) to display the shapes and [math.js](https://mathjs.org/) to evaluate mathematical expressions in the code. Both are great projects and were a breeze to work with.

Of course, all of this would never have been possible without [Alessandro Ghignola](https://80.style/#/hsp) creating Crystal Pixels and [Enet4](https://github.com/Enet4) making it accessible again on newer machines.