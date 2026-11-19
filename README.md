# Exercise: Book Club Picks

Exercise code for the lesson **Exercise: Book Club Picks** in the Node.js in Depth course on [ask-codey.com](https://www.ask-codey.com).

Chapter Two Book Club plans its meetings with one long file, `club.js`. It works, but every change means scrolling past everything else. You'll split it into three modules, `books.js`, `votes.js` and `main.js`, swap its hand-made date formatting for the `date-fns` package, and set the project up the way real Node projects are: npm scripts, a pinned package, and a `.gitignore`. Tests check every module and every setting.

## What's here

- `club.js`: the whole planner in one file. It works: `node club.js` prints the next pick and meeting. The comment at its top lists everything you'll move, and where. For you to split up, then delete.
- `package.json`: the project's settings, as `npm init` made them, with `"type": "module"`. Its test script only says *no test specified*. For you to finish.
- `club.test.js`: tests that import your modules and call their functions, read `package.json` and `.gitignore`, and run `main.js`. You don't need to change this file.

When you're done, the folder also holds `books.js`, `votes.js`, `main.js`, `.gitignore`, `package-lock.json` and a `node_modules` folder, and `club.js` is gone.

## Before you start

There's nothing to install yet: installing `date-fns` is one of the steps. See what the planner prints first:

```bash
node club.js
```

## Run it

Once `main.js` exists and `package.json` has its start script:

```bash
npm start
```

It prints the same four lines `club.js` printed.

## Check your work

Until you add the test script, run the tests with Node directly:

```bash
node --test
```

Once the test script is `node --test`, `npm test` runs the same thing. No packages are needed for the tests themselves. At first every test fails: that is expected. Each step you finish turns its tests green. A failing test's message says what's missing, for example *books.js doesn't exist yet.*

## The rules

- `books.js` and `votes.js` share their code with named exports, and `main.js` imports it: `import { findBook, pagesPerWeek } from "./books.js";`.
- `main.js` formats the meeting date with `format` from `date-fns` and the pattern `"EEEE, MMMM d"`, not with the `DAYS` and `MONTHS` lists.
- Install `date-fns` at exactly version 4.4.0, as a dependency, not a devDependency: `npm install date-fns@4.4.0 --save-exact`.
- Keep the data as it is in `club.js`: the tests compare your answers with it.
- Delete `club.js` when the three modules do its work.

## Tips

- Move one module at a time: `books.js` first, then `votes.js`, then `main.js`. Run `node --test` after each.
- A function that uses `books` or `countVotes` needs it in its own file, or imported into it.
- An import path for your own file starts with `./` and ends with `.js`. A package's name, `"date-fns"`, has neither.
- `.gitignore` is a plain text file named exactly `.gitignore`, with a dot in front and no ending. One line in it, `node_modules/`, keeps the installed packages out of Git.
- `npm install` adds the package to `package.json` for you. The scripts you add by hand, inside `"scripts"`.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
