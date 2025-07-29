import { UserModel } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";
import { userRegisterValidator, userLoginValidator } from "../validators/user-validator.js";

// Register a new user
export const registerUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = userRegisterValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }
        // Check if user already exists
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            res.status(200).json("User already exists");
        }
        const hashedpassword = bcrypt.hashSync(value.password, 10);
        // Save user to database
        await UserModel.create({
            ...value,
            password: hashedpassword
        });
        // Send a confirmation email
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
            
            <p>We're delighted to have you join Grace Mountain's testimony sharing platform. Your registration has been successfully completed.</p>

            <p>Through this platform, you can:</p>
            <ul>
                <li>Share your powerful testimonies from our prayer sessions</li>
                <li>Inspire others with your spiritual journey</li>
            </ul>

            <p>Remember, your testimonies can strengthen someone else's faith and bring glory to God.</p>

            <p>Thank you for joining us!</p>
            
            <p>We look forward to reading your testimonies!</p> 
        </div>
        <div class="footer"> 
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>`,
        });
        // Respond to request
        res.status(201).json("User registered successfully!");
    } catch (error) {
        next(error);
    }
}

// Login a user
export const loginUser = async (req, res, next) => {
    try {
      // Validate user input
      const { error, value } = userLoginValidator.validate(req.body);
      if (error) {
        return res.status(422).json(error);
      }
      // Find one user with identifier
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        return res.status(404).json("User does not exist!");
      }
      // Compare their passwords
      const correctPassword = bcrypt.compareSync(value.password, user.password);
      if (!correctPassword) {
        return res.status(401).json
          ("Invalid credentials!");
      }
      // Sign a token for user
      const token = jwt.sign(
        { id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" }
      );
      // Respond to resquest
      res.json({ message: "User logged in!", accessToken: token })
  
    } catch (error) {
      next(error);
    }
  }
  