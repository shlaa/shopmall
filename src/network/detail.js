import {request2} from "./request";

export function getDetail(iid) {
  return request2({
    url: '/detail',
    params:{
      iid
    }
  })
}

export function getRcommend(iid) {
  return request2({
    url: '/recommend',
    params:{
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo,columns,service) {
    this.title=itemInfo.title
    this.desc=itemInfo.desc;
    this.newPrice=itemInfo.newPrice;
    this.oldPrice=itemInfo.oldPrice;
    this.discount=itemInfo.discount;
    this.columns=columns;
    this.services=service;
    this.realPrice=itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodsCount=shopInfo.cGoods
  }
}


export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

