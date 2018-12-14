import React from "../../ReactBu.js";

function CateModal() {
    this.state = {
        categories: []
    };
}

CateModal = React.toClass(CateModal, React.Component, {
    togglePtype: function () {
        this.props.togglePtype();
    },
    cateselect: function () {},
    componentWillMount: function () {
        let arr = Object.values(this.props.catelist.res.categories);
        this.setState({
            categories: arr
        });
    },
    render: function () {
        var h = React.createElement;

        return h("view", null, h("view", { "class": "close", onTap: this.togglePtype, id: "closecatelist", "data-tap-uid": "e28_35", "data-beacon-uid": "default" }), h("view", { id: "cateall", onTap: this.cateselect, "class": 'cl_list ' + (this.props.catelist.checked.name == this.props.catelist.res.all.name ? 'checked' : ''), "data-tap-uid": "e31_20", "data-beacon-uid": "default" }, this.props.catelist.checked.name == this.props.catelist.res.all.name && h("text", null, this.props.catelist.res.all.name)), this.state.categories.map(function (item, index) {
            return h("view", { "class": "catelist", id: 'c' + index, key: item }, h("view", { "class": "cl_list cl_ico" }, h("image", { src: '../../assets/image/cm2_discover_icn_' + index + '@2x.png' }), h("text", null, item)), this.props.catelist.res.sub.map(function (re) {
                return h("view", { "class": 'cl_list ' + (this.props.catelist.checked.name === re.name ? 'checked' : '') }, re.hot && h("text", { "class": "cl_ico_hot cl_ico" }), this.props.catelist.checked.name === re.name && h("text", { "class": "cl_ico_checked cl_ico" }), re.name);
            }, this));
        }, this));
    },
    classUid: "c2543"
}, {});
Component(React.registerComponent(CateModal, "CateModal"));

export default CateModal;