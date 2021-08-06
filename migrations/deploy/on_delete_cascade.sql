-- Deploy sk3y7-portfolio:on_delete_cascade to pg

BEGIN;

ALTER TABLE album_has_category
DROP CONSTRAINT album_has_category_category_id_fkey,
DROP CONSTRAINT album_has_category_album_id_fkey;

ALTER TABLE album_has_category
ADD CONSTRAINT album_has_category_category_id_fkey
    FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE CASCADE ;

ALTER TABLE album_has_category
ADD CONSTRAINT album_has_category_album_id_fkey
    FOREIGN KEY (album_id)
    REFERENCES album(id)
    ON DELETE CASCADE ;

-------------------------------------------------------------------------------

ALTER TABLE photo_has_category
DROP CONSTRAINT photo_has_category_category_id_fkey,
DROP CONSTRAINT photo_has_category_photo_id_fkey;

ALTER TABLE photo_has_category
ADD CONSTRAINT photo_has_category_category_id_fkey
    FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE CASCADE ;

ALTER TABLE photo_has_category
ADD CONSTRAINT photo_has_category_photo_id_fkey
    FOREIGN KEY (photo_id)
    REFERENCES photo(id)
    ON DELETE CASCADE ;

-------------------------------------------------------------------------------

ALTER TABLE album_has_photo
DROP CONSTRAINT album_has_photo_album_id_fkey,
DROP CONSTRAINT album_has_photo_photo_id_fkey;

ALTER TABLE album_has_photo
ADD CONSTRAINT album_has_photo_album_id_fkey
    FOREIGN KEY (album_id)
    REFERENCES album(id)
    ON DELETE CASCADE ;

ALTER TABLE album_has_photo
ADD CONSTRAINT album_has_photo_photo_id_fkey
    FOREIGN KEY (photo_id)
    REFERENCES photo(id)
    ON DELETE CASCADE ;

-------------------------------------------------------------------------------

ALTER TABLE photo
DROP CONSTRAINT photo_localisation_id_fkey,
DROP CONSTRAINT photo_album_id_fkey;

ALTER TABLE photo
ADD CONSTRAINT photo_localisation_id_fkey
    FOREIGN KEY (localisation_id)
    REFERENCES localisation(id)
    ON DELETE SET NULL;

ALTER TABLE photo
ADD CONSTRAINT photo_album_id_fkey
    FOREIGN KEY (album_id)
    REFERENCES album(id)
    ON DELETE SET DEFAULT ;

-------------------------------------------------------------------------------

ALTER TABLE album
DROP CONSTRAINT album_localisation_id_fkey;

ALTER TABLE album
ADD CONSTRAINT album_localisation_id_fkey
    FOREIGN KEY (localisation_id)
    REFERENCES localisation(id)
    ON DELETE SET NULL ;

COMMIT;
