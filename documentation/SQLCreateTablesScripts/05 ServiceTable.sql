CREATE TABLE `BuildWiseDB`.`Service` (
  `idService` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `service_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idService`),
  CONSTRAINT `service_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `BuildWiseDB`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
