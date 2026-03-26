import { useNavigate } from "react-router-dom";

/**
 * Navigation options for useNavigateWithParams
 */
export interface NavigateWithParamsOptions {
  /**
   * Optional search params to merge with existing params.
   * These will be merged with current URL params, with new params taking precedence.
   */
  searchParams?: Record<string, string | number | boolean | undefined>;

  /**
   * If true, replaces current history entry instead of pushing new one.
   * Default: false
   */
  replace?: boolean;

  /**
   * State object to pass to navigation.
   * Default: undefined
   */
  state?: unknown;
}

/**
 * Return type for useNavigateWithParams
 */
interface NavigateWithParamsReturn {
  /**
   * Navigate to a path while preserving existing URL search params.
   * Optionally add/modify params during navigation.
   *
   * @param to - Path to navigate to (e.g., "/quote", "/customize")
   * @param options - Optional configuration for param merging and navigation behavior
   *
   * @example
   * // Navigate preserving all existing params
   * navigateWithParams("/quote");
   *
   * @example
   * // Navigate and add a new param
   * navigateWithParams("/customize", { searchParams: { moverId: "123" } });
   *
   * @example
   * // Navigate and replace existing param
   * navigateWithParams("/checkout", { searchParams: { theme: "dark" } });
   */
  navigateWithParams: (to: string, options?: NavigateWithParamsOptions) => void;
}

/**
 * Custom hook that wraps react-router-dom's useNavigate to automatically
 * preserve URL search parameters during navigation.
 *
 * This is essential for the widget's theming and iframe communication system,
 * which relies on params like widgetKey, theme, primaryColor, and hostOrigin
 * being maintained throughout the user journey.
 *
 * @returns navigateWithParams function
 *
 * @example
 * ```tsx
 * function QuotePage() {
 *   const { navigateWithParams } = useNavigateWithParams();
 *
 *   const handleSelect = () => {
 *     // Navigates to /customize with all current params preserved
 *     navigateWithParams("/customize");
 *   };
 * }
 * ```
 */
export function useNavigateWithParams(): NavigateWithParamsReturn {
  const navigate = useNavigate();

  const navigateWithParams: NavigateWithParamsReturn["navigateWithParams"] = (
    to,
    options = {}
  ) => {
    // Extract current search params from URL
    const currentParams = new URLSearchParams(window.location.search);

    // Merge with provided search params
    if (options.searchParams) {
      Object.entries(options.searchParams).forEach(([key, value]) => {
        if (value !== undefined) {
          currentParams.set(key, String(value));
        }
      });
    }

    // Build search string
    const searchString = currentParams.toString();
    const toWithParams = searchString ? `${to}?${searchString}` : to;

    // Navigate
    navigate(toWithParams, {
      replace: options.replace,
      state: options.state,
    });
  };

  return { navigateWithParams };
}
