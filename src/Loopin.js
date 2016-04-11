module.exports = Loopin

const util = require('./util')

function Loopin() {
  const loopin = Object.create( Loopin.prototype )

  var connection

  loopin.patch = patch
  function patch( value, path ) {
    value = util.wrapObjectInPath( value, path )
    connection.patch( value )
  }

  loopin.read = read
  function read( path ) {
    patch( 'read', path )
  }

  loopin.listen = listen
  function listen( path, cb ) {

  }

  loopin.setConnection = setConnection
  function setConnection( newConnection ) {
    connection = newConnection
    connection.on('event', onEvent )
  }

  function onEvent( event ) {
    if ( event.type == 'frame' )
      return
    console.log('onEvent', event)
  }

  return loopin
}
