const bcrypt = require('bcryptjs');
const saltRounds = 10;

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePassword = async (userPassword, hashedUserPassword) => {
    const isSamePassword = await bcrypt.compare(userPassword, hashedUserPassword);
    return isSamePassword;
} 

module.exports = {
    hashPassword,
    comparePassword
}