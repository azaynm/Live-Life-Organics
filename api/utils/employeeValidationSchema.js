
//validates the body of the requests
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


//validates the body of the sign up request
const signUpBodyValidation = (body) => {
    console.log(body)
    const schema = Joi.object({
        userName: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        hireDate: Joi.string().required().label("Hire Date"),
        address: Joi.string().required().label("Address"),
        empName: Joi.string().required().label("Employee Name"),
        position: Joi.string().required().label("Position"),
        dob: Joi.string().required().label("DOB"),
        roles: Joi.array().items(Joi.string().valid("systemAdmin", "employee", "eventCoordinator", "deliveryStaff", "cateringManager", "financialManager")).label("Roles"),
    });

    //takes the body of object and validates it with schema.validate method
    return schema.validate(body);
};

const loginBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(body);
};

const refreshTokenBodyValidation = (body)=>{
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(body);
};

export { signUpBodyValidation, loginBodyValidation, refreshTokenBodyValidation };