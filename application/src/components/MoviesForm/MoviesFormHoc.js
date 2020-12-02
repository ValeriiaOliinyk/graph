import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { graphql } from "react-apollo";

import { addMovieMutation, updateMovieMutation } from "./mutation";
import { moviesQuery } from "../MoviesTable/queries";
import { directorsQuery } from "./quries";
import { styles } from "./styles";

const withGraphQLAdd = graphql(addMovieMutation, {
  props: ({ mutate }) => ({
    addMovie: (movie) =>
      mutate({
        variables: movie,
        refetchQueries: [{ query: moviesQuery }],
      }),
  }),
});

export default compose(
  withStyles(styles),
  withGraphQLAdd,
  graphql(directorsQuery)
);
