'use client';
import { useState } from 'react';
import { Animal } from '../../migrations/1684915044-createTableAnimals';
import styles from './AnimalsForm.module.scss';

type Props = {
  animals: Animal[];
  csrfToken: string;
};

export default function AnimalsForm({ animals, csrfToken }: Props) {
  const [animalList, setAnimalList] = useState(animals);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');
  const [onEditId, setOnEditId] = useState<number>();

  // only for on edit inputs
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditTypeInput, setOnEditTypeInput] = useState('');
  const [onEditAccessoryInput, setOnEditAccessoryInput] = useState('');

  async function createAnimal() {
    const response = await fetch('/api/animals', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameInput,
        type: typeInput,
        accessory: accessoryInput,
        csrfToken: csrfToken,
      }),
    });

    const data = await response.json();

    setAnimalList([...animalList, data.animal]);
  }

  async function deleteAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setAnimalList(animalList.filter((animal) => animal.id !== data.animal.id));
  }

  async function updateAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        type: onEditTypeInput,
        accessory: onEditAccessoryInput,
      }),
    });

    const data = await response.json();

    setAnimalList(
      animalList.map((animal) => {
        if (animal.id === data.animal.id) {
          return data.animal;
        }
        return animal;
      }),
    );
  }

  return (
    <div className={styles.inputDiv}>
      CSRF: token changing on every page render: <code />
      {csrfToken}
      <code />
      <br />
      <label>
        <input
          value={firstNameInput}
          onChange={(event) => setFirstNameInput(event.currentTarget.value)}
        />
        First Name
      </label>
      <br />
      <label>
        <input
          value={typeInput}
          onChange={(event) => setTypeInput(event.currentTarget.value)}
        />
        Type
      </label>
      <br />
      <label>
        <input
          value={accessoryInput}
          onChange={(event) => setAccessoryInput(event.currentTarget.value)}
        />
        Accessory
      </label>
      <br />
      <button
        className={styles.button}
        onClick={async () => await createAnimal()}
      >
        create +
      </button>
      {animalList.map((animal) => {
        return (
          <div key={`animal-inputs-${animal.id}`} className={styles.inputDiv}>
            <br />
            <label>
              <input
                value={
                  animal.id !== onEditId
                    ? animal.firstName
                    : onEditFirstNameInput
                }
                onChange={(event) =>
                  setOnEditFirstNameInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              First Name
            </label>
            <br />
            <label>
              <input
                value={animal.id !== onEditId ? animal.type : onEditTypeInput}
                onChange={(event) =>
                  setOnEditTypeInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              Type
            </label>
            <br />
            <label>
              <input
                value={
                  animal.id !== onEditId
                    ? animal.accessory || ''
                    : onEditAccessoryInput
                }
                onChange={(event) =>
                  setOnEditAccessoryInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              Accessory
            </label>
            <br />
            {animal.id === onEditId ? (
              <button
                className={styles.button}
                onClick={async () => {
                  setOnEditId(undefined);
                  await updateAnimalById(animal.id);
                }}
              >
                save
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={() => {
                  setOnEditId(animal.id);
                  setOnEditFirstNameInput(animal.firstName);
                  setOnEditTypeInput(animal.type);
                  setOnEditAccessoryInput(animal.accessory || '');
                }}
              >
                edit
              </button>
            )}
            <button
              className={styles.button}
              onClick={async () => await deleteAnimalById(animal.id)}
            >
              x
            </button>
            <br />
          </div>
        );
      })}
    </div>
  );
}
