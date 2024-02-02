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
    afterCursor,
    filters,
    first,
  }: {
    afterCursor: string | null;
    filters: string;
    first: number;
  }): Promise<any> => {
    console.log('arg arg arg arg', {
      afterCursor,
      filters,
      first,
    });

    try {
      if (!afterCursor && !filters) {
        const cachingConcertList = await redis.get(KEY);
        logger.info(cachingConcertList);
        if (
          cachingConcertList &&
          Object.values(cachingConcertList).filter(Boolean).length
        ) {
          return cachingConcertList;
        }
      }

      const concertList = await concertsRepository.getAll({
        afterCursor,
        attributes: {},
        filters,
        first,
      });

      !afterCursor &&
        !filters &&
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
