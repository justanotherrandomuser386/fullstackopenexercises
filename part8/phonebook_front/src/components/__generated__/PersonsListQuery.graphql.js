/**
 * @generated SignedSource<<de939432cd92fa69eb7d471e30419332>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonsListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PersonsListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ed909e0650917483973515d2c395794a",
    "id": null,
    "metadata": {},
    "name": "PersonsListQuery",
    "operationKind": "query",
    "text": "query PersonsListQuery {\n  allPersons {\n    name\n    phone\n    address {\n      street\n      city\n    }\n    id\n  }\n}\n"
  }
};
})();

node.hash = "4a1f7742168fd5251c63bb6557f39bd9";

export default node;
