import { LightningElement, wire,track,api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import fetchAccounts from '@salesforce/apex/accountController.fetchAccounts';
import {getPicklistValues,getObjectInfo} from "lightning/uiObjectInfoApi";
export default class Sample extends LightningElement {

    records;
    selectedValue = 'All';

    get options() {
        return [
            { label: 'All', value: 'All' },
            { label: 'Apparel', value: 'Apparel' },
            { label: 'Biotechnology', value: 'Biotechnology' },
            { label: 'Construction', value: 'Construction' },
            { label: 'Consulting', value: 'Consulting' },
            { label: 'Energy', value: 'Energy' }
        ];
    }

    handleChange( event ) {
        this.selectedValue = event.detail.value;
        if ( this.selectedValue === 'All' )
            this.records = this.initialRecords;
        else
            this.filter();
    }

    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {
        if (data) {
            this.records = data;
            this.initialRecords = data;
            this.error = undefined;
            this.sortedColumn = "Name";
            this.sortRecs();
        } else if ( error ) {
            this.error = error;
            this.initialRecords = undefined;
            this.records = undefined;
        }
    }  

    filter() {
        if ( this.selectedValue ) {
            this.records = this.initialRecords;
            if ( this.records ) {
                let recs = [];
                for ( let rec of this.records ) {
                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    if ( rec.Industry === this.selectedValue ) {
                        recs.push( rec );
                    }
                }
                this.records = recs;
            }
        }  else {
            this.records = this.initialRecords;
        }
    }

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountMetadata;
    @wire(getPicklistValues, {fieldApiName: INDUSTRY_FIELD, recordTypeId: '$accountMetadata.data.defaultRecordTypeId'})
    industryPicklist;

    handleChangeStatus(event) {
        this.value = event.detail.value;
    }

}