DROP DATABASE IF EXISTS mthdb;
CREATE DATABASE mthdb;

--- this is a comment 
\c mthdb;

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR (200),
            last_name VARCHAR (200),
            email VARCHAR (200) unique,
            pass_word VARCHAR (200),
            course_id bigint,
            tutor_id  bigint
        );

         CREATE TABLE courses (
            id SERIAL PRIMARY KEY,
            course_name VARCHAR (200),
            course_code VARCHAR (200),
            course_desc VARCHAR (200),
            course_level VARCHAR (200),
            course_image VARCHAR (200)
         );

         SELECT * FROM users;
         SELECT * FROM courses;
 