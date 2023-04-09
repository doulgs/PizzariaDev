import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Pegar o Token

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  // separar a string do token
  const [, token] = authToken.split(" ");

  // Validar o TOKEN
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    // recupara o id do TOKEN e colocar dentro de uma variavel
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
