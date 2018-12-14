import React from '../../ReactBu.js';

function PlayListComponent() {}

PlayListComponent = React.toClass(PlayListComponent, React.Component, {
    render: function () {
        var h = React.createElement;

        return h('view', null, this.props.privileges ? h('view', null, this.props.list.map(function (re, idx) {
            return h('view', { key: re.id, 'class': 'songs ' + (re.id === this.props.curplay ? 'cur' : '') + (this.props.privileges[idx].st >= 0 ? '' : 'disabled') }, h('navigator', { 'hover-class': this.props.privileges[idx].st < 0 ? 'none' : '', url: this.props.privileges[idx].st >= 0 ? '../playing/index?id=' + re.id + '&br=' + this.props.privileges.maxbr : '', bindtap: 'playmusic' }, h('view', { 'class': 'flexlist flex-center' }, h('view', { 'class': 'flexleft flexnum ' }, re.id === this.props.curplay ? h('image', { src: '../../aseets/image/aal.png', style: React.toStyle({ width: '36rpx' }, this.props, 'style3404' + idx) }, 'image') : h('view', null, h('text', { 'class': this.props.toplist && idx < 3 ? 'topindex' : '' }, idx + 1))), h('view', { 'class': 'flexlist' }, h('view', { 'class': 'flexmain' }, h('view', null, re.name, re.alia.length && h('text', null, '（', re.alia[0], '）')), h('view', { 'class': 'relistdes' }, re.ar[0].name, '-', re.al.name)), re.mv != 0 && h('view', { 'class': 'flexact' }, h('view', { 'class': 'fa_list fa_mv' }, h('navigator', { url: '../mv/index?id={{re.mv}}' }, h('image', { src: '../../assets/image/l0.png', mode: 'widthFix' }))))))));
        }, this)) : h('view', null, this.props.list.map(function (re, idx) {
            return h('view', { key: re.id, 'class': 'songs ' + (re.id === this.props.curplay ? 'cur' : '') + (re.st == -1 ? 'disabled' : '') + re.id }, h('navigator', { 'hover-class': re.st == -1 ? 'none' : '', url: re.st != -1 ? '../playing/index?id=' + re.id + '&br=' : '', bindtap: 'playmusic' }, h('view', { 'class': 'displayFlex' }, h('view', { 'class': 'displayFlexLeft' }, re.id === this.props.curplay ? h('image', { src: '../../aseets/image/aal.png', style: React.toStyle({ width: '36rpx' }, this.props, 'style10902' + idx) }, 'image') : h('text', { 'class': this.props.toplist && idx < 3 ? 'topindex' : '' }, idx + 1)), h('view', { 'class': 'displayFlexRight' }, h('view', null, h('view', { 'class': 'displayFlexRightTop' }, re.name, re.alia.length && h('text', null, '（', re.alia[0], '）')), h('view', { 'class': 'displayFlexRightBottom' }, re.ar[0].name, '-', re.al.name)), re.mv != 0 && h('view', { 'class': 'flexact' }, h('view', { 'class': 'fa_list fa_mv' }, h('navigator', { url: '../mv/index?id={{re.mv}}' }, h('image', { src: '../../assets/image/l0.png', mode: 'widthFix' }))))))));
        }, this)));
    },
    classUid: 'c7769'
}, {});
Component(React.registerComponent(PlayListComponent, 'PlayListComponent'));

export default PlayListComponent;