import React from 'react';
import { updateAnimalById } from '../../../../database/animals';

export default async function UpdateAnimalPage(props) {
  const animal = await updateAnimalById(
    props.params.animalId,
    props.searchParams.firstName,
    props.searchParams.type,
    props.searchParams.accessory,
  );

  return <div>Animal with id {animal.id} updated</div>;
}
