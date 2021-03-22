# pvrm
[![7CF](https://img.shields.io/static/v1?label=by&message=7cf148fd&color=fc7&style=flat)](https://7cf148fd.wordpress.com/about-en/) [![VERSION](https://img.shields.io/github/package-json/v/7cf148fd/pvrm)](https://github.com/7cf148fd/pvrm) [![STATUS](https://img.shields.io/static/v1?label=status&message=public&color=191&style=flat)]() [![LICENSE](https://img.shields.io/static/v1?label=license&message=MIT&color=777&style=flat)](https://opensource.org/licenses/MIT)

## Description

PVRM stands for *Personalized Vehicle Registration Marks*. This is the [Hong Kong government auction system](https://www.td.gov.hk/en/public_services/vehicle_registration_mark/index.html), created in 2006, by which citizens can bid for a *special vehicle registration mark* (ie a non-standard number). Auctions are public and the price of each plate published in a (dirty) PDF file at the end of each auction.

This package offers a simple query system for people willing to know whether a plate has already been auctioned and if the case, when the plate was initially purchased from the government and at what price. The underlying database includes:
* PVRM plates allocated since the first auction held by the government on 16 September 2006.
* PVRM plates auctioned during the annual lunar year auctions.

Please note that TVRM plates are *not* included in this set.
PVRM ordinary registration marks (such as HK+digits or XX+digits) are *not* included.

## Important notes

Return format:
```js
{ mark: '<string>',       // cleanup result (see below)
  auctionDate: '<date>',  // in ISO-8601 format (standard JSON date)
  value: <value>,         // in Hong Kong dollars
 }
```

The module cleans up the argument to match qualifying PVRM criteria. In particular:
* Everything is converted to UPPERCASE
* All 'O' and 'I' letters are replaced by '0' and '1' digits, respectively
* All diacritics are removed
* *Spaces are removed*, as plate requests that differ from an existing one only by spaces are not allowed

The `auctionDate` has its hour arbitrarily set to 9:25am Hong Kong time, which is the usual auction time.

If the plate is not found, the *auction date* is not set and *value* is set to zero.

The module will throw an error if the requested plate:
* is longer than 8 characters, even after clean-up and space removal
* contains the letter 'Q' or other special/illegal characters (eg, non-ASCII letters)
* is a TVRM plate (eg 1-4 digits only, 2 letters plus 1-4 digits, or special A/F plates)

I am doing my best to keep the module updated as fast as possible after auctions.
Please note that due to the uneven frequency of auctions, it is essential to keep the package regularly updated.
Don't hesitate to contact me if you detect errors or missing data, as the database is updated semi-manually.

**Thanks for respecting the copyright and quoting my name in your work if you use the module.
I have spent a significant amount of personal time compiling this data for the past few years.**

## Install

`npm install pvrm`

## Detailed usage and examples

```js
const pvrm = require('pvrm')

// usage: pvrm.query( 'plate' )

pvrm.query( 'I LOVE U' )
// { mark:'1L0VEU', auctionDate:'2006-09-16T09:25:00.000+08', value:1400000 }

pvrm.query( 'HAVE FUN' )
// { mark:'HAVEFUN', auctionDate:'2008-06-14T09:25:00.000+08', value:7000 }

pvrm.query( 123456 )
// { mark:'123456', auctionDate:'2009-12-19T09:25:00.000+08', value:34000 }

pvrm.query( '7CF148FD' )
// { mark:'7CF148FD', value:0 }

pvrm.query( '123456789' )
// Error Mark is too long

pvrm.query( 'AB 1234' )
// Error Mark is TVRM

pvrm.query( 'FAQ' )
// Error Invalid character
```
