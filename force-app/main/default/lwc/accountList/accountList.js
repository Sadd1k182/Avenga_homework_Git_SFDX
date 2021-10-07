import { LightningElement, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/accountController.getAccountList';

  export default class accountList extends LightningElement {
    /** Current page in the account list. */
    @track pageNumber = 1;
    /** The number of items on a page. */
    @track pageSize;
    /** The total number of items matching the selection. */
    @track totalItemCount = 0;
    @track mode = 'list';
    @track showContacts = false;

    @wire(getAccountList, { pageNumber: '$pageNumber' })
    accounts;

    get listString() {
      return JSON.stringify(this.accounts);
    }

    get listMode(){
      if(this.mode === 'list'){
        return true;
      }
      return false;
    }

    handlePreviousPage() {
      this.pageNumber = this.pageNumber - 1;
    }
    handleNextPage() {
      this.pageNumber = this.pageNumber + 1;
    }
  }