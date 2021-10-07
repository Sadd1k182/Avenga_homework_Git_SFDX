public with sharing class DataController {

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContactList(){
        
        return [SELECT Id,Name FROM Contact];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountList(){
        
        return [SELECT Id,Name FROM Account];
    }
}