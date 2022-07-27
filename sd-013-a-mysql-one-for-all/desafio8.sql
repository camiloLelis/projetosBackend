USE SpotifyClone;

DELIMITER $$
CREATE TRIGGER trigger_usuario_delete
    BEFORE DELETE ON SpotifyClone.usuarios
    FOR EACH ROW
BEGIN
    DELETE from SpotifyClone.seguindo where id_usuario = old.id_usuario;
    DELETE from SpotifyClone.historico_de_reproducoes where id_usuario = old.id_usuario;
END $$
DELIMITER ;
