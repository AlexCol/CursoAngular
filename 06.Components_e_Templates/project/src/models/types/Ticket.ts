export type Ticket = {
  id: number;
  title: string;
  request: string;
  status: 'open' | 'closed';
};
