public with sharing class DisplayCases {
       @AuraEnabled
       public static Integer TotalRecords(){
           return [Select count() from Account];
       }
       @AuraEnabled(cacheable=true)
       public static List<Account> getCaseList(Integer v_Offset, Integer v_pagesize){
           return [select Id,Name FROM Account limit :v_pagesize OFFSET :v_Offset];
       }

       @AuraEnabled(cacheable=true)
       public static Integer getNext(Integer v_Offset, Integer v_pagesize){
           v_Offset += v_pagesize;
           return v_Offset;
       }

       @AuraEnabled(cacheable=true)
       public static Integer getPrevious(Integer v_Offset, Integer v_pagesize){
           v_Offset -= v_pagesize;
           return v_Offset;
       }
}