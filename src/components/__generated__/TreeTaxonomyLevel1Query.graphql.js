/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule TreeTaxonomyLevel1Query.graphql
 * @generated SignedSource<<8e1932f8b7eb7ba168ab41263a5196b1>>
 * @relayHash 2468a6cd51c1524e5a6731a18d5d75f4
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/


/*
query TreeTaxonomyLevel1Query(
  $datatypename: String!
) {
  dataTypeByName(name: $datatypename) {
    categoryByDataType {
      nodes {
        id
        name
        taxonomyByCategory {
          totalCount
        }
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "datatypename",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TreeTaxonomyLevel1Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "datatypename",
            "type": "String!"
          }
        ],
        "concreteType": "DataType",
        "name": "dataTypeByName",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "DataTypeCategoryByDataTypeConnection",
            "name": "categoryByDataType",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "CategoryTaxonomyByCategoryConnection",
                    "name": "taxonomyByCategory",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "TreeTaxonomyLevel1Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "datatypename",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "TreeTaxonomyLevel1Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "datatypename",
            "type": "String!"
          }
        ],
        "concreteType": "DataType",
        "name": "dataTypeByName",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "DataTypeCategoryByDataTypeConnection",
            "name": "categoryByDataType",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "CategoryTaxonomyByCategoryConnection",
                    "name": "taxonomyByCategory",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query TreeTaxonomyLevel1Query(\n  $datatypename: String!\n) {\n  dataTypeByName(name: $datatypename) {\n    categoryByDataType {\n      nodes {\n        id\n        name\n        taxonomyByCategory {\n          totalCount\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
