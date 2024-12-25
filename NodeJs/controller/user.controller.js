import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function userRegistration(req, res) {
  const { username, email, password } = req.body;
  userModel.findOne({ email }).then((data) => {
    if (data) {
      return res.status(403).json({ message: "user already exists" });
    } else {
      const newUser = new userModel({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      newUser
        .save()
        .then((data) => {
          res.status(200).json({ message: data });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  });
}

export function userLogin(req, res) {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "user is not registred" });
      }
      let validPassword = bcrypt.compareSync(password, data.password);
      if (!validPassword) {
        return res.status(403).json({ message: "invalid password" });
      }
      let token = jwt.sign({ id: data._id }, "secretKey", { expiresIn: "10m" });
      res.send({
        user: {
          email: data.email,
          username: data.username,
        },
        accessToken: token,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}
