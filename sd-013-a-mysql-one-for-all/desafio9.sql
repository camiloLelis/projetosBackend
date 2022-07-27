USE SpotifyClone;
DELIMITER $$

CREATE PROCEDURE albuns_do_artista(IN artista VARCHAR(100))
BEGIN   
select a.artista, al.album from artistas as a
inner join albuns as al on
a.id_artista = al.id_artista and
a.artista = artista
order by album ;
END $$

DELIMITER ;