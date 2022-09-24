//requiring the express package
const express = require('express');
const {graphqlHTTP} = require('express-graphql');   //the name is just convention for express-graphql
//creating an express app using the express function required from express package
const app = express();
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
})) 

//telling our app to listen to
const port = 8080;

//app listens for connections in the specified port
app.listen(port, () => {
  console.log(`Server listening for requests on port ${port}`);
});

  
