import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import User from "../models/todos/user.model.js"

export const registerUser = async (req, res) =>{
   try {
    
    const { email, username, password, number } = req.body
    if (!email || !username || !password || !number ) {
        res.status(400).send({
            status : "failed", 
            message : "All the Fields are Required"
        })
    }

    const isUser = await User.findOne({username})

    if (isUser) {
        res.status(400).send({
            status : "failed", 
            message : "User with Username is Already Available"
        })
    }

    const hashedPass = await bcrypt.hash(password, 10)
    console.log("\n\nPassword Token : " + hashedPass + "\n\n"); 

    const user = new User({
        username,
        email, 
        number, 
        password : hashedPass,
    })

    const savedUser = await user.save()
    res.status(200).send({
        status : "Success", 
        message : "User Registered Succesfully", 
        userDetails : savedUser
    })
   } catch (error) {
        res.status(500).send({
            status : "Failed", 
            message : "Something Went Wrong!!!" + error
        })
   }
}

export const getUsers = async (req, res) =>{
    try {
        
        const users = await User.find().select("-password -number -email -createdAt -updatedAt -__v")

        if (!users) {
            res.status(203).send({
                status : "Success", 
                message : "No Users Found"
            })
        }
        res.status(200).send({
            status : "success", 
            total : users.length,
            users : users
        })

    } catch (error) {
        res.status(500).send({
            status : "Failed", 
            message : "Something Went Wrong : " + error
        })
    }
}

