# Crystal Pixels Online Editor

![Screenshot of the tool interface](./icons/front.jpg)

This is an online viewer and editor for Crystal Pixels definitions. It supports loading the game assets, creating your own and also exporting the shapes you create into Wavefront OBJ files to download.

You can play with it on the [project page](https://slaimon.github.io/cryxtels-editor).

## What is Crystal Pixels?

Crystal Pixels, or Cryxtels for short, is a 3D flight simulation game for MS-DOS developed by Alessandro Ghignola in 1994. You can check out a modern port [here](https://github.com/Enet4/cryxtels).

The game takes place in a vast empty space in which little islands, called _Pixels_, float around and are decorated by random objects, called _Models_. You can define your own Pixels and Models using a simple language in the game configuration files.

## How does this tool work?

I still haven't found the time to write a proper documentation, unfortunately. The original documentation for the language can be found in the above cryxtels repo, in the file `pixels definition.txt`. You can understand the jist of it by taking a look at the examples provided in the **Load** menu.

The Pixels will have a spaceship on them by default, for scale; to hide it, delete the line that starts with "`dock`" (this is a workaround and I aim to add a cleaner solution soon).

### Language Extensions

I made a couple extensions to the original language in order to make it easier to write definitions. To see these language extensions in action you can go into **Load** -> **Model**, then scroll to the bottom and click on **Table (using Language Extensions)**.

* The `NAME` keyword specifies a name for your model; the original game only allows you to assign them a number.

* The `define` keyword works like the `#define` preprocessor directive in C: it takes a word and a value, and replaces all instances of the given word in the code with the given value. For example, this code creates a line 100 units long (3 metres) in the X direction:
    ```
    define length 100;

    MODEL 0;
    line, 0,0,0, length,0,0;
    endpixel;
    ```

    All code has an implicit command at the top: `define %d N`, where `N` is a number chosen randomly everytime you run the code. This is to emulate the way the game displays a different number on each Pixel wherever a text primitive contains the string `%d`.

    Moreover, the following implicit substitutions take place:
    ```
    define xy 0;
    define xz 1;
    define yz 2;
    ```
    This way you can specify the plane of orientation of a primitive using letters, instead of numbers.

* Some keywords have aliases that I remember better. For example `torus` is an alias for `donut`. All aliased keywords are listed here:
    | official         | alias        |
    |------------------|--------------|
    | `donut`          | `torus`      |
    | `asterisk`       | `star`       |
    | `sphere`         | `dotsphere`  |
    | `dotted ellipse` | `dotellipse` |
    
    In each row the keyword on the left is accepted by the original game, while the one on the right is only accepted by my tool and will be rejected if encountered in the game configuration files. In the future, conversion to legacy syntax will be performed automatically when you click on **Save** -> **Compile and copy**.

* Integration with `math.js` allows commands to accept arithmetic expressions in place of numeric literals. See the above mentioned "Table" example to see this in practice.

## Known issues and Backlog

There are a lot of problems big and small that I'd like to fix if I had the time:
* An obvious issue with the tool is it doesn't display dot primitives, like `sphere`. This is an intrinsic limitation of using o3dv.
* Error messages are output to the browser console where they aren't visible if you don't have developer tools open.
* The camera is reset every time you reload the object by pressing "Draw".
* Pressing a button every time you edit the code shouldn't even be required, it should refresh automatically.
* When you download an OBJ file, the spaceship is saved as well. I want to add a setting to disable this.
* The Y axis is reversed in the game; that is, all pixels are built with features above the ground having a negative Y position value. I'd like to add an option to write your code with an upwards-pointing Y axis and _then_ have all values reversed during "compilation".
* This has been a long time coming, I should definitely turn the parser into a class to make the code more readable and extensible.

Furthermore, the interface is still crude. There are two major changes I'd like to apply:
* A new object viewer, reimplemented in THREE.js, to display not only dot primitives but also collision boxes and a skybox.
* Integration with a web editor like CodeMirror to display hints, line numbers, syntax highlighting and errors. My target would be to create a user experience similar to the [shader editor](https://editor.thebookofshaders.com/) by Patricio Gonzalez Vivo.

Other features that I'd like to add in the future:
* The original language has support for level-of-detail control. It would be cool to emulate this in the viewer.
* Add a "compiler": this would translate the code to the subset of the language that is compatible with the original game, by performing all necessary substitutions and arithmetic calculations.
* Some game assets aren't written in the Pixel definition language, but rather are stored in the source code as arrays of floats. My tool already has support for interpreting this kind of data (it's implemented by a subclass of Shape called Link in `primitives.js`), but the language still lacks an extension to access this feature.

## Aknowledgements

This tool uses [o3dv](https://github.com/kovacsv/Online3DViewer/) to display the shapes and [math.js](https://mathjs.org/) to evaluate mathematical expressions in the code. Both are great projects and were a breeze to work with.

Of course, all of this would never have been possible without [Alessandro Ghignola](https://80.style/#/hsp) creating Crystal Pixels and [Enet4](https://github.com/Enet4) making it accessible again on newer machines.