import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        const { name, email, password, mobileNumber } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "User Already Registered" })
                return;
            }

            const decryptionCode = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, decryptionCode)

            const newUser = await User.create({ name, email, password: hashedPassword, mobileNumber });
            res.status(200).json(newUser)
        }
        catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }

    }

    public async login(req: Request, res: Response): Promise<void>{
    const{email,password}=req.body;

    try{
            const user= await User.findOne({email})
            if(!user){
                res.status(404).json({message:"Create your account  to Login"})
                return;
            }
           const isMatch=await bcrypt.compare(password,user.password);
           if(!isMatch){
            res.status(400).json({message:"Invalid email or password"});
            return;
           }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'Ask Mr Banugoban to Login',
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token });
    }
    catch(error){
        res.status(500).json({message:(error as Error ).message})
    }
    }
}

export default new UserController;




