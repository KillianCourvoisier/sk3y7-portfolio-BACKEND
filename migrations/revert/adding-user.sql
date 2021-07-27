-- Revert sk3y7-portfolio:adding-user from pg

BEGIN;

DROP TABLE IF EXISTS "user";

COMMIT;
