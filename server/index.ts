import express, { Express, Request, Response } from 'express'; 
import router from './controllers/entityController';
import checkLogin from './middlewares/checkLogin';

const app: Express = express();
app.use(express.urlencoded({ extended: true})); //allows for accessing post body
app.use(express.json()) //allows to parse json info from body
app.use(checkLogin);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})


app.use('/entity', router);
app.listen(3000);