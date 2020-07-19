import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Transaction } from '../../../shared/models';
import { AddTransaction, RemoveTransaction } from './transactions.actions';

export class TransactionsStateModel {
    transactions: Array<Transaction>;
}

@State<TransactionsStateModel>({
    name: 'transactions',
    defaults: {
        transactions: [],
    }
})
export class TransactionsState {
    @Selector()
    static getTransactions(state: TransactionsStateModel) {
        return state.transactions;
    }

    @Action(AddTransaction)
    add({ getState, patchState }: StateContext<TransactionsStateModel>, { payload }: AddTransaction) {
        const currentState = getState();
        patchState({
            transactions: [...currentState.transactions, payload],
        });
    }

    @Action(RemoveTransaction)
    remove({ getState, patchState }: StateContext<TransactionsStateModel>, { payload }: RemoveTransaction) {
        const newState = getState().transactions.filter(({ id }) => id !== payload);
        patchState({
            transactions: newState,
        });
    }
}