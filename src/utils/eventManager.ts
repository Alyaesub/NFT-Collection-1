

interface EventListener {
  element: Element;
  event: string;
  handler: EventListenerOrEventListenerObject;
}

const listeners: EventListener[] = [];


export function addEventListener(
  element: Element,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
): void {
  element.addEventListener(event, handler, options);
  listeners.push({ element, event, handler });
}


export function removeEventListener(
  element: Element,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  element.removeEventListener(event, handler);

  const index = listeners.findIndex(
    (listener) =>
      listener.element === element &&
      listener.event === event &&
      listener.handler === handler
  );

  if (index > -1) {
    listeners.splice(index, 1);
  }
}


export function removeAllEventListeners(): void {
  listeners.forEach((listener) => {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  listeners.length = 0;
}


export function removeElementListeners(element: Element): void {
  const indicesToRemove: number[] = [];

  listeners.forEach((listener, index) => {
    if (listener.element === element) {
      listener.element.removeEventListener(listener.event, listener.handler);
      indicesToRemove.push(index);
    }
  });

  indicesToRemove.reverse().forEach((index) => {
    listeners.splice(index, 1);
  });
}

export function getListenerCount(): number {
  return listeners.length;
}
