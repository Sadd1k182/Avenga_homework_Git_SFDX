import { LightningElement, track } from 'lwc';

import getAccounts from '@salesforce/apex/explorePaginationController.getAccounts';
import getAccountsCount from '@salesforce/apex/explorePaginationController.getAccountsCount';

export default class ExplorePagination extends LightningElement {
    @track accounts;
    @track paginationRange = [];
    @track totalRecords;

    constructor(){
        super();
        getAccountsCount().then(count => {
            if(count){
                //get total count of records
                this.totalRecords = count;
                getAccounts().then(data => {
                    let i = 1;
                    this.accounts = data;
                    //looking at displaying 3 records per page
                    const paginationNumbers = Math.ceil(this.totalRecords/4);
                    //create an array with size equals to paginationNumbers
                    while(
                        this.paginationRange.push(i++) < paginationNumbers
                        // eslint-disable-next-line no-empty
                    ) {}
                });
            }
        });
    }

    handlePaginationClick(event) {
        let offsetNumber = event.target.dataset.targetNumber;

        //reduce 1 from the clicked number and multiply it with 3, 
        getAccounts({offsetRange: 4 * (offsetNumber - 1)})
        .then(data => {
            this.accounts = data;
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
    }

}