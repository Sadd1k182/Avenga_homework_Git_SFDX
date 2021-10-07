public with sharing class getPeople {

    @AuraEnabled
    public static List<Account> GetAccount() {
        List<Account> accounts = [Select Id, Name,Industry,Phone FROM Account];
        return accounts;
    }

    @AuraEnabled
    public static List<Account> GetNextPage(Integer pageLength, Integer page) {
        Integer offset = pageLength * page;
        List<Account> accounts = [Select Id, Name,Industry,Phone FROM Account LIMIT :pageLength OFFSET :offset];
        return accounts;
    }

    @AuraEnabled
    public static List<Account> GetPrevPage(Integer pageLength, Integer page) {
        Integer offset = pageLength * page;
        List<Account> accounts = [Select Id, Name,Industry,Phone FROM Account LIMIT :pageLength OFFSET :offset];
        return accounts;
    }
}