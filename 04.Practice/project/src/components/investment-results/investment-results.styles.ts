export const investmentResultsStyles = {
  container: `
    m-auto
    my-6
    w-[92%]
    max-w-5xl
  `,

  emptyState: `
    rounded-md
    border
    border-teal-400/30
    bg-teal-950/40
    px-6
    py-5
    text-center
    text-sm
    text-teal-100/85
    shadow-[0_8px_24px_rgba(0,0,0,0.25)]
  `,

  tableWrapper: `
    overflow-x-auto
    rounded-xl
    border
    border-teal-400/25
    bg-linear-to-b
    from-teal-800/95
    to-emerald-700/90
    p-3
    shadow-[0_12px_28px_rgba(0,0,0,0.35)]
  `,

  table: `
    w-full
    min-w-3xl
    border-separate
    border-spacing-0
    text-right
  `,

  head: `
    bg-black/10
  `,

  headerCell: `
    px-4
    py-3
    text-[0.72rem]
    font-extrabold
    uppercase
    tracking-[0.14em]
    text-teal-100/85
    first:rounded-l-lg
    last:rounded-r-lg
  `,

  bodyRow: `
    transition-colors
    odd:bg-white/3
    even:bg-black/8
    hover:bg-white/8
  `,

  yearCell: `
    px-4
    py-3
    text-left
    font-bold
    text-emerald-200
    first:rounded-l-lg
  `,

  bodyCell: `
    px-4
    py-3
    text-sm
    text-teal-50/92
    whitespace-nowrap
    last:rounded-r-lg
  `,
};
