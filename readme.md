
Boilerplate code setup to deliver a bundled compile of all my commonly used script components used in my Playcanvas 3D engine projects with either JS/Typescript and any other NPM libraries you might want to include in. Includes Haxe-compiled Javascript code modules with a certain degree of Typescript definitions that is used in some of these scripts, or left out in the module backburner for potential reuse. For portability indeed, to avoid trying to figure out what combination of code dependencies: scripts you'd need to upload to the project editor.

Basic Playcanvas `pc` features included are: Orbit camera controls, Basic Collision Scene Clipping (without requiring physics engine) and 1st/3rd person movement controls. Additionally, orbit camera transitions for zoom level, orthographic vs non-orthographic, etc. and Batching clones management.
	
Upcoming features to integrate are: Terrain/Environment LOD integrations, Navmesh, Pathfinding agents/crowd movement, Vehicle movement clipping, Vehicle pathfinding, etc.

More documentation on various usages would be included in the future.

Installation/build instructions as of below: (Or you can refer to the template repo at https://github.com/Glidias/playcanvas-typescript-babel-intellisense-template which includes other branches for minimal examples of integrating with Vue/React/etc.)
_______________________


# 1st Forker's Note (Tobias Wehrum)

Hey folks! This is a fork of [https://github.com/whydoidoit/babel-playcanvas-template](https://github.com/whydoidoit/babel-playcanvas-template) made by the amazing [whydoidoit](https://github.com/whydoidoit). Unfortunately it seems that over the last 2 years some things broke, and since it seems he is not maintaining the repository anymore I decided to spend a few minutes to make the minimal necessary changes.

Note that the tools used (e.g. Babel, Webpack etc.) are also out of date, but they *work* and I don't have enough time at the moment to update them. Feel free to send a pull request if you do!

Apart from this note and the chapters "Deprecated Methods", "Setting up Redirector (Chrome only)" and a small change in "HTTPS serving", this document is completely written by whydoidoit.

Also shoutout to [thisredone](https://github.com/thisredone/coffeescript-playcanvas-template) from whom I stole the Redirector instructions!

# 2nd Forker's Note (Glidias)

2020 Update: Typescript/Javascript support and update to latest dependencies. See https://github.com/Glidias/playcanvas-typescript-babel-intellisense-template branches for some example setups.

# Introduction

This is a template project for using ES6 via Babel and WebPack to build [PlayCanvas](https://playcanvas.com) projects.

PlayCanvas is a fantastic open source WebGL Engine and online Editor (which you can get access to for free or pay for
an organisational license).

PlayCanvas have developed a shared model that means you can edit your 3D scenes as a collaborative experience with
team mates around the office, or around the world - it's great.  They have applied the same to code editing, which
is fine for some use cases but imposes certain limitations:

* No offline access to source code
* You are stuck with their web editor - which is "ok" but no WebStorm, Sublime or VSCode
* No source control
* Someone else can change your file when you aren't looking and you'll never know who!
* No ES6 features, just pure Javascript
* No NPM ecosystem, meaning you are scrabbling for browserified versions of libraries
or more often doing something again or just not bothering

All of this means that it is hard to choose PlayCanvas for serious development projects without going "Engine Only"
and that loses you many of the advantages of having a fantastic online editor and layout tool.  So now why choose
PlayCanvas when Three.js would give you just as much if not more?

The answer has to be to produce code in a proper offline build environment with all the advantages of Babel, WebPack,
NPM et al and still be able to use the output in the PlayCanvas online Editor.  As no one had done this, and I needed
it for a number of projects I took on the task myself.  This has lead to a number of NPM repos and a WebPackPlugin that
automate most of the process.

## Why ES6

If you are asking why you should use ES6 and Babel then I'd say it's for one simple reason: a programming language
should try to get the hell out of your way and let you express what you want.

When we code Javascript for WebGL we are coding for the browser and nearly everything that touches the outside world
will be async.  Expressing async in traditional Javascript is messy as hell.  Try writing a for-next loop that loads
a list of things from the web in sequence using Promises or callbacks and it will become immediately obvious.  With
Babel and ES6 it's just a loop.  Everything else is a christmas tree.  Yes it's possible, but it's easy to have a
hard to spot bug, so you do LESS of it than you would otherwise and refactoring is a scary prospect.  That's not
right.  That's damaging your creativity to my mind.

```javascript

function requestFromUrl(url, info) { return new Promise(/* code */)}

async function getData() {
    let urls = ["https://blah1.org", "https://blah1.org/blah", "https://blah2.org/blah/blah"];
    let data = "";
    for(let i = 0; i < urls.length; i++) {
        data = await requestFromUrl(urls[i], data);
    }
    return data;
}

```

I know this is a contrived example, but this "kind of thing" happens all of the time in my developments, and they
are better for me being able to implement them easily. Write that as just promises or callbacks and it will be illegible
to most developers without a lot of study.

ES6/ES7 etc exist to create a better programming language for the web, I say let's use it.

### Not many browsers support ES6 let alone ES7

That's what Babel is for, if the browser doesn't support something, it provides that support for you.  Plus it compiles
your ES6 to ES5.

In addition this template project lets you specify which versions of browsers you are supporting and Babel only does what
it has to.  You could even simply build different versions for different browsers (or ages of browser etc) if you prefer!

## Why NPM

If you need some standard function, algorithm or procedure there's a good chance that there is tested code out there to install.
with one line of shell script.

## Why WebPack

WebPack is going to make building all of this and serving it to your browser an automated process.

# Getting Started

The shortest way to get started is really simple.

## Prerequisites

You must have a version of Node and NPM installed.

You can get that from [here](https://nodejs.org).

## Installing the template project

Download this repo, change to the directory and type:

```shell
npm install
```

## Writing your own code

Create a file in `src` or a sub directory and script what you like.  Just make sure that it is imported
by `main.js` (note that paths are relative to `src` and must start with a `./`).
When you start developing things that import each other, you just need
to make sure that something in `main.js` imports something that imports the code you
add!

If you find that something didn't show up, that's probably why.

## Building, debugging and testing your code

Firstly we need to make a configuration file - there's an example called `config.example.json`.

The config file is in the root of the project (the parent of `src`) and needs
to be called `config.json`.  This will eventually also control the automatic upload
of your code to PlayCanvas, but to start with, just copy the example to `config.json`.

You can build your code using either `webpack` or an automated process with `npm`.

So typing `npm run build` in the root folder of the project (the parent of `src`)
the template will build a production version of your code into the `build` folder.

**Either** build your code with NPM
```shell
npm run build
```

**Or** build your production code with webpack
```shell
webpack --config webpack.production.config.js
```

The output file will be called `main.build.js`.  To use that in PlayCanvas just drag and drop
it onto the PlayCanvas editor for your project.

Now open your developer tools in the browser with the PlayCanvas Editor open and in
the Javascript console type

```javascript
config.accessToken
```

Copy the result of this and paste it into the `config.json` file as your bearer token.

Then in the javascript console type

```javascript
config.project.id
```

And put that in the project id part of `config.json`

Finally if you haven't already done it, drag `main.build.js` and drop it in the PlayCanvas assets window.

When it's imported click on it and in the properties window on the right, take it's ID and put that in
`config.json` as your assetId.

Now every time you run `npm run build` it will upload the result to PlayCanvas for you.

### General workflow notes (Glidias)

To ensure Playcanvas editors validates & re-initializes any script editor properties of all your uploaded scripts within your bundle main.build.js,
click on the "PARSE" button in the Asset properties when main.build.js is selected in the Asset library.

Also, if you do integrate any view layer like React/Vue,etc. or any other 3rd party JS that affects the DOM,
make sure you defer any initialization of such codes via a respective on-stage Playcanvas entity script handler, or
do an environment check to see it isn't running in any Playcanvas editor worker or something prior to initialization
eg in main.js. `(typeof window === 'object' && typeof importScripts !== 'function')`

### Local serving your development build

There's a better way to do ongoing development though, you only really need to upload your build when
the attributes of something change, you add a new script or you want to publish your build.

This template project has a solution for that too.  You will be able to see all of your
source code in your developer tools when you use any means of making a `development` build.

#### Deprecated Methods (Tobias Wehrum)

Previously two deprecated methods of locally serving a development build were described here: *Loading Screen Method* and *PlayCanvas Script Method*. As far as I can see, neither work anymore. (Possibly due to ``pc.Asset.prototype.getFileUrl`` not being used anymore for loading scripts, but that is pure conjecture on my part.)

#### Setting up Redirector (Chrome only) (edited Glidias)

- Download the [Redirector](https://chrome.google.com/webstore/detail/redirector/ocgpenflpmgnfapjedencafcfakcekcd?hl=en) chrome extension.
THe objective is to redirect certain request files/folders/etc. to access from your localhost instead. Make sure the http protocols are the same (eg. For convenience, if redirecting to http localhost, use redirection on http protocol as well on the playcanvas launch url). HTTPS may need a bit more effort to set up (see last section).

- Here are some examples redirects: (depending on where you place your files under `assets/files/`, you might need to change this accordingly to decide exactly what to redirect!)

   1.  For only syncing main.build.js file only (on asset root)
        **Example URL**: `http://launch.playcanvas.com/api/assets/files/main.build.js?id=11217398&branchId=00465776-6b83-4f4c-af75-01c351769fa8`

        **Include pattern**: `http:\/\/launch\.playcanvas\.com\/api\/assets\/files\/(main\.build\.js)\?(.*)`

        **Redirect to**: `http://localhost:8081/$1?$2`

        **Pattern type**: Regular Expression

         In advanced options:

        **Apply to**: Scripts and XMLHttpRequests (Ajax)

    2. OR For all script files (including main.build.js) (on asset root)

        **Example URL**: `http://launch.playcanvas.com/api/assets/files/blahblah.js?id=11217398&branchId=00465776-6b83-4f4c-af75-01c351769fa8`

        **Include pattern**: `http:\/\/launch\.playcanvas\.com\/api\/assets\/files\/(.+\.js)\?(.*)`

        **Redirect to**: `http://localhost:8081/$1?$2`

        **Pattern type**: Regular Expression

        In advanced options:
        **Apply to**: Scripts and XMLHttpRequests (Ajax)

    3.  For hot module reloading (HMR)
        Example URL: http://launch.playcanvas.com/191247d10e518c420782.hot-update.json

        **Include pattern:** http://launch.playcanvas.com/(.*).hot-update.(js|json)$

        **Redirect to:** http://localhost:8081/$1.hot-update.$2

        **Pattern type:** Regular Expression

        In advanced options:
        **Apply to:** Scripts and XMLHttpRequests (Ajax)

After starting the server in the next step, you can open [http://launch.playcanvas.com/%7BprojectId%7D?debug=true](http://launch.playcanvas.com/%7BprojectId%7D?debug=true) (so the same URL as you'd regularely do, but with http instead of https) and all script files will be used from your local server instead of the files uploaded on the PlayCanvas servers.

Note that while Redirector is active, depending on the type of redirects you do, any requests matching the above patterns are redirected to your local server, even if you are not running your local server and even for projects hosted at [http://launch.playcanvas.com](launch.playcanvas.com) that you don't even want to run locally. Be sure to turn Redirector off or use https URLs in those cases.

#### Starting the server

Now you can type `npm start` in the project root. This will, build and upload your code, then start a local server
to serve any changes you make.  When you change your code, your launch window will automatically
update.

If you need to upload again, just stop the server with CTRL+C and type `npm start` again. Then refresh
your launch and Editor windows.

### Development builds without local serving

Type `webpack --config webpack.development.config.js` to build and (if configured) upload a development
version of your code which will have source mapping to make it possible to see your own code
when you debug.

## Production Build

Just type `npm run build` any time you want a production build.

Production builds are minified and don't have source maps embedded (they are a separate file).

## Using NPM

You can just use NPM like normal.  Basically find the module you need and type

```shell
npm install --save <module-name>
```

You can then import it into the file you need it in by adding an `import` statement at the
top of your file.

```javascript
import blah from 'blah-module';

...

blah(something);

```

You may also use `require` syntax if the whole file is written that way.

## Targeting different browsers

`config.json` also contains a `"browsers"` entry - this is a query in the
[browserslist](https://github.com/ai/browserslist) format that tells Babel
what it needs to augment in the target output.  By default it's set to `> 1%`
which means that the output code will work on `99%` of browsers in the field.

If you set it to `last 2 Chrome versions` then a lot more of ES6 is implemented
already and there will be less work done, so a smaller output file
(and possibly some code could be faster).

Using this method you could actually create multiple builds and choose between them.

# Conclusion

Hopefully this will get you started using ES6 and modules with PlayCanvas. Feel free to
ask for @whydoidoit on the PlayCanvas forum if you want to discuss.

Enjoy!



*- Ends -*

----



##### HTTPS serving

You can configure webpack to HTTPS serve instead of HTTP.

Use `npm run https` to start your local development build. Then:

* Either: in a separate window navigate to https://localhost:8081/main.build.js and if you
are warned it isn't safe, just proceed anyway. This will mean that you always see that the
launch page is untrusted and may cause other issues, it's normally fine for me.

* Or: get your browser to trust `node_modules/webpack-dev-server/ssl/server.pem`. This can be
easier said than done.  You can also replace `server.pem` with your own trusted `localhost`
certificate.  Just you'll have to pack it as a `.pem` file. (On Apple by default it will be a `.p12`,
Google for how to change it).

**Don't forget to change your launch URL to HTTPS and add/change the Redirector rules to support HTTPS!!**

Personally I've used [Certificate Tools](https://certificatetools.com) to make certs that work. Make sure you sent the `Subject
Alternative Name(s) DNS` to `localhost` **as well as** `Common Names`.  It also provides you with a thing
to run to pack .p12 into a .pem after you've generated your certificate.  It only took me about 5 tries
to work out what I had to do with it!
