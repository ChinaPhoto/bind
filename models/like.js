import { HTTP } from '../util/http.js';

class LikeModel extends HTTP {
    like(behavior, artId, cataGory) {
        // 首先判断 url 地址
        let url = behavior === 'like'? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artId,
                type: cataGory
            }
        }) 
    }

    getClassicLikeStatus(artID, cataGory, callbck) {
        this.request({
            url:`classic/${cataGory}/${artID}/favor`,
            success(res) {
                callbck(res)
            }
        })
    }
}


export { LikeModel }