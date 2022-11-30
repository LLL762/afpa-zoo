import UriConfigs from "../configs/UriConfigs";
import Animal from "../model/Animal";
import AnimalRepo from "../repo/AnimalRepo";
import PaginationUtility from "../utility/PaginationUtility";

const URIS = UriConfigs.URIS;
const props = Animal.properties;

const findAll = async (pageIndex: number, pageSize: number) => {
  const pIndex = isNaN(pageIndex) ? 1 : pageIndex;
  const pSize = PaginationUtility.checkPageSize(
    pageSize,
    props.page.size,
    props.page.maxSize
  );
  const queryResult = await AnimalRepo.findAll(pIndex, pSize);
  const animals = queryResult[0].animals;
  const nbAnimals = queryResult[0].page[0].count;

  console.log(queryResult);

  const nbPages = PaginationUtility.getMaxPage(nbAnimals, pSize);

  for (let enclosure of animals) {
    enclosure.url = UriConfigs.getResourceUrl(enclosure, "animals");
  }

  return {
    enclosures: animals,
    nbRetreived: animals.length,
    pageIndex: pIndex,
    pageSize: pSize,
    nbPages: nbPages,
  };
};
const findById = async (id: string) => {
  return AnimalRepo.findById(id);
};

const existAnimals = async (ids: string[]): Promise<string[]> => {
  const dbAnimals = await AnimalRepo.findByIdIn(ids);

  if (ids.length == dbAnimals.length) {
    return [];
  }
  const dbUsersId = dbAnimals.map((animal) => animal._id.toString());
  console.log(ids);

  const notIn = ids.filter((id) => !dbUsersId.includes(id));

  return notIn;
};

export default { findAll, findById, existAnimals };
