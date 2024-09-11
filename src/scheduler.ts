import {DBManager} from "./db/db-manager";
import {AccountInfo} from "./entities";


export class Scheduler {
    private _dbManager: DBManager

    constructor(private dbManager: DBManager) {
        this._dbManager = dbManager
    }

    async getAvailableAccount(): Promise<AccountInfo | undefined>  {
        // todo: get first available account. check current timestamp > timestamp need start game
        return
    }

    async updateNextStartForAccout(accountInfo: AccountInfo, timestamp: number): Promise<void> {
        // todo: update need start timestamp for account into db
    }
}