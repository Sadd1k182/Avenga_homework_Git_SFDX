import { LightningElement, track } from 'lwc';

export default class QuizAppProject extends LightningElement {

    selected = {} //for storing answers
    correctAnswer = 0; //to show the correct answer number
    isSubmitted = false; // use to show the result
    myQuestions = [
        {
            id: "Question1",
            question: 'Which one of the following is not a template loop?',
            answers:{
                a:'for:each',
                b:'iterator',
                c:'map loop'
            },
            correctAnswer: 'c'
        },
        {
            id: "Question2",
            question: 'Which of the file is invalid in LWC component folder?',
            answers:{
                a:'.svg',
                b:'.apex',
                c:'.js'
            },
            correctAnswer: 'b'
        },
        {
            id: "Question3",
            question: 'Which one of the following is not a directive',
            answers:{
                a:'for:each',
                b:'if:true',
                c:'@track'
            },
            correctAnswer: 'c'
        }
    ];

    // change handler gets called on every click on the options
    changeHandler(event){
        const name = event.target.name;
        const value = event.target.value;
        this.selected = {...this.selected, [name]:value}
    }

    // form submit handler
    submitHandler(event){
        event.preventDefault();
        let correct = this.myQuestions.filter(item=> this.selected[item.id] === item.correctAnswer);
        this.correctAnswer = correct.length;
        this.isSubmitted = true;
        console.log(this.correctAnswer);
    }

    // form reset handler
    resetHandler(){
        this.selected = {};
        this.correctAnswer = 0;
        this.isSubmitted = false;
    }

    // used for disabling the submit button
    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myQuestions.length);
    }

    // for applying dynamic styling to our result
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswer ? 'slds-text-color_success' : 'slds-text-color_error'}`;
    }

}