
DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` mediumint(9) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` mediumint(9),
  `messages` varchar(500) NOT NULL DEFAULT '',
  `timeadded` TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
