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

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // await expect(page.locator('h1')).toHaveText('Hello UpLeveled');

  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(2),
  ).toBeVisible();

  await expect(page.getByAltText('cat sleeping').first()).toBeVisible();

  await page.getByRole('link', { name: 'animals' }).click();

  await expect(page.getByText('This are my animals')).toBeVisible();
  // use caret ^ to find all elements with data-test-id=animal-type
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveText(
    animals.map((animal) => animal.firstName),
  );
  // Use >> for direct descendant of the locator
  await expect(
    page.locator('[data-test-id^="animal-type-"] >> img'),
  ).toHaveCount(5);

  for (const animal of animals) {
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: 'avocado' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.getByRole('textbox').fill('asd');

  await page.getByRole('button', { name: 'Update comment' }).click();

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.getByTestId('fruit-name-avocado').getByText('asd'),
  ).toBeVisible();
});
