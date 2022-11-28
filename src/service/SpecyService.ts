import UriConfigs from "../configs/UriConfigs";
import Specy from "../model/Specy";
import AnimalRepo from "../repo/AnimalRepo";
import SpecyRepo from "../repo/SpecyRepo";
import PaginationUtility from "../utility/PaginationUtility";

const URIS = UriConfigs.URIS;
const props = Specy.properties;

const findAll = async (pageIndex: number, pageSize: number) => {
  const pIndex = isNaN(pageIndex) ? 1 : pageIndex;
  const pSize = PaginationUtility.checkPageSize(
    pageSize,
    props.page.size,
    props.page.maxSize
  );
  const queryResult = await SpecyRepo.findAll(pIndex, pSize);
  const species = queryResult[0].species;
  const nbSpecies = queryResult[0].page[0].count;

  const nbPages = PaginationUtility.getMaxPage(nbSpecies, pSize);

  for (let enclosure of species) {
    enclosure.url = UriConfigs.getResourceUrl(enclosure, "animals");
  }

  return {
    species: species,
    nbRetreived: species.length,
    pageIndex: pIndex,
    pageSize: pSize,
    nbPages: nbPages,
  };
};

export default { findAll };
