import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction){
  if( req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('denied');
}
const router = Router();

function requireLogin(req: Request, res: Response, next: NextFunction){
  if(req.session && req.session.loggedIn){
    next();
    return;
  } else {
    res.send(`
    <div> 
      <div>You are not logged in</div>
      <a href="/login">Log in</a>
    </div>
  `);
  }
}
router.get('/login', (req: Request, res: Response) =>  {
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
});


router.post('/login', (req: RequestWithBody, res: Response) =>  {
  const { email, password } = req.body;
  if(email && password && email === 'karol@karol.com' && password === 'password'){
    // mark this person as logged in
    req.session = { loggedIn: true};
    // redirect them to the root route
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});


router.get('/', requireLogin ,(req: Request, res: Response) => {
    res.send(`
      <div> 
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
})
  
router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
  
});


router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send(`
      <div>Welcome to protected route, logged in user!</div>
    `)
  
})
export { router };
