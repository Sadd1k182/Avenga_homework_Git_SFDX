import {LightningElement,api} from 'lwc';

export default class PaginatorComponent extends LightningElement {

    @api pageLimit;
    @api totalRecords;
    currentPage = 1;

    connectedCallback() {
        this.setButtonsToDisplay();
    }

    setButtonsToDisplay(){
        this.pages = [];
        const pagesNumber = Math.ceil(this.totalRecords/this.pageLimit);
        for (let i = 1; i <= pagesNumber; i++){
            this.pages.push({ label: i, disabled: i === this.currentPage});
        }

    }

    /*renderedCallback(){
        this.renderButtons();
    }
    renderButtons = ()=>{
        this.template.querySelectorAll('button').forEach((but)=>{
            but.style.backgroundColor = this.currentPage === parseInt(but.dataset.id,10)?'yellow':'white';
        })
    }*/

    handlePrev(_event) {
        this.currentPage = this.currentPage - 1;
        let offset = (this.currentPage - 1) * this.pageLimit;
        const selectedEvent = new CustomEvent('selected', { detail: offset});
        this.dispatchEvent(selectedEvent);
        this.setButtonsToDisplay();

    }

    handleNext(_event) {
        this.currentPage = this.currentPage +1;
        let offset = (this.currentPage - 1) * this.pageLimit;
        const selectedEvent = new CustomEvent('selected', { detail: offset});
        this.dispatchEvent(selectedEvent);
        this.setButtonsToDisplay();

    }

    onPageClick(_event){
        this.currentPage = _event.target.label;
        let offset = (this.currentPage - 1) * this.pageLimit;
        const selectedEvent = new CustomEvent('selected', { detail: offset});
        this.dispatchEvent(selectedEvent);
        this.setButtonsToDisplay();

    }

    /*preparePaginationList() {
        let begin = (this.currentPage - 1) * (this.pageLimit);
        let end = begin + (this.pageLimit);
        this.pages = this.accounts.slice(begin, end);

        this.end = end > this.totalRecords;

        const event = new CustomEvent('selected', {detail: this.pages});
        this.dispatchEvent(event);
    }*/

    get disablePrevious(){
        return this.currentPage === 1;
    }

    get disableNext(){
        return this.currentPage >= Math.ceil(this.totalRecords / this.pageLimit);
    }


}