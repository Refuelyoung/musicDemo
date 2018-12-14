import React from '../../ReactBu.js';

function Recommend() {}

Recommend = React.toClass(Recommend, React.Component, {
    render: function () {
        var h = React.createElement;

        return h('view', null, '评论页面');
    },
    classUid: 'c360'
}, {});
Page(React.registerPage(Recommend, 'pages/recommend/index'));

export default Recommend;