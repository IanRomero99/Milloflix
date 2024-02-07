-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_milloflix
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_milloflix
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_milloflix` DEFAULT CHARACTER SET utf8 ;
USE `bd_milloflix` ;

-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;

INSERT INTO `tbl_rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Admin'),
(2, 'Cliente');





-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `nombre_user` VARCHAR(45) NULL,
  `pwd_user` VARCHAR(20) NULL,
  `id_rol` INT NULL,
  `id_like_user` INT NULL,
  `correo_user` VARCHAR(100) NULL, -- Agregué el campo correo_user
  PRIMARY KEY (`id_user`),
  INDEX `id_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `id_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `bd_milloflix`.`tbl_rol` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

INSERT INTO `bd_milloflix`.`tbl_user` (`nombre_user`, `pwd_user`, `id_rol`, `id_like_user`, `correo_user`)
VALUES ('Ian', SHA2('QWEqwe123', 256), 1, 101, 'ian@gmail.com');

INSERT INTO `bd_milloflix`.`tbl_user` (`nombre_user`, `pwd_user`, `id_rol`, `id_like_user`, `correo_user`)
VALUES ('Nil', SHA2('QWEqwe1234', 256), 1, 102, 'nil@gmail.com');

INSERT INTO `bd_milloflix`.`tbl_user` (`nombre_user`, `pwd_user`, `id_rol`, `id_like_user`, `correo_user`)
VALUES ('Eric', SHA2('ASDasd123', 256), 2, 103, 'eric@gmail.com');

INSERT INTO `bd_milloflix`.`tbl_user` (`nombre_user`, `pwd_user`, `id_rol`, `id_like_user`, `correo_user`)
VALUES ('Guillem', SHA2('Talalpd123', 256), 2, 104, 'guillem@gmail.com');

INSERT INTO `bd_milloflix`.`tbl_user` (`nombre_user`, `pwd_user`, `id_rol`, `id_like_user`, `correo_user`)
VALUES ('Pau', SHA2('Pawiwitouran', 256), 2, 105, 'pau@gmail.com');


-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_genero` (
  `id_gen` INT NOT NULL AUTO_INCREMENT,
  `nombre_gen` VARCHAR(45) NULL,
  PRIMARY KEY (`id_gen`))
ENGINE = InnoDB;

-- Insertar género "Acción"
INSERT INTO `bd_milloflix`.`tbl_genero` (`nombre_gen`) VALUES ('Acción');

-- Insertar género "Comedia"
INSERT INTO `bd_milloflix`.`tbl_genero` (`nombre_gen`) VALUES ('Comedia');

-- Insertar género "Drama"
INSERT INTO `bd_milloflix`.`tbl_genero` (`nombre_gen`) VALUES ('Drama');


-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_pais` (
  `id_pais` INT NOT NULL AUTO_INCREMENT,
  `nombre_pais` VARCHAR(45) NULL,
  PRIMARY KEY (`id_pais`))
ENGINE = InnoDB;

-- Insertar país "Estados Unidos"
INSERT INTO `bd_milloflix`.`tbl_pais` (`nombre_pais`) VALUES ('Estados Unidos');

-- Insertar país "Reino Unido"
INSERT INTO `bd_milloflix`.`tbl_pais` (`nombre_pais`) VALUES ('Reino Unido');

-- Insertar país "Francia"
INSERT INTO `bd_milloflix`.`tbl_pais` (`nombre_pais`) VALUES ('Francia');


-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_ano`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_ano` (
  `id_ano_peli` INT NOT NULL AUTO_INCREMENT,
  `ano` VARCHAR(45) NULL,
  PRIMARY KEY (`id_ano_peli`))
ENGINE = InnoDB;

-- Insertar un año específico
INSERT INTO `bd_milloflix`.`tbl_ano` (`ano`) VALUES ('2000');

-- Insertar otro año específico
INSERT INTO `bd_milloflix`.`tbl_ano` (`ano`) VALUES ('2010');

-- Insertar un tercer año específico
INSERT INTO `bd_milloflix`.`tbl_ano` (`ano`) VALUES ('2020');



