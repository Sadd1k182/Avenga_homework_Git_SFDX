trigger ExampleTrigger on Contact (after insert, after delete) {
    if(Trigger.isInsert){
        Integer recordCount = Trigger.New.size();
        EmailManager.sendEmail('sadd1k182@gmail.com', 'Trailhead trigger tutorial', recordCount + ' contact(s) were inserted.');
    }else if(Trigger.isDelete){
        //process after delete
    }
}