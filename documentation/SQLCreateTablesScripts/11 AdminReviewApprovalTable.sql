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