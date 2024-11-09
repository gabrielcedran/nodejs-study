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
