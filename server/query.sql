DROP DATABASE IF EXISTS Uniweathervue;
CREATE DATABASE Uniweathervue;

USE Uniweathervue;

CREATE TABLE feeds (created_at VARCHAR(255), 
                    entry_id INT, 
                    field1 VARCHAR(255), 
                    field2 VARCHAR(255), 
                    field3 VARCHAR(255), 
                    field4 VARCHAR(255), 
                    field5 VARCHAR(255), 
                    field6 VARCHAR(255), 
                    field7 VARCHAR(255), 
                    field8 VARCHAR(255)
                    );

CREATE TABLE channel (  id INT,
                        name VARCHAR(255),
                        description VARCHAR(255),
                        latitude VARCHAR(255),
                        longitude VARCHAR(255),
                        field1 VARCHAR(255),
                        field2 VARCHAR(255),
                        field3 VARCHAR(255),
                        field4 VARCHAR(255),
                        field5 VARCHAR(255),
                        field6 VARCHAR(255),
                        field7 VARCHAR(255),
                        field8 VARCHAR(255),
                        created_at VARCHAR(255),
                        updated_at VARCHAR(255),
                        last_entry_id INT
                    );

ALTER TABLE channel CHANGE description description VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;