CREATE TABLE `BuildWiseDB`.`Specialization` (
  `idSpecialization` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idSpecialization`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);