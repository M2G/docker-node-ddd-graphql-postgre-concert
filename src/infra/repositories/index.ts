import Concerts from './concerts';
import Users from './users';

export default ({ database, database2 }: any) => {
  const { models } = database;
  const { models: models2 } = database2;
  const { concerts, artists } = models;
  const { users } = models2;

  return {
    concertsRepository: Concerts({
      model: concerts,
      model2: artists,
    }),
    usersRepository: Users({
      model: users,
    }),
  };
};
