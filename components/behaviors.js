const paginationBev = Behavior({
    data: {
        booksData: [],
        total: null, // 数组最大长度
        noneResult: false, // 是否搜到数据
        isLoad: false, // 下拉是否处于请求状态
        isLoading: false, //loading 加载状态
    },

    methods: {
        // 数组重合处理
        setMoreData( array ) {
            this.setData({
                booksData: this.data.booksData.concat(array)
            })
        },

        // 设置total的数值
        setTotal( total ) {
            this.data.total = total;
            if(total === 0){
                this.setData({
                    noneResult: true
                })
            }
        },

        // 获取 book数组 长度
        getDataLength() {
            return this.data.booksData.length
        },

        //  判断是否达到数据最大值
        hasMore() {
            if( this.getDataLength() >= this.data.total ) {
                return false
            }else {
                return true
            }
        },

        //  每次加载之前清空
        initialize() {
            this.setData({
                booksData: [],
                total: null,
                isLoad: false,
                isLoading: false,
                noneResult: false
            })
        },

        // 返回isload状态
        isLocked() {
            return this.data.load ? true : false
        },

        // 正在请求状态
        openResult() {
            this.setData({
                isLoad: true
            })
        },

        //关闭请求状态
        closeResult() {
            this.setData({
                isLoad: false
            })
        },

        // loading 打开状态
        openLoading() {
            this.setData({
                isLoading: true
            })
        },

        // loading 关闭装填
        closeLoading() {
            this.setData({
                isLoading: false
            })
        }
    }

})

export { paginationBev }