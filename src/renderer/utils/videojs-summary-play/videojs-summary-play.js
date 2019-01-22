import videojs from 'video.js';
import './videojs-summary-play.scss';

// Default options for the plugin.
const defaults = {
    beforeElement: 'fullscreenToggle',
    textControl: 'Summary Play',
    name: 'summaryPlayButton'
};

const vjsButton = videojs.getComponent('Button');

class SummaryPlayButton extends vjsButton {
    constructor(player, options) {
        super(player, options);
        this.isSummaryPlaying = false;
        this.cue = [];

        player.on('loadeddata', () => {
            this.cues = [];
            if (player.textTracks().tracks_[0].cues_.length > 0) {
                this.cues = player.textTracks().tracks_[0].cues_;
                this.cues.sort((a, b) => a.startTime - b.startTime);
            }
        })

        player.on('timeupdate', () => {
            if (this.isSummaryPlaying) {
                var hasActiveCues = this.cues.some((cue) => {
                    if (player.currentTime() > cue.startTime - 2 && player.currentTime() < cue.endTime) return true;
                })
                if (hasActiveCues) player.playbackRate(1.0);
                else player.playbackRate(8.0);
            }
        });
    }

    /**
    * Allow sub components to stack CSS class names
    *
    * @return {String} The constructed class name
    * @method buildCSSClass
    */
    buildCSSClass() {
        return `vjs-summary-play ${super.buildCSSClass()}`;
    }

    /**
    * Handles click for summary play
    *
    * @method handleClick
    */
    handleClick(e) {
        e.stopPropagation();
        this.isSummaryPlaying = !this.isSummaryPlaying;
        if(e.target.getAttribute('working') === 'true') {
            e.target.setAttribute('working', 'false');
        } else {
            e.target.setAttribute('working', 'true');
        }
    }
}

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
    const summaryPlayButton = player.controlBar.addChild(new SummaryPlayButton(player, options), {});
    summaryPlayButton.controlText(options.textControl);

    player.controlBar.el().insertBefore(
        summaryPlayButton.el(),
        player.controlBar.getChild(options.beforeElement).el()
    );

    player.addClass('vjs-summary-play');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function vjsdownload
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const vjsSummaryPlay = function(options) {
    this.ready(() => {
        onPlayerReady(this, videojs.mergeOptions(defaults, options));
    });
};

// Register the plugin with video.js.
videojs.registerPlugin('vjs-summary-play', vjsSummaryPlay);

export default vjsSummaryPlay;
