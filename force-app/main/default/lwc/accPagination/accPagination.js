import { LightningElement, track } from 'lwc';

import getNextPageApex from "@salesforce/apex/getPeople.GetNextPage";
import getPrevPageApex from "@salesforce/apex/getPeople.GetPrevPage";

export default class AccPagination extends LightningElement {

    @track Accounts;
    @track searchable = [];
    pageLength = 15;
    page = 1;


    nextpage(){
        let results = [];
        if(this.page <= (Math.floor(this.Accounts.length/this.pageLength))){
            this.page = this.page + 1;
            for(let i = 0; i < this.pageLength; i++){
                if((i + (this.page * this.pageLength)) < this.Accounts.length){
                    results.push(this.Accounts[i + (this.page * this.pageLength)]);
                }
            }
            this.searchable = results;
        }
    }

    prevpage(){
        let results = [];
        if(this.page >= 1){
            this.page = this.page - 1;
            for(let i = 0; i < this.pageLength; i++){
                if((i + (this.page * this.pageLength)) < this.Accounts.length){
                    results.push(this.Accounts[i + (this.page * this.pageLength)]);
                }
            }
            this.searchable = results;
        }
    }

}