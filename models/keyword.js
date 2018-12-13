
import {
    HTTP
} from '../util/http-p'

class KeywordModel extends HTTP{

    maxLength= 10
    key= 'historyData'

    getHistory() {
        const datas= wx.getStorageSync(this.key)
        
        if( !datas ) {
            return []
        }

        return datas
    }

    getHot() {
       return this.request({
           url: 'book/hot_keyword'
       })
    }

    setHistory(value) {

        // 获取缓存的值
        let datas= this.getHistory();
        // 判断输入的内容是不是存在缓存里面
        const isHas= datas.includes(value)

        if( !isHas ){
            if( datas.length >= this.maxLength ) {
                datas.pop()
            }
            datas.unshift(value)
            wx.setStorageSync(this.key, datas)
        }
    }   

    getSearch(value, start) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                start:start,
                q: value
            }
        })
    }

}

export { KeywordModel }