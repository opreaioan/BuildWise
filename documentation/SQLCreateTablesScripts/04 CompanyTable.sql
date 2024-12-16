CREATE TABLE `BuildWiseDB`.`Company` (
  `idCompany` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `logo` MEDIUMBLOB NULL,
  `about` TEXT NULL,
  `company_type` VARCHAR(100) NULL,
  `year_established` YEAR NULL,
  `adress` TEXT NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(100) NULL,
  `website_url` VARCHAR(255) NULL,
  `social_media` JSON NULL,
  `geographical_availability` TEXT NULL,
  PRIMARY KEY (`idCompany`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `BuildWiseDB`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);