import React from '../../ReactWX.js';

import url from '../../utils/bsurl';
let bsurl = url.bsurl;

var app = React.getApp();

function P() {
    this.state = {
        rec: {
            idx: 0,
            loading: false
        },
        music: {},
        playing: false,
        playtype: {},
        banner: [4],
        thisday: new Date().getDate(),
        cateisShow: true,
        playlist: {
            idx: 1,
            loading: false,
            list: {},
            offset: 0,
            limit: 20
        },
        catelist: {
            res: {},
            checked: {}
        },
        djlist: {
            idx: 2,
            loading: false,
            list: [],
            offset: 0,
            limit: 20
        },
        djcate: { loading: false },
        djrecs: {},
        sort: {
            idx: 3,
            loading: false
        },
        array123: [1, 2, 3],
        tabidx: 0
    };
}

P = React.toClass(P, React.Component, {
    componentDidMount: function () {
        !this.state.rec.loading && this.init();
    },
    init: function () {
        let that = this;
        let rec = this.state.rec;

        React.api.request({
            url: bsurl + 'banner',
            data: { cookie: app.globalData.cookie },
            success: function (res) {
                that.setState({
                    banner: res.data.banners
                });
            }
        });
        React.api.request({
            url: bsurl + 'playlist/catlist',
            success: function (res) {
                that.setState({
                    catelist: {
                        isShow: false,
                        res: res.data,
                        checked: res.data.all
                    }
                });
            }
        });

        Promise.all(this.personalized()).then(function (result) {
            rec.loading = true;
            rec.re = result;
            that.setState({
                rec: rec
            });
        });
    },
    personalized: function () {
        let result = [];
        let arr = ['personalized', 'personalized/newsong', 'personalized/mv', 'personalized/djprogram'];
        for (let i = 0; i < arr.length; i++) {
            result[i] = new Promise((resolve, reject) => {
                React.api.request({
                    url: bsurl + arr[i],
                    data: { cookie: app.globalData.cookie },
                    success: function (res) {
                        resolve(res.data.result);
                    },
                    fail: function () {
                        reject('请求失败');
                    }
                });
            });
        }

        return result;
    },
    switchTab: function (index) {
        var that = this;
        this.setState({
            tabidx: index
        });

        if (index === 1 && !this.state.playlist.loading) {
            this.gplaylist();
        }
        if (index == 2 && !this.state.djcate.loading) {
            React.api.request({
                url: bsurl + 'djradio/catelist',
                success: function (res) {
                    var catelist = res.data;
                    catelist.loading = true;
                    that.setState({
                        djcate: catelist
                    });
                }
            });
        }

        if (index == 3 && !this.state.sort.loading) {
            this.state.sort.loading = false;
            this.setState({
                sort: this.state.sort
            });
            React.api.request({
                url: bsurl + 'toplist/detail',
                success: function (res) {
                    res.data.idx = 3;
                    res.data.loading = true;
                    that.setState({
                        sort: res.data
                    });
                }
            });
        }
    },
    gplaylist: function (isadd) {
        var that = this;
        React.api.request({
            url: bsurl + 'top/playlist',
            data: {
                limit: that.state.playlist.limit,
                offset: that.state.playlist.offset,
                type: that.state.catelist.checked.name
            },
            success: function (res) {
                that.state.playlist.loading = true;
                if (!isadd) {
                    that.state.playlist.list = res.data;
                } else {
                    res.state.playlists = that.state.playlist.list.playlists.concat(res.data.playlists);
                    that.state.playlist.list = res.data;
                }
                that.state.playlist.offset += res.data.playlists.length;
                that.setState({
                    playlist: that.state.playlist
                });
            }
        });
    },
    togglePtype: function () {
        this.setState({
            cateisShow: !this.state.cateisShow
        });
    },
    cateselect: function () {},
    render: function () {
        var h = React.createElement;

        return h('view', null, h('view', { id: 'header', 'class': 'tab' }, h('view', { 'class': 'tab-item ' + (this.state.rec.idx === this.state.tabidx ? 'tbi-cur' : ''), onTap: this.switchTab.bind(this, 0), 'data-tap-uid': 'e194_22', 'data-beacon-uid': 'default' }, h('text', { 'class': 'tbi-text' }, '个性推荐')), h('view', { 'class': 'tab-item ' + (this.state.playlist.idx === this.state.tabidx ? 'tbi-cur' : ''), onTap: this.switchTab.bind(this, 1), 'data-tap-uid': 'e200_22', 'data-beacon-uid': 'default' }, h('text', { 'class': 'tbi-text' }, '歌单')), h('view', { 'class': 'tab-item ' + (this.state.djlist.idx === this.state.tabidx ? 'tbi-cur' : ''), onTap: this.switchTab.bind(this, 2), 'data-tap-uid': 'e206_22', 'data-beacon-uid': 'default' }, h('text', { 'class': 'tbi-text' }, '主播电台')), h('view', { 'class': 'tab-item ' + (this.state.sort.idx === this.state.tabidx ? 'tbi-cur' : ''), onTap: this.switchTab.bind(this, 3), 'data-tap-uid': 'e212_22', 'data-beacon-uid': 'default' }, h('text', { 'class': 'tbi-text' }, '排行榜')), h('navigator', { url: '../search/index', 'class': 'tab-item', id: 'lastsearch' }, h('icon', { type: 'search', size: '18', color: '#666' }))), h('view', { id: 'main', 'class': 'page_pp' }, h('view', { 'class': 'tab_cnt', hidden: this.state.tabidx !== 0 }, h('swiper', { 'indicator-dots': 'true', autoplay: 'true', circular: 'true' }, this.state.banner.map(function (item) {
            return h('swiper-item', { key: item }, h('image', { src: '{{item.pic}}', 'class': 'slide-image', width: '750', height: '290' }));
        }, this)), !this.state.rec.loading ? h('view', { id: 'album_loading' }, h('image', { src: '../../assets/image/cm2_discover_icn_start_big@2x.png' }), '正在为您生成个性化推荐...') : h('view', { id: 'rec_nav' }, h('view', null, h('navigator', { url: '../playlist/index' }, h('view', { 'class': 'recn_ico' }, h('image', { src: '../../assets/image/cm2_discover_icn_fm-ip6@2x.png' })), '私人FM')), h('view', null, h('navigator', { url: '../playlist/index' }, h('view', { 'class': 'recn_ico' }, this.state.thisday), '每日歌曲推荐')), h('view', null, h('navigator', { url: '../playlist/index?pid=3778678' }, h('view', { 'class': 'recn_ico' }, h('image', { src: '../../assets/image/cm2_discover_icn_upbill-ip6@2x.png' })), '云音乐热歌榜'))), h('view', { 'class': 'st_title' }, h('image', { width: '30', mode: 'widthFix', src: '../../assets/image/cm2_discover_icn_recmd@2x.png' }), '推荐歌单', h('view', { 'class': 'rbtn', bindtap: 'switchtab', 'data-t': '1' }, '更多>')), this.state.rec.loading && h('view', { 'class': 'flex-boxlist' }, this.state.rec.re[0].map(function (item) {
            return h('view', { 'class': 'tl_cnt' }, h('navigator', { url: "../playlist/index?pid=" + item.id + "&from=toplist" }, h('view', { 'class': 'cover' }, h('image', { src: item.picUrl + "?param=200y200", 'class': 'music_cover' }), h('view', { 'class': 'img_playcount' }, h('image', { src: '../../assets/image/p0.png' }), item.playCount)), h('text', { 'class': 'name' }, item.name)));
        }, this)), h('view', { 'class': 'st_title' }, h('image', { width: '30', mode: 'widthFix', src: '../../assets/image/cm2_discover_icn_newest@2x.png' }), '最新音乐', h('view', { 'class': 'rbtn', bindtap: 'switchtab', 'data-t': '1' }, '更多>')), this.state.rec.loading && h('view', { 'class': 'flex-boxlist' }, this.state.rec.re[1].map(function (re, index) {
            return h('view', { 'class': 'tl_cnt', key: re.id }, index < 6 && h('navigator', { url: "../playing/index?id=" + re.id + "&br=" + re.song.privilege.maxbr }, h('view', { 'class': 'cover' }, h('image', { src: re.song.album.picUrl + "?param=200y200", 'class': 'music_cover' }), h('text', null, re.playcount)), h('view', { 'class': 'tl_info' }, h('view', null, re.name), h('view', { 'class': 'tli_des' }, re.song.artists[0].name))));
        }, this))), h('view', { 'class': 'tab_cnt', hidden: this.state.tabidx !== 1 }, h('view', { 'class': 'listheader', id: 'plc_header' }, this.state.catelist.checked.name, h('text', { onTap: this.togglePtype.bind(this), id: 'catselectbtn', 'data-tap-uid': 'e339_32', 'data-beacon-uid': 'default' }, '选择分类')), this.state.playlist.loading && h('view', { 'class': 'flex-boxlist flex-two' }, this.state.playlist.list.playlists.map(function (item, i13230) {
            return h('view', { 'class': 'tl_cnt cateplaylist', key: item.id }, h('navigator', { url: '../playlist/index?pid=' + item.id + '&from=toplist' }, h('view', { 'class': 'cover' }, h('image', { src: item.coverImgUrl + '?param=200y200', 'class': 'music_cover' }), h('view', { 'class': 'img_creator' }, h('image', { src: '../../assets/image/cm2_icn_userhead@2x.png', style: React.toStyle({ width: '24rpx', height: '24rpx' }, this.props, 'style28079' + i13230) }), item.creator.nickname), h('view', { 'class': 'img_playcount' }, h('image', { src: '../../assets/image/p0.png' }), item.playCount)), h('text', { 'class': 'name' }, item.name)));
        }, this)), (!this.state.playlist.loading || this.state.playlist.list.more) && h(React.useComponent, { is: "Loading", 'data-instance-uid': 'i371_90_' + 0 })), h('view', { 'class': 'tab_cnt', hidden: this.state.tabidx !== 2 }, this.state.djcate.loading ? h('view', null, h('swiper', { 'indicator-dots': 'true', circular: 'true' }, this.state.array123.map(function () {
            return h('swiper-item', { 'class': 'djcatewrap' }, this.state.djcate.categories.map(function (re) {
                return h('view', { bindtap: 'djradiotype', 'class': 'djcatelist' }, h('image', { src: "" + re.pic56x56Url, 'class': 'slide-image', width: '56', height: '56' }), h('view', null, re.name));
            }, this));
        }, this))) : h(React.useComponent, { is: "Loading", 'data-instance-uid': 'i400_26_' + 0 })), h('view', { 'class': 'tab_cnt', hidden: this.state.tabidx !== 3 }, this.state.sort.loading ? h('view', null, h('view', { 'class': 'listheader' }, '云音乐官方榜'), h('view', { 'class': 'flex-boxlist flex sortlist' }, this.state.sort.list.map(function (item) {
            return h('navigator', { url: "../playlist/index?pid=" + item.id + "&from=toplist", key: item.id }, h('view', { 'class': ' flexlist ' }, h('view', { 'class': 'cover flexleft fl-image' }, h('image', { 'class': 'album_cover', src: item.coverImgUrl + "?param=200y200" }), h('text', null, item.updateFrequency)), h('view', { 'class': 'flexlist tl_info' }, item.tracks.map(function (r, idx) {
                return h('view', { 'class': 'sort_fl_list ', key: idx }, idx + 1, '．', r.first, ' - ', r.second);
            }, this))));
        }, this))) : h(React.useComponent, { is: "Loading", 'data-instance-uid': 'i436_26_' + 0 }))), h('scroll-view', { 'class': 'cat-modal', id: 'catewrap', 'scroll-into-view': 'c2', 'scroll-y': 'true', hidden: this.state.cateisShow }, !this.state.cateisShow && h(React.useComponent, { togglePtype: this.togglePtype.bind(this), cateselect: this.cateselect, catelist: this.state.catelist, is: "CateModal", 'data-instance-uid': 'i449_22_' + 0 })));
    },
    classUid: 'c19909'
}, {});
Page(React.registerPage(P, 'pages/home/index'));

export default P;