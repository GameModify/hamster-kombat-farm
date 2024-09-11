import {AccountInfo} from "./entities";

export declare type SuccessCallback = (account: AccountManager) => void
export declare type ErrorCallback = (account: AccountManager, error: Error) => void

export class AccountManager {
    private _accountInfo: AccountInfo;
    protected _onSuccess: SuccessCallback;
    protected _onError: ErrorCallback

    constructor (private accountInfo: AccountInfo, onSuccess: SuccessCallback, onError: ErrorCallback) {
        this._accountInfo = accountInfo;
        this._onError = onError;
        this._onSuccess = onSuccess;
    }

    async task() {

        this._onSuccess(this)
    }

    async close() {

    }

}