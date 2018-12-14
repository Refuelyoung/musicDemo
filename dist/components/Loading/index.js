import React from '../../ReactBu.js';

function Loading() {}

Loading = React.toClass(Loading, React.Component, {
    render: function () {
        var h = React.createElement;

        return h('view', { 'class': 'cntloading' }, this.props.text || '加载中...', h('view', null, h('text', { 'class': 'cl1' }), h('text', { 'class': 'cl2' }), h('text', { 'class': 'cl3' })));
    },
    classUid: 'c462'
}, {});
Component(React.registerComponent(Loading, 'Loading'));

export default Loading;