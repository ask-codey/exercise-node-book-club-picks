// Tests for the book club's modules and project. Run them with: node --test
// (once package.json's test script is "node --test", npm test runs the same thing).
// They import books.js and votes.js and call their functions, read package.json and .gitignore, and run main.js
// the way npm start would. A file that doesn't exist yet fails its tests with a message that says so.
// You don't need to change this file.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const here = import.meta.dirname;
const inFolder = (file) => `${here}/${file}`;

// Imports one of your modules, or fails with a clear message when the file isn't there yet.
async function load(file) {
  if (!existsSync(inFolder(file))) {
    assert.fail(`${file} doesn't exist yet. Make it in the exercise folder, beside club.test.js.`);
  }
  return import(`./${file}`);
}

// Reads a text file in the exercise folder, or fails with a clear message when it isn't there yet.
function readText(file) {
  if (!existsSync(inFolder(file))) {
    assert.fail(`${file} doesn't exist yet. Make it in the exercise folder, beside club.test.js.`);
  }
  return readFileSync(inFolder(file), "utf8");
}

const packageJson = () => JSON.parse(readText("package.json"));

test("1) books.js exports books, the club's 4 picks, with A Map of Quiet Rivers third", async () => {
  const { books } = await load("books.js");
  assert.ok(Array.isArray(books), "books.js should export books, an array, as a named export: export const books = [...]");
  assert.equal(books.length, 4, `books should hold the club's 4 picks, but it holds ${books.length}.`);
  assert.deepEqual(books[2], { id: 3, title: "A Map of Quiet Rivers", pages: 356 },
    "The third book should be A Map of Quiet Rivers, 356 pages, as in club.js.");
});

test("2) books.js: findBook(3) returns A Map of Quiet Rivers, 356 pages", async () => {
  const { findBook } = await load("books.js");
  assert.equal(typeof findBook, "function", "books.js should export findBook as a named export.");
  assert.deepEqual(findBook(3), { id: 3, title: "A Map of Quiet Rivers", pages: 356 });
});

test("3) books.js: findBook(9) returns undefined, since the club has no book 9", async () => {
  const { findBook } = await load("books.js");
  assert.equal(typeof findBook, "function", "books.js should export findBook as a named export.");
  assert.equal(findBook(9), undefined);
});

test("4) books.js: pagesPerWeek(findBook(3), 4) returns 89, 356 pages over 4 weeks rounded up", async () => {
  const { findBook, pagesPerWeek } = await load("books.js");
  assert.equal(typeof pagesPerWeek, "function", "books.js should export pagesPerWeek as a named export.");
  assert.equal(pagesPerWeek(findBook(3), 4), 89);
});

test("5) votes.js exports votes, the club's 7 votes, Maya's first", async () => {
  const { votes } = await load("votes.js");
  assert.ok(Array.isArray(votes), "votes.js should export votes, an array, as a named export: export const votes = [...]");
  assert.equal(votes.length, 7, `votes should hold the club's 7 votes, but it holds ${votes.length}.`);
  assert.deepEqual(votes[0], { member: "Maya", bookId: 3 }, "The first vote should be Maya's, for book 3, as in club.js.");
});

test("6) votes.js: countVotes(votes) returns { 1: 2, 2: 1, 3: 3, 4: 1 }", async () => {
  const { votes, countVotes } = await load("votes.js");
  assert.equal(typeof countVotes, "function", "votes.js should export countVotes as a named export.");
  assert.deepEqual(countVotes(votes), { 1: 2, 2: 1, 3: 3, 4: 1 });
});

test("7) votes.js: winner(votes) returns 3, A Map of Quiet Rivers, with 3 votes", async () => {
  const { votes, winner } = await load("votes.js");
  assert.equal(typeof winner, "function", "votes.js should export winner as a named export.");
  assert.equal(winner(votes), 3);
});

test("8) votes.js: winner of a tie, one vote for book 2 and one for book 1, returns 1, the smaller id", async () => {
  const { winner } = await load("votes.js");
  assert.equal(typeof winner, "function", "votes.js should export winner as a named export.");
  assert.equal(winner([{ member: "Maya", bookId: 2 }, { member: "Sam", bookId: 1 }]), 1);
});

test('9) package.json: the start script is "node main.js"', () => {
  const start = packageJson().scripts?.start;
  assert.equal(start, "node main.js", `The start script should be "node main.js", but it's ${JSON.stringify(start)}.`);
});

test('10) package.json: the test script is "node --test"', () => {
  const testScript = packageJson().scripts?.test;
  assert.equal(testScript, "node --test", `The test script should be "node --test", but it's ${JSON.stringify(testScript)}.`);
});

test("11) package.json: date-fns is a dependency at exactly 4.4.0, with no ^ or ~ in front", () => {
  const { dependencies = {}, devDependencies = {} } = packageJson();
  if (devDependencies["date-fns"] !== undefined) {
    assert.fail("date-fns is under devDependencies, but main.js needs it when it runs: install it without --save-dev.");
  }
  assert.equal(dependencies["date-fns"], "4.4.0",
    `dependencies should list "date-fns": "4.4.0", but it lists ${JSON.stringify(dependencies["date-fns"])}. ` +
    "Install it with npm install date-fns@4.4.0 --save-exact.");
});

test("12) .gitignore has the line node_modules/, so Git leaves the installed packages out", () => {
  const lines = readText(".gitignore").split(/\r?\n/).map((line) => line.trim());
  assert.ok(lines.some((line) => ["node_modules", "node_modules/", "/node_modules", "/node_modules/"].includes(line)),
    ".gitignore should have a line that reads node_modules/");
});

test("13) main.js imports format from the date-fns package", () => {
  const code = readText("main.js");
  assert.match(code, /import\s*\{[^}]*\bformat\b[^}]*\}\s*from\s*["']date-fns["']/,
    'main.js should bring in format with: import { format } from "date-fns";');
});

test("14) node main.js prints the four lines, ending Next meeting: Thursday, December 3", () => {
  readText("main.js");
  let output;
  try {
    output = execFileSync(process.execPath, ["main.js"], { cwd: here, encoding: "utf8" });
  } catch (error) {
    assert.fail(`node main.js stopped with an error:\n${error.stderr}`);
  }
  assert.deepEqual(output.trim().split(/\r?\n/), [
    "Chapter Two Book Club",
    "Next pick: A Map of Quiet Rivers (3 votes)",
    "Read 89 pages a week for 4 weeks.",
    "Next meeting: Thursday, December 3",
  ], `node main.js should print the four lines club.js printed, but it printed:\n${output}`);
});

test("15) club.js is gone: its code now lives in books.js, votes.js and main.js", () => {
  assert.equal(existsSync(inFolder("club.js")), false,
    "Delete club.js once books.js, votes.js and main.js do its work.");
});
