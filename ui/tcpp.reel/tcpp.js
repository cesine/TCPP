/**
 * @module ui/tcpp.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/tcpp_design.json");
// sampleResultToForceIncludeInMop = require("assets/stimuli/tcpp_sample_result.json");

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

    experimentType: {
        value: "tcpp"
    },

    handleStartExperimentPress: {
        value: function() {
            console.log("start button action ");
        }
    },


    addSelectListeners: {
        value: function() {
            console.log("addSelectListeners");
            // this.templateObjects.rangeController.content = this.content;
            this.templateObjects.audiencesController.content = this.audiences;
            this.templateObjects.experimentStimuliDialectsController.content = this.locales;

            //Observe the selection for changes
            // this.templateObjects.rangeController.addRangeAtPathChangeListener(
            //  "selection", this, "handleSelectionChange");
            // this.audiencesController = RangeController.create().initWithContent(this.audiences);
            // this.audiencesController.selection = [];
            // this.audiencesController.addRangeAtPathChangeListener(
            //  "selection", this, "handleAudienceChange");
            this.templateObjects.audiencesController.addRangeAtPathChangeListener(
                "selection", this, "handleSelectionChange");
            // this.localesController = RangeController.create().initWithContent();
            // this.localesController.selection = [];
            // this.localesController.addRangeAtPathChangeListener(
            //  "selection", this, "handleLocaleChange");
            this.templateObjects.experimentStimuliDialectsController.addRangeAtPathChangeListener(
                "selection", this, "handleSelectionChange");
        }
    },

    enterDocument: {
        value: function(firstTime) {
            this.super(firstTime);

            if (firstTime) {
                this.addSelectListeners();
            }
        }
    },

    handleSelectionChange: {
        value: function(plus, minus) {
            console.log("Selection changed from: " + (minus[0] ? minus[0].quote : "nothing") + " -> " + (plus[0] ? plus[0].quote : "nothing"));
        }
    },

    handleValuesRangeChange: {
        value: function(plus, minus) {
            console.log("Selection changed from: " + (minus[0] ? minus[0].quote : "nothing") + " -> " + (plus[0] ? plus[0].quote : "nothing"));
        }
    },

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
    transform: {
        value: function() {

            x = JSON.parse(JSON.stringify(designToForceIncludeInMop))
            for (var subexperimentIndex = 0; subexperimentIndex < x.subexperiments.length; subexperimentIndex++) {
                var subexperiment = x.subexperiments[subexperimentIndex];
                subexperiment.scoreSubTotal = 0;
                for (var stimulusIndex = 0; stimulusIndex < subexperiment.trials.length; stimulusIndex++) {
                    var stimulus = subexperiment.trials[stimulusIndex];

                    stimulus.prime.carrierPhrase = stimulus.auditoryStimulus;
                    delete stimulus.auditoryStimulus;

                    stimulus.prime.phonemic = stimulus.primePhonemeic.replace(/\//g, "");
                    delete stimulus.primePhonemeic;

                    stimulus.prime.imageFile = stimulus.primeImage;
                    stimulus.prime.orthographic = stimulus.audioFile.replace(".mp3", "").replace(/TCPP_/g, "").replace(/\d/g, "");
                    delete stimulus.primeImage;

                    stimulus.prime.carrierAudio = stimulus.audioFile;
                    delete stimulus.audioFile;

                    stimulus.target.phonemic = stimulus.targetPhonemic.replace(/\//g, "");
                    delete stimulus.targetPhonemic;

                    stimulus.target.imageFile = stimulus.targetImage;
                    stimulus.target.orthographic = stimulus.targetImage.replace(".png", "").replace(/\d+_/g, "")
                    delete stimulus.targetImage;

                    for (var distractor = 0; distractor < stimulus.distractorImages.length; distractor++) {
                        stimulus.distractors.push({
                            phonemic: stimulus.distractorImages[distractor].replace(".png", "").replace(/\d+_/g, ""),
                            imageFile: stimulus.distractorImages[distractor],
                            orthographic: stimulus.distractorImages[distractor].replace(".png", "").replace(/\d+_/g, "")
                        });
                    }
                    delete stimulus.distractorImages;
                    delete stimulus.cueToShowPrime;
                    delete stimulus.cueToShowTargets;

                    stimulus.audioFileIntroduceChoicesTiming = stimulus.audioFileIntroduceTargetsTiming;
                    delete stimulus.audioFileIntroduceTargetsTiming;

                    stimulus.audioFileIntroduceChoicesTiming.firstChoice = stimulus.audioFileIntroduceFirstTarget;
                    delete stimulus.audioFileIntroduceFirstTarget;

                    stimulus.audioFileIntroduceChoicesTiming.audioFile = stimulus.audioFileIntroduceTargets;
                    delete stimulus.audioFileIntroduceTargets;

                }
            }
            x.subexperiments[0].trials[0]
            x.subexperiments[1].trials[6]

        }
    }
});

exports.Tcpp = TCPP;
