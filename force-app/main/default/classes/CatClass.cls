public class CatClass {
    private String name;
    private Integer size;
    
    public void setSize(Integer s){
        if(s<=0){
            System.debug('You can not set a wrong value for my cat');
            size=10;
        }
        else{
            size=s;
        }
    }
    
    public void setName(String n){
        name=n;
    }
    
    public void display(){
        System.debug('Name is :' + name);
        System.debug('Size is :' + size);
    }

}