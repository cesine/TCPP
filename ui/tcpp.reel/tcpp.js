/**
 * @module ui/tcpp.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/tcpp_design.json");

// var enLocales = require("assets/stimuli/locale/en/messages.json");
// var frLocales = require("assets/stimuli/locale/fr/messages.json");
// var iuLocales = require("assets/stimuli/locale/iu/messages.json");


/**
 * @class TCPP
 * @extends Experiment
 */
var TCPP = exports.TCPP = Experiment.specialize( /** @lends TCPP# */ {
    constructor: {
        value: function TCPP() {
            // console.log(designToForceIncludeInMop);
            this.experimentalDesignSrc = "assets/stimuli/tcpp_design.json";
            this.super();
            this.loadDesign(designToForceIncludeInMop);


        }
    },

    handleStartExperimentPress: {
        value: function() {
            console.log("start button action ");
        }
    }
    // enterDocument: {
    //     value: function() {
    //         this.super();
    //         this.templateObjects.currentStimulus.templateObjects.reinforcement.images = ;

    //         this.templateObjects.currentStimulus.templateObjects.reinforcement.firstImageSrc = "../../../../assets/stimuli/image/r00_caterpillars.png";
    //         this.templateObjects.currentStimulus.templateObjects.reinforcement.lastImageSrc = "";
    //         this.templateObjects.currentStimulus.templateObjects.reinforcement.showFirst();
    //     }
    // }
    // templateModuleId: {
    //     value: "oprime-montage/ui/experiment.reel/experiment.html"
    // }
});

exports.Tcpp = TCPP;
