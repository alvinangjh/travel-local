<?php

include_once 'Itinerary.php';
include_once 'connection.php';

class itineraryDAO {
    
    // This public function is callable from OUTSIDE 'ItineraryDAO' class
    // By calling this function, the caller can retrieve ALL rows from 'Itinerary' Database table
    // It returns an Indexed Array of Itinerary objects
    public function getItineraries($userID) {
        
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection(); // PDO object
        
        $sql = "SELECT
                    *
                FROM
                    itinerary
                WHERE
                    userID = :userID";
                    
        $stmt = $pdo->prepare($sql); // SQLStatement object
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->execute(); // RUN SQL
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $itineraries = [];
        while ( $row = $stmt->fetch() ) {
            $itinerary = new itinerary( 
                        $row['itineraryID'], 
                        $row['name'], 
                        $row['startDate'], 
                        $row['endDate'], 
                        $row['itineraryType'],
                        $row['userID'] 
                    ); // new itinerary object
            $itineraries[] = $itinerary; // add itinerary object to ret array
        }
        // $itineraryID; $name; $startDate; $endDate; $userID;

        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        return $itineraries;
    }

   

    // Returns an Indexed Array of cats with a given 'status'
    public function getCatsByStatus($status) {
        // $status == 'A' or 'P'

        // STEP 1
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect(); // PDO object
        

        // STEP 2
        $sql = "SELECT
                    name, age, gender, status 
                FROM
                    cat
                WHERE
                    status = :gender ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        
        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
       
        // STEP 4
        $cats = [];
        while ($row = $stmt->fetch() ) {
            $cat = new Cat( 
                    $row['name'], 
                    $row['age'], 
                    $row['gender'], 
                    $row['status'] 
                );
            $cats[] = $cat;
        }
        
        // STEP 5
        $stmt = null;
        $pdo = null;       

        // STEP 6
        return $cats;
    }


    // Returns an Indexed Array of cats with a given 'gender'
    public function getCatsByGender($gender) {

        // STEP 1
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect(); // PDO object
        
        // STEP 2
        $sql = "SELECT
                    name, age, gender, status 
                FROM
                    cat
                WHERE
                    gender = :gender ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
        
        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        // STEP 4
        $cats = [];
        while ($row = $stmt->fetch() ) {
            $cat = new Cat( 
                    $row['name'], 
                    $row['age'], 
                    $row['gender'], 
                    $row['status'] 
                );
            $cats[] = $cat;
        }
        
        // STEP 5
        $stmt = null;
        $pdo = null;        
        
        // STEP 6
        return $cats;
    }



    // Returns an Indexed Array of cats with a given 'gender' AND a given 'status'
    public function getCatsByGenderStatus($gender, $status) {

        // STEP 1
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect(); // PDO object
        
        // STEP 2
        // Prepare SQL statement
        $sql = "SELECT *
                FROM
                    cat
                WHERE
                    gender = :gender
                    AND
                    status = :status ";       

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);


        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // Retrieve each row as an Associative Array
        

        // STEP 4
        $cats = [];
        while ($row = $stmt->fetch() ) {
            $cat = new Cat( 
                    $row['name'], 
                    $row['age'], 
                    $row['gender'], 
                    $row['status'] 
                );
            $cats[] = $cat;
        }

        
        // STEP 5
        $stmt = null;
        $pdo = null;        
        

