import { Router, Request } from 'express';
import { DbApi } from '../../db/index';

export class UserController {
  constructor(public db: DbApi) { }

  create() {

  }
}

// export function createUserRouter() {
//   const router = Router();
//   const controller = new UserController(db);

//   router.post('/', (req: Request, res) => {
//     res.json(controller.create(<CreateToken>req.body));
//   });

//   router.post('/vk', passport.authenticate('vkontakte', { session: false }), (req: Request, res) => {
//     res.send(controller.signup(<CreateToken>req.body));
//   });

//   router.post('/default', passport.authenticate('local', { session: false }), (req: Request, res) => {
//     res.send(controller.signup(<CreateToken>req.body));
//   });

//   return router;
// }