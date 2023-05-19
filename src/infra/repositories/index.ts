import Concerts from './concerts';

export default ({ database, jwt }: any) => {
  const { models } = database;

  console.log('models models models models models', models);

  const { concerts, artists } = models;
  const concertsModel: any = concerts;
  const artistsModel: any = artists;

  return {
    concertsRepository: Concerts({
      jwt,
      model: concertsModel,
      model2: artistsModel,
    }),
  };
};
