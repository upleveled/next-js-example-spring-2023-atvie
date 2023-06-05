import { notFound } from 'next/navigation';
import { getFruitById } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';
import FruitCommentForm from './FruitCommentForm';

type Props = {
  params: { fruitId: string };
};

export type CookieCommentItem = {
  id: number;
  comment?: string;
};

export default function FruitPage(props: Props) {
  const fruit = getFruitById(Number(props.params.fruitId));

  if (!fruit) {
    notFound();
  }

  const fruitCommentsCookie = getCookie('fruitComments');
  const fruitComments = !fruitCommentsCookie
    ? []
    : parseJson(fruitCommentsCookie);

  const fruitToUpdate = fruitComments?.find((fruitComment) => {
    return fruitComment.id === fruit.id;
  });

  return (
    <>
      <h1>
        {fruit.icon} {fruit.name}
      </h1>
      {fruitToUpdate?.comment}
      <FruitCommentForm fruitId={fruit.id} />
    </>
  );
}
