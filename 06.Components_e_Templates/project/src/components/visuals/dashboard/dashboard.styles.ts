export const dashboardStyles = {
  main: `w-4/5 mx-[10%] my-12`,
  header: `py-3 px-[0.1rem] flex flex-col gap-4 justify-between items-center text-base md:flex-row md:gap-0 md:py-6 md:px-[10%] md:text-xl`,
  logo: `w-22 h-22 bg-[#eee8f2] p-5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.35)]`,
  logoImage: `w-full h-full filter drop-shadow-[0_0_4px_rgba(29,29,29,0.35)]`,
  navList: `flex gap-8 list-none items-center p-0 m-0`,
  navLink: `text-[#3e3b3e] font-bold no-underline hover:text-[#77207a]`,

  dashboard: `flex flex-col items-start justify-between gap-6 max-w-340 md:flex-row`,
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

  lastText: `m-0 text-[0.9rem] text-[#625e67]`,

  h2: `m-0 text-[0.9rem] uppercase text-[#504e50]`,

  tickets: `flex flex-col gap-6 md:flex-row`,
  ticketsList: `list-none m-0 p-0 w-60`,
  ticketsItem: `my-2`,
  ticketsP: `m-0 text-[#4f4b53]`,
  ticketsH2: `m-0 text-[1.1rem] text-[#38343c]`,

  pulsingKeyframes: `@keyframes pulse {0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}`,
} as const;
