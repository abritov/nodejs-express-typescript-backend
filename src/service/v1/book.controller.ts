import { Request, Response, Router } from "express";
import { DbApi } from "../../db/index";
import { Book, BookInstance } from "../../db/models/Book";

export class BookController {
  constructor(public readonly _db: DbApi) { }

  public get() {

  }

  public async getRecentWithChapterTitles() {
    return await this._db.Book.findAll({ order: "createdAt" });
  }

  public create() {

  }

  public update() {

  }

  public like() {

  }

  public dislike() {

  }

  public rate() {

  }
}

export function createTextRouter(controller: BookController) {
  const router = Router();

  router.get("/recent", (req: Request, res: Response) => {
    const payload = controller.decode(req.body.textWithPayload);
    res.json({ payload });
  });

  return router;
}
