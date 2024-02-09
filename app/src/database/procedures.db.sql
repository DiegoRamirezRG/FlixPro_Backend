CREATE OR REPLACE PROCEDURE getUserAuthenticate(email_param VARCHAR, password_param TEXT, OUT resultado VARCHAR, OUT motivo VARCHAR)
LANGUAGE plpgsql
AS $$
DECLARE
    usuario_record user_credentials%ROWTYPE;
BEGIN
    SELECT * INTO usuario_record FROM user_credentials WHERE email = email_param;

    IF FOUND THEN
        IF usuario_record.login_attemps >= 5 AND usuario_record.last_try IS NOT NULL AND CURRENT_TIMESTAMP - usuario_record.last_try <= '5 minutes' THEN
            resultado := 'cooldown';
            motivo := 'La cuenta está en periodo de espera debido a múltiples intentos fallidos. Por favor, inténtalo más tarde.';
        ELSE
            IF usuario_record.login_attemps >= 5 THEN
                UPDATE user_credentials SET
                    login_attemps = 0
                WHERE email = email_param;
            END IF;
            IF usuario_record.password = password_param THEN
                UPDATE user_credentials SET
                    last_try = NULL,
                    login_attemps = 0,
                    last_login = CURRENT_TIMESTAMP
                WHERE email = email_param;

                resultado := 'success';
                motivo := CONCAT(usuario_record.id_user_credential, '|', usuario_record.fk_user_account);
            ELSE
                UPDATE user_credentials SET
                    last_try = CURRENT_TIMESTAMP,
                    login_attemps = login_attemps + 1
                WHERE email = email_param;

                resultado := 'failed';
                motivo := 'Las contraseñas no coinciden.';
            END IF;
        END IF;
    ELSE
        resultado := 'failed';
        motivo := 'No se encontro la cuenta solicitada.';
    END IF;
END;
$$;
