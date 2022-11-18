import UriConfigs from "../configs/UriConfigs";
import Enclosure from "../model/Enclosure";
import EnclosureRepo from "../repo/EnclosureRepo";
import PaginationUtility from "../utility/PaginationUtility";
import ResourceUtility from "../utility/ResourceUtility";

const URIS = UriConfigs.URIS;
const props = Enclosure.properties;

const findByZoneId = async (
  zoneId: string,
  pageIndex: number,
  pageSize: number
) => {
  const pIndex = isNaN(pageIndex) ? 1 : pageIndex;
  const pSize = PaginationUtility.checkPageSize(
    pageSize,
    props.page.size,
    props.page.maxSize
  );
  const queryResult = await EnclosureRepo.findByZoneId(zoneId, pIndex, pSize);
  const enclosures = queryResult[0].enclosures;
  const nbEnclosures = queryResult[0].page[0].count;

  const nbPages = PaginationUtility.getMaxPage(nbEnclosures, pSize);
  const data = ResourceUtility.addUrl(enclosures, URIS.base + URIS.enclosures);

  return {
    enclosures: data,
    zoneId: zoneId,
    zoneUrl: URIS.base + URIS.zones + "/" + zoneId,
    pageIndex: pIndex,
    pageSize: pSize,
    nbPages: nbPages,
  };
};

export default { findByZoneId };
