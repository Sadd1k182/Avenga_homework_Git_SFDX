import { LightningElement,track,wire } from 'lwc';
import FetchAccountRecord from '@salesforce/apex/PaginationAccountController.FetchAccountRecord';
import TotalAccounts from '@salesforce/apex/PaginationAccountController.TotalAccounts';

export default class PaginationAccount extends LightningElement {

    @track accounts;
    @track totalRecords;
    @track offset = 0;
    @track pageLimit =7;
    @track error;


    @wire(FetchAccountRecord, { offset: '$offset', pageLimit: '$pageLimit' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.error = error;
        }
    }

    connectedCallback() {
        TotalAccounts().then(result=>{
            this.totalRecords = result;
        });
    }


    selectPage(event){
        this.offset = event.detail;
    }


}