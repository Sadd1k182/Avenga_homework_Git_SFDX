public class Cat {
    private String name;
    private Integer size;
    private Integer enen;
    
    public Cat(String n, Integer s){
        this.name = n;
        this.size = s;
    }
    
    public Cat(String n, Integer s,Integer a){
        this.name = n;
        this.size = s;
        this.enen = a;
    }
    public void display(){
        System.debug(name);
        System.debug(size);
    }

}