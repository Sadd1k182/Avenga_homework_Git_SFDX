trigger ContactTrigger on Contact (after insert,after update, after delete, after undelete) {
    
    Set<ID> setAccountIDs = new Set<ID>();
    for(Contact c : Trigger.new){
        setAccountIDs.add(c.AccountId);
    }
  
    List<Account> accounts = [Select ID, Name,(Select Name From Contacts)  From Account WHERE ID IN :setAccountIDs];
    for(Account a : accounts){
        String accName = '';
        for(Contact c : a.Contacts){
            accName +=c.Name+ ' ';                      
        }
        a.Name=accName;
    }
    update accounts;
  
}