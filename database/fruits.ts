type Fruit = {
  id: number;
  name: string;
  icon: string;
};

export const fruits: Fruit[] = [
  { id: 1, name: 'avocado', icon: '🥑' },
  { id: 2, name: 'mango', icon: '🥭' },
  { id: 3, name: 'papaya', icon: '🥔' },
  { id: 4, name: 'tomato', icon: '🍅' },
  { id: 5, name: 'kiwi', icon: '🥝' },
];

export function getFruitById(id: number) {
  return fruits.find((fruit) => fruit.id === id);
}
