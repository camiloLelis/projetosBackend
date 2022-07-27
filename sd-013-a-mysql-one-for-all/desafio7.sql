CREATE VIEW perfil_artistas as
select artista, al.album, 
(select count(id_artista) from seguindo as s where s.id_artista = a.id_artista) as seguidores
from artistas as a
inner join albuns as al
on a.id_artista = al.id_artista
order by seguidores desc, artista, album;