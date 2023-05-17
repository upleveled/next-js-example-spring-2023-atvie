// server side code only run in server components
// import fs from 'node:fs';

// fs.readFile('../app/page.js', () => {});

export const animals = [
  { id: 1, name: 'gigi', type: 'cat', object: 'rat' },
  { id: 2, name: 'freddy', type: 'dog', object: 'biscuit' },
  { id: 3, name: 'bob', type: 'trashpanda', object: 'candy' },
  { id: 4, name: 'nagini', type: 'snake', object: 'band' },
  { id: 5, name: 'kunfu', type: 'panda', object: 'food' },
];

export function getAnimalByName(name) {
  return animals.find((animal) => animal.name === name);
}
