public with sharing class explorePaginationController {

    public explorePaginationController() {

    }

    @AuraEnabled(Cacheable=true)
    public static Integer getAccountsCount(){
        return [SELECT COUNT() FROM Account];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(Integer offsetRange, Integer l){
        if(offsetRange == null){
            return [SELECT Id,Name,Rating,Industry FROM Account LIMIT :l];
        } else {
            return [SELECT Id,Name,Rating,Industry FROM Account LIMIT :l OFFSET:offsetRange];
        }
    }
}