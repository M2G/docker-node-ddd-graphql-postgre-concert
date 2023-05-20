const convertNodeToCursor = (node: { id: string }) =>
  Buffer.from(node.id, 'binary').toString('base64');

const convertCursorToNodeId = (cursor: string) =>
  Buffer.from(cursor, 'base64').toString('binary');

export { convertNodeToCursor, convertCursorToNodeId };
