import React from 'react';
import { deleteAnimalById } from '../../../../database/animals';

export default async function AnimalDeletePage(props) {
  const animal = await deleteAnimalById(Number(props.params.animalId));

  return <div>Animal with id {animal.id} is deleted</div>;
}
