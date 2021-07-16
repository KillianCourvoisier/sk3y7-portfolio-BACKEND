-- Deploy sk3y7-portfolio:init to pg

BEGIN;

-- XXX Add DDLs here.BEGIN;

CREATE TABLE localisation (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city text NOT NULL,
    country text NOT NULL
);

CREATE TABLE album (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text UNIQUE NOT NULL,
    created_at text NOT NULL,
    updated_at text NOT NULL,
    localisation_id int REFERENCES localisation(id)
);

CREATE TABLE photo (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text UNIQUE NOT NULL,
    image_url text UNIQUE NOT NULL,
    created_at text NOT NULL,
    shot_date text NOT NULL,
    camera_brand text NOT NULL,
    camera_model text NOT NULL,
    exposure_time decimal NOT  NULL,
    exposure_program text NOT NULL,
    aperture_value int NOT NULL,
    focal_lenght  int NOT NULL,
    shutter_speed text NOT NULL,
    iso_value int NOT NULL,
    software_used text NOT NULL,
    localisation_id int REFERENCES localisation(id),
    album_id int NOT NULL REFERENCES album(id)
);



CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text UNIQUE NOT NULL,
    color text UNIQUE NOT NULL
);

CREATE TABLE album_has_photo (
    album_id int NOT NULL REFERENCES album(id),
    photo_id int NOT NULL REFERENCES photo(id)
);

CREATE TABLE album_has_category (
    album_id int NOT NULL REFERENCES album(id),
    category_id int NOT NULL REFERENCES category(id)
);

CREATE TABLE photo_has_category (
    photo_id int NOT NULL REFERENCES photo(id),
    category_id int NOT NULL REFERENCES category(id)
);

COMMIT;
