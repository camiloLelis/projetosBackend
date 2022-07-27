CREATE VIEW historico_reproducao_usuarios AS
select u.usuario as usuario, c.cancao as nome
from usuarios as u
inner join cancoes as c
inner join historico_de_reproducoes h
on c.id_cancao = h.id_cancao and
u.id_usuario = h.id_usuario
order by u.usuario, c.cancao; 