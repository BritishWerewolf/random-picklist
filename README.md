# random-picklist

This template should help get you started developing with Vue 3 in Vite.

## Prerequisites and Recommendations

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

[Just](https://github.com/casey/just) should be installed in order to easily build the project.  
A `justfile` is provided in the project for convenient building and deploying.

## Building the project

There are three types of builds available: development, production, and build only.  
All three build commands will first run `npm install` before running their main command.

The development build is accessed by running `just build-dev`.  
Under the hood, this is going to run `npx vite --force` which will quickly build the app and open a local connection to debug the app. on localhost.

Build only can be accessed by running `just build`.  
Under the hood, this will run the command `npx vite build`, which will create production ready assets in the `dist` folder.

The production build is access by running `just build-prod`.  
Under the hood, this is going to run `npx vue-tsc --build --force` and `just build` which will type check all files - and prevent further execution if there are any type issues - before running the above build script.

## Linting

[ESLint](https://eslint.org) is used within this project to ensure code consistency. There are two available commands: `just lint` and `just lint-fix`.  
The first will run the linter without auto-fixing, while the second will run the linter and attempt to fix any issues that it can.

## Testing

We use [`Vitest`](https://vitest.dev) in this project, and unit tests can be run by typing `just test-unit`, which is going to call `npx vitest run`.

## Releasing and publishing

To publish the site, just run `just publish`.  
This will first ensure that the `develop` branch is merged into `main`, then run `just build-prod` and publish the contents of the `dist` folder to the `surge` site that has been set up.

If you are publishing this site on your own domain, you will need to change the URL here.
