const Typesense = require("typesense");
require("dotenv").config();

export const client = new Typesense.Client({
  nodes: [
    {
      host: "lscxdvaqo08kbmyrp-1.a1.typesense.net", 
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});

const schema = {
  name: "vetClinics",
  fields: [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "formatted_address", type: "string" },
    { name: "address.city", type: "string" },
    { name: "address.län", type: "string" },
    { name: "address.country", type: "string" },
    { name: "rating", type: "float" },
    { name: "phone_number", type: "string" },
    {
      name: "openinghours",
      type: "object",
      nested: [
        {
          name: "sv",
          type: "object",
          nested: [
            {
              name: "periods",
              type: "object[]",
              facet: true,
              nested: [
                {
                  name: "open",
                  type: "object",
                  nested: [
                    { name: "day", type: "int" },
                    { name: "time", type: "string" },
                  ],
                },
                {
                  name: "close",
                  type: "object",
                  nested: [
                    { name: "day", type: "int" },
                    { name: "time", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "website", type: "string" },
  ],
  default_sorting_field: "rating",
  enable_nested_fields: true,
};



// client
//   .collections()
//   .create(schema)
//   .then(function (collection: any) {
//     console.log("Collection created:", collection);
//   })
//   .catch(function (error: any) {
//     console.error("Error creating collection:", error);
//   });



