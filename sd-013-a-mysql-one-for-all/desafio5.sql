CREATE VIEW top_2_hits_do_momento as
SELECT cancao as cancao, count(cancao) as reproducoes FROM SpotifyClone.cancoes as c
inner join historico_de_reproducoes h 
on h.id_cancao = c.id_cancao 
group by cancao 
order by reproducoes desc, cancao 
limit 2;