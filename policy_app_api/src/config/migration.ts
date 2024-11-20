import connection from "./db_connection";



//creating user table
const user_query = `CREATE TABLE IF NOT EXISTS users (
        id MEDIUMINT  NOT NULL AUTO_INCREMENT,
        fname VARCHAR(100)  NOT NULL,
        lname VARCHAR(100)  NOT NULL,
        email VARCHAR(100)  NOT NULL,
        entry_year TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY(email),
        PRIMARY KEY (id))`;


const policy_query = `CREATE TABLE IF NOT EXISTS policies (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        title VARCHAR(100)  NOT NULL,
        description TEXT NOT NULL,
        owner MEDIUMINT NOT NULL,
        category VARCHAR(100) NOT NULL,
        votes INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (owner) REFERENCES users(id)
)`;


const vote_query = `CREATE TABLE IF NOT EXISTS votes (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        user_id MEDIUMINT  NOT NULL,
        policy_id MEDIUMINT  NOT NULL,
        voted TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (policy_id) REFERENCES policies(id) 
)`;


connection.beginTransaction(function (err) {
    if (err) {
        console.log(err);
        throw err;
    }

    connection.query(user_query, (error) => {

        if (error) {
            return connection.rollback(
                function () {
                    throw error;
                }
            );
        }
        console.log("Users table created successfully!! \n");
        connection.query(policy_query, (error) => {
            if (error) {
                return connection.rollback(
                    function () {
                        throw error;
                    }
                );
            }
            console.log("Policies table created successfully!! \n");
            connection.query(vote_query, (error) => {
                if (error) {
                    return connection.rollback(
                        function () {
                            throw error;
                        }
                    );
                }
                console.log("Votes table created successfully!! \n");
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                    connection.end();
                });
            });
        });
    });
});


