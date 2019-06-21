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
    var GamePanel = (function (_super) {
        __extends(GamePanel, _super);
        function GamePanel(model) {
            var _this = _super.call(this) || this;
            _this.model = model;
            _this.countDown = 15;
            _this.skinName = "MainSkin";
            _this.countDown = game.Global.refreshShopTime;
            _this.timer = new egret.Timer(1000);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
            _this.model.currentShopHeros = game.Global.getHeros(_this.model.level);
            _this.timer.start();
            return _this;
        }
        GamePanel.prototype.timerFunc = function (e) {
            this['Countdown'].textFlow = new egret.HtmlTextParser().parser("<font color=0xff0000>\u5237\u65B0\u5012\u8BA1\u65F6:</font><font color=0x00ffff>" + this.countDown + "</font>");
            this.countDown--;
            if (this.countDown < 0) {
                this.countDown = game.Global.refreshShopTime;
                this.model.currentShopHeros = game.Global.getHeros(this.model.level);
                this.removeShopPanel();
                return;
            }
        };
        /**移除商店页面 */
        GamePanel.prototype.removeShopPanel = function () {
            if (this['shopgroup'].getChildByName('shoppanel')) {
                this['shopgroup'].removeChild(this['shopgroup'].getChildByName('shoppanel'));
            }
        };
        /**显示商店 */
        GamePanel.prototype.showShopPanel = function () {
            this.removeShopPanel();
            var shopPanel = new game.ShopPanel(this.addHero.bind(this), this.model);
            shopPanel.name = 'shoppanel';
            this['shopgroup'].addChild(shopPanel);
            this.setChildIndex(this['shopgroup'], this.numChildren - 1);
            shopPanel = null;
        };
        /**实例化页面添加监听方法 */
        GamePanel.prototype.partAdded = function (partName, instance) {
            var _this = this;
            _super.prototype.partAdded.call(this, partName, instance);
            switch (partName) {
                case "shopBtn":
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        if (_this.model.currentShopHeros == null) {
                            console.log('随机英雄失败');
                            return;
                        }
                        _this.showShopPanel();
                    }, this);
                    break;
                case "closeBtn":
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        game.GameController.this.closePanel();
                    }, this);
                    break;
                case 'battlegroup':
                    for (var i = 0; i < this.model.checkerboard.length; i++) {
                        for (var j = 0; j < this.model.checkerboard[i].length; j++) {
                            var group = new eui.Group();
                            group.width = game.Global.chessWidth;
                            group.height = game.Global.chessHeight;
                            instance.addChild(group);
                            group.x = game.Global.chessWidth * j;
                            group.y = game.Global.chessHeight * i;
                            var rect = new eui.Rect(game.Global.chessWidth, game.Global.chessHeight);
                            switch (this.model.checkerboard[i][j]['id']) {
                                case 1:
                                    rect.fillColor = 0x00ff00;
                                    break;
                                case 2:
                                    rect.fillColor = 0xff0000;
                                    break;
                                case 3:
                                    rect.fillColor = 0x000000;
                                    break;
                                case 4:
                                    rect.fillColor = 0xffffff;
                                    break;
                            }
                            group.addChild(rect);
                            rect.verticalCenter = 0;
                            rect.horizontalCenter = 0;
                            if (this.model.checkerboard[i][j]['text'] != '') {
                                var text = new eui.Label(this.model.checkerboard[i][j]['text']);
                                group.addChild(text);
                                text.size = 50;
                                text.bold = true;
                                text.textColor = 0xff0000;
                                text.fontFamily = "SimHei";
                                text.verticalCenter = 0;
                                text.horizontalCenter = 0;
                            }
                        }
                    }
                    break;
                case "notbattlegroup":
                    for (var i = 0; i < this.model.checkerboardNotBattle.length; i++) {
                        var group = new eui.Group();
                        group.width = game.Global.chessWidth;
                        group.height = game.Global.chessHeight;
                        instance.addChild(group);
                        group.x = game.Global.chessWidth * i;
                        var rect = new eui.Rect(game.Global.chessWidth, game.Global.chessHeight);
                        switch (this.model.checkerboardNotBattle[i]['id']) {
                            case 1:
                                rect.fillColor = 0x00ff00;
                                break;
                            case 2:
                                rect.fillColor = 0xff0000;
                                break;
                            case 3:
                                rect.fillColor = 0x000000;
                                break;
                            case 4:
                                rect.fillColor = 0xffffff;
                                break;
                        }
                        group.addChild(rect);
                        rect.verticalCenter = 0;
                        rect.horizontalCenter = 0;
                        if (this.model.checkerboardNotBattle[i]['text'] != '') {
                            var text = new eui.Label(this.model.checkerboardNotBattle[i]['text']);
                            group.addChild(text);
                            text.size = 50;
                            text.bold = true;
                            text.textColor = 0xff0000;
                            text.fontFamily = "SimHei";
                            text.verticalCenter = 0;
                            text.horizontalCenter = 0;
                        }
                    }
                    break;
            }
        };
        /**
         * 添加商店购买的棋子到未上阵列表
         * 购买成功失败的判断方法
         */
        GamePanel.prototype.addHero = function (index, delArr) {
            if (delArr.length > 0) {
                this.model.currentShopHeros[index] = null;
                this.upDataChess(delArr);
                return;
            }
            var hinfo = {};
            for (var i = 0; i < this.model.notBattleHeros.length; i++) {
                if (this.model.notBattleHeros[i] == null || this.model.notBattleHeros[i] == undefined || !this.model.notBattleHeros[i]) {
                    var id = game.Global.chessID++;
                    hinfo.ChessExample = this.addHeroToBattleGroup(this.model.currentShopHeros[index], id, 1);
                    hinfo.targetX = i;
                    hinfo.targetY = 0;
                    this.model.notBattleHeros[i] = hinfo;
                    break;
                }
            }
            if (!hinfo.ChessExample) {
                console.log("%c\u8D2D\u4E70\u5931\u8D25,\u672A\u4E0A\u9635\u68CB\u5B50\u5DF2\u6EE1", "color:blue;font-size:30px");
                return;
            }
            console.log("%c\u8D2D\u4E70\u6210\u529F,\u52A0\u5165\u672A\u4E0A\u9635\u68CB\u5B50\u5217\u8868", "color:blue;font-size:30px");
            console.table(this.model.notBattleHeros);
            // this.addHeroToNotBattleGroup(hinfo);
            this.model.currentShopHeros[index] = null;
        };
        /**升星功能 */
        GamePanel.prototype.upDataChess = function (arr) {
            var _this = this;
            var data = {};
            /**查询是否在已上阵列表 */
            var findInBattle = function (id) {
                var dx = null;
                for (var i = 0; i < _this.model.battleHeros.length; i++) {
                    for (var j = 0; j < _this.model.battleHeros[i].length; j++) {
                        if (!_this.model.battleHeros[i][j] || null == _this.model.battleHeros[i][j] || undefined == _this.model.battleHeros[i][j]) {
                            continue;
                        }
                        dx = _this.model.battleHeros[i][j];
                        if (dx.ChessExample.id == id) {
                            return dx;
                        }
                    }
                }
                return null;
            };
            /**查询是否在未上阵列表 */
            var findInNotBattle = function (id) {
                for (var j = 0; j < _this.model.notBattleHeros.length; j++) {
                    var dy = null;
                    if (!_this.model.notBattleHeros[j] || null == _this.model.notBattleHeros[j] || undefined == _this.model.notBattleHeros[j]) {
                        continue;
                    }
                    dy = _this.model.notBattleHeros[j];
                    if (dy.ChessExample.id == id) {
                        return dy;
                    }
                }
                return null;
            };
            var isUplevel = false; /**是否已升星标记 */
            var dh = null;
            for (var c = 0; c < arr.length; c++) {
                data = arr[c];
                if (findInBattle(data.id) != null && isUplevel == false) {
                    dh = findInBattle(data.id); /**优先已上阵列表 */
                    break;
                }
            }
            /**如果在已上阵列表内，优先升级以上阵列表的棋子 */
            if (dh == null) {
                for (var c = 0; c < arr.length; c++) {
                    data = arr[c];
                    var dn = findInNotBattle(data.id);
                    if (dn != null && isUplevel == false) {
                        isUplevel = true;
                        dn.ChessExample.heroStar = arr.length > 2 ? 3 : 2;
                        dn.ChessExample.refresh();
                    }
                    else {
                        this.removeHeroToBattleGroupOrNotBattleGroup(dn.ChessExample.id, dn.targetX, dn.targetY);
                    }
                }
            }
            else {
                for (var c = 0; c < arr.length; c++) {
                    data = arr[c];
                    var db = findInBattle(data.id);
                    if (db != null && isUplevel == false) {
                        isUplevel = true;
                        db.ChessExample.heroStar = arr.length > 2 ? 3 : 2;
                        db.ChessExample.refresh();
                    }
                    else {
                        var db_1 = findInBattle(data.id);
                        if (db_1) {
                            this.removeHeroToBattleGroupOrNotBattleGroup(db_1.ChessExample.id, db_1.targetX, db_1.targetY);
                        }
                        else {
                            var dj = findInNotBattle(data.id);
                            this.removeHeroToBattleGroupOrNotBattleGroup(dj.ChessExample.id, dj.targetX, dj.targetY);
                        }
                    }
                }
            }
        };
        /**添加一个棋子到未上阵列显示容器 */
        GamePanel.prototype.addHeroToBattleGroup = function (heroInfo, id, star) {
            var h = new game.Hero(heroInfo, id, star, this.model, this.moveChessToBattleGroup.bind(this), this.moveChessToNotBattleGroup.bind(this));
            h.name = id + '';
            this['notbattlegroup'].addChild(h);
            for (var i = 0; i < this.model.notBattleHeros.length; i++) {
                if (this.model.notBattleHeros[i] == null) {
                    h.x = game.Global.chessWidth * (i);
                    h.y = 0;
                    break;
                }
            }
            return h;
        };
        /**移动棋子，移动到已上阵列表 */
        GamePanel.prototype.moveChessToBattleGroup = function (id, targetX, targetY, hX, hY, chess) {
            this['battlegroup'].addChild(chess);
            chess.x = hX;
            chess.y = hY;
            this.model.moveNotBattleHerosToBattleHeros(id, targetX, targetY);
        };
        /**移动棋子，移动到未上阵列表 */
        GamePanel.prototype.moveChessToNotBattleGroup = function (id, targetX, targetY, hX, hY, chess) {
            this['notbattlegroup'].addChild(chess);
            chess.x = hX;
            chess.y = hY;
            this.model.moveBattleHerosToNotBattleHeros(id, targetX, targetY);
        };
        /**从界面上移除一个棋子
         * @param id 生成棋子时的唯一id
         */
        GamePanel.prototype.removeHeroToBattleGroupOrNotBattleGroup = function (id, targetX, targetY) {
            var i = String(id);
            if (this['notbattlegroup'].getChildByName(i) != null) {
                this.model.notBattleHeros[targetX] = null;
                this['notbattlegroup'].removeChild(this['notbattlegroup'].getChildByName(i));
            }
            if (this['battlegroup'].getChildByName(i) != null) {
                this.model.battleHeros[targetX][targetY] = null;
                this['battlegroup'].removeChild(this['battlegroup'].getChildByName(i));
            }
        };
        return GamePanel;
    }(eui.Component));
    game.GamePanel = GamePanel;
    __reflect(GamePanel.prototype, "game.GamePanel");
})(game || (game = {}));
//# sourceMappingURL=GamePanel.js.map