import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const { sign } = jwt;
const Login = async (req, res) => {
  const { email, password } = req.body;
  const admincollection = await mongoose.connection.collection("admins");
  console.log("log");

  try {
    let user = await admincollection.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User not found", succ: false });
    const isAuthenticatd = user.password === password;
    if (!isAuthenticatd) {
      return res
        .status(401)
        .json({ msg: "Invalid email or password", succ: false });
    }
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = sign(payload, process.env.JWTKEY, { expiresIn: "1d" });

    return res
      .status(200)
      .json({ token, msg: "Login Successfully", succ: true });

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export { Login };
