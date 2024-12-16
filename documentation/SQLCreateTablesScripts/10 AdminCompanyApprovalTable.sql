CREATE TABLE `BuildWiseDB`.`AdminCompanyApproval` (
  `idAdminCompanyApproval` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
  PRIMARY KEY (`idAdminCompanyApproval`),
  CONSTRAINT `approval_company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `BuildWiseDB`.`Company` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);