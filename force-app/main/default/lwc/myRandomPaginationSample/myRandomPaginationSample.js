import { LightningElement,track } from 'lwc';
import getAccount from '@salesforce/apex/getPeople.GetAccount';
import getNextPageApex from "@salesforce/apex/getPeople.GetNextPage";
import getPrevPageApex from "@salesforce/apex/getPeople.GetPrevPage";

export default class SortedTable extends LightningElement {

    @track Accounts;
    @track searchable = [];
    pageLength = 5;
    page = 1;

    connectedCallback() {
        this.AccountGetterMethod();
    }

    AccountGetterMethod() {
        getAccount({
        })
            .then((data) => {
                if (data) {
                    this.Accounts = data;
                    for(let i = 0;i<this.pageLength;i++){
                        this.searchable.push(this.Accounts[i]);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    nextpage(){
        this.page = this.page + 1;
        getNextPageApex({pageLength: this.pageLength, page: this.page}).then(result => {
            this.searchable = result;
        });
}

    prevpage(){
    if(this.page >= 1){
        this.page = this.page - 1;
        getPrevPageApex({pageLength: this.pageLength, page: this.page}).then(result => {
            this.searchable = result;
        });
    }
}
}