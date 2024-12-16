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