import { client } from "./client";
//testsök
client
  .collections("clinics")
  .documents()
  .search({
    q: "sandviken",
    query_by: "name",
  })
  .then((result: any) => {
    result.hits.forEach((hit: any) => {
      console.log("Clinic:", hit.document);
    });
  })
  .catch(console.error);
