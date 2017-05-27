require.config({
  paths: {
    // Note the `delayStartupUntil=configured` parameter
    mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML',
    jquery: 'jquery-2.1.1.min'
  },
  shim: {
    mathjax: {
      exports: 'MathJax',
      init: function () {
        MathJax.Hub.Config({
          config: ['MMLorHTML.js'],
          extensions: ['tex2jax.js'],
          jax: ['input/TeX', 'output/HTML-CSS'],
          tex2jax: {
            inlineMath: [ ['$','$'] ],
            displayMath: [ ['$$','$$'] ],
            processEscapes: true
          },
          'HTML-CSS': { availableFonts: ['TeX'] }
        });
        MathJax.Hub.Startup.onload();
        return MathJax;
      }
    },
    jquery: {
       exports: '$'
    }
  }
});

require(
  ['order!../slide_config',
   'order!modernizr.custom.45394',
   'order!prettify/prettify',
   'order!mathjax',
   'order!hammer',
   'order!mt',
   'order!slide-controller',
   'order!slide-deck'],
   function(someModules){
   }
);

require(
  ['order!jquery'],
  function($){
    $(function(){
      $(document).ready(function(){
        // Monty Hall Simulation
        $('#montytrials').change(function(){
          $('#montydisp').html($('#montytrials').val());
        });

        $('#montyexec').click(function(){
          var ncCars = 0;
          var ncGoats = 0;
          var dcCars = 0;
          var dcGoats = 0
          var mt = new MersenneTwister();
          var trials = parseInt($('#montytrials').val());
          for (var i = 0; i < trials; ++i) {
            var answer = [false, false, false];
            answer[mt.nextInt(0, 3)] = true;

            var chosen = mt.nextInt(0, 3);

            // non-change policy
            if (answer[chosen]) {
              ++ncCars;
            }
            else {
              ++ncGoats;
            }

            // do-change policy
            if (answer[chosen]) {
              ++dcGoats;
            }
            else {
              ++dcCars;
            }
          }
          $('#montyNcCars').html(ncCars);
          $('#montyNcGoats').html(ncGoats);
          $('#montyDcCars').html(dcCars);
          $('#montyDcGoats').html(dcGoats);
          $('#montyNcProb').html(ncCars / (ncCars + ncGoats));
          $('#montyDcProb').html(dcCars / (dcCars + dcGoats));
        });
      });
    });
  }
);
