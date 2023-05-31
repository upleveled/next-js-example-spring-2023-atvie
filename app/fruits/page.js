import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export default function FruitsPage() {
  // This is what we want when using cookies
  const fruitCommentsCookie = getCookie('fruitComments');

  const fruitComments = !fruitCommentsCookie
    ? []
    : parseJson(fruitCommentsCookie);

  const fruitsWithComments = fruits.map((fruit) => {
    const matchingFruitFromCookie = fruitComments.find(
      (fruitObject) => fruit.id === fruitObject.id,
    );

    return { ...fruit, comment: matchingFruitFromCookie?.comment };
  });

  return (
    <>
      {fruitsWithComments.map((fruit) => (
        <div
          key={`fruit-div-${fruit.id}`}
          data-test-id={`fruit-name-${fruit.name}`}
        >
          <Link href={`/fruits/${fruit.id}`}>
            <h1>
              {fruit.icon} {fruit.name}
            </h1>
          </Link>
          {fruit.comment}
        </div>
      ))}
    </>
  );
}
