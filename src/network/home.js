import {request,request2} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeData(type, page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}

// export function getHomeData(type, page) {
//   return request2({
//     url: '/test/index',
//     params:{
//       type,
//       page
//     }
//   })
// }
// export function getHomeData() {
//   return request2({
//     url: '/test/index',
//   })
// }
