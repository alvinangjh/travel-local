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
  `startDate` date NOT NULL,
  `endDate` datetime NOT NULL,
  `userID` date NOT NULL
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


insert into user values ("1", "jerreal",'luu', 'Bedok North Street 5 Blk 3018 Singapore 486132', "jerrealluu@freshie.snatcher", "iluvxmm", "10/04/1995");

insert into user values ("2", "elvin",'ung', '9 Changi South Street 3 #07-05 FREIGHT LINK EXPRESS DISTRCENTRE Singapore 486361', "elvinpresley@careyme.pls", "abc123", "09/04/1996");

insert into user values ("3", "jairald",'liong', '320 SERANGOON ROAD #04-55 SERANGOON PLAZA Singapore 218108', "jairald@aphro.dite", "ijustneed1chance", "11/04/1997");


insert into itinerary values (1,'Powaa Ranger Trip', '2020/10/19', "2020/10/20", "1");
insert into itinerary values (2,'Need $? Gov will help', '2020/10/19', "2020/10/20", "2");
insert into itinerary values (3,'Make Singapore great again', '2020/08/19', "2020/08/20", "3");

insert into activity values (1, '10140a0d0e024f0400cb8814cf31a37f2e7');
insert into activity values (2, 'poiUUID2');
insert into activity values (3, 'poiUUID3');
