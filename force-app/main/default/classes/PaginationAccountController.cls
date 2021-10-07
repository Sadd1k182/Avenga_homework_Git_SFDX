public with sharing class PaginationAccountController {

    @AuraEnabled(Cacheable=true)
    public static List<Account> FetchAccountRecord(Integer offset, Integer pageLimit){
        return [SELECT Id,Name,Phone FROM Account LIMIT :pageLimit OFFSET :offset];
    }

    @AuraEnabled(Cacheable=true)
    public static Integer TotalAccounts(){
        return [SELECT COUNT() FROM Account];
    }

}