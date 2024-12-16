CREATE TABLE `BuildWiseDB`.`Review` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `review_text` TEXT NULL,
  `approved` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idReview`),
  INDEX `client_id_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `client_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `BuildWiseDB`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `review_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `BuildWiseDB`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);