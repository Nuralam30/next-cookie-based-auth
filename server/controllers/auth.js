import User from '../models/user';
import { hashPassword, comparePassword } from './../utlis/auth';
import jwt from 'jsonwebtoken';
require("dotenv").config()


export const register = async (req, res) => {
    
    const { name, email, password } = req.body;

    try {
        if(!name) {
            return res.status(400).send('Name must be provided')
        }
        if(!password || password.length < 6) {
            return res.status(400).send('Password must be more than 6 characters.')
        }

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).send('Email already taken.')
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await new User({
            name,
            email,
            password: hashedPassword
        })
        newUser.save();
        res.json('User registered successfully.')

    } catch(err) {
        return res.status(400).send({message: err})
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if(!email) return res.status(400).send("Enter user email address")
        if(!password) return res.status(400).send("Enter user password")

        // find user is regsistered or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Email is not registered")
        }
        // check password
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(400).send("Password is incorrect")
        }
        // create user token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        // send user and token to client and exclude password
        user.password = undefined
        //send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true // works on https only
        })

        res.json(user)

    } catch (error) {
        return res.status(400).send("Something went wrong.")
    }
}


export const logout = async (req, res) => {
    try {
        await res.clearCookie('token')
        return res.json({message: "Logged out successfully."})
    } catch (error) {
        res.json(error)
    }
}