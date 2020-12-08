import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction){
  console.log('Request was made!!!');
  next();
}
@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response) :void {
    res.send(`
    <form method="POST">
      <div>
        <label for="password">Email</label>
        <input name="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
    `)
  }
}