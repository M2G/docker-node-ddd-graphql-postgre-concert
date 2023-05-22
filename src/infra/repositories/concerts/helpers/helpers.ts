const convertNodeToCursor = (node: { concert_id: number }) =>
  Buffer.from(node.concert_id.toString(), 'binary').toString('base64');

const convertCursorToNodeId = (cursor: number) =>
  Buffer.from(cursor, 'base64').toString('binary');

export { convertNodeToCursor, convertCursorToNodeId };
