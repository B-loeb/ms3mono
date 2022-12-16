const express = require('express');
const router = express.Router();

//mongodb user model
const User = require('./../models/User');

//password handler
const bcrypt = require('bcrypt');
//Signup
router.post('/signup', (req, res) => {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" || email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields"
        });
    }else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
    }else if (password.length < 8 ) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        }); 
    } else {
        //check if user exists
        User.find({email}).then(result => {
            if (result.length) {
                //user exists
                res.json({
                    status: "FAILED",
                    message: "A user with the provided email already exists"
            });
            }else {
               //try to create new user

               //pword handling
               const saltRounds = 10;
               bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser= new User({
                        name,
                        email,
                        password: hashedPassword,
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful",
                            data: result,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while saving user account"
                        })   
                    })
               })
               .catch(err => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while hashing password"
                })
             })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user"
            })
        })
    }
})
//Login
router.post('/login', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input"
        })
    } else {
        //check if user exists
        User.find({email})
        .then(data => {
            if (data.length) {
                //user exists
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                   if (result) {
                    //pw match
                    res.json({
                        status: "SUCCESS",
                        message: "Logged in Successful",
                        data: data
                    })
                  } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid password entered"
                    })
                  }
                })
                .catch(err => {
                    res.json({
                    status: "FAILED",
                    message: "An error occured while comparing passwords "
                })
             })
            }else{
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered"
                })
            }
        })
        .catch(err => {
            res.json({
            status: "FAILED",
            message: "An error occured while checking for existing User "
        }) 
    })
    }
})
module.exports = router;