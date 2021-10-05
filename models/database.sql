CREATE TABLE users
(user_id SERIAL PRIMARY KEY NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
UNIQUE (email));
-- appointment  section
CREATE TABLE appointments
(id SERIAL PRIMARY KEY NOT NULL,
fname VARCHAR(150) NOT NULL,
email VARCHAR(250) NOT NULL,
mobile VARCHAR(16) NOT NULL,
book_appoint TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW());

-- role section
CREATE TABLE roles
(id SERIAL PRIMARY KEY NOT NULL,
role_name VARCHAR(50) NOT NULL,
role_description TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW());

-- user_role section
CREATE TABLE user_role
(id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER NOT NULL,
role_id INTEGER NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW());
    
    -- role_permission section
CREATE TABLE role_permissions
(id SERIAL PRIMARY KEY NOT NULL,
role_id INTEGER NOT NULL,
permission_id INTEGER NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW());
    
    -- permission section
CREATE TABLE permissions
(id SERIAL PRIMARY KEY NOT NULL,
permission_name VARCHAR(50) NOT NULL,
permission_description TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW());
    
