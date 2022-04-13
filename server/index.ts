import express from 'express'; 
import router from './controllers/entityController';
import checkLogin from './middlewares/checkLogin';

const app = express();
app.use(express.urlencoded({ extended: true})); //allows for accessing post body
app.use(express.json()) //allows to parse json info from body
app.use(checkLogin);



app.use('/entity', router);
app.listen(3000);

//endpoint : http://localhost:3000/entity/edit?id=Q494&labels={"en":"Barack","ar":null}&descriptions={"en":"48th President of the United States","ar":null}&aliases={"en":["Barack Hussein Obama II"]}