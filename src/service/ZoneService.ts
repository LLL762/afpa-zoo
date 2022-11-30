import UriConfigs from "../configs/UriConfigs";
import { UniqueKeyError } from "../error/UniqueKeyError";
import ValidationMsg from "../messages/ValidationMsg";
import Zone, { TypeZone } from "../model/Zone";
import ZoneRepo from "../repo/ZoneRepo";
import PaginationUtility from "../utility/PaginationUtility";
import ResourceUtility from "../utility/ResourceUtility";
import { Doc } from "../utility/TsTypes";

const zoneProp = Zone.properties;
const URI = UriConfigs.URIS;

const findAll = async (_pageIndex: number, _pageSize: number) => {
  const pageIndex = isNaN(_pageIndex) ? 1 : _pageIndex;
  const pageSize = PaginationUtility.checkPageSize(
    _pageSize,
    zoneProp.page.size,
    zoneProp.page.maxSize
  );
  const zones = await ZoneRepo.findAll(pageIndex, pageSize);
  const nbZones = await ZoneRepo.count();
  const nbPages = PaginationUtility.getMaxPage(nbZones, pageSize);
  const zonesData = ResourceUtility.addUrl(zones, zoneProp.url);
  return {
    zones: zonesData,
    nbRetrieved: zones.length,
    pageIndex: pageIndex,
    pageSize: pageSize,
    nbPages: nbPages,
  };
};

const create = async (zone: Doc<TypeZone>) => {
  const hasSameName = await ZoneRepo.findByName(zone.name);
  if (hasSameName) {
    handleDuplicateName(hasSameName);
  }
  return await ZoneRepo.save(zone);
};

const findById = async (_id: string) => ZoneRepo.findById(_id);

const existsZones = async (ids: string[]): Promise<string[]> => {
  const dbZones = await ZoneRepo.findByIdIn(ids);

  if (ids.length == dbZones.length) {
    return [];
  }
  const dbZonesId = dbZones.map((zone) => zone._id.toString());
  const notIn = ids.filter((id) => !dbZonesId.includes(id));

  return notIn;
};

const searchByName = async (name: string) => ZoneRepo.searchByName(name);

const update = async (zone: Doc<TypeZone>) => {
  const hasSameName = await ZoneRepo.findByName(zone.name);
  if (hasSameName) {
    handleDuplicateName(hasSameName);
  }
  const upZone = await ZoneRepo.update(zone);
  return {
    zone: upZone,
  };
};

const handleDuplicateName = (hasSameName: Doc<TypeZone>) => {
  const msg = ValidationMsg.alreadyTaken("name", hasSameName.name);
  const details = {
    type: "UniqueKeyError",
    message: msg,
    conflicts: {
      key: "name",
      value: hasSameName.name,
      url: URI.base + URI.zones + "/" + hasSameName._id,
    },
  };
  throw new UniqueKeyError(msg, details);
};

export default { findAll, findById, create, searchByName, update, existsZones };
