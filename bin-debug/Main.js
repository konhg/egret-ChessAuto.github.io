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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var game;
(function (game) {
    var Global = (function () {
        function Global() {
        }
        /**游戏移动时间 */
        Global.gameMoveTime = 10;
        /**游戏移动等待时间 */
        Global.gameMoveWaitTime = 3;
        /**游戏战斗时间 */
        Global.gameBattleTime = 10;
        /**棋子的宽 */
        Global.chessWidth = 62.5;
        /**棋子的高 */
        Global.chessHeight = 62.5;
        /**生成棋子的索引值
         * 每次在商店购买棋子都生成一个不重复的id
         */
        Global.chessID = 0;
        /**未上阵列表最大数量 */
        Global.notBattleNumberMax = 8;
        /**品质对应颜色 */
        Global.getQualityColor = function (index) {
            var a = [null, 0xb8b5b0, 0x75b6fa, 0x8887d5, 0xf15bbc, 0xffa72f];
            return a[index];
        };
        /**棋子数组 */
        Global.heros = [
            [
                new game.GameHeroVO("斧王", ["兽人", "战士"], 100, 100, 1),
                new game.GameHeroVO("巨牙海民", ["野兽", "兽人"], 100, 100, 1),
                new game.GameHeroVO("魅惑魔女", ["野兽", "德鲁伊"], 100, 100, 1),
                new game.GameHeroVO("赏金猎人", ["赏金猎人", "刺客"], 100, 100, 1),
                new game.GameHeroVO("食人魔法师", ["食人魔", "法师"], 100, 100, 1),
                new game.GameHeroVO("蝙蝠骑士", ["巨魔", "骑士"], 100, 100, 1),
                new game.GameHeroVO("敌法师", ["精灵", "恶魔猎手"], 100, 100, 1),
                new game.GameHeroVO("发条技师", ["工匠", "地精"], 100, 100, 1),
            ],
            [
                new game.GameHeroVO("水晶室女", ["人类", "法师"], 100, 100, 2),
                new game.GameHeroVO("树精", ["精灵", "德鲁伊"], 100, 100, 2),
                new game.GameHeroVO("剑圣", ["兽人", "战士"], 100, 100, 2),
                new game.GameHeroVO("兽王", ["兽人", "猎人"], 100, 100, 2),
                new game.GameHeroVO("伐木机", ["地精", "工匠"], 100, 100, 2),
            ],
            [
                new game.GameHeroVO("影魔", ["恶魔", "术士"], 100, 100, 3),
                new game.GameHeroVO("狼人", ["战士", "人类"], 100, 100, 3),
                new game.GameHeroVO("闪电幽魂", ["元素", "法师"], 100, 100, 3),
                new game.GameHeroVO("剧毒术士", ["野兽", "术士"], 100, 100, 3),
                new game.GameHeroVO("风行者", ["精灵", "猎人"], 100, 100, 3),
            ],
            [
                new game.GameHeroVO("光之守卫", ["人类", "法师"], 100, 100, 4),
                new game.GameHeroVO("末日使者", ["恶魔", "战士"], 100, 100, 4),
                new game.GameHeroVO("圣堂刺客", ["刺客", "精灵"], 100, 100, 4),
                new game.GameHeroVO("龙骑士", ["人类", "龙", "骑士"], 100, 100, 4),
                new game.GameHeroVO("利爪德鲁伊", ["野兽", "德鲁伊"], 100, 100, 4),
            ],
            [
                new game.GameHeroVO("矮人直升机", ["工匠", "矮人"], 100, 100, 5),
                new game.GameHeroVO("巫妖", ["亡灵", "法师"], 100, 100, 5),
                new game.GameHeroVO("潮汐猎人", ["猎人", "娜迦"], 100, 100, 5),
                new game.GameHeroVO("谜团", ["术士", "元素"], 100, 100, 5),
                new game.GameHeroVO("地精工程师", ["地精", "工匠"], 100, 100, 5),
            ],
        ];
        /**获得对应等级的概率
         * 下标i减去下标i-1的值，就是概率，i=0就减去0，值是负数就是0
         * 举例 [20, 50, 80, 100, 0]
         * 一星概率20-0等于20%
         * 二星概率50-20等于30%
         * 三星概率80-50等于30%
         * 四星概率100-80等于20%
         * 五星概率0-100小于0都是0%
         */
        Global.getRandomRatio = function (level) {
            switch (level) {
                case 1:
                    return [100, 0, 0, 0, 0];
                case 2:
                    return [70, 100, 0, 0, 0];
                case 3:
                    return [50, 90, 100, 0, 0];
                case 4:
                    return [40, 80, 100, 0, 0];
                case 5:
                    return [35, 70, 92, 100, 0];
                case 6:
                    return [25, 60, 80, 100, 0];
                case 7:
                    return [20, 50, 80, 100, 0];
                case 8:
                    return [20, 50, 70, 99, 100];
                case 9:
                    return [20, 50, 70, 92, 100];
                case 10:
                    return [15, 40, 60, 85, 100];
            }
            return null;
        };
        /**抽取
         * 根据等级抽取5个对应的英雄
         * 首先从0-100抽一个随机数
         * 根据概率确定几星英雄
         * 举例，7级的概率是[20, 50, 80, 100, 0]
         * 从0-100随机一个77
         * 77在50-80之间，就是3星英雄
         * 在从三星英雄里随机一个出来
         */
        Global.getHeros = function (level) {
            var randomRatio = Global.getRandomRatio(level);
            var n = 0;
            var lucky_numbers = [];
            var lucky_hero;
            var l = 0;
            for (var i = 0; i < 5; i++) {
                n = Math.round(Math.random() * 100);
                n = Math.abs(n);
                if (n >= 0 && n <= randomRatio[0]) {
                    //一费
                    l = Math.floor(Math.random() * Global.heros[0].length - 1);
                    lucky_hero = Global.heros[0][Math.abs(l)];
                }
                else if (n > randomRatio[0] && n <= randomRatio[1]) {
                    //二费
                    l = Math.floor(Math.random() * Global.heros[1].length - 1);
                    lucky_hero = Global.heros[1][Math.abs(l)];
                }
                else if (n > randomRatio[1] && n <= randomRatio[2]) {
                    //三费
                    l = Math.floor(Math.random() * Global.heros[2].length - 1);
                    lucky_hero = Global.heros[2][Math.abs(l)];
                }
                else if (n > randomRatio[2] && n <= randomRatio[3]) {
                    //四费
                    l = Math.floor(Math.random() * Global.heros[3].length - 1);
                    lucky_hero = Global.heros[3][Math.abs(l)];
                }
                else if (n > randomRatio[3] && n <= randomRatio[4]) {
                    //五费
                    l = Math.floor(Math.random() * Global.heros[4].length - 1);
                    lucky_hero = Global.heros[4][Math.abs(l)];
                }
                lucky_numbers.push(lucky_hero);
            }
            return lucky_numbers.length == 5 ? lucky_numbers : null;
        };
        return Global;
    }());
    game.Global = Global;
    __reflect(Global.prototype, "game.Global");
})(game || (game = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rainSpecialEffects = [];
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        Main.gameUILayer = new eui.UILayer();
        this.addChild(Main.gameUILayer);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    // private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        Main.stage_Height = this.stage.stageHeight;
        Main.stage_Width = this.stage.stageWidth;
        game.Global.gameController = new eui.UILayer();
        Main.gameUILayer.addChild(game.Global.gameController);
        var buttonRain = new eui.Button();
        this.addChild(buttonRain);
        buttonRain.label = "开启背景特效(掉帧)";
        buttonRain.bottom = 50;
        buttonRain.left = 50;
        buttonRain.name = 'buttonRain';
        buttonRain.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target.label == "开启背景特效(掉帧)") {
                e.target.label = "关闭背景特效";
                var group = new eui.Group();
                group.name = "raingroup";
                game.Global.gameController.addChild(group);
                group.touchEnabled = group.touchChildren = false;
                group.width = Main.stage_Width;
                group.height = Main.stage_Height;
                var rect = new eui.Rect(Main.stage_Width, Main.stage_Height, 0x000000);
                group.addChild(rect);
                rect.x = rect.y = 0;
                for (var i = 0; i < 35; ++i) {
                    _this.rainSpecialEffects.push(new TipsUtils.Rain({ target: group, row: 25, i: i }));
                }
            }
            else {
                e.target.label = "开启背景特效(掉帧)";
                if (game.Global.gameController.getChildByName('raingroup')) {
                    for (var i = 0; i < _this.rainSpecialEffects.length; i++) {
                        _this.rainSpecialEffects[i].clear();
                    }
                    _this.rainSpecialEffects = [];
                    game.Global.gameController.removeChild(game.Global.gameController.getChildByName('raingroup'));
                }
            }
        }, this);
        var button = new eui.Button();
        button.label = "开始";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        button.name = "click";
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        this.getChildByName('buttonRain').removeEventListener(egret.TouchEvent.TOUCH_TAP, null, this);
        this.getChildByName('buttonRain').parent.removeChild(this.getChildByName('buttonRain'));
        this.getChildByName('click').removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.getChildByName('click').parent.removeChild(this.getChildByName('click'));
        game.GameController.this.showPanel();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map