import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      message: "Sin autorización 1, req.headers.authorization no existe",
    });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message:
        "Sin autorización 2, no viene el token en la cabecera de autenticación",
    });

  jwt.verify(token, "secret", (err, payload) => {
    if (err)
      return res.status(401).json({
        message: "Sin autorización 3, error con el token",
      });

    req.user = payload;
    next();
  });
};
