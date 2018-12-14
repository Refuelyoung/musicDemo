import React from '../../ReactBu.js';
import url from '../../utils/bsurl';
let bsurl = url.bsurl;
import common from '../../utils/util';

let app = React.getApp();

function Playing() {
    this.state = {
        playing: false,
        loading: true,
        music: {},
        playtime: '00:00',
        duration: '00:00',
        percent: 0,
        lrc: [],
        commentscount: 0,
        lrcindex: 0,
        showlrc: false,
        disable: false,
        downloadPercent: 0,
        showminfo: false,
        showpinfo: false,
        showainfo: false,
        playlist: [],
        curpl: [],
        share: {
            title: '',
            des: ''
        }
    };
}

Playing = React.toClass(Playing, React.Component, {
    playmusic: function (id) {
        let that = this;
        React.api.request({
            url: bsurl + 'music/detail',
            data: {
                id: id
            },
            success: function (res) {

                let curplay = res.data.songs[0];
                app.globalData.curplay = curplay;
                that.setState({
                    start: 0,
                    share: {
                        id: id,
                        title: curplay.name,
                        br: res.data.privileges[0].maxbr,
                        des: (curplay.ar || curplay.artists)[0].name
                    },
                    music: curplay,
                    duration: common.formatduration(curplay.dt || curplay.duration),
                    loading: false
                });
                React.api.setNavigationBarTitle({ title: app.globalData.curplay.name });
                app.seekmusic(1);
            }
        });
    },
    componentWillMount: function () {
        let options = this.props.query;
        this.playmusic(options.id);
    },
    songheart: function () {},
    downmusic: function () {},
    playingtoggle: function () {
        common.toggleplay(this, app, function () {});
    },
    render: function () {
        var h = React.createElement;

        return h('view', { style: React.toStyle({ height: '100%' }, this.props, 'style4894') }, this.state.loading ? h(React.useComponent, { is: "Loading", 'data-instance-uid': 'i89_20_' + 0 }) : h('view', { id: 'playingpage', 'class': this.state.playing ? 'playing' : '' }, h('image', { src: '../../assets/image/cm2_default_play_bg-ip6@2x.jpg', id: 'coverbg' }), h('image', { id: 'playing-bg', 'class': 'blurbg', mode: 'aspectFill', src: (this.state.music.al.picUrl || this.state.music.album.picUrl) + "?param=600y600" }), h('view', { id: 'playing-zz', hidden: this.state.showlrc }, h('image', { src: '../../../assets/image/aag.png' })), h('view', { id: 'playing-main', hidden: this.state.showlrc }, h('image', { id: 'playingmainbg', src: '../../../assets/image/play.png' }), h('image', { src: (this.state.music.al.picUrl || this.state.music.album.picUrl) + "?param=200y200", bindtap: 'loadlrc', id: 'pmaincover' })), h(React.useComponent, { lrc: this.state.lrc, showlrc: this.state.showlrc, lrcindex: this.state.lrcindex, is: "Lrc", 'data-instance-uid': 'i112_24_' + 0 }), h('view', { id: 'playing-actwrap' }, !this.state.showlrc && h('view', { id: 'playing-info' }, h('view', { 'class': 'pi-act', onTap: this.songheart, 'data-tap-uid': 'e116_56', 'data-beacon-uid': 'default' }, this.state.music.st ? h('image', { src: '../../assets/image/cm2_play_icn_loved@2x.png' }) : h('image', { src: '../../assets/image/cm2_play_icn_love@2x.png' })), h('view', { 'class': 'pi-act', onTap: this.downmusic, 'data-tap-uid': 'e123_56', 'data-beacon-uid': 'default' }, h('image', { src: '../../assets/image/cm2_play_icn_dld@2x.png' })), h('view', { 'class': 'pi-act commentscount' }, h('navigator', { url: "../recommend/index?id=" + this.state.music.id + "&from=song" }, !this.state.commentscount ? h('image', { src: '../../assets/image/cm2_play_icn_cmt@2x.png' }) : h('image', { src: '../../assets/image/cm2_play_icn_cmt_num@2x.png' }), h('text', null, this.state.commentscount > 999 ? '999+' : this.state.commentscount))), h('view', { 'class': 'pi-act', bindtap: 'togminfo' }, h('image', { src: '../../assets/image/cm2_play_icn_more@2x.png' }))), h('view', { id: 'playingaction' }, h('view', { 'class': 'pa-saction', bindtap: 'playshuffle', hidden: this.state.shuffle != 1 }, h('image', { src: '../../assets/image/cm2_icn_loop@2x.png' })), h('view', { 'class': 'pa-saction', bindtap: 'playshuffle', hidden: this.state.shuffle != 2 }, h('image', { src: '../../assets/image/cm2_icn_one@2x.png' })), h('view', { 'class': 'pa-saction', bindtap: 'playshuffle', hidden: this.state.shuffle != 3 }, h('image', { src: '../../assets/image/cm2_icn_shuffle@2x.png' })), h('view', { 'class': 'pa-maction', 'data-other': '-1', bindtap: 'playother' }, h('image', { src: '../../assets/image/ajh.png' })), this.state.playing ? h('view', { 'class': 'pa-baction', onTap: this.playingtoggle, 'data-p': '{{playing}}', 'data-tap-uid': 'e157_60', 'data-beacon-uid': 'default' }, h('image', { id: 'pa-pause', src: '../../assets/image/ajd.png' })) : h('view', { 'class': 'pa-baction', onTap: this.playingtoggle, 'data-p': '{{playing}}', 'data-tap-uid': 'e161_60', 'data-beacon-uid': 'default' }, h('image', { id: 'pa-playing', src: '../../assets/image/ajf.png' })), h('view', { 'class': 'pa-maction', 'data-other': '1', bindtap: 'playother' }, h('image', { src: '../../assets/image/ajb.png' })), h('view', { 'class': 'pa-saction', bindtap: 'togpinfo' }, h('image', { src: '../../assets/image/cm2_icn_list@2x.png' }))))));
    },
    classUid: 'c8346'
}, {});
Page(React.registerPage(Playing, 'pages/playing/index'));

export default Playing;