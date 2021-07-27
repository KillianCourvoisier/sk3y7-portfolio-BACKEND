-- Deploy sk3y7-portfolio:unique_cities to pg

BEGIN;

ALTER TABLE localisation ADD CONSTRAINT cities_are_unique UNIQUE (city);

COMMIT;
