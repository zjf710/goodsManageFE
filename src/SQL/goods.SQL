DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(50) DEFAULT NULL,
  `order_taker` varchar(50) DEFAULT NULL,
  `publish_man` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `start_place` varchar(50) DEFAULT NULL,
  `start_place_detail` varchar(255) DEFAULT NULL,
  `end_place` varchar(50) DEFAULT NULL,
  `end_place_detail` varchar(255) DEFAULT NULL,
  `car_long` varchar(50) DEFAULT NULL,
  `car_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
