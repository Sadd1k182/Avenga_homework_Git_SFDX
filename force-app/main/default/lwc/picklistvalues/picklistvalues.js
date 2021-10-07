import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/pickListVal.getAccounts';

export default class LifeCycle extends LightningElement {

    @wire(getAccounts)
    accounts;

    get responseReceived(){
        if(this.accounts){
            return true;
        } 
        return false;
    }
}