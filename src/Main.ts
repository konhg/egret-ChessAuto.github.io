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
module game {
    export class Global {
        /**显示层级 */
        static gameController: eui.UILayer;
        /**游戏移动时间 */
        static readonly gameMoveTime = 15;
        /**游戏移动等待时间 */
        static readonly gameMoveWaitTime = 3;
        /**游戏战斗时间 */
        static readonly gameBattleTime = 20;
        /**棋子的宽 */
        static readonly chessWidth: number = 62.5;
        /**棋子的高 */
        static readonly chessHeight: number = 62.5;
        /**生成棋子的索引值
         * 每次在商店购买棋子都生成一个不重复的id
         */
        static chessID: number = 0;
        /**未上阵列表最大数量 */
        static readonly notBattleNumberMax = 8;
        /**品质对应颜色 */
        static readonly getQualityColor: Function = (index): number => {
            let a: number[] = [null, 0xb8b5b0, 0x75b6fa, 0x8887d5, 0xf15bbc, 0xffa72f];
            return a[index];
        }
        /**棋子数组 */
        static readonly heros: any[] = [
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
        ]
        /**获得对应等级的概率
         * 下标i减去下标i-1的值，就是概率，i=0就减去0，值是负数就是0
         * 举例 [20, 50, 80, 100, 0]
         * 一星概率20-0等于20%
         * 二星概率50-20等于30%
         * 三星概率80-50等于30%
         * 四星概率100-80等于20%
         * 五星概率0-100小于0都是0%
         */
        static readonly getRandomRatio: Function = (level: number): number[] => {
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
        }
        /**抽取
         * 根据等级抽取5个对应的英雄
         * 首先从0-100抽一个随机数
         * 根据概率确定几星英雄
         * 举例，7级的概率是[20, 50, 80, 100, 0]
         * 从0-100随机一个77
         * 77在50-80之间，就是3星英雄
         * 在从三星英雄里随机一个出来
         */
        static readonly getHeros: Function = (level: number): game.GameHeroVO[] => {
            let randomRatio: number[] = Global.getRandomRatio(level);
            let n: number = 0;
            let lucky_numbers: game.GameHeroVO[] = [];
            let lucky_hero: game.GameHeroVO;
            let l: number = 0;
            for (let i = 0; i < 5; i++) {
                n = Math.round(Math.random() * 100);
                n = Math.abs(n);
                if (n >= 0 && n <= randomRatio[0]) {
                    //一费
                    l = Math.floor(Math.random() * Global.heros[0].length - 1);
                    lucky_hero = Global.heros[0][Math.abs(l)];
                } else if (n > randomRatio[0] && n <= randomRatio[1]) {
                    //二费
                    l = Math.floor(Math.random() * Global.heros[1].length - 1);
                    lucky_hero = Global.heros[1][Math.abs(l)];
                } else if (n > randomRatio[1] && n <= randomRatio[2]) {
                    //三费
                    l = Math.floor(Math.random() * Global.heros[2].length - 1);
                    lucky_hero = Global.heros[2][Math.abs(l)];
                } else if (n > randomRatio[2] && n <= randomRatio[3]) {
                    //四费
                    l = Math.floor(Math.random() * Global.heros[3].length - 1);
                    lucky_hero = Global.heros[3][Math.abs(l)];
                } else if (n > randomRatio[3] && n <= randomRatio[4]) {
                    //五费
                    l = Math.floor(Math.random() * Global.heros[4].length - 1);
                    lucky_hero = Global.heros[4][Math.abs(l)];
                }
                lucky_numbers.push(lucky_hero);

            }
            return lucky_numbers.length == 5 ? lucky_numbers : null;
        }
    }
}
class Main extends eui.UILayer {
    public static gameUILayer: eui.UILayer;
    public static stage_Height: number;
    public static stage_Width: number;

    protected createChildren(): void {
        super.createChildren();
        Main.gameUILayer = new eui.UILayer();

        this.addChild(Main.gameUILayer);
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    // private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        Main.stage_Height = this.stage.stageHeight;
        Main.stage_Width = this.stage.stageWidth;
        game.Global.gameController = new eui.UILayer();
        Main.gameUILayer.addChild(game.Global.gameController);
        let button = new eui.Button();
        button.label = "开始";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        button.name = "click";
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        this.getChildByName('click').removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.getChildByName('click').parent.removeChild(this.getChildByName('click'));
        game.GameController.this.showPanel();
    }
}
