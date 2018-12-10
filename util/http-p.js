import { config as con } from '../config.js'


const tips = {
    0 : '出现了一个未知的错位',
    1 : 'OK,成功',
    1000 : '输入参数错误',
    1001 : '输入的json格式不正确',
    1002 : '找不到资源',
    1003 : '未知错误',
    1004 : '禁止访问',
    1005 : '不正确的开发者key',
    1006 : '服务器内部错误',
    1007 : 'url地址错误',
    2000 : '你已经点过赞了',
    2001 : '你还没点过赞',
    3000 : '该期内容不存在',
    
}

class HTTP {
    // 对请求进行封装
    request({ url, data = {}, method = "GET" }) {
        return new Promise((resolve,reject) => {
            this._request( url, resolve, reject, data, method )
        })
    }
    _request( url, resolve, reject, data,  method ) {
        wx.request({
            url: con.api_base_url + url,
            header:{
                'content-type': 'application/json',
                'appkey': con.appkey
            },
            method: method,
            data: data,
            success: (res) => {
                let code = res.statusCode.toString();
                if ( code.startsWith('2') ) {
                    resolve(res.data)
                } else {
                    reject()
                    let error_code = res.data.error_code;
                    this._show_error(error_code)
                   
                }
            },
            fail: (err) => {
                reject()
                this._show_error(0)
            }
        }) 
    }

    // 根据错误码提示进行封装,此方法是一个私有属性
    _show_error(error_code) {
        if( error_code !== 0 && !error_code  ){
            error_code = 1
        }
        wx.showToast({
            title:tips[error_code],
            icon: 'none',
            duration:2000
        })
    }

}

export { HTTP }