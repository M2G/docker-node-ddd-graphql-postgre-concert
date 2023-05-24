import type IUsersRepository from 'types/IUsersRepository';

const KEY = 'LIST_USER';
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
  }) => {
    try {
      /*
      if (arg && Object.values(arg).filter(Boolean).length) {
        return usersRepository.getAll({
          attributes: {},
          ...arg,
        });
      }
       */

      // const cachingUserList = await redis.get(KEY);

      //  if (cachingUserList) return cachingUserList;

      const userList = concertsRepository.getAll({
        attributes: {},
        ...arg,
      });

      // redis.set(KEY, JSON.stringify(userList), TTL);

      return userList;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
