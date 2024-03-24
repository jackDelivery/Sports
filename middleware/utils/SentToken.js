
const sendToken = (res, user, statusCode, message) => {
    const token = user.getJWTToken();

    const userData = {
        _id: user._id,
        email: user.email,
        token: token
    };

    res
        .status(statusCode)
        .json({ success: true, message, user: userData });
};


module.exports = { sendToken }