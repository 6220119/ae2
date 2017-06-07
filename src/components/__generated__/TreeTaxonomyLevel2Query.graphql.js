/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule TreeTaxonomyLevel2Query.graphql
 * @generated SignedSource<<3264c201bbc3e9620365fd51378e1235>>
 * @relayHash ad589578ce9d83aee6d9a950d69368b9
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/


/*
query TreeTaxonomyLevel2Query(
  $categoryname: String!
) {
  categoryByName(name: $categoryname) {
    taxonomiesByCategory {
      nodes {
        id
        name
        taxonomyObjectLevel1 {
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
        "name": "categoryname",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TreeTaxonomyLevel2Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "categoryname",
            "type": "String!"
          }
        ],
        "concreteType": "Category",
        "name": "categoryByName",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TaxonomiesConnection",
            "name": "taxonomiesByCategory",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
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
                    "concreteType": "TaxonomyTaxonomyObjectLevel1Connection",
                    "name": "taxonomyObjectLevel1",
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
  "name": "TreeTaxonomyLevel2Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "categoryname",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "TreeTaxonomyLevel2Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "categoryname",
            "type": "String!"
          }
        ],
        "concreteType": "Category",
        "name": "categoryByName",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TaxonomiesConnection",
            "name": "taxonomiesByCategory",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
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
                    "concreteType": "TaxonomyTaxonomyObjectLevel1Connection",
                    "name": "taxonomyObjectLevel1",
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
  "text": "query TreeTaxonomyLevel2Query(\n  $categoryname: String!\n) {\n  categoryByName(name: $categoryname) {\n    taxonomiesByCategory {\n      nodes {\n        id\n        name\n        taxonomyObjectLevel1 {\n          totalCount\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
