const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const movies = [
  { id: "1", name: "Kill Bill", genre: "drama, thriller" },
  { id: "2", name: "Mummy", genre: "fantasy, horror, thriller" },
  {
    id: 3,
    name: "Harry Potter and the Chamber of Secrets",
    genre: "fantasy",
  },
  { id: 4, name: "Game of thrones ", genre: "fantasy, thriller" },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
