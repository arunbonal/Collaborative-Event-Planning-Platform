const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require('uuid');
const ejsMate = require("ejs-mate");
const expressLayouts = require('express-ejs-layouts');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(expressLayouts);
app.set('layout', 'boilerplate');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'event_management',
    password: "Arun@6104"
});

// ---------------------USER-------------------------

// // initialising users
// let getRandomUser = () => {
//     return [
//       faker.string.uuid(),
//       faker.internet.userName(),
//       faker.phone.number('##########'),
//       faker.internet.email(),
//       faker.internet.password(),
//     ];
// };
// let q = "INSERT INTO user (user_id, name, phone, email, password) VALUES ?"; //placeholders
// let data = [];
// for(let i=1;i<=10;i++){
//     data.push(getRandomUser()); //10 fake users
// }
// try{
//     connection.query(q, [data], (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }   catch(err) {
//     console.log(err);
// }

// view users
app.get("/user", (req, res)=>{
    let q = "SELECT * FROM user";
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let users = result;
            // console.log(users);    //array of objects
            res.render("user/users.ejs", {users});
        });
    } catch(err) {
        console.log(err);
        res.send("some error in database");
    }
});

// edit user
app.get("/user/:id/edit",(req, res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE user_id='${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("user/edit.ejs", {user});
        });
    } catch(err) {
        console.log(err);
        res.send("some error in database");
    }
});

// update user
app.patch("/user/:id", (req, res)=>{
    let {id} = req.params;
    let {password : formPass, name : newName} = req.body;
    let q = `SELECT * FROM user WHERE user_id='${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            if(formPass != user.password){
                res.send("Wrong password");
            } else {
                let q2 = `UPDATE user SET name='${newName}' WHERE user_id='${id}'`;
                connection.query(q2, (err, result)=>{
                    if(err) throw err;
                    res.redirect("/user");
                });
            }
        });
    } catch(err) {
        console.log(err);
        res.send("some error in database");
    }
});

// add new user
app.get("/user/new", (req, res)=>{
    res.render("user/new.ejs");
});

// insert new user
app.post("/user", (req, res)=>{
    let {name, password, email, phone} = req.body;
    let id = uuidv4();
    let q3 = `INSERT INTO user (user_id, name, phone, email, password) VALUES ('${id}', '${name}', '${phone}', '${email}', '${password}')`;
    try{
        connection.query(q3, (err, result)=>{
            if(err) throw err;
            console.log("user added successfully");
            res.redirect("/user");
        });
    } catch(err) {
        console.log(err);
        res.send("error in database");
    }
});

// delete user
app.get("/user/delete", (req, res)=>{
    res.render("user/delete.ejs");
});

// remove user
app.delete("/user", (req, res)=>{
    let {email, password} = req.body;
    let q4 = `SELECT * FROM user WHERE email='${email}'`;
    try{
        connection.query(q4, (err, result)=>{
            if(err) throw err;
            let userObj = result[0];
            if(password === userObj.password){
                let q5 = `DELETE FROM user WHERE email='${userObj.email}'`;
                try{
                    connection.query(q5, (err, result)=>{
                        if(err) throw err;
                        res.redirect("/user");
                    }); 
                }   catch(err) {
                    console.log(err);
                    res.send("error in database");
                }
            } else {
                res.send("user doesnot exist in database, check inputs before trying again");
            }
        });
    } catch(err) {
        console.log(err);
        res.send("error in database");
    }
});

// ---------------------VENUE-------------------------
// // initializing venues
// const getRandomVenue = () => {
//     return [
//         faker.string.uuid(),
//         faker.company.name(),
//         `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`, // full address
//         faker.lorem.paragraph(),
//     ];
// };

// let q = "INSERT INTO venue (venue_id, name, location, description) VALUES ?"; //placeholders
// let data = [];
// for(let i=1;i<=3;i++){
//     data.push(getRandomVenue()); //3 fake venues
// }
// try{
//     connection.query(q, [data], (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }   catch(err) {
//     console.log(err);
// }


// view venues
app.get("/venue", (req, res)=>{
    let q = "SELECT * FROM venue";
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let venues = result;
            // console.log(users);    //array of objects
            res.render("venue/venues.ejs", {venues});
        });
    } catch(err) {
        console.log(err);
        res.send("some error in database");
    }
});
// View all venues
app.get("/venue", (req, res) => {
    let q = "SELECT * FROM venue";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let venues = result;
            res.render("venue/venues.ejs", { venues });
        });
    } catch (err) {
        console.log(err);
        res.send("some error in database");
    }
});

// Edit a specific venue
app.get("/venue/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM venue WHERE venue_id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let venue = result[0];
            res.render("venue/edit.ejs", { venue });
        });
    } catch (err) {
        console.log(err);
        res.send("some error in database");
    }
});

// Update a venue
app.patch("/venue/:id", (req, res) => {
    let { id } = req.params;
    let { name, location, description } = req.body;
    let q = `UPDATE venue SET name='${name}', location='${location}', description='${description}' WHERE venue_id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/venue");
        });
    } catch (err) {
        console.log(err);
        res.send("some error in database");
    }
});

