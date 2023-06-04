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
    filters,
    page,
    pageSize,
  }: {
    filters: string;
    page: number;
    pageSize: number;
  }): Promise<any> => {
    console.log('arg arg arg arg', {
      filters,
      pageSize,
      page,
    });

    const arg = {
      filters,
      page,
      pageSize,
    };

    try {
      if (arg && Object.values(arg).filter(Boolean).length) {
        return concertsRepository.getAll({
          attributes: {},
          ...arg,
        });
      }

      const cachingConcertList = await redis.get(KEY);

      console.log('cachingConcertList', cachingConcertList);

      if (cachingConcertList) return cachingConcertList;

      const concertList = concertsRepository.getAll({
        attributes: {},
        ...arg,
      });

      redis.set(KEY, JSON.stringify(concertList), TTL);

      return concertList;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
