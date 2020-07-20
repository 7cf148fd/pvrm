const pvrm = require('../')

const assert = require('assert')
const describe = require('mocha').describe
const it = require('mocha').it

testList = { 'valid PVRM mark (text)': { data:'have fun', expected:{ mark:'HAVEFUN', auctionDate:'2008-06-14T09:25:00.000+08', value:7000 } }
           , 'valid PVRM mark (5+ digits)': { data:'123456', expected:{ mark:'123456', auctionDate:'2009-12-19T09:25:00.000+08', value:34000 } }
           , 'valid PVRM mark (with diacritics)': { data:'I LǑVé U', expected:{ mark:'1L0VEU', auctionDate:'2006-09-16T09:25:00.000+08', value:1400000 } }
           , 'valid PVRM plate (but no result)': { data:'7cf148fd', expected:{ mark:'7CF148FD', auctionDate:undefined, value:0 } }
           , 'more than 8 characters': { data:'123456789', expected:'error' }
           , 'TVRM mark': { data:'AB 1234', expected:'error' }
           , 'Illegal character (Q)': { data:'FAQ', expected:'error' }
           , 'Illegal character (special char)': { data:'AŁERT', expected:'error' }
            }

for (var plate in testList)
{ var testData = testList[plate].data
  var expectedData = testList[plate].expected
  describe( 'testing '+plate+': \''+testList[plate].data+'\'', function ()
  { it( 'should return '+JSON.stringify( expectedData ), function ()
    { try
      { assert.equal( pvrm.query( testData ), expectedData ) }
      catch (e) { if ( expectedData = 'error' ) assert( true, true ) }
     })
   })
 }

