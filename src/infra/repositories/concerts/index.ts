/*eslint-disable*/
import { UniqueConstraintError, Op } from 'sequelize';
import IUser from 'core/IUser';
import toEntity from './transform';
import { convertNodeToCursor, convertCursorToNodeId } from './helpers';

export default ({ model, model2, jwt }: any) => {
  const getAll = async ({
    filters,
    afterCursor,
    first,
    attributes,
  }: {
    filters: string;
    afterCursor: string;
    first: number;
    attributes: string[] | undefined;
  }): Promise<{
    edges: { cursor: string; node: { id: number } }[];
    pageInfo: {
      hasPrevPage: boolean;
      hasNextPage: boolean;
      endCursor: string | null;
      startCursor: string | null;
    };
    totalCount: number;
  }> => {
    const nodeId = convertCursorToNodeId(afterCursor || 'MTExMjkxMjk=');

    console.log('nodeId nodeId nodeId', nodeId);

    try {
      const query: {
        where: {
          [Op.or]?: [
            {
              email: {
                [Op.like]: string;
              };
            },
            {
              first_name: {
                [Op.like]: string;
              };
            },
            {
              last_name: {
                [Op.like]: string;
              };
            },
          ];
          datetime: {
            [Op.and]: [{ [Op.gte]: Date }];
          };
          concert_id?: {
            [Op.and]: [{ [Op.gte]: string }];
          };
        };
        order: string[][];
      } = {
        where: {
          datetime: {
            [Op.and]: [{ [Op.gte]: new Date() }],
          },
          concert_id: {
            [Op.and]: [{ [Op.gte]: nodeId }],
          },
        },
        order: [['datetime', 'ASC']],
      };

      console.log('afterCursor afterCursor afterCursor', afterCursor);

      if (filters) {
        query.order = [['datetime', 'ASC']];
        query.where = {
          datetime: {
            [Op.and]: [{ [Op.gte]: new Date() }],
          },
          concert_id: {
            [Op.and]: [{ [Op.gte]: nodeId }],
          },
          [Op.or]: [
            {
              email: {
                [Op.like]: `%${filters}%`,
              },
            },
            {
              first_name: {
                [Op.like]: `%${filters}%`,
              },
            },
            {
              last_name: {
                [Op.like]: `%${filters}%`,
              },
            },
          ],
        };
      }

      if (first < 0) {
        throw new Error('First must be positive');
      }
      let afterIndex = 0;

      console.log('query query query query', query);
      console.log('model2 model2 model2 model2', model2);
      const data = await model.findAndCountAll({
        ...query,
        attributes,
        include: model2,
        raw: true,
        nest: true,
      });

      if (afterCursor) {
        const nodeIndex = data?.rows?.findIndex(
          (datum: { concert_id: number }) =>
            datum.concert_id.toString() === nodeId,
        );
        if (nodeIndex === -1) {
          throw new Error('After does not exist');
        }

        if (nodeIndex >= 0) {
          afterIndex = nodeIndex + 1; // 1 is added to exclude the afterIndex node and include items after it
        }
      }

      const slicedData = data?.rows?.slice(afterIndex, afterIndex + first);

      const edges = slicedData?.map((node: { concert_id: number }) => ({
        node,
        cursor: convertNodeToCursor(node),
      }));

      let startCursor = null;
      let endCursor = null;
      if (edges.length > 0) {
        startCursor = convertNodeToCursor(edges[0].node);
        endCursor = convertNodeToCursor(edges[edges.length - 1].node);
      }

      const hasNextPage = data.count > afterIndex + first;
      const hasPrevPage = !!afterIndex;

      return {
        totalCount: data.count,
        edges,
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage,
          hasPrevPage,
        },
      };
    } catch (error) {
      console.log('error error error error', error);
      throw new Error(error as string | undefined);
    }
  };

  const findOne = async ({ id }: { id: number }): Promise<unknown | null> => {
    try {
      const data = await model.findByPk(id, { raw: true });
      if (!data) return null;
      return toEntity({ ...data });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const destroy = (...args: any[]) => model.destroy(...args);

  return {
    getAll,
    findOne,
    destroy,
  };
};
