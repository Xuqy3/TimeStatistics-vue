import {request} from './http.js'

//获取全部信息
export function getAll(){
  return request({
    url: '/getAll'
  })
}

//分页获取
export function getAllByPage(pageNo){
  return request({
    url: "/getAllByPage/"+pageNo
  })
}
//条件搜索
export function search(group){
  return request({
    url: '/search/'+group
  })
}

//获得工作量
export function getWorkload(){
  return request({
    url: '/getWorkload'
  })
}

//时间转换
export function timeTransfer(value){
  if (value==""){
    return ""
  }else {
    var date = new Date(value);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // 拼接
    return year + "-" + month + "-" + day;
  }
}
