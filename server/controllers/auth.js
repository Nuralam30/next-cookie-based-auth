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
            return res.status(400).send('User already exist.')
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await new User({
            name,
            email,
            password: hashedPassword
        })
        newUser.save();

        return res.status(400).send('User registered successfully.')

    } catch(err) {
        return res.status(400).send({message: err})
    }
}