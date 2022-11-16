import { Doc } from "./TsTypes";

const addUrl = <T>(resources: Doc<T>[], resourceUri: string) => {
  const output = [];

  for (let resource of resources) {
    output.push({
      resource: resource,
      url: resourceUri + "/" + resource._id,
    });
  }

  return output;
};

export default { addUrl };
