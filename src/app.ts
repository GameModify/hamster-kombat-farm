import {DBManager} from "./db/db-manager"
import {MiniGamesKeysGeneratorManager} from "./keys/keys-manager";
import {getLogger, sleep} from "./utils";
import {cfg} from "./configs";
import {AccountManager} from "./account-manager";

class App {

    private _activeAccounts: Array<AccountManager> = []
    private _isWork: boolean = true;
    private readonly _dbManager: DBManager;
    private readonly _keyGenerator: MiniGamesKeysGeneratorManager;
    public logger = getLogger()

    constructor() {
        this._dbManager = new DBManager()
        this._keyGenerator = new MiniGamesKeysGeneratorManager()
    }

    async start() {
        this.logger.log("start App")

        while (this._isWork) {
            try {
                await this.loadAccounts()
                this.logger.log(`loaded ${this._activeAccounts.length} accounts`)
                await sleep(30000);
            } catch (error) {
                console.error(error)
                break
            }
        }
        this.logger.warn("the farm was stopped")
    }

    async loadAccounts() {
        if (this._activeAccounts.length === cfg.maxActiveAccountsCount) return
        const availableAccounts = await this._dbManager.getAvailableAccount()
        for (const account of availableAccounts) {
            this._activeAccounts.push(new AccountManager(account, this.unloadAccount, this.onAccountError));
            if (this._activeAccounts.length === cfg.maxActiveAccountsCount) return
        }
    }

    unloadAccount(account: AccountManager) {
        this._activeAccounts = this._activeAccounts.filter((e) => e !== account)
    }

    onAccountError(account: AccountManager, error: Error) {
        this.logger.log(`ERROR: `, error)
        this._isWork = false;
    }
}


new App().start().then()
