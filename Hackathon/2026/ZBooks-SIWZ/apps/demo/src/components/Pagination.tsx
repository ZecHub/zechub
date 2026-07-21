import Link from "next/link";

interface Props {
  /** Current 1-based page. */
  page: number;
  /** Items per page. */
  pageSize: number;
  /** Total items across all pages. */
  total: number;
  /** Base path the page links go to (without query string). e.g. "/transactions". */
  basePath: string;
  /** Extra search params to preserve in every link (filters etc). */
  extraParams?: Record<string, string | undefined>;
  /** Label for the unit being paged ("transactions", "rows"). Optional, defaults "items". */
  label?: string;
}

/** Server-rendered URL-based pagination. Bookmarkable, no client JS needed.
 *  Shows: "X-Y of N items" + Prev / Next as <Link> elements. */
export function Pagination({ page, pageSize, total, basePath, extraParams, label = "items" }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  const buildHref = (p: number): string => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(extraParams ?? {})) {
      if (v != null && v !== "") params.set(k, v);
    }
    if (p !== 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  if (total <= pageSize) {
    return (
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
        <span>
          {total} {label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 text-xs text-neutral-500 pt-2 flex-wrap">
      <span>
        Showing <strong className="text-neutral-700 dark:text-neutral-300">{from}-{to}</strong> of{" "}
        <strong className="text-neutral-700 dark:text-neutral-300">{total}</strong> {label}
      </span>
      <div className="flex items-center gap-1.5">
        {currentPage > 1 ? (
          <Link
            href={buildHref(currentPage - 1)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
          >
            ← Prev
          </Link>
        ) : (
          <span className="rounded-md border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 opacity-40">
            ← Prev
          </span>
        )}
        <span className="px-1">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Link
            href={buildHref(currentPage + 1)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
          >
            Next →
          </Link>
        ) : (
          <span className="rounded-md border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 opacity-40">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}

/** Parse a "?page=N" search param into a clamped 1-based page index. */
export function parsePageParam(raw: string | string[] | undefined, fallback = 1): number {
  const v = Array.isArray(raw) ? raw[0] : raw;
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : fallback;
}
