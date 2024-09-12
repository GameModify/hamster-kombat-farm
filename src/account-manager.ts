import {AccountInfo} from "./entities";
import {DBManager} from "./db/db-manager";

export declare type SuccessCallback = (account: AccountManager) => void
export declare type ErrorCallback = (account: AccountManager, error: Error) => void

export class AccountManager {
    private _accountInfo: AccountInfo;
    private _dbManager: DBManager;
    protected _onSuccess: SuccessCallback;
    protected _onError: ErrorCallback

    constructor (private accountInfo: AccountInfo, onSuccess: SuccessCallback, onError: ErrorCallback) {
        this._accountInfo = accountInfo;
        this._dbManager = new DBManager();
        this._onError = onError;
        this._onSuccess = onSuccess;
    }

    async task() {
        // TODO: change 0 to real next starttime
        await this._dbManager.setNextStartTime(this.accountInfo, 0)
        this._onSuccess(this)
    }

    async close() {

    }

}