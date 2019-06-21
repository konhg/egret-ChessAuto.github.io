var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    /**
     * 对战商店实例
     * @author konhg
     * @description 对局内购买棋子的商店
     * @param model 当前数据类
     */
    var ShopPanel = (function (_super) {
        __extends(ShopPanel, _super);
        function ShopPanel(addHero, model) {
            var _this = _super.call(this) || this;
            _this.addHero = addHero;
            _this.model = model;
            _this.skinName = 'ShopSkin';
            return _this;
        }
        /**实例化页面添加监听方法 */
        ShopPanel.prototype.partAdded = function (partName, instance) {
            var _this = this;
            _super.prototype.partAdded.call(this, partName, instance);
            switch (partName) {
                case "refreshlist":
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        _this.model.currentShopHeros = game.Global.getHeros(_this.model.level);
                        _this['list'].dataProvider = new eui.ArrayCollection(_this.model.currentShopHeros);
                    }, this);
                    break;
                case "list":
                    // console.dir(this.model.currentShopHeros);
                    instance.itemRenderer = game.HeroShowItemRenderer;
                    instance.dataProvider = new eui.ArrayCollection(this.model.currentShopHeros);
                    instance.addEventListener(eui.ItemTapEvent.ITEM_TAP, function (e) {
                        // console.log(`点击了${(<GameHeroVO>e.item).name},第${e.itemIndex}项`);
                        _this.addHero(e.itemIndex, e.itemRenderer.delArr);
                        e.currentTarget.dataProvider = new eui.ArrayCollection(_this.model.currentShopHeros);
                    }, this);
                    break;
                case "closeBtn":
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        _this.parent.removeChild(_this);
                    }, this);
                    break;
                case "probabilityShow":
                    var str = '';
                    var a = game.Global.getRandomRatio(this.model.level);
                    for (var i = 0; i < a.length; i++) {
                        var d = 0;
                        if (a[i - 1]) {
                            d = a[i] - a[i - 1];
                        }
                        else {
                            d = a[i] - 0;
                        }
                        d <= 0 ? d = 0 : d;
                        str += "<font color=" + game.Global.getQualityColor(i + 1) + "> \u2605" + d + "% </font>";
                    }
                    instance.textFlow = new egret.HtmlTextParser().parser("<font>Lv" + this.model.level + ":</font>" + str);
                    break;
            }
        };
        ShopPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return ShopPanel;
    }(eui.Component));
    game.ShopPanel = ShopPanel;
    __reflect(ShopPanel.prototype, "game.ShopPanel");
})(game || (game = {}));
//# sourceMappingURL=ShopPanel.js.map