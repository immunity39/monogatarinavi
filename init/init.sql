CREATE DATABASE IF NOT EXISTS `django_db`;

USE `django_db`;

CREATE TABLE IF NOT EXISTS `test`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

INSERT INTO `test`(`text`) VALUES('Hello, World!'), ('Hello!'), ('World!');
