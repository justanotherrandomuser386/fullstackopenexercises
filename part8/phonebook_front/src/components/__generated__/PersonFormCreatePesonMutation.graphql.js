/**
 * @generated SignedSource<<79d0b54254965fc78cf4f6f7034374b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "city"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "phone"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "street"
},
v4 = [
  {
    "kind": "Variable",
    "name": "city",
    "variableName": "city"
  },
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "phone",
    "variableName": "phone"
  },
  {
    "kind": "Variable",
    "name": "street",
    "variableName": "street"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonFormCreatePesonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "addPerson",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PersonFragment_person"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "PersonFormCreatePesonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "addPerson",
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
    "cacheID": "ab7f29b598507bf35e699e469594142d",
    "id": null,
    "metadata": {},
    "name": "PersonFormCreatePesonMutation",
    "operationKind": "mutation",
    "text": "mutation PersonFormCreatePesonMutation(\n  $name: String!\n  $street: String!\n  $city: String!\n  $phone: String\n) {\n  addPerson(name: $name, street: $street, city: $city, phone: $phone) {\n    ...PersonFragment_person\n    id\n  }\n}\n\nfragment PersonFragment_person on Person {\n  name\n  phone\n  address {\n    street\n    city\n  }\n  id\n}\n"
  }
};
})();

node.hash = "cb57f382215ae6e9e7091914d6c20fa2";

export default node;
