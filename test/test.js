const pvrm = require('../')
const describe = require('mocha').describe
const it = require('mocha').it

testList = { 'test name 1': { data:'QQ 1234', expected:'error' }
           , 'test name 2': { data:'I LOVE U', expected:{} }
            }

for (var plate in testList)
{ var testData = testList[plate].data
  var expectedData = testList[plate].expected
  describe( 'testing '+plate, function ()
  { it( 'should return '+JSON.stringify( expectedData ), function ()
    { try
      { assert.equal( pvrm.query( testData ), expectedData ) }
      catch (e) { if ( expectedData = 'error' ) assert( true, true ) }
     })
   })
 }
