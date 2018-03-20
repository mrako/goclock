import moment from 'moment';

class Player {
  constructor(main, byoyomi, periods) {
    this.main = main * 1000; // * 60 * 1000;
    this.byoyomi = byoyomi * 10 * 1000;
    this.periods = periods;

    this.mainRemaining = this.main;
    this.byoyomiRemaining = this.byoyomi;
    this.periodsRemaining = this.periods;

    this.startTime = null;
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
  }
}

export default Player;
