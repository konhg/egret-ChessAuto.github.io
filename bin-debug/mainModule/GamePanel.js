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
            _this.countDown = 0;
            _this.countDownText = '';
            _this.isShowPrompt = [];
            _this.isShowPromptbool = false; //显示日志的标记
            _this.skinName = "MainSkin";
            // this.countDown = Global.gameMoveTime;
            _this.timer = new egret.Timer(1000);
            _this.countDownText = "游戏即将开始:";
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
            _this.model.stateInNow = -1 /* NONE */;
            _this.model.currentShopHeros = game.Global.getHeros(_this.model.level);
            _this.timer.start();
            return _this;
        }
        /**
         * @author konhg
         * @description 显示操作日志，需要的地方调一下
         * @param txt 显示的文本
         */
        GamePanel.prototype.showPrompt = function (txt) {
            var _this = this;
            if (txt != '') {
                txt += "\n";
                this.isShowPrompt.push(txt);
            }
            if (this.isShowPrompt.length > 0 && this.isShowPromptbool == false) {
                this.isShowPromptbool = true;
                // (<eui.Scroller>this['scroler']).viewport.scrollV = ((<eui.Scroller>this['scroler']).viewport.contentHeight - (<eui.Scroller>this['scroler']).viewport.height);
                // if ((<eui.Scroller>this['scroler']).viewport.contentHeight > (<eui.Scroller>this['scroler']).viewport.height) {
                // 	(<eui.Scroller>this['scroler']).scrollPolicyV = 'ON';
                // }else{
                // 	(<eui.Scroller>this['scroler']).scrollPolicyV = 'OFF';
                // }
                game.GameTools.showText(this['prompt'], this.isShowPrompt[0], 120, function () {
                    _this.isShowPrompt.shift();
                    _this.isShowPromptbool = false;
                    _this.showPrompt('');
                });
            }
        };
        GamePanel.prototype.timerFunc = function (e) {
            this['Countdown'].textFlow = new egret.HtmlTextParser().parser("<font color=0xff0000>" + this.countDownText + "</font><font color=0x00ffff>" + this.countDown + "</font>");
            this.countDown--;
            this.refreshBattleArrayNumber();
            if (this.countDown < 0) {
                switch (this.model.stateInNow) {
                    case -1 /* NONE */:
                        return this.changeState(0 /* MOVETIME */);
                    case 0 /* MOVETIME */:
                        return this.changeState(1 /* MOVEWAIT */);
                    case 1 /* MOVEWAIT */:
                        return this.changeState(2 /* BATTLETIME */);
                    case 2 /* BATTLETIME */:
                        return this.changeState(0 /* MOVETIME */);
                }
            }
        };
        /**切换当前状态 */
        GamePanel.prototype.changeState = function (state) {
            switch (state) {
                case -1 /* NONE */:
                /**理论上只有开始游戏时会进入这个状态，不需要手动切到这个状态 */
                case 0 /* MOVETIME */:
                    this.countDown = game.Global.gameMoveTime;
                    this.model.stateInNow = 0 /* MOVETIME */;
                    this.countDownText = "准备阶段:";
                    if (this.model.isLockShop == false) {
                        this.model.currentShopHeros = game.Global.getHeros(this.model.level);
                        game.GameTools.showTips("\u5546\u5E97\u5237\u65B0\u4E86\u65B0\u7684\u82F1\u96C4", 1);
                        this.removeShopPanel();
                    }
                    this.model.setAllBattleChessTouchFalse(true);
                    return;
                case 1 /* MOVEWAIT */:
                    this.countDown = game.Global.gameMoveWaitTime;
                    this.model.stateInNow = 1 /* MOVEWAIT */;
                    this.countDownText = "锁定阶段:";
                    this.model.setAllBattleChessTouchFalse(false);
                    return;
                case 2 /* BATTLETIME */:
                    this.countDown = game.Global.gameBattleTime;
                    this.model.stateInNow = 2 /* BATTLETIME */;
                    this.countDownText = "战斗阶段:";
                    return;
            }
        };
        /**刷新上阵人数 */
        GamePanel.prototype.refreshBattleArrayNumber = function () {
            this['BattleArray'].textFlow = new egret.HtmlTextParser().parser("<font color=0xff0000>\u5DF2\u4E0A\u9635\u4EBA\u6570:</font><font color=0x00ff00>" + this.model.getBattleChessNumber() + "</font><font color=0xff0000>/" + this.model.population + "</font>");
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
                            game.GameTools.showTips('随机英雄失败', 1, true);
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
                game.GameTools.showTips('购买失败,未上阵棋子已满', 1, true);
                return;
            }
            this.showPrompt("\u8D2D\u4E70\u4E86" + hinfo.ChessExample.heroInfo.name);
            game.GameTools.showTips('购买成功', 1);
            this.model.currentShopHeros[index] = null;
        };
        /**升星功能 */
        GamePanel.prototype.upDataChess = function (arr) {
            var data = {};
            var isUplevel = false; /**是否已升星标记 */
            var dh = null;
            for (var c = 0; c < arr.length; c++) {
                data = arr[c];
                dh = this.model.findChessInBattleHerosById(data.id);
                if (dh != null && isUplevel == false) {
                    /**优先已上阵列表 */
                    break;
                }
                else {
                    dh = null;
                }
            }
            /**如果在已上阵列表内，优先升级以上阵列表的棋子 */
            if (dh == null) {
                for (var c = 0; c < arr.length; c++) {
                    data = arr[c];
                    var dn = this.model.findChessInNotBattleHerosById(data.id);
                    if (dn != null && isUplevel == false) {
                        isUplevel = true;
                        dn.ChessExample.heroStar = arr.length > 2 ? 3 : 2;
                        dn.ChessExample.refresh();
                        game.GameTools.showTips("\u6210\u529F\u5C06" + dn.ChessExample.heroInfo.name + "\u5347\u81F3" + dn.ChessExample.heroStar + "\u661F", 1);
                        this.showPrompt(dn.ChessExample.heroInfo.name + " \u5347\u81F3" + dn.ChessExample.heroStar + "\u661F");
                    }
                    else {
                        dn.ChessExample.removeThis();
                        this.model.notBattleHeros[dn.targetX] = null;
                    }
                }
            }
            else {
                for (var c = 0; c < arr.length; c++) {
                    data = arr[c];
                    var db = this.model.findChessInBattleHerosById(data.id);
                    if (db != null && isUplevel == false) {
                        isUplevel = true;
                        db.ChessExample.heroStar = arr.length > 2 ? 3 : 2;
                        db.ChessExample.refresh();
                        game.GameTools.showTips("\u6210\u529F\u5C06" + db.ChessExample.heroInfo.name + "\u5347\u81F3" + db.ChessExample.heroStar + "\u661F", 1);
                        this.showPrompt(db.ChessExample.heroInfo.name + " \u5347\u81F3" + db.ChessExample.heroStar + "\u661F");
                    }
                    else {
                        var da = this.model.findChessInNotBattleHerosById(data.id);
                        if (da != null) {
                            da.ChessExample.removeThis();
                            this.model.notBattleHeros[da.targetX] = null;
                        }
                        else {
                            db.ChessExample.removeThis();
                            this.model.battleHeros[db.targetX][db.targetY] = null;
                        }
                    }
                }
            }
        };
        /**添加一个棋子到未上阵列显示容器 */
        GamePanel.prototype.addHeroToBattleGroup = function (heroInfo, id, star) {
            var h = new game.Hero(heroInfo, id, star, this.model, this.moveChessToBattleGroup.bind(this), this.moveChessToNotBattleGroup.bind(this), this.moveChessToDeletegroup.bind(this));
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
        /**移动棋子，移动到删除列表 */
        GamePanel.prototype.moveChessToDeletegroup = function (id, name) {
            if (this.model.delChess(id)) {
                this.showPrompt("\u6210\u529F\u5220\u9664 " + name + " ");
            }
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
        return GamePanel;
    }(eui.Component));
    game.GamePanel = GamePanel;
    __reflect(GamePanel.prototype, "game.GamePanel");
})(game || (game = {}));
//# sourceMappingURL=GamePanel.js.map