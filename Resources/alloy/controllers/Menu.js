function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.menuView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#29363e",
        layout: "vertical",
        id: "menuView"
    });
    $.addTopLevelView($.__views.menuView);
    $.__views.headerView = Ti.UI.createView({
        left: 0,
        width: Alloy.CFG.menuWidth,
        height: "50dp",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#d62e04",
                offset: 0
            }, {
                color: "#781a01",
                offset: 1
            } ]
        },
        id: "headerView"
    });
    $.__views.menuView.add($.__views.headerView);
    $.__views.titleLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        text: L("app_name"),
        id: "titleLabel"
    });
    $.__views.headerView.add($.__views.titleLabel);
    $.__views.menuList = Ti.UI.createTableView({
        left: 0,
        width: Alloy.CFG.menuWidth,
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        separatorColor: "#1c252b",
        id: "menuList"
    });
    $.__views.menuView.add($.__views.menuList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    (function() {
        Ti.App.Properties.setBool("menuOpen", !1);
        var data = [ {
            item: L("event_title"),
            icon: "📅",
            rowId: 1
        }, {
            item: L("speaker_title"),
            icon: "👥",
            rowId: 2
        }, {
            item: L("partner_title"),
            icon: "👍",
            rowId: 3
        }, {
            item: L("news_title"),
            icon: "📰",
            rowId: 4
        }, {
            item: L("twitter_title"),
            icon: "",
            rowId: 5
        }, {
            item: L("about_title"),
            icon: "",
            rowId: 6
        } ], rowData = [];
        for (var i = 0; i < data.length; i++) {
            var items = {
                item: data[i].item,
                icon: data[i].icon,
                rowId: data[i].rowId
            }, row = Alloy.createController("MenuRow", items).getView();
            rowData.push(row);
        }
        $.menuList.data = rowData;
        $.menuList.addEventListener("click", function(e) {
            var rowId = e.rowData.title;
            if (rowId === 1) {
                Ti.API.info("[---Menu---] fireEvent: JUG:menuEvent");
                Ti.App.fireEvent("JUG:menuEvent");
            } else if (rowId === 2) {
                Ti.API.info("[---Menu---] fireEvent: JUG:menuSpeaker");
                Ti.App.fireEvent("JUG:menuSpeaker");
            } else if (rowId === 3) {
                Ti.API.info("[---Menu---] fireEvent: JUG:menuPartner");
                Ti.App.fireEvent("JUG:menuPartner");
            } else if (rowId === 4) {
                Ti.API.info("[---Menu---] fireEvent: JUG:menuNews");
                Ti.App.fireEvent("JUG:menuNews");
            } else if (rowId === 5) {
                Ti.API.info("[---Menu---] fireEvent: JUG:menuTwitter");
                Ti.App.fireEvent("JUG:menuTwitter");
            } else if (rowId === 6) {
                Ti.API.info("[---Menu---] fireEvent: JUG:menuAbout");
                Ti.App.fireEvent("JUG:menuAbout");
            }
            Ti.App.fireEvent("JUG:hideMenu");
        });
    })();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;