CREATE TABLE `BuildWiseDB`.`Role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRole`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);