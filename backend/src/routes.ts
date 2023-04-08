import { Router, Request, Response } from "express";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  // throw new Error("Erro ao fazer essa requisicao");
  return res.json({ nome: "PizzariaDev" });
});

export { router };
