import { expect, test } from '@playwright/test';

const animals = [
  {
    firstName: 'gigi',
    type: 'cat',
  },
  {
    firstName: 'freddy',
    type: 'dog',
  },
  {
    firstName: 'bob',
    type: 'trashpanda',
  },
  {
    firstName: 'nagini',
    type: 'snake',
  },
  {
    firstName: 'kunfu',
    type: 'panda',
  },
];

const fruits = ['🥑 avocado', '🥭 mango', '🥔 papaya', '🍅 tomato', '🥝 kiwi'];

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // use getByRole Locator to find elements
  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // use page.locator to find elements
  await expect(page.locator('h1')).toHaveText('Hello UpLeveled');
  // get first cat sleeping image by alt text
  await expect(page.getByAltText('cat sleeping').first()).toBeVisible();
  // get second cat sleeping image by alt text
  await expect(page.getByAltText('cat sleeping').nth(1)).toBeVisible();
  // get third cat sleeping image by alt text
  await expect(page.getByAltText('cat sleeping').nth(2)).toBeVisible();
  // get first cat sleeping image by role
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).first(),
  ).toBeVisible();
  // click on the animals link
  await page.getByRole('link', { name: 'animals' }).click();
  // check if the url is correct
  await expect(page).toHaveURL('http://localhost:3000/animals');

  await expect(page.getByText('This are my animals')).toBeVisible();

  // use caret ^ to find all elements with 'data-test-id=animal-type-'
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(
    animals.length,
  );

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveText(
    animals.map((animal) => animal.firstName),
  );
  // use >> for direct descendant of the locator
  await expect(
    page.locator('[data-test-id^="animal-type-"] >> img'),
  ).toHaveCount(5);

  for (const animal of animals) {
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
    await expect(page.getByAltText(animal.firstName)).toBeVisible();
  }

  await page.getByRole('link', { name: 'fruits' }).click();

  await expect(page).toHaveURL('http://localhost:3000/fruits');

  for (const fruit of fruits) {
    await expect(page.getByRole('link', { name: fruit })).toBeVisible();
  }

  await page.getByRole('link', { name: fruits[0] }).click();

  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.getByRole('textbox').fill('test');

  await page.getByRole('button', { name: 'Update Comment' }).click();

  await expect(page.getByText('test')).toBeVisible();

  await page.getByRole('link', { name: 'fruits' }).click();

  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.getByTestId('fruit-name-avocado').getByText('test'),
  ).toBeVisible();
});
