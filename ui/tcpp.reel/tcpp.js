/**
 * @module ui/tcpp.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/tcpp_design.json");
// sampleResultToForceIncludeInMop = require("assets/stimuli/tcpp_sample_result.json");

var enLocales = require("assets/stimuli/locale/en/messages.json");
var frLocales = require("assets/stimuli/locale/fr/messages.json");
var iuLocales = require("assets/stimuli/locale/iu/messages.json");


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

            this.canReplayStimuli = true;
            this.canPauseStimuli = true;

            this.contextualizer.addMessagesToContextualizedStrings(enLocales, "en");
            this.contextualizer.addMessagesToContextualizedStrings(frLocales, "fr");
            this.contextualizer.addMessagesToContextualizedStrings(iuLocales, "iu");

            this.application.currentStimuliDialect = {
                "iso": "fr",
                "name": "French",
                "nativeName": "français"
            };
            this.contextualizer.currentLocale = this.application.currentStimuliDialect.iso;
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

    transform: {
        value: function() {

            var x = JSON.parse(JSON.stringify(designToForceIncludeInMop));
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
                    stimulus.target.orthographic = stimulus.targetImage.replace(".png", "").replace(/\d+_/g, "");
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
            // x.subexperiments[0].trials[0]
            // x.subexperiments[1].trials[6]

        }
    }
});

exports.Tcpp = TCPP;
