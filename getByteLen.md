
```


/*
 * 判断字符长度
 * @param: str
 */

export default {
  /*
  * 一个汉字算两个字符,一个英文字母或数字算一个字符
  */
 getByteLen: function(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      return len;
  },
   /*
  * 一个汉字算一个字,一个英文字母或数字算半个字
  */
  getZhLen: function (val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 1;
        }
        else {
          len += 0.5;
        }
      }
      return Math.ceil(len);
  },

  /*暂无用*/
  cutStr: function(str, len,type){
    var char_length = 0;
    for (var i = 0; i < str.length; i++){
        var son_str = str.charAt(i);
        if(type==1) {
          encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
        }
        if(type==2) {
           char_length += 1 ;
        }
        if (char_length >= len){
            var sub_len = char_length == len ? i+1 : i;
            return str.substr(0, sub_len);

        }
    }
  },

  /*
  * 限制字数用, 一个汉字算一个字,两个英文/字母算一个字
  */
  getByteVal: function(val, max) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null)
        byteValLen += 1;
        else
        byteValLen += 0.5;
        if (byteValLen > max)
        break;
        returnValue += val[i];
    }
    return returnValue;
  },

  /*
  * 限制字符数用, 一个汉字算两个字符,一个英文/字母算一个字符
  */
  getCharVal: function (val, max) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null)
        byteValLen += 2;
        else
        byteValLen += 1;
        if (byteValLen > max)
        break;
        returnValue += val[i];
    }
    return returnValue;
  },

  /*
  * 正则校验,校验非负数字
  */
  regPos: function(v) {
    var regTest = /^\d+(\.\d+)?$/;
    return regTest.test(v);
  }
}
```
