import { LightningElement} from "lwc";
import getAccountsWithOffset from "@salesforce/apex/accountPagination.getAccountsWithOffset";


export default class PaginationWithPersistedRows extends LightningElement {


  data = [];
  pageNumber = 1;
  pageSize = 7;
  isLastPage = false;
  resultSize = 0;
  hasPageChanged;
  error;

  connectedCallback() {
    this.getAccounts();
  }
  
  previousEve() {
    //Setting current page number
    let pageNumber = this.pageNumber;
    this.pageNumber = pageNumber - 1;
    //Setting pageChange variable to true
    this.hasPageChanged = true;
    this.getAccounts();
  }


  nextEve() {
    //get current page number
    let pageNumber = this.pageNumber;
    //Setting current page number
    this.pageNumber = pageNumber + 1;
    //Setting pageChange variable to true
    this.hasPageChanged = true;
    this.getAccounts();
  }


  get recordCount() {
    return (
      (this.pageNumber - 1) * this.pageSize + " to " + ((this.pageNumber - 1) * this.pageSize + this.resultSize));
  }


  get disPre() {
    return this.pageNumber === 1 ? true : false;
  }


  getAccounts() {
    getAccountsWithOffset({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    })
      .then(result => {
        let accountData = JSON.parse(JSON.stringify(result));
        this.data = accountData;
        if (accountData.length < this.pageSize) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        this.resultSize = accountData.length;
      })
      .catch(error => {
        this.error = error;
      });
  }
}