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
    last_name VARCHAR(100) NOT NULL,
    extra_name VARCHAR(100) NULL,
    gender GENDERS NOT NULL,
    date_of_birth DATE NOT NULL,
    user_profile TEXT NULL,
    fk_user_roles UUID NOT NULL,
    user_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (fk_user_roles) REFERENCES user_roles(id_user_role) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_credentials;
CREATE TABLE user_credentials(
    id_user_credential UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    user_token TEXT NULL,
    last_login TIMESTAMP NULL,
    last_try TIMESTAMP NULL,
    login_attemps INT NOT NULL DEFAULT 0,
    fk_user_account UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (fk_user_account) REFERENCES user_account(id_user_account) ON UPDATE CASCADE ON DELETE CASCADE
); 

DROP TABLE IF EXISTS cinema_global;
CREATE TABLE cinema_global(
    id_cinema_global UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    image TEXT,
    fk_admin_user UUID NOT NULL,
    setting_step SMALLINT DEFAULT 0 NOT NULL,
    config_finished BOOLEAN DEFAULT false NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (fk_admin_user) REFERENCES user_account(id_user_account) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS cinema_tmdb_credentials;
CREATE TABLE cinema_tmdb_credentials(
    id_cinema_tmdb_credential UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tmdb_api_key TEXT NULL,
    tmdb_access_token TEXT NULL,
    fk_cinema UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (fk_cinema) REFERENCES cinema_global(id_cinema_global) ON UPDATE CASCADE ON DELETE CASCADE
);