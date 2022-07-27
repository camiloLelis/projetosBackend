DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;
-- primeiro tenho que ter a plano para depois usuario

CREATE TABLE planos(
  id_plano int AUTO_INCREMENT,
  plano VARCHAR(60) NOT NULL,
  valor DECIMAL(5,2) NOT NULL,
  PRIMARY KEY(id_plano)
) engine = InnoDB;

CREATE TABLE usuarios(
  id_usuario int AUTO_INCREMENT,
  usuario VARCHAR(200) NOT NULL,
  idade int NOT NULL,
  id_plano int NOT NULL,
  PRIMARY KEY(id_usuario),
  FOREIGN KEY(id_plano) REFERENCES planos(id_plano)
) engine = InnoDB;

CREATE TABLE artistas(
  id_artista int AUTO_INCREMENT,
  artista VARCHAR(150) NOT NULL,
  PRIMARY KEY(id_artista)
) engine = InnoDB;

CREATE TABLE albuns(
  id_album int AUTO_INCREMENT,
  album VARCHAR(240) NOT NULL,
  id_artista int NOT NULL,
  PRIMARY KEY(id_album),
  FOREIGN key(id_artista) REFERENCES artistas(id_artista)
) engine = InnoDB;

CREATE TABLE cancoes(
  id_cancao int AUTO_INCREMENT,
  cancao VARCHAR(40) NOT NULL,
  id_album int NOT NULL,
  PRIMARY KEY(id_cancao),
  FOREIGN KEY(id_album) REFERENCES albuns(id_album)
) engine = InnoDB;

CREATE TABLE historico_de_reproducoes(
  id_usuario int NOT NULL,
  id_cancao int NOT NULL,
  PRIMARY KEY(id_usuario, id_cancao),
  FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY(id_cancao) REFERENCES cancoes(id_cancao)
) engine = InnoDB;

CREATE TABLE seguindo(
  id_usuario int NOT NULL,
  id_artista int NOT NULL,
  PRIMARY KEY(id_usuario, id_artista),
  FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY(id_artista) REFERENCES artistas(id_artista)
) engine = InnoDB;


INSERT INTO planos (plano, valor)
VALUES
  ('gratuito', 0),
  ('familiar', 7.99),
  ('universitário', 5.99);

INSERT INTO usuarios (usuario, idade, id_plano)
VALUES ('Thati', 23, 1), ('Cintia', 35, 2),
('Bill', 20, 3), ('Roger', 45, 1);

INSERT INTO artistas(artista)
VALUES ('Walter Phoenix'), ('Peter Strong'), ('Lance Day'), ('Freedie Shannon');

INSERT INTO albuns(album, id_artista)
VALUES ('Envious', 1), ('Exuberant', 1), ('Hallowed Steam', 2),
('Incandescent', 3), ('Temporary Culture', 4);

INSERT INTO cancoes(cancao, id_album)
VALUES ("Soul For Us", 1), ("Reflections Of Magic", 1), ("Dance With Her Own", 1),
("Troubles Of My Inner Fire", 2), ("Time Fireworks", 2),
("Magic Circus", 3), ("Honey, So Do I", 3), ("Sweetie, Let's Go Wild", 3), ("She Knows", 3),
("Fantasy For Me", 4), ("Celebration Of More", 4), ("Rock His Everything", 4), 
("Home Forever", 4), ("Diamond Power", 4), ("Honey, Let's Be Silly", 4),
("Thang Of Thunder", 5), ("Words Of Her Life", 5), ("Without My Streets", 5);

INSERT INTO historico_de_reproducoes(id_usuario, id_cancao)
VALUES 
  (1, 1), (1, 6), (1, 14), (1, 16),
  (2, 13), (2, 17), (2, 2), (2, 15),
  (3, 4), (3, 16), (3, 6),
  (4, 3), (4, 18), (4, 11);

INSERT INTO seguindo(id_usuario, id_artista)
VALUES
  (1, 1), (1, 4), (1, 3),
  (2, 1), (2, 3),
  (3, 2), (3, 1),
  (4, 4);
  