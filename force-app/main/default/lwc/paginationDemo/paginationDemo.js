import { LightningElement,track} from 'lwc';
import getContactList from '@salesforce/apex/ContactPagination.getContactList';
import getCount from '@salesforce/apex/ContactPagination.getContactCount';
 
export default class paginationDemo extends LightningElement {
   @track contacts = [];
   allContacts = [];
   @track error;
   @track currentRecordCount = 0;
   @track pageNumber = 1;
   pageSize = 7;
   @track count;
   @track totalPages = 0;
 
   constructor() {
       super();
       getCount()
           .then(result => {
               this.count = result;
               this.totalPages = Math.ceil(this.count/this.pageSize);
           })
           .catch(error => {
               this.error = error;
       });
       this.getContactListJs();
   }

   getContactListJs(){
       var i = 0;
       getContactList({})
           .then(result => {
               for(i in result) {
                   this.allContacts.push(result[i]);
               }
               this.contacts = result;
               this.currentRecordCount = result.length + this.currentRecordCount;
               this.pageNumber = Math.ceil(this.allContacts.length / this.pageSize);
           })
           .catch(error => {
               this.error = error;
       });
   }
 
   handlePrevious() {
       var hasNext = this.pageNumber > 1;
       this.pageNumber = hasNext ? this.pageNumber - 1 : this.pageNumber;
       // Disable the prev button
       if(hasNext){
           this.prepparePage(false);
       }
   }
 
   handleNext() {
       var maxPage = Math.ceil(this.currentRecordCount/this.pageSize);
       if(maxPage === this.pageNumber && maxPage < this.totalPages) {
           this.getContactListJs();
       } else {
            // TODO: Disable the next button
            this.prepparePage(true);
       }
   }
 
   prepparePage(isNext){
       var startIndex = isNext ? this.pageNumber * this.pageSize : (this.pageNumber -1) * this.pageSize;
       var endIndex = isNext ? (this.pageNumber +1) * this.pageSize : this.pageNumber * this.pageSize ;
       var i = startIndex;
       this.contacts = [];
       for(i; i < endIndex ; i++){
           if(this.allContacts[i] != null){
               this.contacts.push(this.allContacts[i]);
           }
       }
       this.pageNumber = isNext && this.pageNumber < this.pageSize? this.pageNumber + 1 : this.pageNumber;
   }
}