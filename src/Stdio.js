module.exports = Stdio

const EventEmitter = require('events')
const util = require('util')
    , byline = require('byline')


util.inherits(Stdio, EventEmitter);

function Stdio( proc ) {
  const stdio = Object.create( Stdio.prototype )
  EventEmitter.call( stdio )

  stdio.patch = patch
  function patch( value ) {
    const json = JSON.stringify( value )
    console.log( 'patching', json )
    proc.stdin.write( json+'\n' )
  }

  const dispatch = stdio.emit.bind( stdio, 'event' )

  const warn = function ( line ) {
    if ( line )
      stdio.emit( 'warn', line )
  }

  proc.stdout.setEncoding( 'utf8' )
  const stdout = byline( proc.stdout )
  stdout.on( 'data', function ( line ) {
    try {
      var event = JSON.parse( line )
    } catch ( e ) {
      // console.warn( line )
      // warn("bad json")
    }

    if ( event )
      dispatch( event )
  })


  proc.stderr.setEncoding( 'utf8' )
  const stderr = byline( proc.stderr )
  stderr.on('data', warn )

  return stdio
}
