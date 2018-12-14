import React from '../../ReactBu.js';

function Lrc() {}

Lrc = React.toClass(Lrc, React.Component, {
    loadlrc: function () {},
    render: function () {
        var h = React.createElement;

        return h('view', { id: 'lrclist', 'class': this.props.showlrc ? '' : 'playinghidden',
            onTap: this.loadlrc, 'data-tap-uid': 'e12_80', 'data-beacon-uid': 'default' }, h('view', { id: 'lrcwrap', style: React.toStyle({ transform: 'translateY(-' + this.props.lrcindex * 100 / 6 + '%)' }, this.props, 'style745') }, this.props.lrc.nolyric && h('view', { 'class': 'notext' }, '纯音乐，无歌词'), h('view', null, h('text', null)), h('view', null, h('text', null)), h('view', null, h('text', null)), h('view', null, h('text', null)), h('view', null, h('text', null)), h('view', null, h('text', null))));
    },
    classUid: 'c1152'
}, {});
Component(React.registerComponent(Lrc, 'Lrc'));

export default Lrc;