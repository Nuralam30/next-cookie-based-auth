import User from '../models/user';
import { hashPassword, comparePassword } from './../utlis/auth';

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

        const hashedPassword = await hashPassword(password)
        const comPassword = await comparePassword(password, hashedPassword)
        if(comPassword){
            const user = await User.findOne({email, hashedPassword})
            return res.json(user)
        }

    } catch (error) {
        return res.status(400).send("Something went wrong.")
    }
}