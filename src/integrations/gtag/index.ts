/**
 * Fires a Google Analytics event with the given event name and parameters.
 * @param eventName - The name of the event to fire.
 * @param eventParams - The parameters to fire the event with.
 * @example
 * ```ts
 * gtagEvent('comment_added');
 * ```
 */
export const gtagEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  window.gtag("event", eventName, eventParams);
};

/**
 * Send form submit event to Google Analytics.
 */
export const gtagFormSubmitEvent = (
  event: React.BaseSyntheticEvent<SubmitEvent, unknown, HTMLFormElement>
) => {
  gtagEvent("form_submit", {
    form_id: event.target.id,
    form_destination: window.location.href,
    form_submit_text: event.nativeEvent.submitter?.innerText ?? "",
  });
};
