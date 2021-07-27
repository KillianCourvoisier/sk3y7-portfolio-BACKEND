-- Deploy sk3y7-portfolio:adding-user to pg

BEGIN;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL,
    "password" text NOT NULL
);

COMMIT;
