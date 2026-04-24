export type PlausibleEventName =
  | 'ClickWhatsApp'
  | 'ClickNav'
  | 'ContactSubmit'
  | 'ClickCreateCard'
  | 'ClickLogin'
  | 'ClickSignup'
  | 'CardShare'
  | 'CardDownload';

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
};

export const track = (
  event: PlausibleEventName,
  props?: Record<string, string>,
) => {
  if (typeof window === 'undefined') return;
  const w = window as PlausibleWindow;
  if (!w.plausible) return;
  w.plausible(event, props ? { props } : undefined);
};

