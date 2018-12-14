import React from '../../ReactBu.js';
import url from '../../utils/bsurl';
let bsurl = url.bsurl;
import id2Url from '../../utils/base64md5';

function PlayList() {
    this.state = {
        list: [],
        curplay: {},
        pid: 0,
        cover: '',
        music: {},
        playing: false,
        playtype: 1,
        loading: true,
        toplist: false,
        user: React.api.getStorageSync('user') || {},
        listLoading: true
    };
}

PlayList = React.toClass(PlayList, React.Component, {
    componentWillMount: function () {
        var that = this;
        let query = this.props.query;
        React.api.request({
            url: bsurl + 'playlist/detail',
            data: {
                id: query.pid,
                limit: 50
            },
            success: function (res) {
                var canplay = [];
                for (let i = 0; i < res.data.playlist.tracks.length; i++) {
                    if (res.data.privileges[i].st >= 0) {
                        canplay.push(res.data.playlist.tracks[i]);
                    }
                }
                that.setState({
                    list: res.data,
                    canplay: canplay,
                    toplist: query.from == 'stoplist' ? true : false,
                    cover: id2Url.id2Url('' + (res.data.playlist.coverImgId_str || res.data.playlist.coverImgId)),
                    listLoading: false
                });

                React.api.setNavigationBarTitle({
                    title: res.data.playlist.name
                });
            },
            fail: function () {
                React.api.navigateBack({
                    delta: 1
                });
            }
        });
    },
    render: function () {
        var h = React.createElement;

        return h('view', null, !this.state.listLoading && h('view', { id: 'plist-header' }, h('view', { 'class': 'blurbg', id: 'plh-filterbg', style: React.toStyle({ backgroundImage: 'url(' + this.state.cover + ')' }, this.props, 'style4441') }), h('view', { id: 'plh-main' }, h('view', { id: 'plh-cover' }, h('image', { 'class': 'music_cover', src: this.state.cover }), h('view', { 'class': 'img_playcount' }, h('image', { src: '../../assets/image/p0.png', style: React.toStyle({ width: '24rpx', height: '24rpx' }, this.props, 'style5473') }), this.state.list.playlist.playCount), h('view', { id: 'plh-playinfo', bindtap: 'plinfo' }, h('image', { src: '../../assets/image/cm2_list_detail_icn_infor@2x.png' }))), h('view', { id: 'plh-cnt' }, h('text', { id: 'music_h_name' }, this.state.list.playlist.name || ' '), h('view', null, h('image', { id: 'user_ava', 'class': 'user_avator', src: this.state.list.playlist.creator.avatarUrl }), h('text', null, this.state.list.playlist.creator.nickname || ' '), h('image', { src: '../../assets/image/cm2_list_detail_icn_arr@2x.png', style: React.toStyle({ width: '16rpx', height: '24rpx' }, this.props, 'style7869') })))), h('view', { id: 'plh_action' }, h('view', null, h('image', { src: '../../assets/image/cm2_list_detail_icn_fav_new@2x.png' }), h('text', null, this.state.list.playlist.subscribedCount || '收藏')), h('view', null, h('navigator', { url: '../recommend/index' }, h('image', { src: '../../assets/image/cm2_list_detail_icn_cmt@2x.png' }), h('text', null, this.state.list.playlist.commentCount || '评论'))), h('view', null, h('image', { src: '../../assets/image/cm2_list_detail_icn_share@2x.png' }), h('text', null, this.state.list.playlist.shareCount || '分享')))), h('view', { 'class': 'plist-detail page_pp' }, !this.state.listLoading && this.state.list.playlist.tracks.length ? h('view', null, h('view', { id: 'playall', bindtap: 'playall', 'class': 'flexlist flex-center' }, h('view', { 'class': 'flexleft flexnum' }, h('image', { src: '../../assets/image/pl-playall.png', mode: 'widthFix' })), h('view', null, h('text', { id: 'pa-count' }, '播放全部', ' ', h('text', null, ' ', '(共', this.state.list.playlist.trackCount, '首)')))), h(React.useComponent, { list: this.state.list.playlist.tracks, privileges: this.state.privileges, curplay: this.state.curplay, toplist: this.state.toplist, is: "PlayListComponent", 'data-instance-uid': 'i140_28_' + 0 })) : h(React.useComponent, { is: "Loading", 'data-instance-uid': 'i148_24_' + 0 })));
    },
    classUid: 'c6841'
}, {});
Page(React.registerPage(PlayList, 'pages/playlist/index'));

export default PlayList;