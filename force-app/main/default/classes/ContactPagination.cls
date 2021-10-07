public with sharing class ContactPagination {
    
    @AuraEnabled(cacheable=true)
   public static List<Contact> getContactList(){
        return [SELECT Name,Email,Phone from Contact];
   }
  
   @AuraEnabled(cacheable=true)
   public static Integer getContactCount(){
       return [Select count() FROM Contact];
   }
}