// Add a new venue
app.get("/venue/new", (req, res) => {
    res.render("venue/new.ejs");
});

// Insert a new venue
app.post("/venue", (req, res) => {
    let { name, location, description } = req.body;
    let id = uuidv4();
    let q = `INSERT INTO venue (venue_id, name, location, description) VALUES ('${id}', '${name}', '${location}', '${description}')`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/venue");
        });
    } catch (err) {
        console.log(err);
        res.send("some error in database");
    }
});

// Delete a venue directly
app.delete("/venue/:id", (req, res) => {
    let { id } = req.params;
    let q = `DELETE FROM venue WHERE venue_id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/venue");
        });
    } catch (err) {
        console.log(err);
        res.send("some error in database");
    }
});


// ---------------------EVENT-------------------------

// // initializing events
// const getRandomEvent = () => {
//     return [
//         faker.string.uuid(), // event_id
//         faker.helpers.arrayElement(['Conference', 'Workshop', 'Seminar', 'Meetup']), // type
//         faker.company.catchPhrase(), // title
//         faker.lorem.paragraph(), // description
//         faker.date.future(), // start_time
//         faker.date.future(), // end_time
//         '8008fed9-9687-4e31-b282-01b06560d0b1', // venue_id (should be an existing venue_id from the venue table)
//         '9593aa71-00e9-4a4a-9729-b67dd20a3f55', // owner_id (should be an existing user_id from the user table)
//         true, // event_status (true for active, false for inactive)
//     ];
// };


// let q = "INSERT INTO event (event_id, type, title, description, start_time, end_time, venue_id, owner_id, event_status) VALUES ?";

// let data = [];
// for(let i=1;i<=1;i++){
//     data.push(getRandomEvent()); //1 fake events
// }
// try{
//     connection.query(q, [data], (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }   catch(err) {
//     console.log(err);
// }


// view events
app.get("/event", (req, res) => {
    const q = `SELECT e.event_id, e.type, e.title, e.description, e.start_time, e.end_time, v.name AS venue_name, u.name AS owner_name, e.event_status
               FROM event e
               LEFT JOIN venue v ON e.venue_id = v.venue_id
               LEFT JOIN user u ON e.owner_id = u.user_id`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            const events = result;
            res.render("event/events.ejs", { events });
        });
    } catch (err) {
        console.log(err);
        res.send("Error fetching events from database");
    }
});

// new event
app.get("/event/new", (req, res) => {
    const venueQuery = "SELECT * FROM venue";
    const userQuery = "SELECT * FROM user";
    connection.query(venueQuery, (err, venues) => {
        if (err) throw err;
        connection.query(userQuery, (err, users) => {
            if (err) throw err;
            res.render("event/new.ejs", { venues, users });
        });
    });
});
// insert event
app.post("/event", (req, res) => {
    let { type, title, description, start_time, end_time, venue_id, owner_id, event_status } = req.body;
    let event_id = uuidv4(); // Generate a unique ID for the event
    // Format for inserting the event into the database
    let q3 = `
        INSERT INTO event (event_id, type, title, description, start_time, end_time, venue_id, owner_id, event_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Convert the boolean checkbox into a proper format
    event_status = event_status === 'on'; // The checkbox returns 'on' when checked
    try {
        // Insert event data into the database
        connection.query(q3, [
            event_id, type, title, description, start_time, end_time, venue_id, owner_id, event_status
        ], (err, result) => {
            if (err) throw err;

            res.redirect("/event"); // Redirect to the events page after success
        });
    } catch (err) {
        console.log(err);
        res.send("Error in database");
    }
});
// Show edit form
app.get("/event/:event_id/edit", (req, res) => {
    const eventQuery = `SELECT * FROM event WHERE event_id = ?`;
    const venueQuery = "SELECT * FROM venue";
    const userQuery = "SELECT * FROM user";
    
    connection.query(eventQuery, [req.params.event_id], (err, events) => {
        if (err) throw err;
        const event = events[0];
        
        connection.query(venueQuery, (err, venues) => {
            if (err) throw err;
            connection.query(userQuery, (err, users) => {
                if (err) throw err;
                res.render("event/edit.ejs", { event, venues, users });
            });
        });
    });
});
// Update an event
app.patch("/event/:event_id", (req, res) => {
    const { type, title, description, start_time, end_time, venue_id, owner_id, event_status } = req.body;
    const q = `UPDATE event 
               SET type = ?, title = ?, description = ?, start_time = ?, end_time = ?, venue_id = ?, owner_id = ?, event_status = ?
               WHERE event_id = ?`;
    
    const status = event_status === 'on'; // Convert checkbox value to boolean

    connection.query(q, [
        type, title, description, start_time, end_time, venue_id, owner_id, status, req.params.event_id
    ], (err, result) => {
        if (err) throw err;
        
        res.redirect("/event");
    });
});
// Delete an event
app.delete("/event/:event_id", (req, res) => {
    const q = "DELETE FROM event WHERE event_id = ?";

    connection.query(q, [req.params.event_id], (err, result) => {
        if (err) throw err;
        
        res.redirect("/event");
    });
});



// ---------------------GUEST-------------------------

// // initialising guests
// let getRandomGuest = () => {
//     return [
//       faker.string.uuid(),
//       faker.internet.userName(),
//       '72216ca6-6086-4a34-9480-1e4589d92c85',   //event id
//     ];
// };
// let q = "INSERT INTO guest (guest_id, name, event_id) VALUES ?"; //placeholders
// let data = [];
// for(let i=1;i<=10;i++){
//     data.push(getRandomGuest()); //10 fake guests
// }
// try{
//     connection.query(q, [data], (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }   catch(err) {
//     console.log(err);
// }

// View guests and their event details
app.get("/guest", (req, res) => {
    const q = `
        SELECT g.guest_id, g.name AS guest_name, e.title AS event_title, u.name AS owner_name
        FROM guest g
        LEFT JOIN event e ON g.event_id = e.event_id
        LEFT JOIN user u ON e.owner_id = u.user_id
    `;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            const guests = result;
            res.render("guest/guests.ejs", { guests });
        });
    } catch (err) {
        console.log(err);
        res.send("Error fetching guests from database");
    }
});
// new guest
app.get("/guest/new", (req, res) => {
    const q = "SELECT event_id, title FROM event"; // Query to get event id and title for the dropdown

    connection.query(q, (err, events) => {
        if (err) {
            console.log(err);
            return res.send("Error fetching events from database");
        }
        res.render("guest/new.ejs", { events }); // Pass events to the template
    });
});
// insert guest
app.post("/guest", (req, res) => {
    let { name, event_id } = req.body;
    let guest_id = uuidv4();
    let q = `INSERT INTO guest (guest_id, name, event_id) VALUES ('${guest_id}', '${name}', '${event_id}')`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/guest");
        });
    } catch (err) {
        console.log(err);
        res.send("Error adding guest to the database");
    }
});
// edit guest
app.get("/guest/:id/edit", (req, res) => {
    let { id } = req.params;
    let guestQuery = `SELECT * FROM guest WHERE guest_id='${id}'`;
    let eventsQuery = "SELECT event_id, title FROM event"; // Get all events for the dropdown

    try {
        // Execute both queries
        connection.query(guestQuery, (err, guestResult) => {
            if (err) throw err;
            let guest = guestResult[0];

            connection.query(eventsQuery, (err, eventsResult) => {
                if (err) throw err;
                res.render("guest/edit.ejs", { guest, events: eventsResult }); // Pass guest and events
            });
        });
    } catch (err) {
        console.log(err);
        res.send("Error fetching guest data");
    }
});
// update guest
app.patch("/guest/:id", (req, res) => {
    let { id } = req.params;
    let { name, phone, event_id } = req.body;
    let q = `UPDATE guest SET name='${name}', event_id='${event_id}' WHERE guest_id='${id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/guest");
        });
    } catch (err) {
        console.log(err);
        res.send("Error updating guest");
    }
});
// delete guest
app.delete("/guest", (req, res) => {
    let { guest_id } = req.body;
    let q = `DELETE FROM guest WHERE guest_id='${guest_id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/guest");
        });
    } catch (err) {
        console.log(err);
        res.send("Error deleting guest");
    }
});



