CREATE SCHEMA `BuildWiseDB` ;

CREATE TABLE `BuildWiseDB`.`Role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRole`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);
  
  CREATE TABLE `BuildWiseDB`.`Specialization` (
  `idSpecialization` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idSpecialization`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);
  
  CREATE TABLE `BuildWiseDB`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role_id` INT NOT NULL,
  `approved` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `role_id_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `BuildWiseDB`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

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
    
    CREATE TABLE `BuildWiseDB`.`AdminReviewApproval` (
  `idAdminReviewApproval` INT NOT NULL AUTO_INCREMENT,
  `review_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
  PRIMARY KEY (`idAdminReviewApproval`),
  CONSTRAINT `approval_review_id`
    FOREIGN KEY (`review_id`)
    REFERENCES `BuildWiseDB`.`Review` (`idReview`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    CREATE TABLE `BuildWiseDB`.`AdminUserApproval` (
  `idAdminUserApproval` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
  PRIMARY KEY (`idAdminUserApproval`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `approval_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `BuildWiseDB`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);