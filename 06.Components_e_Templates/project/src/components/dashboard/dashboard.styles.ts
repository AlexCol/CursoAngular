export const dashboardStyles = {
  dashboard: `flex max-w-340 flex-col items-start justify-between gap-6 md:flex-row`,
  dashboardItem: `block rounded-md border border-[#ccc] bg-[#f8f8f8] p-4 shadow-[0_1px_6px_0_rgba(0,0,0,0.2)] md:p-8`,
  itemHeader: `mb-4 flex items-center gap-3 p-0`,
  itemHeaderImage: `h-6 w-6 object-contain`,
  itemTitle: `m-0 text-[0.9rem] uppercase text-[#504e50]`,

  statusPanel: `block w-60`,
  statusLead: `mb-2 text-[1.15rem] font-bold animate-[pulse_2s_infinite]`,
  statusTone: {
    online: `text-[#6a3cb0]`,
    offline: `text-[#b22084]`,
    unknown: `text-gray-500`,
  },

  trafficPanel: `block w-60 md:w-80`,
  bodyText: `mb-4 text-[0.9rem] text-[#4f4b53]`,
  lastText: `m-0 text-[0.9rem] text-[#625e67]`,
  chart: `flex h-40 items-end gap-2 border-b border-[#76737a] px-2`,
  chartBar: `flex-1 rounded-t-sm bg-linear-to-b from-[#36166f] to-[#ca19a4]`,
} as const;
