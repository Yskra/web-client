export function ref(initialValue) {
  let value = initialValue;
  const observers = [];

  return {
    get() {
      return value;
    },
    set(newValue) {
      if (value !== newValue) {
        value = newValue;
        for (let i = 0; i < observers.length; i++) {
          observers[i](value);
        }
      }
    },
    subscribe(callback) {
      observers.push(callback);
      callback(value);
    },
    unsubscribe(callback) {
      for (let i = 0; i < observers.length; i++) {
        if (observers[i] === callback) {
          observers.splice(i, 1);
          return;
        }
      }
    },
  };
}
