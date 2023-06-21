/**
 * @generated SignedSource<<eb7d1c0c7a6c318d2ca4a12ac249980c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "allPersons",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PersonsList_persons"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "allPersons",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Address",
            "kind": "LinkedField",
            "name": "address",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "000b9c82c4521562ebf963478905b352",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  allPersons {\n    ...PersonsList_persons\n    id\n  }\n}\n\nfragment PersonFragment_person on Person {\n  name\n  phone\n  address {\n    street\n    city\n  }\n  id\n}\n\nfragment PersonsList_persons on Person {\n  ...PersonFragment_person\n}\n"
  }
};

node.hash = "44e3b8b10612180a6afc7330ad30a110";

export default node;
