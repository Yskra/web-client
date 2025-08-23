import { STATUS } from '@/constants.js';
import { checkAvailability } from '@/lib/network.js';
import { ref } from '@/lib/reactive.js';
import { validateUrl } from '@/lib/url.js';
import wait from '@/lib/wait.js';

export function createFormManager() {
  const status = ref(STATUS.DISCONNECTED);
  let abortController = new AbortController();

  const pipeline = [
    checkCancelledStep,
    validateUrlStep,
    checkAvailabilityStep,
    pendingRedirectStep,
    finalStep,
  ];

  return {
    submit,
    status,
  };

  /**
   * @param {string} input
   */
  async function submit(input) {
    abortController.abort();
    abortController = new AbortController();

    await process(input, abortController.signal, pipeline)
      .catch(() => null);
  }

  /**
   * @param {string} url
   * @param {AbortSignal} signal
   * @param {(url: string, context: {status: Ref<number>, signal: AbortSignal}) => Promise<string | null>} pipeline
   */
  async function process(url, signal, pipeline) {
for (const step of pipeline) {
      if (signal.aborted)
        return Promise.reject(new Error('Aborted'));

      try {
        const result = await step(url, { status, signal });

        if (!result)
          return; // early exit
      }
      catch (error) {
        status.set(STATUS.DISCONNECTED);
        return;
      }
    }

    return true;
  }

  function checkCancelledStep(url) {
    const currentStatus = status.get();

    if (currentStatus === STATUS.CHECKING || currentStatus === STATUS.PENDING_REDIRECT || currentStatus === STATUS.CONNECTED) {
      status.set(STATUS.DISCONNECTED);
      return;
    }

    return url;
  }

  function validateUrlStep(url, { status }) {
    if (!validateUrl(url)) {
      status.set(STATUS.INVALID_URL);
      return;
    }

    return url;
  }

  async function checkAvailabilityStep(url, { signal, status }) {
    status.set(STATUS.CHECKING);

    const isAvailable = await checkAvailability(url, { signal });

    if (!isAvailable) {
      status.set(STATUS.NOT_AVAILABLE);
      return;
    }

    return url;
  }

  async function pendingRedirectStep(url, { status }) {
    status.set(STATUS.PENDING_REDIRECT);
    await wait(3000);

    return url;
  }

  async function finalStep(url, { status }) {
    status.set(STATUS.CONNECTED);
    return url;
  }
}
