// miniprogram/pages/cate/cate.js
let startTouchTime =0;
let endTouchTime = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: null,
    s: ''
  },

  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('sentence').get().then(res => {
      this.setData({
        all: {
          caihongpi:this.shuffle(res.data[0].caihongpi),
          wenyi:this.shuffle(res.data[0].wenyi)
        },
        caihongpi: this.shuffle(res.data[0].caihongpi),
        wenyi: this.shuffle(res.data[0].wenyi)
      })
      this.randomSentence(1)
    })
  },

  touchStart: function(e){
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.touchStartPoint = [sx, sy] //坐标
    this.touchStartTime = e.timeStamp //时间点
  },

  touchEnd: function (e) {
    //注意:触摸结束没有坐标监听事件,故读不到坐标点
    this.touchEndTime = e.timeStamp //时间点
  },

  multipleTap: function(e){
    let curTime = e.timeStamp;
    let lastTime = this.lastTapDiffTime;
    this.lastTapDiffTime = curTime;
    
      //两次点击间隔小于300ms, 认为是双击
      let diff = curTime - lastTime;
      if (diff < 300) {
        console.log(this.data.s)
        clearTimeout(this.lastTapTimeoutFunc); // 成功触发双击事件时，取消单击事件的执行
        wx.setClipboardData({
          data: this.data.s,
          success(res){
            wx.showToast({
              icon:'none',
              title: '已复制到剪贴板',
            })
          }
        })
      } else {
        // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
        this.lastTapTimeoutFunc = setTimeout(function () {
          console.log("single tap")
        }, 300);
      }
  },

  randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  },

  randomSentence(e) {
    let type = e.currentTarget ? e.currentTarget.dataset.type : 1
    let index;
    if (type == 1) {
      index = this.randomNumber(0, this.data.caihongpi.length - 1);
      this.setData({
        s: this.data.caihongpi.splice(index, 1)[0],
        caihongpi: this.data.caihongpi.length == 0 ? this.data.all.caihongpi : this.data.caihongpi
      })
    } else if (type == 2) {
      index = this.randomNumber(0, this.data.wenyi.length - 1);
      this.setData({
        s: this.data.wenyi.splice(index, 1)[0],
        wenyi: this.data.wenyi.length == 0 ? this.data.all.wenyi : this.data.wenyi
      })
    }
  },

  shuffle(arr){
    let input = arr;
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})