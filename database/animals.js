// server side code only run in server components
// import fs from 'node:fs';

// fs.readFile('../app/page.js', () => {});

export const animals = [
  { id: 1, firstName: 'gigi', type: 'cat', accessory: 'rat' },
  { id: 2, firstName: 'freddy', type: 'dog', accessory: 'biscuit' },
  { id: 3, firstName: 'bob', type: 'trashpanda', accessory: 'candy' },
  { id: 4, firstName: 'nagini', type: 'snake', accessory: 'band' },
  { id: 5, firstName: 'kunfu', type: 'panda', accessory: 'food' },
];

export function getAnimalById(id) {
  return animals.find((animal) => animal.id === id);
}
