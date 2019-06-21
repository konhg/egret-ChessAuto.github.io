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
     * 商店棋子展示
     * @author konhg
     * @description 用于商店里展示可出售棋子
     */
    var HeroShowItemRenderer = (function (_super) {
        __extends(HeroShowItemRenderer, _super);
        function HeroShowItemRenderer() {
            var _this = _super.call(this) || this;
            _this.delArr = [];
            _this.skinName = 'HeroShow';
            return _this;
        }
        HeroShowItemRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var d = this.data;
            this.visible = true;
            if (!d || d == null) {
                this.visible = false;
                return;
            }
            this.cost.text = "\u8D39\u7528\uFF1A" + d.cost;
            this.heroName.textFlow = new egret.HtmlTextParser().parser("<font color=" + game.Global.getQualityColor(d.cost) + ">" + d.name + "</font>");
            var str = '';
            for (var i = 0; i < d.types.length; i++) {
                var s = void 0;
                d.types[i + 1] ? s = d.types[i] + ',' : s = d.types[i];
                str += s;
            }
            this.occupation.text = "" + str;
            var model = game.GameController.this.model;
            var uplevelArr = []; //与当期商店棋子相同的棋子列表
            // let uplevelObjA: uplevelObj = {};//与当期商店棋子相同的棋子实例
            /**遍历已上阵数组 */
            for (var s = 0; s < model.battleHeros.length; s++) {
                for (var ds = 0; ds < model.battleHeros[s].length; ds++) {
                    if (!model.battleHeros[s][ds] || null == model.battleHeros[s][ds] || undefined == model.battleHeros[s][ds]) {
                        continue;
                    }
                    var a = model.battleHeros[s][ds];
                    if (a.ChessExample.heroInfo.name == d.name) {
                        var uplevelObjA = {};
                        uplevelObjA.name = a.ChessExample.heroInfo.name;
                        uplevelObjA.id = a.ChessExample.id;
                        uplevelObjA.star = a.ChessExample.heroStar;
                        uplevelArr.push(uplevelObjA);
                    }
                }
            }
            /**遍历未上阵数组 */
            for (var l = 0; l < model.notBattleHeros.length; l++) {
                if (!model.notBattleHeros[l] || null == model.notBattleHeros[l] || undefined == model.notBattleHeros[l]) {
                    continue;
                }
                var v = model.notBattleHeros[l];
                if (v.ChessExample.heroInfo.name == d.name) {
                    var uplevelObjB = {};
                    uplevelObjB.name = v.ChessExample.heroInfo.name;
                    uplevelObjB.id = v.ChessExample.id;
                    uplevelObjB.star = v.ChessExample.heroStar;
                    uplevelArr.push(uplevelObjB);
                }
            }
            var star1 = 0; //一级的数量
            var star2 = 0; //二级的数量
            var haveNum = 0;
            var delAr1 = [];
            var delAr2 = [];
            for (var k = 0; k < uplevelArr.length; k++) {
                var u = uplevelArr[k];
                if (u.star == 1) {
                    star1++;
                    haveNum += 1;
                    delAr1.push(u);
                }
                else if (u.star == 2) {
                    star2++;
                    haveNum += 3;
                    delAr2.push(u);
                }
                else if (u.star == 3) {
                    haveNum += 9;
                }
            }
            this.haveNum.text = haveNum == 0 ? '' : "\u5DF2\u62E5\u6709 " + haveNum;
            this.delArr = [];
            if (star1 >= 2 && star2 < 2) {
                this.star.text = "★★";
                /**生成删除列表 */
                this.delArr = this.delArr.concat([], delAr1);
            }
            else if (star1 >= 2 && star2 >= 2) {
                this.star.text = "★★★";
                /**生成删除列表 */
                this.delArr = this.delArr.concat(delAr1, delAr2);
            }
            else {
                this.star.text = "";
            }
        };
        return HeroShowItemRenderer;
    }(eui.ItemRenderer));
    game.HeroShowItemRenderer = HeroShowItemRenderer;
    __reflect(HeroShowItemRenderer.prototype, "game.HeroShowItemRenderer");
})(game || (game = {}));
//# sourceMappingURL=HeroShowItemRenderer.js.map