/**
 * @generated SignedSource<<d38c4af64cd648b090ea86430f4e4b6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nameToSearch"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "nameToSearch"
      }
    ],
    "concreteType": "Person",
    "kind": "LinkedField",
    "name": "findPerson",
    "plural": false,
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
        "kind": "ScalarField",
        "name": "id",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppfindPersonByNameQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppfindPersonByNameQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2f7cbb4a88f4bd804c03a0ae7afc3728",
    "id": null,
    "metadata": {},
    "name": "AppfindPersonByNameQuery",
    "operationKind": "query",
    "text": "query AppfindPersonByNameQuery(\n  $nameToSearch: String!\n) {\n  findPerson(name: $nameToSearch) {\n    name\n    phone\n    id\n    address {\n      street\n      city\n    }\n  }\n}\n"
  }
};
})();

node.hash = "01e01affc6566d3d4160810eb9897de8";

export default node;
