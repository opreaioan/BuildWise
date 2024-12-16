CREATE TABLE `BuildWiseDB`.`Project` (
  `idProject` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `project_type` VARCHAR(100) NULL,
  `location` VARCHAR(255) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `value` DECIMAL(15,2) NULL,
  `images` MEDIUMBLOB NULL,
  `video` LONGBLOB NULL,
  `social_media` JSON NULL,
  PRIMARY KEY (`idProject`),
  CONSTRAINT `project_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `BuildWiseDB`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);