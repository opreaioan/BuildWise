CREATE TABLE `BuildWiseDB`.`CompanySpecialization` (
  `company_id` INT NOT NULL,
  `specialization_id` INT NOT NULL,
  PRIMARY KEY (`company_id`, `specialization_id`),
  CONSTRAINT `companyspecialization_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `BuildWiseDB`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `companyspecialization_specialization_id`
    FOREIGN KEY (`specialization_id`)
    REFERENCES `BuildWiseDB`.`Specialization` (`idSpecialization`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);