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
    `itineraryID` integer NOT NULL
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


insert into user values (1, 'Ellia', 'Ryan', 'e.ryan@randatmail.com', 'hashEllia');
insert into user values (2, 'Amanda', 'Ryan', 'a.ryan@randatmail.com', 'hashAmanda');
insert into user values (3, 'George', 'Chapman', 'g.chapman@randatmail.com', 'hashGeorge');
insert into user values (4, 'Maya', 'Douglas', 'm.douglas@randatmail.com', 'hashMaya');
insert into user values (5, 'Oscar', 'Wells', 'o.wells@randatmail.com', 'hashOscar');
insert into user values (6, 'Eric', 'Mason', 'e.mason@randatmail.com', 'hashEric');
insert into user values (7, 'Victoria', 'Roberts', 'v.roberts@randatmail.com', 'hashVictoria');
insert into user values (8, 'Cherry', 'Morrison', 'c.morrison@randatmail.com', 'hashCherry');
insert into user values (9, 'John', 'Mitchell', 'j.mitchell@randatmail.com', 'hashJohn');
insert into user values (10, 'Lily', 'Harris', 'l.harris@randatmail.com', 'hashLily');
insert into user values (11, 'Aldus', 'Anderson', 'a.anderson@randatmail.com', 'hashAldus');
insert into user values (12, 'Ryan', 'Scott', 'r.scott@randatmail.com', 'hashRyan');


