import { Transaction } from '../../../shared/models';

export class AddTransaction {
    static readonly type = '[TRANSACTION] Add';

    constructor(public payload: Transaction) {};
} 
 
export class RemoveTransaction {
    static readonly type = '[TRANSACTION] Remove';

    constructor(public payload: number) {};
}