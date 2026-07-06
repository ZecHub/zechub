interface AuthenticationProps {
  /**
   * Path to login for @zh_CN authentication code
   */
  codeLoginPath?: string;
  /**
   * @zh_CN forget password path
   */
  forgetPasswordPath?: string;

  /**
   * @zh_CN is in loading status
   */
  loading?: boolean;

  /**
   * @zh_CN 2D login path
   */
  qrCodeLoginPath?: string;

  /**
   * @zh_CN Registration Path
   */
  registerPath?: string;

  /**
   * @zh_CN Whether the authentication code login should be displayed
   */
  showCodeLogin?: boolean;
  /**
   * @zh_CN Whether to display forgotten password
   */
  showForgetPassword?: boolean;

  /**
   * @zh_CN Whether to show 2D login
   */
  showQrcodeLogin?: boolean;

  /**
   * @zh_CN Whether to display registration buttons
   */
  showRegister?: boolean;

  /**
   * @zh_CN Whether to display account numbers
   */
  showRememberMe?: boolean;

  /**
   * @zh_CN Whether to show third party login
   */
  showThirdPartyLogin?: boolean;

  /**
   * @zh_CN Login Box Subtitle
   */
  subTitle?: string;

  /**
   * @zh_CN Login Box Title
   */
  title?: string;
  /**
   * @zh_CN Submit button text
   */
  submitButtonText?: string;
}

export type { AuthenticationProps };