# nodejs-study

In a nutshell, nodejs is an environment which can run javascript outside of the browser - with some differences tho: when running on a browser, there are some APIs that only make sense in a browser, like DOM, CSS, etc.

_Nodejs itself is not a language, but an environment / runtime - the language is javascript - the browser is also a runtime_

Important globals:

- global (the equivalent of window in the browser runtime)
- process.argv (args provided for the execution, including program `node` and entry file)
- process.pid
- process.env (env variable - famous community convention `process.env.NODE_ENV`)
- process.exit() (ends the current process)

## Custom CLIs

It's possible to create custom CLIs with node. To do so, do the following steps:

1. Init a new node project (npm init)
2. In the package.json add a `bin` entry at the root level with a property where the key is the wanted command (careful with clashing names) and the value the js file (don't forget to add the first line declaring to the OS which runtime this program is developed for).
3. run `npm link` - which will install it locally (symlink is better for development as it's a virtual link, not an actual installation with `npm i -g ...`).

### JS Notes:

**encapsulating code in its own scope**

It's meant to protect your from the global space (or other third party code from meddling with it).
It works at the base for modules (IIFE) as it allows developers to choose how and what the interactions with external world are:

```javascript

(function() {
    console.log.('Traditional / old school way of doing it');
})()
```

Javascript has 3 types of modules:

1. internal modules - the ones built into the runtime (e.g http)
2. custom-created modules - pieces of code that we create and share with other modules and people
3. third-party modules - modules that are created by other developers and can be downloaded from the npm registry

### CommonJS modules vs ES6 modules

CommonJS modules use the `require` function while ES6 modules use `import` statements (from version 18).

```javascript
const { sum } = require("./utils.js");
const _ = require("lodash");
const fs = require("fs");

// how to export when using commonJS:

const count = (n1, n2) => n1 + n2;
exports.count = count; // old
module.exports = { count }; // newer, supports many exports in one declaration

// vs

import { sum } from "./utils.js";
import _ from "lodash";
import fs from "fs"; // or "node:fs" to be explicit that you want the core fs module, shipped with node
```

To enable it, just add `"type": "module"` at the root of the package json.

**named vs default exports**

```javascript

export const sum = (n1, n2) => n1 + n2; // this is names and must be imported as import {x} from './utils.js'

export default {x: sum, name: 'donbob'}; // this is a default export and can be imported with whatever name I want

export default sum; // this is also a default export, but only exports a function.

```

_when nodejs came out, there was no es6 modules, hence it had to come with its own solution to support modules - hence the require module (browsers were handling it with mostly with bundling)_

**modules with index file**

When a module (directory) has an `index.js` files, it's possible to import it only by referring to the folder instead of to the file.

Example:

`utils/index.js`
`utils/maths.js`
`utils/string.js`

```javascript
import { something } from "./utils"; // this will look for an index.js file
```

Some tricks: in the example above, it's possible to import maths and string individually. However it's possible to do everything via `index.js` using import / export:

```javascript
// index.js:

export { sum } from "./maths.js"; // it's also possible to do this in two separate steps (1) import (2) export
export { trim, toString } from "./strings.js";

// then it's possible to import each function individually or everything together:

import * as utils from "utils";

utils.sum(1, 2);
```

_this is known as the index.js pattern_

### Automated Tests

Jest is a testing framework created by Meta (which is heavily based on Mocha and Jasmine). `npm i -D jest`.

Conventions: files `.test.js` and `.spec.js` are automatically picked up - however it's possible to set up other suffixes.

The way to look at is that the app is wrapped in a sub-environment with jest's globals (e.g the global `test` function).
