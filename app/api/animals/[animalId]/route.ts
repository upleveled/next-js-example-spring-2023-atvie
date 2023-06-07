import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
} from '../../../../database/animals';
import { Animal, Error } from '../route';

// Use 'force-dynamic' on pages using database queries in the server component to prevent your deployment to fail.
export const dynamic = 'force-dynamic';

type AnimalResponseBodyGet = { animal: Animal } | Error;
type AnimalResponseBodyDelete = { animal: Animal } | Error;
type AnimalResponseBodyPut = { animal: Animal } | Error;

const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyGet>> {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const animal = await getAnimalById(animalId);

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: animal });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const animal = await deleteAnimalById(animalId);

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: animal });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyPut>> {
  const animalId = Number(params.animalId);
  const body = await request.json();

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  // zod please verify the body matches my schema
  const result = animalSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to update the animal
  const animal = await updateAnimalById(
    animalId,
    result.data.firstName,
    result.data.type,
    result.data.accessory,
  );

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}
