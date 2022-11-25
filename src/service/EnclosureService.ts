import { log } from "console";
import UriConfigs from "../configs/UriConfigs";
import Enclosure, { TypeEnclosure } from "../model/Enclosure";
import EnclosureRepo from "../repo/EnclosureRepo";
import PaginationUtility from "../utility/PaginationUtility";
import ResourceUtility from "../utility/ResourceUtility";

const URIS = UriConfigs.URIS;
const props = Enclosure.properties;

const findAll = async (pageIndex: number, pageSize: number) => {
  const pIndex = isNaN(pageIndex) ? 1 : pageIndex;
  const pSize = PaginationUtility.checkPageSize(
    pageSize,
    props.page.size,
    props.page.maxSize
  );
  const queryResult = await EnclosureRepo.findAll(pIndex, pSize);
  const enclosures = queryResult[0].enclosures;
  const nbEnclosures = queryResult[0].page[0].count;

  const nbPages = PaginationUtility.getMaxPage(nbEnclosures, pSize);

  for (let enclosure of enclosures) {
    addUrls(enclosure);
    enclosure.url = UriConfigs.getResourceUrl(enclosure, "enclosures");
  }

  return {
    enclosures: enclosures,
    nbRetreived: enclosures.length,
    pageIndex: pIndex,
    pageSize: pSize,
    nbPages: nbPages,
  };
};

const findById = async (id: string) => {
  const enclosure = (await EnclosureRepo.findById(id)) as any;
  const enclosureCopy = JSON.parse(JSON.stringify(enclosure));

  addUrls(enclosureCopy);

  return enclosureCopy;
};

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

const addUrls = (enclosure: any) => {
  if (typeof enclosure.zone != "undefined" && enclosure.type != null) {
    enclosure.zone.url = UriConfigs.getUrlFromId(enclosure.zone._id, "zones");
  }

  if (typeof enclosure.type != "undefined" && enclosure.type != null) {
    enclosure.type.url = UriConfigs.getUrlFromId(
      enclosure.type._id,
      "enclosuresTypes"
    );
  }
};

export default { findAll, findByZoneId, findById };
