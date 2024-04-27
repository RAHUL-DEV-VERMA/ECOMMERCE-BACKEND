import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";


// Meddleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next)=>{
    const {id} = req.query;

    if(!id) return next(new ErrorHandler("You have to Login first", 401));

    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("Please Enter Correct ID", 401));

    if(user.role !== "admin") return next(new ErrorHandler("You are not Admin", 401));

    next();

    
})