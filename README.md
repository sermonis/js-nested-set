# nested-set
[ ![Codeship Status for netgenes/nested-set](https://app.codeship.com/projects/a2c346d0-b753-0134-a2e6-3617a86d3e20/status?branch=master)](https://app.codeship.com/projects/194505)

Simple helper for nested set. Nest flat or flat nested.

## Install
```sh
npm install nested-set
```

## Usage
For nest flat data remember to provide data sorted by left property 

```js
const nestedSetContextFactory = require('nested-set');
/**
* default options {
*   left: 'lft',
*   right: 'rgt',
*   children: 'children'
* }
*/
const nestedSetContext = nestedSetContextFactory(/*options*/);
// e.g result from db
const flat = [
               {
                 "lft": 1,
                 "rgt": 22,
                 "name": "Clothing"
               },
               {
                 "lft": 2,
                 "rgt": 9,
                 "name": "Men's"
               },
               {
                 "lft": 3,
                 "rgt": 8,
                 "name": "Suits"
               },
               {
                 "lft": 4,
                 "rgt": 5,
                 "name": "Slacks"
               },
               {
                 "lft": 6,
                 "rgt": 7,
                 "name": "Jackets"
               },
               {
                 "lft": 10,
                 "rgt": 21,
                 "name": "Women's"
               },
               {
                 "lft": 11,
                 "rgt": 16,
                 "name": "Dresses"
               },
               {
                 "lft": 12,
                 "rgt": 13,
                 "name": "Evening Gowns"
               },
               {
                 "lft": 14,
                 "rgt": 15,
                 "name": "Sun Dresses"
               },
               {
                 "lft": 17,
                 "rgt": 18,
                 "name": "Skirts"
               },
               {
                 "lft": 19,
                 "rgt": 20,
                 "name": "Blouses"
               }
             ];

const nested = nestedSetContext.nest(flat);
/* will produce
 *
 * [
     {
       "name": "Clothing",
       "children": [
         {
           "name": "Men's",
           "children": [
             {
               "name": "Suits",
               "children": [
                 {
                   "name": "Slacks"
                 },
                 {
                   "name": "Jackets"
                 }
               ]
             }
           ]
         },
         {
           "name": "Women's",
           "children": [
             {
               "name": "Dresses",
               "children": [
                 {
                   "name": "Evening Gowns"
                 },
                 {
                   "name": "Sun Dresses"
                 }
               ]
             },
             {
               "name": "Skirts"
             },
             {
               "name": "Blouses"
             }
           ]
         }
       ]
     }
   ]
 */
const flatCopy = nestedSetContext.flat(nested);

/* flatCopy == flat*/
```
