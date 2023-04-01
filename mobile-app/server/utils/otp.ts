import { NextFunction } from "express";
import sanitizedConfig from "../config";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MOBILE_NUMBER } = sanitizedConfig;

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

export const generateOTP = (otp_length: number) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const sendTwilioSMS = async (
  { message, contactNumber }: { message: string; contactNumber: number },
  next: NextFunction
) => {
  try {
    twilioClient.messages
      .create({
        body: message,
        to: `+91${contactNumber}`,
        from: TWILIO_MOBILE_NUMBER,
      })
      .then((res: any) => {
        console.log("OTP sent successfully");
        // console.log(res);
      })
      .catch((err: any) => {
        console.error("Error sending OTP:", err);
      });
  } catch (error) {
    next(error);
  }
};