// ---------------------VENDOR-------------------------
// List of fixed service types
// const serviceTypes = ["Decoration", "Transport", "Lighting", "Food Catering", "Music and Entertainment", "Maintenance"];

// // Function to get random vendor data
// let getRandomVendor = () => {
//     return [
//         faker.string.uuid(), // Generate a random UUID for vendor_id
//         faker.internet.userName(), // Generate a random user name for name
//         faker.phone.number('##########'), // Generate a random 10-digit phone number
//         serviceTypes[Math.floor(Math.random() * serviceTypes.length)] // Randomly pick a service type
//     ];
// };

// // SQL query with placeholders
// let q = "INSERT INTO vendor (vendor_id, name, phone, service_type) VALUES ?"; // Assuming vendor table

// // Array to store data
// let data = [];

// // Generating 5 fake vendors
// for (let i = 1; i <= 5; i++) {
//     data.push(getRandomVendor()); // Push random vendor data
// }

// // Execute the SQL query
// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result); // Log the result on successful insertion
//     });
// } catch (err) {
//     console.log(err); // Log any errors
// }
app.get("/vendor", (req, res)=>{
    let q = "SELECT * FROM vendor";
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let vendors = result;
            res.render("vendor/vendors.ejs", {vendors});
        });
    } catch(err) {
        console.log(err);
        res.send("some error in database");
    }
});
// add vendor
app.get("/vendor/new", (req, res) => {
    const serviceTypes = ["Decoration", "Transport", "Lighting", "Food Catering", "Music and Entertainment", "Maintenance"];
    res.render("vendor/new.ejs", { serviceTypes });
});
// insert vendor
app.post("/vendor", (req, res) => {
    const { name, phone, service_type } = req.body;
    const vendor_id = faker.string.uuid();  // Generate a UUID
    const q = `INSERT INTO vendor (vendor_id, name, phone, service_type) VALUES ('${vendor_id}', '${name}', '${phone}', '${service_type}')`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/vendor");
        });
    } catch (err) {
        console.log(err);
        res.send("Error adding vendor");
    }
});
// edit vendor
app.get("/vendor/:id/edit", (req, res) => {
    const { id } = req.params;
    const q = `SELECT * FROM vendor WHERE vendor_id='${id}'`;
    const serviceTypes = ["Decoration", "Transport", "Lighting", "Food Catering", "Music and Entertainment", "Maintenance"];
    
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            const vendor = result[0];
            res.render("vendor/edit.ejs", { vendor, serviceTypes });
        });
    } catch (err) {
        console.log(err);
        res.send("Error fetching vendor data");
    }
});
// update vendor
app.patch("/vendor/:id", (req, res) => {
    const { id } = req.params;
    const { name, phone, service_type } = req.body;
    const q = `UPDATE vendor SET name='${name}', phone='${phone}', service_type='${service_type}' WHERE vendor_id='${id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/vendor");
        });
    } catch (err) {
        console.log(err);
        res.send("Error updating vendor");
    }
});
// delete vendor
app.delete("/vendor", (req, res) => {
    const { vendor_id } = req.body;
    const q = `DELETE FROM vendor WHERE vendor_id='${vendor_id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/vendor");
        });
    } catch (err) {
        console.log(err);
        res.send("Error deleting vendor");
    }
});