        // STEP 6
        return $cats;
    }


    /**
     * @param string $status '-' for any status, 'A', or 'P'
     * @param string $gender 'A' for any gender, 'M', or 'F'
     * @param string $max_age '' means any age.  Otherwise, it will be an integer >= 0
     * @return array of Cat objects that match the filter criteria.
     */
    public function getCatsFilter($status, $gender, $max_age) {

        // STEP 1
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect(); // PDO object

        // STEP 2
        $sql = "SELECT
                    name, age, gender, status 
                FROM
                    cat
                WHERE";
        
        $have_status = False;
        $have_gender = False;
        $have_max_age = False;

        if( $status == '-' ) {
            $sql .= " status IN ('A', 'P')";
        }
        else {
            $sql .= " status = :status";
            $have_status = True;
        } // Status
        
        if( $gender == 'M' || $gender == 'F' ) {
            $sql .= " AND gender = :gender";
            $have_gender = True;
        } // Gender

        if( $max_age != '' ) { 
            $sql .= " AND age <= :max_age";
            $have_max_age = True;
        } // Max Age

        $stmt = $pdo->prepare($sql);

        if( $have_status )
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        if( $have_gender )
            $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
        if( $have_max_age )
            $stmt->bindParam(':max_age', $max_age, PDO::PARAM_INT);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // Retrieve each row as an Associative Array
        
        // STEP 4
        $cats = [];
        while ($row = $stmt->fetch() ) {
            $cat = new Cat( 
                    $row['name'], 
                    $row['age'], 
                    $row['gender'], 
                    $row['status'] 
                );
            $cats[] = $cat;
        }
        
        // STEP 5
        $stmt = null;
        $pdo = null;        
        
        // STEP 6
        return $cats;
    }


    // Find a cat by $name
    // Return TRUE (if the cat is found) or FALSE (otherwise)
    public function isCatFound($name) {

        // STEP 1 - Connect to MySQL Database
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "SELECT 
                *
                FROM
                cat
                WHERE
                name = :name

        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        // STEP 3 - Run Query
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // STEP 4 - Is this cat found in cat table?
        $isFound = False;
        if ($stmt->RowCount() == 1) {
            $isFound = True;
        }
        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        // STEP 6
        return $isFound;
    }

    

    // Find a cat by $name
    // If he/she is found in database,
    //    Return a new Cat object
    // Else
    //    Return NULL
    public function getCatByName($name) {

        // STEP 1 - Connect to MySQL Database
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect();
        
        $sql = "SELECT * FROM cat WHERE name = :name";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // STEP 4 - Is this cat found in cat table?
        $cat = null; // Null by default
            if ($row = $stmt->fetch() ) {
                $cat = new Cat( 
                        $row['name'], 
                        $row['age'], 
                        $row['gender'], 
                        $row['status'] 
                    );
            }
        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        // STEP 6
        return $cat;
    }


    // Adds a new cat
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function add($name, $age, $gender) {        
        // For new cats, default is 'A' (available)
        $status = 'A';

        // STEP 1 - Connect to MySQL Database
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "
            INSERT INTO
            cat
            VALUES
                (:name , :age, :gender, 'A')
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);

        // STEP 3 - Run Query
        $isOk = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $pdo = null;        
        
        // STEP 5
        return $isOk; //result of insertion, True or False
    }


    // Delete a cat
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function delete($name) {      

        // STEP 1 - Connect to MySQL Database
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "
            DELETE FROM
            cat
            WHERE
                name = :name
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        // STEP 3 - Run Query
        $isOk = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $pdo = null;        
        
        // STEP 5
        return $isOk;
    }



    // Update cat's status
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function updateStatus($name, $status) {

        // STEP 1 - Connect to MySQL Database
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "
            UPDATE
            cat
            SET
            status = :status
            WHERE
                name = :name
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        // STEP 3 - Run Query
        $isOk = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $pdo = null;        
        
        // STEP 5
        return $isOk;
    }
   


    // Update cat's details
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function update($name, $age, $gender, $status) {        
              
                // STEP 1 - Connect to MySQL Database
                $connMgr = new ConnectionManager();
                $pdo = $connMgr->connect();
                // STEP 2 - Prepare SQL Query
                $sql = "
                    UPDATE
                    cat
                    SET
                    status = :status,
                    age = :age,
                    gender = :gender
                    WHERE
                        name = :name
                ";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':status', $status, PDO::PARAM_STR);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':age', $age, PDO::PARAM_INT);
                // STEP 3 - Run Query
                $isOk = $stmt->execute();
                
                // STEP 4
                $stmt = null;
                $pdo = null;        
                
                // STEP 5
                return $isOk;
    }

}
