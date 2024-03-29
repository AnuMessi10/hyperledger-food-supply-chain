import User from "../../models/user";
import { createJwtToken } from "../../utils/token";
import { generateOTP, sendTwilioSMS } from "../../utils/otp";
import {
  INCORRECT_OTP,
  PHONE_ALREADY_EXISTS,
  PHONE_NOT_FOUND,
  USER_NOT_FOUND,
} from "../../errors";
import {Request, Response, NextFunction} from 'express';

// const { checkPassword, hashPassword } = require("../utils/password.util");

// --------------------- create new user ---------------------------------

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mobile, password, name, actor,imageUrl } = req.body;
    const phoneExist = await User.findOne({ mobile }); // check duplicate mobile Number

    if (phoneExist) {
      next({ status: 400, message: PHONE_ALREADY_EXISTS });
      return;
    }

    // create new user
    const createUser = new User({ mobile, name, password, actor,imageUrl});
    const user = await createUser.save();

    res.status(200).json({
      type: "success",
      message: "Account created successfully! \nSending OTP to registered mobile number.",
      data: {
        id: user._id,
      },
    });

    // generate otp
    const otp = generateOTP(5);
    // save otp to user collection
    user.phoneOtp = Number(otp);
    await user.save();
    // send otp to mobile number
    await sendTwilioSMS(
      {
        message: `Your OTP for FoodNet is ${otp}`,
        contactNumber: user.mobile,
      },
      next
    );
  } catch (error) {
    next(error);
  }
};

// ------------ login with mobile otp ----------------------------------
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mobile, password } = req.body;
    console.log(mobile, password);
    const user = await User.findOne({ mobile });

    if (!user) {
      next({ status: 400, message: PHONE_NOT_FOUND });
      return;
    }
    if (user.password !== password) {
      next({ status: 400, message: "Invalid credentials" });
      return;
    }
    if (user.password === password) {
      const token = createJwtToken({ userId: user._id });
      res.status(201).json({
        type: "success",
        message: "Logged in",
        data: {
          token,
          user,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// ---------------------- verify mobile otp -------------------------
const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otp, mobile } = req.body;
    const user = await User.findOne({ mobile });
    
    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND });
      return;
    }
    
    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP });
      return;
    }
    else{
      console.log("OTP matched successfully");
    }
    const token = createJwtToken({ userId: user._id });

    user.phoneOtp = -1;
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- fetch current user -------------------------

const fetchCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  loginUser,
  verifyOtp,
  registerUser,
  fetchCurrentUser,
};

export default authController;

// --------------- admin access only -------------------------

// exports.handleAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const currentUser = res.locals.user;

//     return res.status(200).json({
//       type: "success",
//       message: "Okay you are admin!!",
//       data: {
//         user: currentUser,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
