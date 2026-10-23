export {};

declare global {
  interface TurnstileRenderOptions {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback"?: () => void;
    "error-callback"?: () => void;
  }

  interface Window {
    turnstile?: {
      render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
      reset: (widgetId?: string) => void;
    };
  }
}
