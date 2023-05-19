'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createOrUpdateComment } from './actions';
import style from './FruitCommentForm.module.scss';

// {id: number, comment: string}[]]

export default function FruitCommentForm(props) {
  const [comment, setComment] = useState('');
  const router = useRouter();

  return (
    // WARNING: in order to use Server Action you need to update the next.js config with serverActions: true,
    // when using Server Actions we don't need prevent the default of the form
    <form>
      <textarea
        className={style.textArea}
        value={comment}
        onChange={(event) => {
          setComment(event.currentTarget.value);
        }}
      />
      {/* Instead of using onClick we use formAction */}
      <br />
      <button
        className={style.button}
        formAction={async () => {
          router.refresh();
          await createOrUpdateComment(props.fruitId, comment);
        }}
      >
        Update Comment
      </button>
    </form>
  );
}