insert into itinerary values (1,'Down the rabbit hole', '2020/10/19', "2020/10/20",'Nature', "1", 0);
insert into itinerary values (2,'Ready, STEADY, Go!', '2020/10/19', "2020/10/20",'Romantic', "2", 2);
insert into itinerary values (3,"Let's go down for coffee", '2020/10/19', "2020/10/20",'Casual', "2", 4);
insert into itinerary values (4,'Make Singapore great again', '2020/08/19', "2020/08/20",'Family', "3", 16);
insert into itinerary values (5, "Proof That TRIP Really Works", '2020/11/18', '2020/11/24', 'Nature', 5, 36);
insert into itinerary values (6, "3 Easy Ways To Make TRIP Faster", '2020/11/17', '2020/11/27', 'Casual', 12, 196);
insert into itinerary values (7, "Fast-Track Your TRIP", '2020/11/30', '2020/12/08', 'Casual', 7, 155);
insert into itinerary values (8, "Listen To Your Customers. They Will Tell You All About TRIP", '2020/12/24', '2021/01/03', 'Family', 5, 81);
insert into itinerary values (9, "15 Tips For TRIP Success", '2020/11/19', '2020/11/28', 'Casual', 7, 75);
insert into itinerary values (10, "No More Mistakes With TRIP", '2020/12/09', '2020/12/16', 'Nature', 3, 31);
insert into itinerary values (11, "7 Ways To Keep Your TRIP Growing Without Burning The Midnight Oil", '2020/12/02', '2020/12/03', 'Romantic', 5, 140);
insert into itinerary values (12, "Fascinating TRIP Tactics That Can Help Your Business Grow", '2020/11/29', '2020/11/30', 'Family', 3, 43);
insert into itinerary values (13, "How To Make Your TRIP Look Amazing In 5 Days", '2020/12/05', '2020/12/11', 'Nature', 12, 158);
insert into itinerary values (14, "TRIP Shortcuts - The Easy Way", '2020/12/05', '2020/12/13', 'Nature', 7, 191);
insert into itinerary values (15, "TRIP: What A Mistake!", '2020/11/23', '2020/11/29', 'Romantic', 5, 57);
insert into itinerary values (16, "15 Lessons About TRIP You Need To Learn To Succeed", '2020/12/08', '2020/12/09', 'Family', 4, 104);
insert into itinerary values (17, "Top 25 Quotes On TRIP", '2020/11/13', '2020/11/23', 'Nature', 14, 110);
insert into itinerary values (18, "Who Else Wants To Enjoy TRIP", '2020/12/26', '2021/01/02', 'Nature', 14, 39);
insert into itinerary values (19, "10 Unforgivable Sins Of TRIP", '2020/12/14', '2020/12/17', 'Casual', 5, 131);
insert into itinerary values (20, "Best TRIP Android/iPhone Apps", '2020/11/14', '2020/11/18', 'Nature', 15, 171);
insert into itinerary values (21, "Who Else Wants To Be Successful With TRIP", '2020/12/24', '2020/12/28', 'Romantic', 5, 154);
insert into itinerary values (22, "How To Turn TRIP Into Success", '2020/11/12', '2020/11/16', 'Casual', 8, 97);
insert into itinerary values (23, "Here Is What You Should Do For Your TRIP", '2020/11/12', '2020/11/21', 'Family', 2, 118);
insert into itinerary values (24, "Find A Quick Way To TRIP", '2020/11/25', '2020/11/30', 'Family', 8, 73);
insert into itinerary values (25, "Secrets To Getting TRIP To Complete Tasks Quickly And Efficiently", '2020/11/11', '2020/11/20', 'Family', 12, 115);
insert into itinerary values (26, "TRIP - So Simple Even Your Kids Can Do It", '2020/11/27', '2020/12/01', 'Family', 3, 159);
insert into itinerary values (27, "Succeed With TRIP In 24 Hours", '2020/12/04', '2020/12/12', 'Casual', 10, 132);
insert into itinerary values (28, "Why Some People Almost Always Make/Save Money With TRIP", '2020/12/05', '2020/12/12', 'Romantic', 15, 76);
insert into itinerary values (29, "How To Get (A) Fabulous TRIP On A Tight Budget", '2020/12/07', '2020/12/08', 'Romantic', 14, 85);
insert into itinerary values (30, "What Is TRIP and How Does It Work?", '2020/12/24', '2021/01/03', 'Family', 10, 196);
insert into itinerary values (31, "Can You Pass The TRIP Test?", '2020/12/20', '2020/12/30', 'Romantic', 11, 143);
insert into itinerary values (32, "The Untold Secret To TRIP In Less Than Ten Minutes", '2020/11/25', '2020/12/02', 'Nature', 10, 121);
insert into itinerary values (33, "Little Known Ways To Rid Yourself Of TRIP", '2020/11/14', '2020/11/17', 'Family', 14, 184);
insert into itinerary values (34, "In 10 Minutes, I'll Give You The Truth About TRIP", '2020/12/26', '2021/01/04', 'Nature', 13, 157);
insert into itinerary values (35, "How To Turn Your TRIP From Zero To Hero", '2020/11/23', '2020/11/24', 'Family', 4, 159);
insert into itinerary values (36, "TRIP: An Incredibly Easy Method That Works For All", '2020/11/21', '2020/11/22', 'Family', 15, 27);
insert into itinerary values (37, "Where Can You Find Free TRIP Resources", '2020/12/08', '2020/12/11', 'Romantic', 13, 132);
insert into itinerary values (38, "Now You Can Have The TRIP Of Your Dreams – Cheaper/Faster Than You Ever Imagined", '2020/11/20', '2020/11/22', 'Romantic', 14, 39);
insert into itinerary values (39, "27 Ways To Improve TRIP", '2020/12/02', '2020/12/12', 'Romantic', 6, 154);
insert into itinerary values (40, "The Ultimate Deal On TRIP", '2020/11/23', '2020/11/30', 'Casual', 12, 127);
insert into itinerary values (41, "At Last, The Secret To TRIP Is Revealed", '2020/12/15', '2020/12/22', 'Nature', 2, 117);
insert into itinerary values (42, "Take 10 Minutes to Get Started With TRIP", '2020/11/27', '2020/12/06', 'Family', 3, 19);
insert into itinerary values (43, "How To Teach TRIP Like A Pro", '2020/12/08', '2020/12/14', 'Nature', 14, 123);
insert into itinerary values (44, "5 Sexy Ways To Improve Your TRIP", '2020/12/14', '2020/12/24', 'Romantic', 11, 90);
insert into itinerary values (45, "I Don't Want To Spend This Much Time On TRIP. How About You?", '2020/12/02', '2020/12/03', 'Romantic', 15, 84);
insert into itinerary values (46, "What Zombies Can Teach You About TRIP", '2020/12/11', '2020/12/16', 'Romantic', 12, 115);
insert into itinerary values (47, "Some People Excel At TRIP And Some Don't - Which One Are You?", '2020/11/29', '2020/12/08', 'Romantic', 6, 93);
insert into itinerary values (48, "Who Else Wants To Know The Mystery Behind TRIP?", '2020/12/20', '2020/12/24', 'Romantic', 3, 70);
insert into itinerary values (49, "Don't Be Fooled By TRIP", '2020/11/18', '2020/11/24', 'Nature', 8, 92);
insert into itinerary values (50, "How To Win Clients And Influence Markets with TRIP", '2020/11/19', '2020/11/29', 'Romantic', 5, 151);
insert into itinerary values (51, "Why You Really Need (A) TRIP", '2020/11/11', '2020/11/12', 'Family', 13, 168);
insert into itinerary values (52, "Sexy TRIP", '2020/11/15', '2020/11/25', 'Casual', 7, 14);
insert into itinerary values (53, "The Lazy Man's Guide To TRIP", '2020/12/09', '2020/12/15', 'Casual', 4, 164);
insert into itinerary values (54, "5 Easy Ways You Can Turn TRIP Into Success", '2020/12/27', '2020/12/28', 'Family', 10, 147);
insert into itinerary values (55, "OMG! The Best TRIP Ever!", '2020/12/10', '2020/12/12', 'Nature', 6, 194);
insert into itinerary values (56, "Wondering How To Make Your TRIP Rock? Read This!", '2020/12/23', '2020/12/24', 'Family', 8, 93);
insert into itinerary values (57, "Old School TRIP", '2020/12/05', '2020/12/07', 'Family', 3, 143);
insert into itinerary values (58, "TRIP Smackdown!", '2020/12/18', '2020/12/23', 'Nature', 9, 5);
insert into itinerary values (59, "Apply These 5 Secret Techniques To Improve TRIP", '2020/12/18', '2020/12/22', 'Casual', 11, 166);
insert into itinerary values (60, "TRIP? It's Easy If You Do It Smart", '2020/12/19', '2020/12/29', 'Nature', 14, 148);
insert into itinerary values (61, "Using 7 TRIP Strategies Like The Pros", '2020/12/18', '2020/12/23', 'Family', 3, 65);
insert into itinerary values (62, "Why I Hate TRIP", '2020/12/30', '2021/01/06', 'Casual', 4, 94);
insert into itinerary values (63, "Does TRIP Sometimes Make You Feel Stupid?", '2020/11/30', '2020/12/09', 'Nature', 11, 145);



    



    -- insert into activity values (1, '002a031ff1aa6b9471e8327b48fb5e2014a'); 
    -- insert into activity values (2, '0026271c23371bb4aafbf5985bef950172e'); 
    -- insert into activity values (3, '002f1eb8d5a13324c56b25344b30465d861'); 
