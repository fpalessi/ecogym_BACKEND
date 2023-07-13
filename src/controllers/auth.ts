import { Request, Response } from "express";
import UserModel from "../models/user";
import { checkPassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import { LoginSchemaType, RegisterSchemaType } from "../schemas/user.schema";

export const registerHandler = async (
  req: Request<unknown, unknown, RegisterSchemaType>,
  res: Response
) => {
  //Find user
  const userFound = await UserModel.findOne({
    email: req.body.email,
  });
  if (userFound) {
    const error = new Error(`Ya existe un usuario con ese correo`);
    return res.status(403).json([{ msg: error.message }]);
  }

  const newUser = new UserModel({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
  });

  const savedUser = await newUser.save();

  const secretKey: string = process.env.SECRET_KEY as string;

  const token = jwt.sign(
    {
      _id: savedUser._id,
    },
    secretKey,
    {
      expiresIn: 60 * 60 * 24, // 24 hours
    }
  );

  console.log(savedUser);
  res.json({ token });
};
export const loginHandler = async (
  req: Request<unknown, unknown, LoginSchemaType>,
  res: Response
) => {
  console.log(req.body);
  // Desustructuring del body
  const { email, password } = req.body;
  //Find existing user
  const userFound = await UserModel.findOne({ email: email });
  if (!userFound)
    return res
      .status(400)
      .json({ message: `La dirección de correo ${email} no existe` });

  if (!(await checkPassword(password, userFound.password)))
    return res.json({ message: "La contraseña es incorrecta" });

  const token = jwt.sign({ _id: userFound._id }, "secret", {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ message: "Bienvenido de nuevo", token, userFound });
};

export const profileHandler = async (req: Request, res: Response) => {
  const userProfile = await UserModel.findOne({ _id: req.user._id }).select(
    "-password"
  );
  return res.json({ message: "Profile Handler GOOD", userProfile });
};
