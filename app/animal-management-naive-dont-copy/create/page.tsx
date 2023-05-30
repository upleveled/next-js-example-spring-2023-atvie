import { notFound } from 'next/navigation';
import React from 'react';
import { createAnimal } from '../../../database/animals';

type Props = {
  searchParams: {
    firstName: string;
    type: string;
    accessory: string;
  };
};

export default async function CreateAnimalPage(props: Props) {
  const animal = await createAnimal(
    props.searchParams.firstName,
    props.searchParams.type,
    props.searchParams.accessory,
  );

  if (!animal) {
    notFound();
  }

  return <div>Animal with first name {animal.firstName} is created</div>;
}
