import express from 'express'; 
import { graphqlHTTP } from 'express-graphql';
import Schema from './schema'
const app = express();


app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));
app.listen(3000);

//endpoint : http://localhost:3000/entity/edit?id=Q494&labels={"en":"Barack","ar":null}&descriptions={"en":"48th President of the United States","ar":null}&aliases={"en":["Barack Hussein Obama II"]}