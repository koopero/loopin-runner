#!/usr/bin/env node

const start = require('../src/start')

var opt

start()
  .then( function ( loopin ) {

    const patch = loopin.patch

    patch( {
      kinect: { kinect: true },
      text: {
        0: 'it runs',
        1: 'it rules',
        2: 'it rocks'

      },
      // show: 'kinect'
    } )

  })
