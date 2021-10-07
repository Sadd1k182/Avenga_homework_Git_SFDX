public class accountController {

    @AuraEnabled(cacheable=true)
    public static PagedResult getAccountList(Integer pageNumber) {
        Integer pageSize = 5;
        Integer offset = (pageNumber - 1) * pageSize;
        PagedResult result = new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        result.totalItemCount = [SELECT count() from Account];
        result.records = [SELECT Id, Name, AccountNumber, Phone, (Select Id,Name from Contacts) FROM Account ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return result;
      }

      public class PagedResult {
        @AuraEnabled
        public Integer pageSize { get;set; }
        @AuraEnabled
        public Integer pageNumber { get;set; }
        @AuraEnabled
        public Integer totalItemCount { get;set; }
        @AuraEnabled
        public Object[] records { get;set; }
    }
}