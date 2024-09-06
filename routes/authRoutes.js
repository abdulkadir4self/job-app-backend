
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schema/authSchema');
const router = express.Router();

const JWT_SECRET_KEY = 'fca19bc66b61d46afa52d0b5b040835' 

router.post('/register' ,async function(req,res){
    try {
        const checkUser = await userSchema.findOne({email: req.body.email})
        if(checkUser){
            res.json({
                status:0,
                message:'user exists',
                data:null
            })
            return
        }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt);
    const user = await userSchema.create({
        ...req.body,
        password: hashedPassword
    })
    res.json({
        status:1,
        message:'register successfull',
        data: user
    })
    } 
    catch (error) {
        res.json({
            status:0,
            message:'register failed',
            data:null
        })
    }
})



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDoc = await userSchema.findOne({ email });

        if (userDoc) {
            const hashedPassword = userDoc.password;
            const passwordStatus = await bcrypt.compare(password, hashedPassword);

            if (passwordStatus) {
                // Check if the email contains '@alphaaware'
                const isAdmin = email.includes('@alphaware.com');

                jwt.sign(
                    { _e: userDoc.email, isAdmin }, // Include isAdmin in the token payload
                    JWT_SECRET_KEY,
                    function (error, token) {
                        if (error) {
                            return res.json({
                                status: 0,
                                message: 'Failed to login. Please try again'
                            });
                        } else {
                            if(isAdmin == true){
                                return res.json({
                                    status: 1,
                                    message: 'Login successful',
                                    token,
                                    isAdmin: true // Add isAdmin to the response
                                });
                            }
                            else
                            return res.json({
                                status: 1,
                                message: 'Login successful',
                                token,
                                isAdmin: false 
                               
                                
                            });
                        }
                    }
                );
            } else {
                res.json({
                    status: 0,
                    message: 'Password incorrect'
                });
            }
        } else {
            res.json({
                status: 0,
                message: 'Email  incorrect'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 0,
            message: 'Internal  server error'
        });
    }
});




// router.post('/login' , async (req , res)=>{
//     try {
//         const {email , password} = req.body;
//         const userDoc = await userSchema.findOne({email});
        
        
//         if(userDoc){
//             const hashedPassword= userDoc.password;
//             const passwordStatus = await bcrypt.compare(password , hashedPassword)//

//             if(passwordStatus){
//                 jwt.sign({_e: userDoc.email} , JWT_SECRET_KEY , function(error , token){
//                     // console.log(token , 'this is token');
                    
//                     if(error)
//                     {
//                         return res.json({
//                             status:0,
//                             message: 'failed to login. pls try again'
//                         })
//                     }
//                     else{
//                         return res.json({
//                             status: 1,
//                             message: 'login successful',
//                             token
//                         })
//                     }
//                 })
//             }
//             else{
//                 res.json({
//                     status:0,
//                     message: 'password incorrect'
//                 })
//             }
//         }
//         else{
//             res.json({
//                 status:0,
//                 message:'email incorrect'
//             })
//         }
//     }
    
//      catch (error) {
//         console.log(error);
//     }
//  })

module.exports = router;