public class ModifyArray {
    public List<Integer> arr;
    
    public ModifyArray(List<Integer> arr){
        this.arr = arr;
    }
    
    public void removeDuplicates(){
        //write a method that removes duplicates from this array
        //note: the method should work faster than O(n^2)
        for(Integer i = 0; i <= arr.size(); i++){
            if(!arr.contains(i)){
                arr.add(i);
            }
        }
}
    
    public void removeDuplicates(List<Integer> arrayWithDuplicates){
        //write a method that will remove all numbers from arr, that are in arrayWithDuplicates
        //e.g. arr:[1,2,3,4], arrayWithDuplicates[1,2,5], result => arr[3,4];
        for (Integer i = 0; i < arr.size();i++){
            for(Integer j = 0; j <= arrayWithDuplicates.size();j++){
                if(!arr.contains(arrayWithDuplicates[j])){
                    arr.add(i);
                }
            }
        }
    }
    
    public void addStringNumber(String stringNumber){
        //write a method that will parse a number from string and add it to array
        //e.g. arr[1,2,3], myModifiedArray.addStringNumber('1'), result = > arr:[1,2,3,1];
        Integer size = stringNumber.length();
        for(Integer i=0; i<size; i++) {
        arr[i] = Integer.valueOf(i);
    }

    }
    
    public override String toString(){
        //write an implementation of toString(). It should display each number of array on a new line.
        /*for (String element: toString()){
            System.debug(element);
        }*/
        for (Integer i = 0; i < arr.size();i++){
            return (' ' + arr[i]);
        }
        return '';
    }

    public void main(){
        ModifiedArray myModifiedArray = new ModifiedArray(new List<Integer>{1,2,3,4,1});
        System.debug(myModifiedArray);//arr:[1,2,3,4,1]
        myModifiedArray.removeDuplicates();
        System.debug(myModifiedArray); // arr: [1,2,3,4]
        myModifiedArray.removeDuplicates(new List<Integer>{1,2});
        System.debug(myModifiedArray); // arr: [3,4] 
        myModifiedArray.addStringNumber('1');
        System.debug(myModifiedArray); // arr: [3,4,1]
        myModifiedArray.addStringNumber('one'); // error, but the execution should continue
        myModifiedArray.addStringNumber(null); // error, but the execution should continue
    }
    
}