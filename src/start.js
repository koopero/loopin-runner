module.exports = start

const Promise = require('bluebird-extra')

const Stdio = require('./Stdio')
    , Loopin = require('./Loopin')

const builder = require('loopin-builder')

function start( opt ) {
  return builder()
    .then( function ( process ) {
      const stdio = Stdio( process )
          , loopin = Loopin()

      loopin.setConnection( stdio )

      return loopin
    })
}
