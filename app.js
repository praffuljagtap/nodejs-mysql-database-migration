const express = require('express');
const app = express();

/////////////////////////////////////////////////////////// IMPORTANT ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// IMPORTANT ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// IMPORTANT ///////////////////////////////////////////////////////////

const mysql = require('mysql');

// Database Credentials. Please verify before starting the project.
var credentials = {
    host: 'localhost',
    user: 'root',
    password: 'root'
}

var database = mysql.createConnection(credentials)

// Connecting to MySQL
database.connect((error) => {
    if(error) {
        console.log('The credentials are invalid.')
        throw error
    } else {
        console.log('MySQL Connected!\n')
    }
})

// Connecting to Database
var my_database = 'some_database' // This is the name of your database. Please edit and change it to the one you want.
let create_database = new Promise((resolve, reject) => { // It is necessary to work with promises. You may use other better methods if you wish.
    database.query('create database if not exists ' + my_database, (error, resp) => {
        if (error) throw error
        resolve(true)
    })
})

// Function to create tables
var create_table = (statement) => {
    return new Promise((resolve, reject) => {
        // Database query
        database.query(statement, (error, result) => {
            if (error) reject(error)
            resolve(true)
        })
    })
} 

create_database.then(created => {
    credentials['database'] = my_database
    database = mysql.createConnection(credentials)

    database.connect((error) => {
        if(error) {
            console.log('The credentials are invalid.')
            throw error
        } else {
            console.log('Database Connected!\n')
        }
    })

    // Create tables if not exist
    // Users table
    let users = create_table('create table if not exists users(id int auto_increment primary key, name varchar(255) not null)')
    users.then(result => {
        console.log('Users table created!')
    }).catch(error => {
        throw error
    })

    // Items table
    let items = create_table('create table if not exists items(id int auto_increment primary key, title varchar(255) not null)')
    items.then(result => {
        console.log('Items table created!')
    }).catch(error => {
        throw error
    })

})


/////////////////////////////////////////////////////////// IMPORTANT ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// IMPORTANT ///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// IMPORTANT ///////////////////////////////////////////////////////////



// Normal App
app.use('/', (req, res, next) => {
    res.send('Hello World')
});

module.exports = app;