import { LightningElement,api } from 'lwc';

export default class MyTestPaginator extends LightningElement {

    @api pageLimit;
    @api totalRecords;
    currentPage = 1;


    handlePrev(_event) {
        this.currentPage = this.currentPage - 1;
        let offset = (this.currentPage - 1) * this.pageLimit;
        /* console.log(this.currentPage);
        console.log(offset); */
        const selectedEvent = new CustomEvent('selected', { detail: offset});
        this.dispatchEvent(selectedEvent);
    }

    handleNext(_event) {
        this.currentPage = this.currentPage + 1;
        let offset = (this.currentPage - 1) * this.pageLimit;
        /* console.log(this.currentPage); 
        console.log(offset); */
        const selectedEvent = new CustomEvent('selected', { detail: offset});
        this.dispatchEvent(selectedEvent);
    }

    get disabledPrevious(){
        return this.currentPage === 1;
    }

    get disabledNext(){
        return  Math.ceil(this.totalRecords / this.pageLimit) === this.currentPage;
    }
}