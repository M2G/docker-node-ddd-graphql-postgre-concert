import { readFileSync } from 'fs';
import { join } from 'path';
import gql from 'graphql-tag';
import type IConcert from 'core/concerts';

export default ({ getUseCase, getOneUseCase }: any) => {
  const typeDefs = gql(
    readFileSync(join(__dirname, '../..', 'concerts.graphql'), 'utf-8'),
  );
  const resolvers = {
    Mutation: {},
    Query: {
      concert: (_: any, args: { id: number }): IConcert => {
        const { id } = args;
        try {
          return getOneUseCase.getOne({ id });
        } catch (error) {
          throw new Error(error as string | undefined);
        }
      },
      concerts: (_: any, { ...args }: { p: [string: any] }) => {
        try {
          return getUseCase.all({ ...args });
        } catch (error) {
          throw new Error(error as string | undefined);
        }
      },
    },
    Type: {},
  };

  return {
    resolvers,
    typeDefs,
  };
};
