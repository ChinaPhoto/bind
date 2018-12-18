import { HTTP } from '../util/http-p.js';

class BookModel extends HTTP {

     getHotList() {
          return this.request({
               url: 'book/hot_list'
          })
     }

     getMyBookCount() {
          return this.request({
               url: 'book/favor/count'
          })
     }

     getDetail(id) {
          return this.request({
               url: `book/${id}/detail`
          })
     }

     getLikeStatus(id) {
          return this.request({
               url: `book/${id}/favor`
          })
     }

     getComments(id) {
          return this.request({
               url: `book/${id}/short_comment`
          })
     }

     postComment(bid,comment) {
          return this.request({
               url: 'book/add/short_comment',
               method: 'POST',
               data: {
                    book_id: bid,
                    content: comment
               }
          })
     }

     getMyFavor() {
          return this.request({
               url: 'classic/favor'
          })
     }
     
}

export {
    BookModel
}