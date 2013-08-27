
DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `id` mediumint(9) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` mediumint(9),
  `steps` mediumint(9) ,
  `timeadded` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
