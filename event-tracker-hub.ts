export interface ITracker {
  /**
   * Init data for tracker
   */
  init: () => Promise<void>;

  /**
   * Log event
   */
  log: () => Promise<void>;

  /**
   * Log screen
   */
  logScreen: () => Promise<void>;
}

export class EventTrackerHub {
  private trackers: ITracker[] = [];

  private static instance: EventTrackerHub;

  private constructor() {}

  static getInstance(): EventTrackerHub {
    if (!EventTrackerHub.instance) {
      EventTrackerHub.instance = new EventTrackerHub();
    }
    return EventTrackerHub.instance;
  }

  addTracker(tracker: ITracker) {
    this.trackers.push(tracker);
  }

  async log(): Promise<void> {
    const allTracks = this.trackers.map((t) => t.log());
    await Promise.all(allTracks);
  }
}

export class FirebaseTracker implements ITracker {
  async init(): Promise<void> {}

  async log(): Promise<void> {
    console.log("Log with firebase");
  }

  async logScreen(): Promise<void> {
    console.log("Log screen with firebase");
  }
}

export class SegmentTracker implements ITracker {
  async init(): Promise<void> {}

  async log(): Promise<void> {
    console.log("Log with segment");
  }

  async logScreen(): Promise<void> {
    console.log("Log screen with segment");
  }
}

export const trackerHub = EventTrackerHub.getInstance();
trackerHub.addTracker(new FirebaseTracker());
trackerHub.addTracker(new SegmentTracker());

trackerHub.log();
