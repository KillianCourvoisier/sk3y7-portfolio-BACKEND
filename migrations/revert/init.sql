-- Revert sk3y7-portfolio:init from pg

BEGIN;

-- XXX Add DDLs here.

DROP TABLE
        photo_has_category,
        album_has_category,
        album_has_photo,
        category,
        album,
        photo,
        localisation;
COMMIT;
