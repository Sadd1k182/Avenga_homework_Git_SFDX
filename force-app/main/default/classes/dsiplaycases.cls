public with sharing class dsiplaycases {
    @AuraEnabled
    public static Integer TotalRecords(){
        return [Select count() from Case];
    }
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList(Integer v_Offset, Integer v_pagesize){ 
        return [select id, casenumber, subject from case limit :v_pagesize OFFSET :v_Offset];
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