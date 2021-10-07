trigger LeadObjTrigger on Lead (before insert,before update) {
    for(Lead l: Trigger.New){
        if(l.LastName.length() < 10){
            l.addError('Last Name should have more than 10 letters');
        }
    }
}