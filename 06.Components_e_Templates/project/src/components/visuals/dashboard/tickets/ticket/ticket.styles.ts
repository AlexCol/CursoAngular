const ticketStyles = {
  article: `rounded bg-[#59555f] text-[#ded8e6]`,
  heading: `m-0 flex items-center gap-2 p-2 text-[0.9rem]`,
  statusDot: `h-[0.9rem] w-[0.9rem] rounded-full`,
  status: {
    open: `bg-[#de62e9]`,
    closed: `bg-[#51c788]`,
  },
  toggleButton: `flex w-full flex-1 items-center justify-between border-none bg-transparent font-inherit text-[#ded8e6]`,
  titleText: `mb-[0.1rem] text-left`,
  iconWrapper: `w-4`,
  icon: `h-6 w-6`,
  content: `m-0 p-4 text-[0.9rem]`,
  actionRow: `m-0 px-4 pb-4 pt-0 text-[0.9rem]`,
  actionButton: `inline w-auto border-none bg-transparent p-0 text-[0.75rem] text-[#ded8e6] hover:text-[#ec9fea]`,
};
export { ticketStyles };

/*
article {
  border-radius: 4px;
  background-color: #59555f;
  color: #ded8e6;
}

h3 {
  padding: 0.5rem;
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

h3 div {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
}

.ticket-open {
  background-color: #de62e9;
}

.ticket-closed {
  background-color: #51c788;
}

.text {
  text-align: left;
}

button {
  flex: 1;
  width: 100%;
  font: inherit;
  background: transparent;
  border: none;
  color: #ded8e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button span:first-child {
  margin-bottom: 0.1rem;
}

button span:last-child {
  width: 1rem;
}

p {
  margin: 0;
  padding: 1rem;
  font-size: 0.9rem;
}

p:has(button) {
  padding-top: 0;
}

p button {
  padding: 0;
  width: auto;
  display: inline;
  font-size: 0.75rem;
}

p button:hover {
  color: #ec9fea;
}
*/
