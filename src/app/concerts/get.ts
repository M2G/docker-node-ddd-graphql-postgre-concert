import type IUsersRepository from 'types/IUsersRepository';

const KEY = 'LIST_CONCERT';
const TTL = 1 * 60;

/**
 * function for get users.
 */
export default ({
  concertsRepository,
  logger,
  redis,
}: {
  redis: {
    set: (key: string, value: any, ttlInSeconds?: number) => boolean;
    get: (key: string) => Promise<Error | string | null>;
  };
  concertsRepository: any;
  logger: any;
}) => {
  const all = async ({
    ...arg
  }: {
    filters: string;
    pageSize: number;
    page: number;
  }): Promise<any> => {
    try {
      if (arg && Object.values(arg).filter(Boolean).length) {
        return concertsRepository.getAll({
          attributes: {},
          ...arg,
        });
      }

      const cachingConcertList = await redis.get(KEY);

      if (cachingConcertList) return cachingConcertList;

      const userList = concertsRepository.getAll({
        attributes: {},
        ...arg,
      });

      redis.set(KEY, JSON.stringify(userList), TTL);

      return userList;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
