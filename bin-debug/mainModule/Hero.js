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
     * 单个棋子实例
     * @author konhg
     * @description 实例化单个棋子，继承eui.Panel，可拖拽
     * @param heroInfo 棋子数据
     * @param id 棋子id, 唯一
     * @param heroStar 棋子的星级, 不唯一
     * @param moveChessToBattleGroup 拖拽到战斗列表方法
     * @param moveChessToNotBattleGroup 拖拽到未战斗列表方法
     * @param moveChessToDeletegroup 拖拽到删除列表方法
     * @param model 数据类
     */
    var Hero = (function (_super) {
        __extends(Hero, _super);
        function Hero(heroInfo, id, heroStar, model, moveChessToBattleGroup, moveChessToNotBattleGroup, moveChessToDeletegroup) {
            var _this = _super.call(this) || this;
            _this.heroInfo = heroInfo;
            _this.id = id;
            _this.heroStar = heroStar;
            _this.model = model;
            _this.moveChessToBattleGroup = moveChessToBattleGroup;
            _this.moveChessToNotBattleGroup = moveChessToNotBattleGroup;
            _this.moveChessToDeletegroup = moveChessToDeletegroup;
            _this.skinName = "HeroBattle";
            return _this;
        }
        Hero.prototype.refresh = function () {
            this['star'].text = this.heroStar + '';
        };
        Hero.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            switch (partName) {
                case 'name':
                    instance.textFlow = new egret.HtmlTextParser().parser("<font color=" + game.Global.getQualityColor(this.heroInfo.cost) + ">" + this.heroInfo.name + "</font>");
                    break;
                case 'star':
                    instance.text = this.heroStar + '';
                    break;
            }
        };
        /**设置是否可拖拽 */
        Hero.prototype.settouch = function (bool) {
            this.touchChildren = bool;
        };
        Hero.prototype.onTouchBegin = function (event) {
            _super.prototype.onTouchBegin.call(this, event);
            this.pointX = this.x;
            this.pointY = this.y;
            this.parent.setChildIndex(this, this.parent.numChildren - 1);
            this.parent.parent.setChildIndex(this.parent, this.parent.parent.numChildren - 1);
            /**生成一个小tip */
            var tips = new eui.Component();
            tips.name = 'heroTips';
            tips.skinName = 'HeroTips';
            tips['heroName'].text = this.heroInfo.name;
            tips['heroName'].textColor = game.Global.getQualityColor(this.heroInfo.cost);
            tips['atk'].text = "攻击力:" + this.heroInfo.atk;
            tips['ftk'].text = "防御力:" + this.heroInfo.ftk;
            this.addChild(tips);
            tips.x = 0;
            tips.y = -tips.height;
            tips = null;
        };
        Hero.prototype.onTouchMove = function (event) {
            _super.prototype.onTouchMove.call(this, event);
        };
        Hero.prototype.onTouchEnd = function (event) {
            _super.prototype.onTouchEnd.call(this, event);
            if (this.getChildByName('heroTips') != null) {
                this.removeChild(this.getChildByName('heroTips'));
            }
            var battleGroup = this.parent.parent['battlegroup'];
            var battleGroupX = battleGroup.x;
            var battleGroupY = battleGroup.y;
            var battleGroupWidth = battleGroup.width;
            var battleGroupHeight = battleGroup.height;
            var notBattleGroup = this.parent.parent['notbattlegroup'];
            var notbattleGroupX = notBattleGroup.x;
            var notbattleGroupY = notBattleGroup.y;
            var notbattleGroupWidth = notBattleGroup.width;
            var notbattleGroupHeight = notBattleGroup.height;
            var deletegroup = this.parent.parent['deletegroup'];
            var deletegroupX = deletegroup.x;
            var deletegroupY = deletegroup.y;
            var deletegroupWidth = deletegroup.width;
            var deletegroupHeight = deletegroup.height;
            if (event.stageX >= deletegroupX && event.stageX <= (deletegroupX + deletegroupWidth) && event.stageY >= deletegroupY && event.stageY <= (deletegroupY + deletegroupHeight)) {
                this.moveChessToDeletegroup(this.id, this.heroInfo.name);
                return;
            }
            if (event.stageX >= battleGroupX && event.stageX <= (battleGroupX + battleGroupWidth) && event.stageY >= battleGroupY && event.stageY <= (battleGroupY + battleGroupHeight)) {
                //扔到已上阵列表,移动格子
                var targetPoint = battleGroup.globalToLocal(event.stageX, event.stageY);
                var targetX = Math.abs(Math.floor(targetPoint.x / game.Global.chessWidth));
                var targetY = Math.abs(Math.floor(targetPoint.y / game.Global.chessHeight));
                if (targetY > 3 && (this.model.battleHeros[targetX][targetY] == null || this.model.battleHeros[targetX][targetY] == undefined)) {
                    if (this.model.stateInNow != 0 /* MOVETIME */ || (this.model.findChessInBattleHerosById(this.id) == null && this.model.getBattleChessNumber() >= this.model.population)) {
                        //还原坐标
                        this.x = this.pointX;
                        this.y = this.pointY;
                        return;
                    }
                    var hX = targetX * game.Global.chessWidth;
                    var hY = targetY * game.Global.chessHeight;
                    this.moveChessToBattleGroup(this.id, targetX, targetY, hX, hY, this);
                    return;
                }
            }
            else if (event.stageX >= notbattleGroupX && event.stageX <= (notbattleGroupX + notbattleGroupWidth) && event.stageY >= notbattleGroupY && event.stageY <= (notbattleGroupY + notbattleGroupHeight)) {
                //扔到未上阵列表，移动格子
                var targetPoint = notBattleGroup.globalToLocal(event.stageX, event.stageY);
                var targetX = Math.abs(Math.floor(targetPoint.x / game.Global.chessWidth));
                if (this.model.notBattleHeros[targetX] == null || this.model.notBattleHeros[targetX] == undefined) {
                    var hX = targetX * game.Global.chessWidth;
                    this.moveChessToNotBattleGroup(this.id, targetX, 0, hX, 0, this);
                    return;
                }
            }
            //还原坐标
            this.x = this.pointX;
            this.y = this.pointY;
        };
        /**移除自己 */
        Hero.prototype.removeThis = function () {
            this.close();
        };
        return Hero;
    }(eui.Panel));
    game.Hero = Hero;
    __reflect(Hero.prototype, "game.Hero");
})(game || (game = {}));
//# sourceMappingURL=Hero.js.map