-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_trabajo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_trabajo` (
  `id_trabajo` INT NOT NULL AUTO_INCREMENT,
  `nombre_trabajo` VARCHAR(45) NULL,
  PRIMARY KEY (`id_trabajo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_peliculas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_peliculas` (
  `id_peli` INT NOT NULL AUTO_INCREMENT,
  `desc_peli` MEDIUMTEXT NULL,
  `caratula_peli` VARCHAR(255) NULL,
  `trailer_peli` VARCHAR(255) NULL,
  `id_ano_peli` INT NULL,
  `id_pais` INT NULL,
  `id_gen` INT NULL,
  `id_dir` INT NULL,
  `id_trabajo` INT NULL,
  PRIMARY KEY (`id_peli`),
  INDEX `id_gen_idx` (`id_gen` ASC) VISIBLE,
  INDEX `id_pais_idx` (`id_pais` ASC) VISIBLE,
  INDEX `id_ano_peli_idx` (`id_ano_peli` ASC) VISIBLE,
  INDEX `id_trabajo_idx` (`id_trabajo` ASC) VISIBLE,
  CONSTRAINT `id_gen`
    FOREIGN KEY (`id_gen`)
    REFERENCES `bd_milloflix`.`tbl_genero` (`id_gen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_pais`
    FOREIGN KEY (`id_pais`)
    REFERENCES `bd_milloflix`.`tbl_pais` (`id_pais`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_ano_peli`
    FOREIGN KEY (`id_ano_peli`)
    REFERENCES `bd_milloflix`.`tbl_ano` (`id_ano_peli`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_trabajo`
    FOREIGN KEY (`id_trabajo`)
    REFERENCES `bd_milloflix`.`tbl_trabajo` (`id_trabajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_likes` (
  `id_likes` INT NOT NULL AUTO_INCREMENT,
  `id_likes_user` INT NULL,
  `id_likes_peli` INT NULL,
  PRIMARY KEY (`id_likes`),
  INDEX `id_likes_peli_idx` (`id_likes_peli` ASC) VISIBLE,
  INDEX `id_likes_user_idx` (`id_likes_user` ASC) VISIBLE,
  CONSTRAINT `id_likes_peli`
    FOREIGN KEY (`id_likes_peli`)
    REFERENCES `bd_milloflix`.`tbl_peliculas` (`id_peli`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_likes_user`
    FOREIGN KEY (`id_likes_user`)
    REFERENCES `bd_milloflix`.`tbl_user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_estado` (
  `id_estado` INT NOT NULL AUTO_INCREMENT,
  `nombre_estado` VARCHAR(45) NULL,
  PRIMARY KEY (`id_estado`))
ENGINE = InnoDB;

-- Insertar estado "Pendiente"
INSERT INTO `bd_milloflix`.`tbl_estado` (`nombre_estado`) VALUES ('Pendiente');

-- Insertar estado "Aceptado"
INSERT INTO `bd_milloflix`.`tbl_estado` (`nombre_estado`) VALUES ('Aceptado');

-- Insertar estado "Rechazado"
INSERT INTO `bd_milloflix`.`tbl_estado` (`nombre_estado`) VALUES ('Rechazado');



-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_solicitud`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_solicitud` (
  `id_solicitud` INT NOT NULL AUTO_INCREMENT,
  `id_emisor` INT NULL,
  `id_receptor` INT NULL,
  `id_estado` INT NULL,
  `` VARCHAR(45) NULL,
  PRIMARY KEY (`id_solicitud`),
  INDEX `id_estado_idx` (`id_estado` ASC) VISIBLE,
  INDEX `id_emisor_idx` (`id_emisor` ASC) VISIBLE,
  INDEX `id_receptor_idx` (`id_receptor` ASC) VISIBLE,
  CONSTRAINT `id_estado`
    FOREIGN KEY (`id_estado`)
    REFERENCES `bd_milloflix`.`tbl_estado` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_emisor`
    FOREIGN KEY (`id_emisor`)
    REFERENCES `bd_milloflix`.`tbl_user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_receptor`
    FOREIGN KEY (`id_receptor`)
    REFERENCES `bd_milloflix`.`tbl_user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insertar solicitud con estado pendiente
INSERT INTO `bd_milloflix`.`tbl_solicitud` (`id_emisor`, `id_receptor`, `id_estado`) 
VALUES (3, 1, 1);

-- Insertar solicitud con estado aceptado
INSERT INTO `bd_milloflix`.`tbl_solicitud` (`id_emisor`, `id_receptor`, `id_estado`) 
VALUES (3, 4, 2);

-- Insertar solicitud con estado rechazado
INSERT INTO `bd_milloflix`.`tbl_solicitud` (`id_emisor`, `id_receptor`, `id_estado`) 
VALUES (5, 6, 3);

-- -----------------------------------------------------
-- Table `bd_milloflix`.`tbl_personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_milloflix`.`tbl_personal` (
  `id_pers` INT NOT NULL AUTO_INCREMENT,
  `nombre_pers` VARCHAR(45) NULL,
  `id_trabajo` INT NULL,
  PRIMARY KEY (`id_pers`),
  INDEX `id_trabajo_idx` (`id_trabajo` ASC) VISIBLE,
  CONSTRAINT `id_trabajo`
    FOREIGN KEY (`id_trabajo`)
    REFERENCES `bd_milloflix`.`tbl_trabajo` (`id_trabajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
