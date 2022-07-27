CREATE VIEW faturamento_atual as
SELECT min(valor) as faturamento_minimo, 
max(valor) as faturamento_maximo,
(SELECT round(avg(valor),2) FROM planos as p
inner join usuarios as u
on u.id_plano = p.id_plano) as faturamento_medio,
(SELECT sum(valor) FROM planos as p
inner join usuarios as u
on u.id_plano = p.id_plano) as faturamento_total
FROM SpotifyClone.planos;