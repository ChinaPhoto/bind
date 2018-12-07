import { HTTP } from '../util/http.js';


class ClassicModel extends HTTP {
    // 获取当前这期的数据
    getLatest(callback) {
        this.request ({
            url:'classic/latest',
            success: (res) => {
                callback(res);
                this._setLatestIndex(res.data.index);
                let key = this._getKey(res.index);
                wx.setStorageSync(key, res);
            }
        })
    }
    // 获取的数据
    getClassic (index, nextOrPrevious, callback) {
       
        let key = nextOrPrevious == 'next'? 
        this._getKey(index + 1) : this._getKey(index - 1);

        let classicData = wx.getStorageSync(key);

        if( !classicData ) {
            this.request ({
                // 'classic/'+ index + '/' + nextOrPrevious
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(key, res)
                    callback(res)
                }
            }) 
        }else {
            callback(classicData)
        } 
    }

    
    
    // 侧滑的状态

    isFirst(index) {
        return  index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex();
        return index == latestIndex ? true : false
    }

    //数据缓存
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    // 数据提起
    _getLatestIndex() {
        return wx.getStorageSync('latest')
    }

    // 动态创建key
    _getKey(index) {
        return 'classic' + index
    }
}

export { ClassicModel }