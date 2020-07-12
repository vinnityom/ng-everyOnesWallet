export interface Participant {
  id: number;
  name: string;
}

export interface Transaction {
  id?: number | string;
  from: number;
  to: number;
  howMuch: number;
}

export interface GlobalState {
  participants: Array<Participant>;
  transactions: Array<Transaction>;
}

export interface Pool {
  [name: string]: Array<Debt>,
}

export interface Debt {
  reciever: number,
  debt: number,
}