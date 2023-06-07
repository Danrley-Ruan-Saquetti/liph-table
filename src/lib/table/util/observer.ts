export interface IEvent {
  data: IEventData;
}

export type IEventData = any;

export type TObserver<Events> = {
  handler: (data: IEvent) => void;
  evt: Events;
  code: number;
  main?: boolean;
};

export interface ObserverEventModel<Events extends string> {
  on: <E extends Events>(
    evt: E,
    handler: (data: IEvent) => void,
    main?: boolean
  ) => number;
  emit: <U extends Events>(evt: U, data: IEvent) => void;
  removeListener: (code: number) => void;
  clearListeners: (main?: boolean) => void;
  listeners: TObserver<Events>[];
}

function randomId() {
  const VALUE_MAX = 9999;
  const now = new Date();

  const idString = `${now.getFullYear()}${`${now.getMonth() + 1}`.padStart(
    2,
    "0"
  )}${`${Math.floor(Math.random() * VALUE_MAX)}`.padStart(
    `${VALUE_MAX}`.length,
    "0"
  )}`;

  return Number(idString);
}

export function ObserverEvent<
  Events extends string
>(): ObserverEventModel<Events> {
  const listeners: ObserverEventModel<Events>["listeners"] = [];

  const on: ObserverEventModel<Events>["on"] = <E extends Events>(
    evt: E,
    handler: (data: IEvent) => void,
    main?: boolean
  ) => {
    const code = randomId();

    listeners.push({ evt, handler, code, main });

    return code;
  };

  const emit: ObserverEventModel<Events>["emit"] = <U extends Events>(
    evt: U,
    data: IEvent
  ) => {
    setTimeout(() => {
      listeners
        .filter((_obs) => {
          return _obs.evt == evt;
        })
        .forEach((_obs) => {
          setTimeout(() => _obs.handler(data), 1);
        });
    }, 1);
  };

  const removeListener: ObserverEventModel<Events>["removeListener"] = (
    code
  ) => {
    const index = listeners.findIndex((obs) => obs.code == code);

    if (index < 0) {
      return;
    }

    listeners.splice(index, 1);
  };

  const clearListeners: ObserverEventModel<Events>["clearListeners"] = (
    main
  ) => {
    for (let i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i].main) {
        if (main) {
          listeners.splice(i, 1);
        }

        continue;
      }
      if (!main) {
        listeners.splice(i, 1);
      }
    }
  };

  return {
    on,
    emit,
    removeListener,
    listeners,
    clearListeners,
  };
}
