import { Request, Response, Router } from "express";
import { IDbApi } from "../../db/index";
import { Book, BookInstance } from "../../db/models/Book";

export class BookController {
  constructor(private readonly db: IDbApi) {}

  public async getRecentWithChapterTitles() {
    return await this.db.Book.findAll({ order: "createdAt" });
  }
}

export function createTextRouter(controller: BookController) {
  const router = Router();

  router.get("/recent", (req: Request, res: Response) => {
    // const payload = controller.decode(req.body.textWithPayload);
    // res.json({ payload });
  });

  return router;
}
