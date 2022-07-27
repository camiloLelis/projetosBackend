CREATE VIEW top_3_artistas as
SELECT a.artista as artista, count(a.artista) as seguidores 
FROM SpotifyClone.artistas as a
inner join SpotifyClone.seguindo as s
on a.id_artista = s.id_artista
group by artista order by seguidores
desc, artista limit 3;