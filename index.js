const db = require( './db.json' )
const crypto = require( 'crypto' )

function query( str )
{ var clean = cleanup( str )
  var hash = crypto.createHash('sha1').update(clean).digest('hex')

  if( db[hash] )
  { var d = db[hash]['d']
    var date = new Date( Date.UTC( Math.floor(d/10000), Math.floor((d%10000)/100)-1, Math.floor(d%100), 1, 25, 0 ) ).toJSON()
    var value = db[hash]['v']*1000
    return( { 'mark':clean, 'auctionDate':date, 'value':value } )
   }
  else { return ( { plate:clean, auctionDate:'', value:0 } ) }
 }
exports.query = query

function cleanup( str )
{ var clean = str.replace(/ /g,'').replace(/O/g,'0').replace(/I/g,'1').normalize("NFD").replace(/[\u0300-\u036f]/g,'').toUpperCase()
  if( clean.match(/Q/) ) { throw new Error('Invalid character') }
  if( clean.length > 7 ) { throw new Error('Mark is too long') }
  if( clean.match(/^[A-Z]{0,2}[1-9][0-9]{0,3}$/) ) { throw new Error('Mark is TVRM') }
  if( ! clean.match(/^[A-Z0-9]*$/) ) { throw new Error('Invalid character') }
  return( clean )
 }
