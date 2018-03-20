import moment from 'moment';

class Player {
  constructor(main, byoyomi, periods) {
    this.main = main;
    this.byoyomi = byoyomi;
    this.periods = periods;

    this.mainRemaining = this.main * 1000; // * 60 * 1000;

    this.startTime = null;
  }

  currentTime() {
    const now = moment().format('x');

    let current = this.mainRemaining;

    if (this.startTime) {
      current -= (now - this.startTime);
    }

    if (current <= 0) {
      return 'LOST';
    }

    return moment(current).format('m:ss');
  }

  outOfTime() {
    return this.currentTime() === 'LOST';
  }

  start() {
    this.startTime = moment().format('x');
  }

  stop() {
    if (this.startTime) {
      const stop = moment().format('x');
      this.mainRemaining -= (stop - this.startTime);
    }

    this.startTime = null;
  }
}

export default Player;
