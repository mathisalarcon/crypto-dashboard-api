export {};

declare global {
    /* TABLES */
    interface UserTable {
        _id: number;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        pincode: number;
        created_at: string; 
    }
    interface WalletTable {
        _id: string;
        user_id: number;
    }
    enum TransactionType {
        DEPOSIT = 0,
        WITHDRAW = 1,
        TRANSFER = 2
    }
    enum TransactionStatus {
        PENDING = 0,
        EXECUTED = 1,
        CANCELED = 2
    }
    interface TransactionTable {
        _id: number;
        type: TransactionType;
        
        from_currency_symbol: string;
        from_currency_value: number;
        from_currency_amount: number;
        sender_wallet_id: string;
        
        to_currency_symbol: string;
        to_currency_amount: number;
        to_currency_value: number;
        recipient_wallet_id: string;

        transmitted_at: string;
        status: TransactionStatus;
        executed_at?: string;
    }
}