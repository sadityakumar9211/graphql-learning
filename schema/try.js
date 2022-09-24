/*
step 1: define the objects in the schema
step 2: define the relationships between the objects
step 3: define the root query
step 4: define the resolve function --> tell graphql on how to resolve the queries. 
*/

//defining the graphql schema

const graphql = require('graphql');
const _ = require('lodash');

//defining the object types in the GraphQL.

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Wild Wizard', genre: 'Fantasy', id: '3' },
];

//I am defining an object type called BookType.
const BookType = new GraphQLObjectType({
  name: 'Book',
  //This fields property is a function which returns an object containing the properties of a BookType.
  //This needs to be a field because when we have multiple types and they have references to one another,
  //if we don't wrap them into a function, one type might not know what properties other types have.
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //think of the frontend query format while defining the root queries.
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from db/other source
        // return books.find((book) => book.id === args.id); //using vanilla JS
        return _.find(books, {id: args.id})       //using lodash
      },
    },
  },
});

module.exports = new GraphQLSchema({
  //which queries we are allowing the users to use from the front end.
  query: RootQuery,
});
