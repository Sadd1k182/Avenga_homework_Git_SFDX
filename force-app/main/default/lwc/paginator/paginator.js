import { LightningElement, api, track } from 'lwc';

export default class Paginator extends LightningElement {
    /* renderedCallback(){
          this.template.querySelector('lightning-button.Previous').disabled = true;
    } */
    previousHandler1() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler1() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}