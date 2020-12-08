import { Request, Response, NextFunction} from 'express'
import { controller, get, use} from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction){
  if( req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('denied');
}

@controller('')
class RootController {
  @get('/')
  getHome(req: Request, res: Response){
    if (req.session && req.session.loggedIn){
      res.send(`
        <div> 
          <div>You are logged in</div>
          <a href="/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/login">Login</a>
        </div>
      `)
    }
    }
    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response){
      res.send(`
        <div>Welcome to protected route, logged in user!</div>
      `)
    }
  }
