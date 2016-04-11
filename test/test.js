const builder = require('loopin-builder')
    , byline = require('byline')

builder()
  .then( function ( process ) {

    attachIO()

    start();
    // setInterval( test, 500 )

    function start() {
      patch( {
        kinect: { kinect: true },
        text: {
          0: 'it runs',
          1: 'it rules',
          2: 'it rocks'

        },
        show: 'kinect'
      } )
    }

    function test() {

      var images = [
        "/Volumes/hdd/koop/Loopin/loopin-dogpark/examples/bros.jpg",
        "/Volumes/hdd/koop/Loopin/loopin-dogpark/examples/drum.jpg",
      ]

      var image = images[ Math.floor( Math.random() * images.length )]

      patch( {
        image: { bar: image },

      } )
    }

    function patch( data ) {
      const str = JSON.stringify( data )
      process.stdin.write( str +"\n" )
    }

    function attachIO() {

    }

    function onProcessEvent( event ) {

      switch ( event.type ) {
        case 'frame':
          // TODO onFrame
          return;

        default:
          console.log( 'event', event )
      }

    }

  })
