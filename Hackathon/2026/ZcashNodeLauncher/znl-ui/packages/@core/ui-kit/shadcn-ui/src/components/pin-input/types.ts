interface PinInputProps {
  class?: any;
  /**

   */
  codeLength?: number;
  /**
   * Send authentication button text
   */
  createText?: (countdown: number) => string;
  /**
   */
  disabled?: boolean;
  /**
   * Custom authentication code send logic * @returns
   */
  handleSendCode?: () => Promise<void>;
  /**
   * Sending authentication buttonloading
   */
  loading?: boolean;
  /**
   * Maximum retry time
   */
  maxTime?: number;
}

export type { PinInputProps };
