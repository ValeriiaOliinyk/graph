const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const movies = [
  { id: "1", name: "Kill Bill", genre: "drama, thriller", directorId: "1" },
  {
    id: "2",
    name: "Mummy",
    genre: "fantasy, horror, thriller",
    directorId: "2",
  },
  {
    id: "3",
    name: "Harry Potter and the Chamber of Secrets",
    genre: "fantasy",
    directorId: "3",
  },
  {
    id: "4",
    name: "Game of thrones",
    genre: "fantasy, thriller",
    directorId: "4",
  },
  { id: "5", name: "Pulp Fiction", genre: "drama, thriller", directorId: "1" },
  {
    id: "6",
    name: "Inglourious Basterds",
    genre: "adventure , thriller",
    directorId: "1",
  },
];

const directors = [
  { id: "1", name: "Quentin Tarantino", age: 57 },
  { id: "2", name: "Stephen Sommers", age: 58 },
  {
    id: "3",
    name: "Chris Columbus",
    age: 62,
  },
  { id: "4", name: "David Benioff", age: 50 },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id == parent.id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter((movie) => movie.directorId == parent.id);
      },
    },
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
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
