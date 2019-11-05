
```
/*
 * 时间日期转换
 * @param: "10:00-22:00"/ new Date()
 */

export default {
  /*
  * var storeBusinessTime="10:00-22:00"  to
  */
  timeToDate: function(val) {
    var date = new Date()
    var y = date.getFullYear();
    var m = date.getMonth() +1;
    var day = date.getDate();

    var d = [],newArr = [];
    var dArr = val.split('-');
    dArr.forEach(function(ele,index){
      newArr.push(ele.split(':'))
    })
    d = [new Date(y,m,day,newArr[0][0],newArr[0][1]),new Date(y,m,day,newArr[1][0],newArr[1][1])]
    return d;
  },



  dateToTime(val) {
    console.log(val)
    //  (0-9)年月数字的显示
    function formatDig(num) {
      return num > 9 ? '' + num : '0' + num;
    }
    var t;
    var t1 = formatDig(new Date(val[0]).getHours())+':'+formatDig(new Date(val[0]).getMinutes())
    var t2 = formatDig(new Date(val[1]).getHours())+':'+formatDig(new Date(val[1]).getMinutes())
    t= t1+'-'+t2
    return t;
  }
}

```
