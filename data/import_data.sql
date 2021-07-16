BEGIN;

INSERT INTO localisation (city, country)

                    VALUES 
                    ('Dieulefit', 'France'),
                    ('Puerto Santiago', 'Tenerife, Canarias Islands'),
                    ('Montjoux', 'France'),
                    ('Tunis', 'Tunisia');

INSERT INTO album (title, created_at, updated_at, localisation_id)

                    VALUES 
                    ('Landscapes', '18-10-2020 14.04.25', '20-10-2020 10.04.45', null),
                    ('Tenerife', '18-10-2020 14.04.25', '20-10-2020 10.04.45', 2),
                    ('Essais digitaux', '18-10-2020 14.04.25', '20-10-2020 10.04.45', null),
                    ('En amoureux', '18-10-2020 14.04.25', '20-10-2020 10.04.45', 3);

INSERT INTO category (label, color)

                    VALUES 
                    ('Landscape', '#F47BA4'),
                    ('Digital Art', '#97A1E1'),
                    ('Portrait', '#97E1B3'),
                    ('Animaux', '#F595664');

INSERT INTO photo (name, 
                    image_url, 
                    created_at, 
                    shot_date, 
                    camera_brand, 
                    camera_model, 
                    exposure_time, 
                    exposure_program, 
                    aperture_value, 
                    focal_lenght, 
                    shutter_speed, 
                    iso_value, 
                    software_used,
                    localisation_id,
                    album_id) 
                    
                    VALUES
                    ('DSC-001', 'https://pro2-bar-s3-cdn-cf.myportfolio.com/74d6a4a6-bdef-4454-b6ca-1d71f9320cb7/88b5e754-4920-4192-a5f7-f4540e7f7a39.jpg?h=9563361650b224eaaa84e7274251e4c2', '20-10-2020 14.04.25', '18-10-2020 14.04.25', 'Nikon', 'D3200', 00.30, 'night mode', 24, 62, '1/450', 650, 'Adobe Photoshop', 1, 1),
                    ('DSC-002', 'https://pro2-bar-s3-cdn-cf3.myportfolio.com/74d6a4a6-bdef-4454-b6ca-1d71f9320cb7/45446d63-f42e-4f26-a3bd-952c8900d90d.jpg?h=0da301f2982777466fad7f3f0672d386', '20-10-2020 14.04.25', '22-08-2020 12.22.32', 'Nikon', 'D5200', 10.50, 'own config', 32, 80, '1/4000', 300, 'Adobe Photoshop', null, 3),
                    ('DSC-003', 'https://pro2-bar-s3-cdn-cf1.myportfolio.com/74d6a4a6-bdef-4454-b6ca-1d71f9320cb7/9a1263ba-cfc6-46c7-80ef-ce88ccc17507.png?h=5a5e50f4f02c7b075ff788d2233ed83a', '20-10-2020 14.04.25', '22-08-2020 12.22.32', 'Dji', 'Mavic Pro 2', 10.50, 'speed mode', 369, 120, '1/4070', 300, 'Adobe Photoshop', null, 2),
                    ('DSC-004', 'https://pro2-bar-s3-cdn-cf.myportfolio.com/74d6a4a6-bdef-4454-b6ca-1d71f9320cb7/857ac10a-f5a6-4887-b174-24d43bf615b6.png?h=f2c8e8a7fc695ad2c3fd694c7a33fd1b', '20-10-2020 14.04.25', '22-08-2020 12.22.32', 'Dji', 'Mavic Pro 2', 17.62, 'own config', 32, 80, '1/4000', 300, 'Adobe Photoshop', 4, 4);

INSERT INTO album_has_photo (album_id, photo_id)

                    VALUES
                    (1,1),
                    (3,2),
                    (2,3),
                    (4,4);

INSERT INTO album_has_category (album_id, category_id)

                    VALUES
                    (1,1),
                    (2,1),
                    (2,2),
                    (3,2),
                    (3,4),
                    (4,3);

INSERT INTO photo_has_category (photo_id, category_id)

                    VALUES
                    (1,1),
                    (2,2),
                    (2,4),
                    (3,3),
                    (3,4),
                    (4,1),
                    (4,2),
                    (4,3);

COMMIT;