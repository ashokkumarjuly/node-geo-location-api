export {};
declare global {
    namespace Express {
        interface Request {
            _transaction: any;
            getTransaction: any;
            rollbackTransactions: any;
            t: any; // for il8n language
            i18n: any; // for il8n language,
            currentDomain: CurrentDomain //for parsing domain
        }

        interface User {
            id: number;
            uid: string;
        }

        interface CurrentDomain {
            artistId: number;
        }
    }
}
