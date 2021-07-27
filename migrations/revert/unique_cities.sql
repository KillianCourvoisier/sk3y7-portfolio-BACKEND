-- Revert sk3y7-portfolio:unique_cities from pg

BEGIN;

ALTER TABLE localisation DROP CONSTRAINT cities_are_unique;

COMMIT;
