import userModel from "../models/usermodel.js";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";
import { userRegisterValidator, userLoginValidator } from "../validators/uservalidator.js";

export const userRegister = async (req, res, next) => {
    try {
        // checking if inputed details are correct
        const { error, value } = userRegisterValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }
        // check the database if the email exist already
        const user = await userModel.findOne({ email: value.email });
        if (user) {
            res.status(200).json("user already exist");
        }
        const hashedpassword = bcrypt.hashSync(value.password, 10);
        // save to database
        await userModel.create({
            ...value,
            password: hashedpassword
        });
        // Send email
        await mailTransporter.sendMail({
            from: process.env.EMAIL,
            to: value.email,
            subject: "Registration Success",
            html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            color: #4a154b;
            margin-bottom: 30px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Grace Mountain!</h1>
        </div>
        <div class="content">
            <p>Dear ${value.firstName},</p>
            
            <p>Welcome to our blessed community! We're delighted to have you join Grace Mountain's testimony sharing platform. Your registration has been successfully completed.</p>

            <p>Through this platform, you can:</p>
            <ul>
                <li>Share your powerful testimonies from our prayer sessions</li>
                <li>Connect with other members of the community</li>
                <li>Inspire others with your spiritual journey</li>
            </ul>

            <p>Remember, your testimonies can strengthen someone else's faith and bring glory to God.</p>

            <p><strong>"Give thanks to the LORD, for he is good; his love endures forever." - Psalm 107:1</strong></p>
            
            <p>We look forward to reading your testimonies!</p>
        </div>
        <div class="footer">
            <p>Grace Mountain Prayer Community</p>
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>`,
        });
        res.status(201).json("user registered successfully");
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        // validate the person credentials
        const { error, value } = userLoginValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }
        // check for validity of password
        const correctpassword = bcrypt.compare(value.password, user.password);
        if (!correctpassword) {
            res.status(404).json("Invalid Credentials");
        }
        // now generate a token for the person
        const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: "999999999999999999999999h",
        });
        res.json({
            message: "user logged in", accessToken: token,
        });
    } catch (error) {
        next(error);
    }
}
