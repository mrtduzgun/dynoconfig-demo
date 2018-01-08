
CREATE TABLE configuration_record (
  id INT PRIMARY KEY AUTO_INCREMENT,
  app_name  VARCHAR(255) NOT NULL,
  is_active BIT          NOT NULL,
  name      VARCHAR(255) NOT NULL,
  type      VARCHAR(255) NOT NULL,
  value     VARCHAR(255) NOT NULL
) ENGINE = InnoDB;