import { LightningElement, wire, track, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import getRecords from "@salesforce/apex/myFirstPaginationApex.getRecords";
import countRecords from "@salesforce/apex/myFirstPaginationApex.countRecords";

let cols;
const actions = [
  { label: "Show details", name: "show_details" },
  { label: "Edit", name: "edit" },
  { label: "Delete", name: "delete" }
];
export default class MyFirstPagination extends LightningElement {
    @api recordId;
  @api iconName;
  @api title;
  @api objectName;
  @api columns;
  @api relatedFieldAPI;
  @api whereClause;
  @api limit = 10;
  // Private Property
  @track data;
  @track soql;
  @track offSet = 0;
  @track totalRows = 0;
  @track error;

  // Do init funtion
  connectedCallback() {
    this.columns = cols;
    countRecords({ objectName: this.objectName }).then((result) => {
      this.totalRows = result;
    });
    this.fetchRecords();
  }

  fetchRecords() {
    getRecords({ soql: this.soql })
      .then((data) => {
        if (data) {
          data.map((e) => {
            for (let key in e) {
              if (typeof e[key] === "object") {
                for (let onLevel in e[key]) {
                  e[key + "." + onLevel] = e[key][onLevel];
                }
              }
            }
          });
          this.data = data;
        }
      })
      .catch((error) => {
        if (error) {
          this.error = "Unknown error";
          if (Array.isArray(error.body)) {
            this.error = error.body.map((e) => e.message).join(", ");
          } else if (typeof error.body.message === "string") {
            this.error = error.body.message;
          }
          console.log("error", this.error);
        }
      });
  }

  //Next button to get the next data
  next(event) {
    this.offSet = this.offSet + this.limit;
    this.fetchRecords();
  }

  //Previous button to get the previous data
  previous(event) {
    this.offSet = this.offSet - this.limit;
    this.fetchRecords();
  }

  get isDisablePrev() {
    return this.offSet == 0 || this.totalRows === 0 ? true : false;
  }

  get isDisableNext() {
    return this.offSet + this.limit >= this.totalRows || this.totalRows === 0
      ? true
      : this.totalRows <= this.limit
      ? false
      : false;
  }
}