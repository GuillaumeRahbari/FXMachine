var context;


// The sound, decoded
var soundBuffer;

var buttonPlay, buttonStop, buttonLoad;

// url to access the music
var musicUrl = './zik.mp3';


// The first box of the graph, linked to the soundBuffer
var soundInput;

// a volume box
var gainNode = null;

// a Filter Box
var filter = null;


// INIT -> LOADSOUND [DECODE] -> PLAYSOUND [BUILDGRAPH]



/**
Initialize the "Audio Context", which is kinda the environment where we put all the boxes
There can be only one !
*/
function init() 
{ 
    
    try
    {
        context = new AudioContext();
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) 
    {
        alert('Web Audio API is not supported in this browser');
    }

    buttonPlay = document.getElementById("play");
    buttonStop = document.getElementById("stop");
    buttonLoad = document.getElementById("load");

}


/**
Load our Sound using XHR
*/
function loadSound() 
{
    console.log("loading " + musicUrl + " using Xhr2");
    // Note: this loads asynchronously
    var request = new XMLHttpRequest();

    request.open("GET", musicUrl, true);
    // BINARY TRANSFERT !
    request.responseType = "arraybuffer";

    // Our asynchronous callback
    request.onload = function() {
        var audioData = request.response;
        // We got the sound file from the server, let's decode it
        decode(audioData);
    };

    request.send();
}





/**
Construct the graph and play the sound
Finally: tell the source when to start
*/
function playSound() {
    // play the source now. 
    // First parameter = delay in seconds before starting to play
    // Second parameter = where do we start (0 = beginning of song)
    console.log("playing sound");

    // connect sound samples to the speakers
    buildGraph();

    // BEWARE : the graph should be connected, if sound has been stopped,
    // and if the graph is not built (i.e the previous line of code is not present)
    // Then the next line will do nothing, we need to rebuild the graph
    soundInput.start(0, 0);

    buttonStop.disabled = false;
    buttonPlay.disabled = true;
}

/**
*/
function stopSound() {
     console.log("Stopping sound, Graph destroyed, cannot be played again without rebuilding the graph !");
    // stop the source now.
    // Parameter : delay before stopping
    // BEWARE : THIS DESTROYS THE NODE ! If we stop, we need to rebuid the graph again !
    // We do not need to redecode the data, just to rebuild the graph
    soundInput.stop(0);
    buttonPlay.disabled = false;
    buttonStop.disabled = true;
}

/**
Construct/Initialize the boxes
*/
function buildGraph() {
    console.log("Building the audio graph : connecting decoded sound sample to the speakers");
    


    // *** Initializing my boxes

    // soundInput becomes the "input" box
    soundInput = context.createBufferSource();

    // filter box
    filter = context.createBiquadFilter();

    // Create a gain node.
    gainNode = context.createGain();


    //** Giving parameters to the boxes
 
    // Create and specify parameters for the low-pass filter.
    filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
    filter.frequency.value = 440; // Set cutoff to 440 HZ


    //** Connect all together

    soundInput.buffer = soundBuffer;
    // Create the audio graph.
    soundInput.connect(filter);
    // Connect the source to the gain node.
    filter.connect(gainNode);


    // Connect the gain node to the destination (by default: speaker)
    gainNode.connect(context.destination);
}


/**
*/
function decode(audioData) {
    console.log("decoding audio data... WebAudio uses RAW sample in memory, not compressed one");
       
    // The Audio Context handles creating source buffers from raw binary
    context.decodeAudioData(audioData, function onSuccess(soundBufferDecoded) {
        soundBuffer = soundBufferDecoded;

        console.log("sample ready to be played, decoded. It just needs to be inserted into an audio graph");
        
        buttonPlay.disabled = false;
        buttonLoad.disabled = true;
    }, function onFailure() {
        alert("Decoding the audio buffer failed");
    });             
}



//**********

var changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.

  console.log("new volume : " + (fraction*fraction) );

  this.gainNode.gain.value = fraction * fraction;
};


var changeFilter = function(element) {
  var newCutoff = parseInt(element.value) ;

console.log("new cutoff : " + newCutoff);
   filter.frequency.value = newCutoff; // Set cutoff to 440 HZ

};


