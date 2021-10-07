import { LightningElement } from 'lwc';

export default class HelloQuerySelectorDemo extends LightningElement {
    userNames = ['John','Smith','Nick','Mike'];

    fetchDetailHandler(){
        const elem = this.template.querySelector('h1');
        elem.style.border = "1px solid red";
        console.log(elem.innerText);

        const userElements = this.template.querySelectorAll('.name');
        userElements.style.border = "1px solid green";
        Array.from(userElements).forEach(item => {
            console.log(item.innerText);
            item.setAttribute('title', item.innerText);
        })

        //lwc:manual demo   
        const childElem = this.template.querySelectorAll('.child');
        childElem.innerHTML = '<p>hey i am child</p>    '
    }
}