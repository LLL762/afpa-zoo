import UriConfigs from "../configs/UriConfigs";
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

const addKey = (object: any, path: string, newValue: any) => {

  if (typeof object == "undefined") {
    return;
  }
  const stack = path.split(".");

  while (stack.length > 1) {
    object = object[stack.shift() as string];
  };



  object[stack.shift() as string] = newValue;

};



export default { addUrl, addKey };
