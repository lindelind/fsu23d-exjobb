import { client } from "./client";
//testsök
client
  .collections("clinics")
  .documents()
  .search({
    q: "smådjur",
    query_by: "name",
  })
  .then((result: any) => {
    result.hits.forEach((hit: any) => {
      console.log(
        `Name: ${hit.document.name}, Address: ${hit.document.address.city}`
      );
    });
  })
  .catch(console.error);