// -------------------------FEEDBACK---------------------
app.get("/feedback", (req, res) => {
    const q = `
        SELECT f.feedback_id, f.rating, f.comments, f.date, u.name AS owner_name, e.title AS event_title
        FROM feedback f
        LEFT JOIN user u ON f.owner_id = u.user_id
        LEFT JOIN event e ON f.event_id = e.event_id
    `;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.render("feedback/feedbacks.ejs", { feedbacks: result });
        });
    } catch (err) {
        console.log(err);
        res.send("Error fetching feedbacks from database");
    }
});
// new feedback
app.get("/feedback/new", (req, res) => {
    const eventQuery = "SELECT event_id, title FROM event";
    const userQuery = "SELECT user_id, name FROM user";

    try {
        connection.query(eventQuery, (err, events) => {
            if (err) throw err;

            connection.query(userQuery, (err, users) => {
                if (err) throw err;

                res.render("feedback/new.ejs", { events, users });
            });
        });
    } catch (err) {
        console.log(err);
        res.send("Error loading data for new feedback");
    }
});
// insert feedback
app.post("/feedback", (req, res) => {
    const { owner_id, event_id, rating, comments } = req.body;
    const feedback_id = uuidv4();

    const q = `INSERT INTO feedback (feedback_id, owner_id, event_id, rating, comments) VALUES ('${feedback_id}', '${owner_id}', '${event_id}', ${rating}, '${comments}')`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/feedback");
        });
    } catch (err) {
        console.log(err);
        res.send("Error adding feedback");
    }
});
// edit feedback
app.get("/feedback/:id/edit", (req, res) => {
    const { id } = req.params;
    const feedbackQuery = `SELECT * FROM feedback WHERE feedback_id = '${id}'`;
    const eventQuery = "SELECT event_id, title FROM event";
    const userQuery = "SELECT user_id, name FROM user";

    try {
        connection.query(feedbackQuery, (err, result) => {
            if (err) throw err;

            const feedback = result[0];

            connection.query(eventQuery, (err, events) => {
                if (err) throw err;

                connection.query(userQuery, (err, users) => {
                    if (err) throw err;

                    res.render("feedback/edit.ejs", { feedback, events, users });
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.send("Error loading feedback data for editing");
    }
});
// Update feedback
app.patch("/feedback/:id", (req, res) => {
    const { id } = req.params;
    const { owner_id, event_id, rating, comments } = req.body;

    const q = `UPDATE feedback SET owner_id='${owner_id}', event_id='${event_id}', rating=${rating}, comments='${comments}' WHERE feedback_id='${id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/feedback");
        });
    } catch (err) {
        console.log(err);
        res.send("Error updating feedback");
    }
});
// Delete feedback
app.delete("/feedback/:id", (req, res) => {
    const { id } = req.params;

    const q = `DELETE FROM feedback WHERE feedback_id='${id}'`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/feedback");
        });
    } catch (err) {
        console.log(err);
        res.send("Error deleting feedback");
    }
});

// ROOT
app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});