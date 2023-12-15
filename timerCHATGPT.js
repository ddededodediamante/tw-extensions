class TimerExtension {
  constructor() {
    this.timers = {}; // Object to store timer information
  }

  getInfo() {
    return {
      id: 'timer',
      name: 'timer extension',
      blocks: [
        {
          opcode: 'startTimer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'start timer [name]',
          arguments: {
            name: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Timer1',
            },
          },
        },
        {
          opcode: 'stopTimer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'stop timer [name]',
          arguments: {
            name: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Timer1',
            },
          },
        },
        {
          opcode: 'resumeTimer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'resume timer [name]',
          arguments: {
            name: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Timer1',
            },
          },
        },
        {
          opcode: 'deleteTimer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'delete timer [name]',
          arguments: {
            name: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Timer1',
            },
          },
        },
        {
          opcode: 'actionAllTimers',
          blockType: Scratch.BlockType.COMMAND,
          text: '[action] all timers',
          arguments: {
            action: {
              type: Scratch.ArgumentType.DROPDOWN,
              menu: 'timersActions',
              defaultValue: 'stop',
            },
          },
        },
        {
          opcode: 'getAllTimers',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get all timers',
        },
        {
          opcode: 'elapsedTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'elapsed time [name] [unit]',
          arguments: {
            name: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Timer1',
            },
            unit: {
              type: Scratch.ArgumentType.DROPDOWN,
              menu: 'units',
              defaultValue: 'seconds',
            },
          },
        },
      ],
      menus: {
        units: {
          acceptReporters: true,
          items: ['seconds', 'minutes', 'hours', 'milliseconds']
        },
        timersActions: {
          acceptReporters: true,
          items: ['stop', 'resume']
        },
      },
    };
  }

  startTimer(args) {
    const timerName = args.name;
    this.timers[timerName] = this.timers[timerName] || {};
    this.timers[timerName].startTime = new Date().getTime();
    this.timers[timerName].pausedTime = null;
  }

  stopTimer(args) {
    const timerName = args.name;
    if (this.timers[timerName] && this.timers[timerName].startTime !== null && this.timers[timerName].pausedTime === null) {
      this.timers[timerName].pausedTime = new Date().getTime();
    }
  }

  resumeTimer(args) {
    const timerName = args.name;
    if (this.timers[timerName] && this.timers[timerName].pausedTime !== null) {
      const pausedDuration = new Date().getTime() - this.timers[timerName].pausedTime;
      this.timers[timerName].startTime += pausedDuration;
      this.timers[timerName].pausedTime = null;
    }
  }

  deleteTimer(args) {
    const timerName = args.name;
    if (this.timers[timerName]) {
      delete this.timers[timerName];
    }
  }

  actionAllTimers(args) {
    const stopAction = args.action;

    for (const timerName in this.timers) {
      if (this.timers.hasOwnProperty(timerName)) {
        if (stopAction === 'stop') {
          this.timers[timerName].pausedTime = new Date().getTime();
        } else if (stopAction === 'resume') {
          const pausedDuration = new Date().getTime() - this.timers[timerName].pausedTime;
          this.timers[timerName].startTime += pausedDuration;
          this.timers[timerName].pausedTime = null;
        }
      }
    }
  }

  getAllTimers() {
    const timerNames = Object.keys(this.timers);
    return timerNames;
  }

  elapsedTime(args) {
    const timerName = args.name;
    if (!this.timers[timerName] || this.timers[timerName].startTime === null) {
      return 0; // Timer hasn't been started
    }

    const endTime = this.timers[timerName].pausedTime !== null ? this.timers[timerName].pausedTime : new Date().getTime();
    const elapsedMilliseconds = endTime - this.timers[timerName].startTime;

    switch (args.unit.toLowerCase()) {
      case 'seconds':
        return Math.floor(elapsedMilliseconds / 1000);
      case 'minutes':
        return Math.floor(elapsedMilliseconds / (1000 * 60));
      case 'hours':
        return Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
      case 'milliseconds':
        return elapsedMilliseconds;
      default:
        return 0;
    }
  }
}

Scratch.extensions.register(new TimerExtension());
