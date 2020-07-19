# pvrm
[![7CF](https://img.shields.io/static/v1?label=by&message=7cf148fd&color=fc7&style=flat)](https://7cf148fd.wordpress.com/about-en/) [![VERSION](https://img.shields.io/github/package-json/v/7cf148fd/pvrm)](https://github.com/7cf148fd/pvrm) [![STATUS](https://img.shields.io/static/v1?label=status&message=public&color=191&style=flat)]() [![LICENSE](https://img.shields.io/static/v1?label=license&message=MIT&color=777&style=flat)](https://opensource.org/licenses/MIT)

## Description

PVRM stands for /Personalized Vehicle Registration Marks/. This is the Hong Kong government auction system, created in 2006, by which citizens can bid for a particular car plate. Auctions are public and the price of each plate published in a (dirty) PDF file every month.

This package offers a simple query system for people to know whether a plate is available and if not, when it was initially purchased from the government and at what price. The database includes:
* PVRM plates allocated since the first auction held by the government on 16 September 2006.
* PVRM plates auctioned during the annual lunar year auctions.

Please note that TVRM plates are *not* included in this set.

## Important notes

Return format:
```js
{ plate: '<string>',      // the plate found (force UPPERCASE)
  auctionDate: '<date>',  // in ISO-8601 format (standard JSON date)
  value: <value>,         // in Hong Kong dollars
 }
```

The module cleans up the argument to match qualifying PVRM criteria. In particular:
* All 'O' and 'I' letters are replaced by '0' and '1' digits, respectively
* Spaces are removed (plates that differ only by spaces are not allowed)

The `auctionDate` has its hour arbitrarily set to 9:25am Hong Kong time, which is the usual auction time.

If the plate is not found, the auction date will be set to `undefined` and Value set to zero.

The module will throw an error if:
* the requested plate, even after clean-up, is more than 8 characters
* the requested plate contains illegal characters (eg, 'Q' letter, diacritics, etc.)

Please note that due to the uneven frequency of auctions, it is essential to keep the package regularly updated.

I am doing my best to keep the module updated as fast as possible after auctions.
Don't hesitate to contact me if you detect errors.

## Install

`npm install pvrm`

## Detailed usage and examples

```js
const pvrm = require('pvrm')

// usage: pvrm( 'plate' )

pvrm( 'I LOVE U' )
// { plate:'1L0VEU', auctionDate:'2016-09-16T02:25:00.000Z', value:1400000 }

pvrm( '' )
// 

```
