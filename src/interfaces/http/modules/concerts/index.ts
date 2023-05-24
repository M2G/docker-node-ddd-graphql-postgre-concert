import concerts from 'interfaces/schema-definition/concerts';
import instance from './instance';

export default () => {
  const { getOneUseCase, getUseCase } = instance();
  return {
    concerts: concerts({
      getOneUseCase,
      getUseCase,
    }),
  };
};
