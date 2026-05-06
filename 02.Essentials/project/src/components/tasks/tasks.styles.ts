export const tasksStyles = {
  container: 'max-h-[60vh] overflow-auto rounded-[8px] bg-[#3a2c54] p-4 text-[#e9d8ff]',
  header: 'mb-8 flex items-start justify-between gap-4',
  title: 'm-0 w-[60%] text-balance text-[0.9rem] md:text-[1.25rem]',
  menu: 'm-0 p-0 md:w-auto',
  addButton:
    'cursor-pointer rounded-[4px] border-none bg-[#9965dd] px-[0.8rem] py-[0.35rem] text-[0.9rem] transition hover:bg-[#a565dd] active:bg-[#a565dd] text-black/90',
  list: 'm-[1rem_0] flex max-h-[50vh] list-none flex-col gap-4 overflow-auto p-0',
} as const;
