const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const directorsJson = [
//   {  name: "Quentin Tarantino", age: 57 }, 5fad4f4b87e1ab806eb84f23
//   {  name: "Stephen Sommers", age: 58 }, 5fad52a487e1ab806eb84f29
//   {
//
//     name: "Chris Columbus", 5fad523c87e1ab806eb84f27
//     age: 62,
//   },
//   {  name: "David Benioff", age: 50 }, 5fad525e87e1ab806eb84f28
// ];

// const moviesJson = [
//   { name: "Kill Bill", genre: "drama, thriller", directorId: 5fad4f4b87e1ab806eb84f23 },
//   {
//
//     name: "Mummy",
//     genre: "fantasy, horror, thriller",
//     directorId: 5fad52a487e1ab806eb84f29,
//   },
//   {
//
//     name: "Harry Potter and the Chamber of Secrets",
//     genre: "fantasy",
//     directorId: 5fad523c87e1ab806eb84f27,
//   },
//   {
//
//     name: "Game of thrones",
//     genre: "fantasy, thriller",
//     directorId: 5fad525e87e1ab806eb84f28,
//   },
//   {  name: "Pulp Fiction", genre: "drama, thriller", directorId: 5fad4f4b87e1ab806eb84f23 },
//   {
//
//     name: "Inglourious Basterds",
//     genre: "adventure , thriller",
//     directorId: 5fad4f4b87e1ab806eb84f23,
//   },
// ];

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
        // return directors.find((director) => director.id == parent.id);
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
        // return movies.filter((movie) => movie.directorId == parent.id);
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
        // return movies.find((movie) => movie.id == args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((director) => director.id == args.id);
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
