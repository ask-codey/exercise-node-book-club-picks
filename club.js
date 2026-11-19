// Chapter Two Book Club's meeting planner, all in one file. For you to split up.
//
// It works: node club.js prints the club's next pick and meeting. Your job is to move its code into three modules,
// install one package, and set up the project. When you're done, this file is gone.
//
//   books.js   export books (the four picks below), findBook(id) and pagesPerWeek(book, weeks)
//                findBook(3)                   the book with id 3: { id: 3, title: "A Map of Quiet Rivers", pages: 356 }
//                findBook(9)                   undefined: the club has no book 9
//                pagesPerWeek(findBook(3), 4)  89: 356 pages over 4 weeks is 89 a week, rounded up
//   votes.js   export votes (the seven votes below), countVotes(votes) and winner(votes)
//                countVotes(votes)             { 1: 2, 2: 1, 3: 3, 4: 1 }: each book's id and how many votes it got
//                winner(votes)                 3: the book id with the most votes. In a tie, the smaller id wins,
//                                              so for one vote for book 2 and one for book 1, it's 1.
//   main.js    imports what it needs from books.js and votes.js, and prints the same four lines as this file:
//                Chapter Two Book Club
//                Next pick: A Map of Quiet Rivers (3 votes)
//                Read 89 pages a week for 4 weeks.
//                Next meeting: Thursday, December 3
//              It formats the meeting date with the format function from the date-fns package, using the pattern
//              "EEEE, MMMM d", instead of the DAYS and MONTHS lists below.
//
// Then, in package.json and the project folder:
//   - install date-fns at exactly version 4.4.0, as a dependency: npm install date-fns@4.4.0 --save-exact
//   - set the scripts: "start" runs "node main.js", and "test" runs "node --test"
//   - add a .gitignore file with the line node_modules/ so Git leaves the installed packages out
//   - delete club.js

const books = [
  { id: 1, title: "The Lantern Library", pages: 320 },
  { id: 2, title: "Salt and Starlight", pages: 412 },
  { id: 3, title: "A Map of Quiet Rivers", pages: 356 },
  { id: 4, title: "The Teacup Detective", pages: 248 },
];

const votes = [
  { member: "Maya", bookId: 3 },
  { member: "Jordan", bookId: 1 },
  { member: "Priya", bookId: 3 },
  { member: "Sam", bookId: 2 },
  { member: "Lena", bookId: 3 },
  { member: "Omar", bookId: 1 },
  { member: "Rosa", bookId: 4 },
];

function findBook(id) {
  return books.find((book) => book.id === id);
}

function pagesPerWeek(book, weeks) {
  return Math.ceil(book.pages / weeks);
}

function countVotes(votes) {
  const counts = {};
  for (const { bookId } of votes) {
    // ?? (read "nullish coalescing") gives 0 when this book has no count yet.
    counts[bookId] = (counts[bookId] ?? 0) + 1;
  }
  return counts;
}

function winner(votes) {
  const counts = countVotes(votes);
  let best;
  for (const id of Object.keys(counts).map(Number).sort((a, b) => a - b)) {
    if (best === undefined || counts[id] > counts[best]) {
      best = id;
    }
  }
  return best;
}

// Formatting a date by hand: the lists and the function date-fns's format replaces.
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function formatDate(date) {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

const weeks = 4;
const nextMeeting = new Date(2026, 11, 3); // December 3, 2026: JavaScript counts months from 0
const pickId = winner(votes);
const pick = findBook(pickId);

console.log("Chapter Two Book Club");
console.log(`Next pick: ${pick.title} (${countVotes(votes)[pickId]} votes)`);
console.log(`Read ${pagesPerWeek(pick, weeks)} pages a week for ${weeks} weeks.`);
console.log(`Next meeting: ${formatDate(nextMeeting)}`);
