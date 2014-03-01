/**
 * @module ui/tcpp-stimulus.reel
 * @requires core/contextualizable-component
 */
var AbstractStimulus = require("oprime-montage/core/abstract-stimulus").AbstractStimulus;

/** dealy audio autoplay 
 * Reference from
 * http://stackoverflow.com/questions/11973673/have-audio-tag-play-after-a-delay
 */

/**
 * @class TCPPStimulus
 * @extends AbstractStimulus
 */
var TCPPStimulus = exports.TCPPStimulus = AbstractStimulus.specialize( /** @lends TCPPStimulus# */ {
	constructor: {
		value: function TCPPStimulus() {
			this.super();
			this.confirmResponseChoiceMessage = "confirm_choice";
		}
	},

	assetsPath: {
		value: null
	},

	load: {
		value: function(stimulus) {
			var imagePath = this.imageAssetsPath || "missingpath";
			imagePath += "/";
			var audioPath = this.audioAssetsPath || "missingpath";
			audioPath += "/";

			this.visualChoiceA = imagePath + stimulus.audioFileIntroduceChoicesTiming.visualChoiceA.imageFile;
			this.visualChoiceB = imagePath + stimulus.audioFileIntroduceChoicesTiming.visualChoiceB.imageFile;
			this.visualChoiceC = imagePath + stimulus.audioFileIntroduceChoicesTiming.visualChoiceC.imageFile;
			this.visualChoiceD = imagePath + stimulus.audioFileIntroduceChoicesTiming.visualChoiceD.imageFile;

			this.audioFile = audioPath + stimulus.prime.carrierAudio;
			this.primeImage = imagePath + stimulus.prime.imageFile;
			this.audioFileWhichIntroduceChoices = audioPath + stimulus.audioFileIntroduceChoicesTiming.audioFile;
			
			/* Dont draw the images yet, wait until we say its time */
			this.showVisualTargets = false;

			this.super(stimulus);
			this.handleAnimateVisualPrime();

			// this.application.debugMode = true; // TODO control with the audience select
			if (this.application.currentAudience.key === "debug") {
				this.handleAnimateVisualTargets();
			} else {
				this.application.addEventListener("animateVisualTargets", this);
				this.application.audioPlayer.addEvent("animateVisualTargets:::" + this.audioFile, "end");
			}

		}
	},

	handleAnimateVisualPrime: {
		value: function() {
			console.log("animating visual prime");
			// this.application.removeEventListener("animateVisualPrime", this);
			this.playAudio();

			this.templateObjects.visualPrime.element.parentElement.style.width = "60%";
			this.templateObjects.visualPrime.element.parentElement.style["margin-top"] = "-6%";
			this.templateObjects.visualPrime.element.parentElement.style["-webkit-animation"] = "";
			this.templateObjects.visualPrime.element.style.opacity = "1";
		}
	},

	handleAnimateVisualTargets: {
		value: function() {
			// this.application.removeEventListener("animateVisualTargets", this);

			var self = this;
			console.log("animating visual targets");
			this.templateObjects.visualPrime.element.parentElement.style["-webkit-animation"] = "TCPP-stimulus-move-prime ease-in-out 2s";
			this.templateObjects.visualPrime.element.parentElement.style.width = "19%";
			this.templateObjects.visualPrime.element.parentElement.style["margin-top"] = "10%";
			this.templateObjects.visualPrime.element.style.opacity = ".5";

			window.setTimeout(function() {
				self.showVisualTargets = true;
				self.templateObjects.showVisualTargetCondition.element.parentElement.style.width = "60%";
				self.introduceTargetStimuli();

			}, 2100);
		}
	},

	introduceTargetStimuli: {
		value: function() {
			this.application.audioPlayer.play(this.audioFileWhichIntroduceChoices);

			this.templateObjects.visualChoiceA.element.style.opacity = ".3";
			this.templateObjects.visualChoiceB.element.style.opacity = ".3";
			this.templateObjects.visualChoiceC.element.style.opacity = ".3";
			this.templateObjects.visualChoiceD.element.style.opacity = ".3";

			var self = this;
			var introduceNext = function(visualTargetId) {
				var cue = self.audioFileIntroduceChoicesTiming[visualTargetId].delay;
				window.setTimeout(function() {
					if (visualTargetId === "done") {
						self.startWaitingForUserToRespond = Date.now();

						self.templateObjects.visualChoiceA.element.style.opacity = ".8";
						self.templateObjects.visualChoiceB.element.style.opacity = ".8";
						self.templateObjects.visualChoiceC.element.style.opacity = ".8";
						self.templateObjects.visualChoiceD.element.style.opacity = ".8";

						self.templateObjects.visualChoiceA.element.style["-webkit-animation"] = "";
						self.templateObjects.visualChoiceB.element.style["-webkit-animation"] = "";
						self.templateObjects.visualChoiceC.element.style["-webkit-animation"] = "";
						self.templateObjects.visualChoiceD.element.style["-webkit-animation"] = "";
					} else {
						var duration = cue / 1000 || 1;
						self.templateObjects[visualTargetId].element.style["-webkit-animation"] = "Introduce-target-image " + duration + "s";
						introduceNext(self.audioFileIntroduceChoicesTiming[visualTargetId].nextIntroduction);
					}
				}, cue);
			};
			introduceNext(this.audioFileIntroduceChoicesTiming.firstChoice);
		}
	}
});

exports.TcppStimulus = TCPPStimulus;
