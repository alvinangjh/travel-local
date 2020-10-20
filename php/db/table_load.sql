drop database if exists travel_local;

create database travel_local;

use travel_local;

CREATE TABLE if not exists `user` (
  `userID` integer NOT NULL AUTO_INCREMENT,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `emailAddress` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE if not exists `itinerary` (
  `itineraryID` integer NOT NULL,
  `name` varchar(256) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `userID` integer NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE if not exists `activity` (
  `activityID` integer NOT NULL,
  `poiUUID` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE if not exists `custom_loc` (
  `locID` integer NOT NULL,
  `locTitle` varchar(256) NOT NULL,
  `locAddress` varchar(256) NOT NULL,
  `locPostalCode` integer NOT NULL,
  `locDesc` varchar(256) NULL,
  `recDuration` integer NOT NULL,
  `rating` integer NOT NULL,
  `imageUrl` varchar(256) NOT NULL,
  `createdBy` integer NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE if not exists `review` (
  `reviewID` integer NOT NULL,
  `reviewDesc` varchar(256) NOT NULL,
  `rating` varchar(256) NOT NULL,
  `reviewDate` datetime NOT NULL,
  `locID` integer NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;