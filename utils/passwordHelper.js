import bcrypt from "bcryptjs";

export const hashPass = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword=  await bcrypt.hash(password, salt);
    return hashedPassword
}

export const comparePassword = async(password, hashedPass) =>{

    const isMatch = await bcrypt.compare(password, hashedPass);

    return isMatch
}