import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (balanceAcumulator: Balance, transaction: Transaction) => {
        const newBalance = { ...balanceAcumulator };

        switch (transaction.type) {
          case 'income':
            newBalance.income += transaction.value;
            break;
          case 'outcome':
            newBalance.outcome += transaction.value;
            break;
          default:
            throw Error('Incorrect transaction type was found.');
        }

        newBalance.total = newBalance.income - newBalance.outcome;

        return newBalance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
