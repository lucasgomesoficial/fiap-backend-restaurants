var spec = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "API Specification - fiap backend restaurants",
    base_url: "https://fiap-backend-restaurants.vercel.app/api/"
  },
  paths: {
    "/restaurants": {
      post: {
        summary: "Creates restaurants.",
        operationId: "createRestaurants",
        tags: ["Restaurants API - https://fiap-backend-restaurants.vercel.app/api"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Restaurants",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Restaurants",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/IllegalInput",
          },
        },
      },
      get: {
        summary: "Lista os restaurantes",
        operationId: "listArticles",
        tags: ["Restaurants API - https://fiap-backend-restaurants.vercel.app/api"],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Restaurants",
                },
              },
            },
          },
        },
      },
    },
    "/restaurants/{id}": {
      delete: {
        summary: "Deleta a linha do restaurant.",
        operationId: "deleteRestaunt",
        tags: ["Restaurants API - https://fiap-backend-restaurants.vercel.app/api"],
        parameters: [
          {
            $ref: "#/components/parameters/Id",
          },
        ],
        responses: {
          204: {
            description: "Success",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Id: {
        description: "Resource ID",
        type: "string",
        readOnly: true,
        example: "59eea92c-e5bf-4866-81fc-248b845bb868",
      },
      Created_at: {
        description: "Resource created_at",
        type: "string",
        readOnly: true,
        example: "2023-09-08T17:59:12.789233+00:00",
      },
      RestaurantsForList: {
        properties: {
          id: {
            $ref: "#/components/schemas/Id",
          },
          title: {
            description: "titulo do restaurant",
            type: "string",
            example: "Trattoria do Vini",
          },
          description: {
            description: "descrição do Restaurants",
            type: "string",
            example: "Seja bem-vindo a Trattoria do Vini! Considerada a melhor pizzaria em São Miguel e região! Nosso ambiente é familiar, aconchegante e acolhedor. Venha nos visitar e saborear nossas pizzas!",
          },
          image: {
            description: "caminho da imagem do Restaurants",
            type: "string",
            example: "../../../images/trattoriaDoVini1.jpg",
          },
          rating: {
            description: "avaliação dos restaurantes",
            type: "number",
            example: 4.5,
          },
          address: {
            description: "endereço do restaurantes",
            type: "string",
            example: "R. Amadeu Gamberini, 283 - São Miguel Paulista, São Paulo - SP",
          },
          cep: {
            description: "cep do restaurantes",
            type: "string",
            example: "08010110",
          },
          city: {
            description: "cidade do restaurantes",
            type: "string",
            example: "São Paulo",
          },
          state: {
            description: "estado do restaurantes",
            type: "string",
            example: "São Paulo",
          },
          created_at: {
            $ref: "#/components/schemas/Created_at",
          },
        },
      },
      Restaurants: {
        allOf: [
          {
            $ref: "#/components/schemas/RestaurantsForList",
          },
        ],
      },
      RestaurantsList: {
        type: "array",
        items: {
          $ref: "#/components/schemas/RestaurantsForList",
        },
      },
      Error: {
        description:
          "<table>\n  <tr>\n    <th>Code</th>\n    <th>Description</th>\n  </tr>\n  <tr>\n    <td>illegal_input</td>\n    <td>The input is invalid.</td>\n  </tr>\n  <tr>\n    <td>not_found</td>\n    <td>The resource is not found.</td>\n  </tr>\n</table>\n",
        required: ["code", "message"],
        properties: {
          code: {
            type: "string",
            example: "illegal_input",
          },
        },
      },
    },
    parameters: {
      Id: {
        name: "id",
        in: "path",
        description: "Resource ID",
        required: true,
        schema: {
          $ref: "#/components/schemas/Id",
        },
      },
      Limit: {
        name: "limit",
        in: "query",
        description: "limit",
        required: false,
        schema: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          default: 10,
          example: 10,
        },
      },
      Offset: {
        name: "offset",
        in: "query",
        description: "offset",
        required: false,
        schema: {
          type: "integer",
          minimum: 0,
          default: 0,
          example: 10,
        },
      },
    },
    responses: {
      NotFound: {
        description: "The resource is not found.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      IllegalInput: {
        description: "The input is invalid.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};
