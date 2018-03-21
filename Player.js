import moment from 'moment';

import { Audio } from 'expo';

const blinkSecond = new Audio.Sound();
const blinkWarning = new Audio.Sound();

blinkSecond.loadAsync(require('./assets/sounds/digi_error_short.wav'));
blinkWarning.loadAsync(require('./assets/sounds/digi_error_2x.wav'));

class Player {
  constructor(main, byoyomi, periods) {
    this.main = main * 5 * 1000;
    this.byoyomi = byoyomi * 5 * 1000;
    this.periods = periods;

    this.mainRemaining = this.main;
    this.byoyomiRemaining = this.byoyomi;
    this.periodsRemaining = this.periods;

    this.startTime = null;
    this.lastPlayed = null;
  }

  currentMainTime() {
    const now = moment().format('x');

    if (!this.mainRemaining) {
      return 0;
    }

    let current = this.mainRemaining;

    if (this.startTime) {
      current -= (now - this.startTime);
    }

    if (current <= 0) {
      this.mainRemaining = null;
      if (this.startTime) {
        this.startTime = now;
      }

      return 0;
    }

    return current;
  }

  currentByoyomiTime() {
    const now = moment().format('x');

    let current = this.byoyomiRemaining;

    if (this.startTime) {
      current -= (now - this.startTime);
    }

    if (current <= 0) {
      if (this.periodsRemaining > 0) {
        this.periodsRemaining -= 1;
        this.byoyomiRemaining = this.byoyomi;
        if (this.startTime) {
          this.startTime = now;
        }
      }

      if (this.periodsRemaining === 0) {
        this.byoyomiRemaining = null;
      }

      return this.byoyomiRemaining;
    }

    return current;
  }

  currentTime() {
    const currentMainTime = this.currentMainTime();

    if (currentMainTime > 0) {
      return currentMainTime;
    }

    const currentByoyomiTime = this.currentByoyomiTime();

    if (currentByoyomiTime > 0) {
      return currentByoyomiTime;
    }

    return 0;
  }

  currentTimeInSeconds() {
    const currentTime = this.currentTime();

    return parseInt(moment(currentTime).format('x') / 1000, 10);
  }

  currentTimeString() {
    const currentTime = this.currentTime();

    if (currentTime > 0) {
      return moment(currentTime).format('m:ss');
    }

    return 'LOST';
  }

  outOfTime() {
    return !this.currentMainTime() && !this.currentByoyomiTime();
  }

  start() {
    this.startTime = moment().format('x');
  }

  stop() {
    if (this.startTime) {
      const stop = moment().format('x');
      this.mainRemaining -= (stop - this.startTime);
      this.byoyomiRemaining = this.byoyomi;
    }

    this.startTime = null;
    this.lastPlayed = null;
  }

  playSoundIfNeeded() {
    if (!this.startTime) {
      return;
    }

    if (this.currentTimeInSeconds() <= 5) {
      if (this.currentTimeInSeconds() !== this.lastPlayed) {
        try {
          blinkWarning.playAsync();
          this.lastPlayed = this.currentTimeInSeconds();
        } catch (error) {}

        return;
      }
    }

    if (this.currentTimeInSeconds() <= 10) {
      if (this.currentTimeInSeconds() !== this.lastPlayed) {
        try {
          blinkSecond.playAsync();
          this.lastPlayed = this.currentTimeInSeconds();
        } catch (error) {}
      }
    }
  }
}

export default Player;
