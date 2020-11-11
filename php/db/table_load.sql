    drop database if exists travel_local;

    create database travel_local;

    use travel_local;

    CREATE TABLE if not exists `user` (
  `userID` integer NOT NULL AUTO_INCREMENT,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `emailAddress` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

    CREATE TABLE if not exists `itinerary` (
    `itineraryID` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(256) NOT NULL,
    `startDate` date NOT NULL,
    `endDate` date NOT NULL,
    `itineraryType` varchar(256) NOT NULL,
    `userID` integer NOT NULL,
    `shared` integer NOT NULL,
    PRIMARY KEY (`itineraryID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

    CREATE TABLE if not exists `activity` (
    `activityID` integer NOT NULL,
    `poiUUID` varchar(256) NOT NULL,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `activityDate` DATE NOT NULL,
    `locType` varchar(256) NOT NULL,
    `itineraryID` integer NOT NULL,
    ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

 CREATE TABLE if not exists `custom_loc` (
  `locID` integer NOT NULL AUTO_INCREMENT,
  `locTitle` varchar(256) NOT NULL,
  `locAddress` varchar(256) NOT NULL,
  `locPostalCode` integer NOT NULL,
  `locDesc` varchar(256) NULL,
  `categories` varchar(256) NOT NULL,
  `rating` integer NOT NULL,
  `imageUrl` varchar(256) NOT NULL,
  `createdBy` integer NOT NULL,
  `latitude` float(18,14) NOT NULL,
  `longitude` float(18,14) NOT NULL,
  `venueType` varchar(256) NOT NULL,
  `businessContact` integer NOT NULL,
  `businessEmail` varchar(256) NOT NULL,
  `startTime` varchar(256) NOT NULL,
  `endTime` varchar(256) NOT NULL,
  `businessWeb` varchar(256) NOT NULL,
  PRIMARY KEY (`locID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

    CREATE TABLE if not exists `review` (
    `reviewID` integer NOT NULL,
    `reviewDesc` varchar(256) NOT NULL,
    `rating` varchar(256) NOT NULL,
    `reviewDate` datetime NOT NULL,
    `locID` integer NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


    


insert into itinerary values (1,'Down the rabbit hole', '2020/10/19', "2020/10/20",'Nature', "1", 0);
insert into itinerary values (2,'Ready, STEADY, Go!', '2020/10/19', "2020/10/20",'Romantic', "2", 2);
insert into itinerary values (3,"Let's go down for coffee", '2020/10/19', "2020/10/20",'Casual', "2", 4);
insert into itinerary values (4,'Make Singapore great again', '2020/08/19', "2020/08/20",'Family', "3", 16);

    -- insert into activity values (1, '002a031ff1aa6b9471e8327b48fb5e2014a'); 
    -- insert into activity values (2, '0026271c23371bb4aafbf5985bef950172e'); 
    -- insert into activity values (3, '002f1eb8d5a13324c56b25344b30465d861'); 
