DROP DATABASE IF EXISTS postgres;
CREATE TABLE postgres;

--Types

DROP TYPE IF EXISTS GENDERS;
CREATE TYPE GENDERS AS ENUM ('Male', 'Female', 'Other');

--Tables
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles(
    id_user_role UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(100) NOT NULL,
    role_description TEXT NULL,
    role_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL
);

DROP TABLE IF EXISTS user_account;
CREATE TABLE user_account(
    id_user_account UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NULL,
    gender GENDERS NOT NULL,
    date_of_birth DATE NOT NULL,
    fk_user_roles UUID,
    user_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (fk_user_roles) REFERENCES user_roles(id_user_role) ON UPDATE CASCADE ON DELETE CASCADE
);