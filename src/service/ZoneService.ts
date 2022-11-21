import { UniqueKeyError } from "../error/UniqueKeyError";
import ValidationMsg from "../messages/ValidationMsg";
import Zone, { TypeZone } from "../model/Zone";
import ZoneRepo from "../repo/ZoneRepo";
import PaginationUtility from "../utility/PaginationUtility";
import ResourceUtility from "../utility/ResourceUtility";
import { Doc } from "../utility/TsTypes";

const zoneProp = Zone.properties;

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
    const msg = ValidationMsg.alreadyTaken("name", zone.name);
    const details = {};
    const conflicts = "";

    throw new UniqueKeyError("", 422);
  }

  return await ZoneRepo.save(zone);
};

const findById = async (_id: string) => ZoneRepo.findById(_id);

const searchByName = async (name: string) => ZoneRepo.searchByName(name);

const update = async (zone: Doc<TypeZone>) => {
  const upZone = await ZoneRepo.update(zone);
  return {
    zone: upZone,
  };
};

export default { findAll, findById, create, searchByName, update };
