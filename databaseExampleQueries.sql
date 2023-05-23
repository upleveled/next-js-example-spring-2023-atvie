-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(40)
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO animals
  (first_name, type, accessory)
VALUES
  ('gigi', 'cat',  'rat' ),
  ( 'freddy',  'dog',  'biscuit' ),
  ( 'bob',  'trashpanda',  'candy' ),
  ( 'nagini',  'snake',  'band' ),
  ( 'kunfu',  'panda', null  );

-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;
