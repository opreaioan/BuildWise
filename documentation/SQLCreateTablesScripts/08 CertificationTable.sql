CREATE TABLE `BuildWiseDB`.`Certification` (
  `idCertification` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `certification_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idCertification`),
  CONSTRAINT `certification_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `BuildWiseDB`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);