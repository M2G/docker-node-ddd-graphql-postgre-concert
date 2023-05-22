import {
  // DateTimeResolver,
  DateTimeTypeDefinition,
} from 'graphql-scalars';
import concerts from 'interfaces/http/modules/concerts';
// SCHEMA DEFINITIONS AND RESOLVERS

export default () => {
  const { resolvers: concertsResolvers, typeDefs: concertsTypeDefs } =
    concerts().concerts;

  return {
    resolvers: {
      // ...DateTimeResolver,
      // Mutation: {},
      Query: {
        ...concertsResolvers.Query,
      },
    },
    typeDefs: [DateTimeTypeDefinition, concertsTypeDefs],
  };
};
