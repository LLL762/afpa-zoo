const checkPageSize = (
  pageSize: number,
  _default: number,
  max: number
): number => (!isNaN(pageSize) && pageSize <= max ? pageSize : _default);

const getMaxPage = (nbResource: number, pageSize: number): number =>
  Math.ceil(nbResource / pageSize);

export default { checkPageSize, getMaxPage };
