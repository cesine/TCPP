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
			this.confirmResponseChoiceMessage = "Are you sure?";
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

			var visualImages = stimulus.distractorImages.join(":::").split(":::");
			visualImages.push(stimulus.targetImage);
			for (var i = 0; i < visualImages.length; i++) {
				var filename = visualImages[i];
				var imagePosition = filename.split("_")[0] % 4;
				switch (imagePosition) {
					case 1:
						stimulus.visualChoiceA = imagePath + filename;
						break;
					case 2:
						stimulus.visualChoiceB = imagePath + filename;
						break;
					case 3:
						stimulus.visualChoiceC = imagePath + filename;
						break;
					case 0:
						stimulus.visualChoiceD = imagePath + filename;
						break;
					default:
						break;
				}
			}
			stimulus.audioFile = audioPath + stimulus.audioFile;
			stimulus.primeImage = imagePath + stimulus.primeImage;
			stimulus.audioFileIntroduceTargets = audioPath + stimulus.audioFileIntroduceTargets;
			/* Dont draw the images yet, wait until we say its time */
			this.showVisualTargets = false;

			var cueToShowPrime = stimulus.cueToShowPrime;
			var self = this;

			setTimeout(function() {
				self.animateVisualPrime();
			}, cueToShowPrime);

			var cueToShowTargets = stimulus.cueToShowTargets;
			setTimeout(function() {
				self.animateVisualTargets();
			}, cueToShowTargets);

			this.super(stimulus);
		}
	},

	animateVisualPrime: {
		value: function() {
			console.log("animating visual prime");
			this.templateObjects.visualPrime.element.parentElement.style.width = "50%";
			this.templateObjects.visualPrime.element.parentElement.style["-webkit-animation"] = "";
		}
	},

	animateVisualTargets: {
		value: function() {
			console.log("animating visual targets");
			this.showVisualTargets = true;
			this.templateObjects.visualPrime.element.parentElement.style["-webkit-animation"] = "TCPP-stimulus-move-prime ease-in-out 2s";
			this.templateObjects.visualPrime.element.parentElement.style.width = "19%";
			this.templateObjects.visualPrime.element.parentElement.style["margin-top"] = "20%";
			// this.templateObjects.showVisualTargetCondition.element.parentElement.style["-webkit-animation"] = "TCPP-stimulus-move-prime ease-in-out 2s";
			this.templateObjects.showVisualTargetCondition.element.parentElement.style.width = "50%";

			this.introduceTargetStimuli();
		}
	},

	introduceTargetStimuli: {
		value: function() {
			this.application.audioPlayer.play(this.audioFileIntroduceTargets);

			this.templateObjects.visualChoiceA.element.style.opacity = ".3";
			this.templateObjects.visualChoiceB.element.style.opacity = ".3";
			this.templateObjects.visualChoiceC.element.style.opacity = ".3";
			this.templateObjects.visualChoiceD.element.style.opacity = ".3";

			var self = this;
			var introduceNext = function(visualTargetId) {
				var cue = self.audioFileIntroduceTargetsTiming[visualTargetId].delay;
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
						var duration = cue/1000 || 1;
						self.templateObjects[visualTargetId].element.style["-webkit-animation"] = "Introduce-target-image "+duration+"s";
						introduceNext(self.audioFileIntroduceTargetsTiming[visualTargetId].nextIntroduction);
					}
				}, cue);
			};
			introduceNext(this.audioFileIntroduceFirstTarget);
		}
	}
});

exports.TcppStimulus = TCPPStimulus;
