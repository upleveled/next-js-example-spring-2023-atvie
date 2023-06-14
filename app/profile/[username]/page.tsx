import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <div>id: {user.id}</div>
      <div>username: {user.username}</div>
    </>
  );
}
