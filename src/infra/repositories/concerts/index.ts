/*eslint-disable*/
import { UniqueConstraintError, Op } from 'sequelize';
import IUser from 'core/IUser';
import toEntity from './transform';
import { convertNodeToCursor, convertCursorToNodeId } from './helpers';

export default ({ model, model2, jwt }: any) => {
  const getAll = async (
    ...args: any[]
  ): Promise<{
    edges: { cursor: string; node: { id: number } }[];
    pageInfo: {
      hasPrevPage: boolean;
      hasNextPage: boolean;
      endCursor: any;
      startCursor: any;
    };
    totalCount: number;
  }> => {
    try {
      const [{ filters, first, afterCursor, attributes }]: any = args;

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
        };
        order: string[][];
      } = {
        where: {
          datetime: {
            [Op.and]: [{ [Op.gte]: new Date() }],
          },
        },
        order: [['datetime', 'ASC']],
      };

      if (filters) {
        query.order = [['datetime', 'ASC']];
        query.where = {
          datetime: {
            [Op.and]: [{ [Op.gte]: new Date() }],
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

      const [total, data] = await Promise.all([
        model.count(),
        model.findAndCountAll({
          ...query,
          attributes,
          include: model2,
          raw: true,
          nest: true,
        }),
      ]);
      console.log('data data data data  data', data.rows);

      if (afterCursor) {
        /* Extracting nodeId from afterCursor */
        let nodeId = convertCursorToNodeId(afterCursor);

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

      const hasNextPage = total > afterIndex + first;
      const hasPrevPage = !!afterIndex;

      return {
        totalCount: total,
        edges,
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage,
          hasPrevPage,
        },
      };
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const destroy = (...args: any[]) => model.destroy(...args);

  return {
    getAll,
    destroy,
  };
};
