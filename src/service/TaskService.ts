import UriConfigs from "../configs/UriConfigs";
import Task from "../model/Task";
import TaskRepo from "../repo/TaskRepo";
import PaginationUtility from "../utility/PaginationUtility";

const props = Task.properties;
const URIS = UriConfigs.URIS;

const findAll = async (pageIndex: number, pageSize: number) => {
  const pIndex = isNaN(pageIndex) ? 1 : pageIndex;
  const pSize = PaginationUtility.checkPageSize(
    pageSize,
    props.page.size,
    props.page.maxSize
  );
  const queryResult = await TaskRepo.findAll(pIndex, pSize);
  const tasks = queryResult[0].tasks;
  console.log(queryResult);

  const nbTasks = queryResult[0].page[0]?.count ?? 0;

  const nbPages = PaginationUtility.getMaxPage(nbTasks, pSize);

  for (let enclosure of tasks) {
    enclosure.url = UriConfigs.getResourceUrl(enclosure, "animals");
  }

  return {
    tasks: tasks,
    nbRetreived: tasks.length,
    pageIndex: pIndex,
    pageSize: pSize,
    nbPages: nbPages,
  };
};

export default { findAll };
