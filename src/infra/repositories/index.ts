import Users from './concerts';

export default ({ database, jwt }: any) => {
  const { models } = database;
  const { users } = models;
  const usersModel: any = users;

  return {
    usersRepository: Users({ jwt, model: usersModel }),
  };
};
