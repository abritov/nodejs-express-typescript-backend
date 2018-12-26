import { Request, Response, Router } from "express";
import { decryptInteger, encryptInteger } from "../../utils/spacecrypt";

export class TextController {
  public decode(text: string) {
    return decryptInteger(text);
  }

  public encode(text: string, payload: number) {
    return encryptInteger(text, payload);
  }
}

export function createTextRouter(controller: TextController) {
  const router = Router();

  router.post("/decode", (req: Request, res: Response) => {
    const payload = controller.decode(req.body.textWithPayload);
    res.json({ payload });
  });

  router.post("/encode", (req: Request, res: Response) => {
    const textWithPayload = controller.encode(req.body.text, req.body.number);
    res.json({ textWithPayload });
  });

  return router;
}
