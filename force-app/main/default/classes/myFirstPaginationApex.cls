public with sharing class myFirstPaginationApex {

    @AuraEnabled
    public static List<SObject> getRecords(String soql) {
        return [SELECT Id,Name FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static Integer countRecords(String objectName) {
        if (String.isNotEmpty(objectName)) {
        return database.countQuery(
            'SELECT count() FROM ' +
            objectName +
            ' WITH SECURITY_ENFORCED'
        );
        }
        return 0;
    }
}