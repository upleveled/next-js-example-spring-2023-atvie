import React from 'react';
import { createAnimal } from '../../../database/animals';

export default async function CreateAnimalPage(props) {
  const animal = await createAnimal(
    props.searchParams.firstName,
    props.searchParams.type,
    props.searchParams.accessory,
  );

  return <div>Animal with first name {animal.firstName} is created</div>;
}
