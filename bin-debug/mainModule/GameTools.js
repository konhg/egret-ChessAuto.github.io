var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameTools = (function () {
        function GameTools() {
        }
        /**
     * @author konhg
     * @description 实现打字机效果
     * @param label 显示实例
     * @param content 显示文本
     * @param interval 延时时间
     * @param backFun 回调方法
     */
        GameTools.showText = function (label, content, interval, backFun) {
            if (interval === void 0) { interval = 200; }
            if (backFun === void 0) { backFun = null; }
            var strArr = content.split("");
            var len = strArr.length;
            for (var i = 0; i < len; i++) {
                egret.setTimeout(function () {
                    label.appendText(strArr[Number(this)]);
                    if ((Number(this) >= len - 1) && (backFun != null)) {
                        backFun();
                    }
                }, i, interval * i);
            }
        };
        /**
         * 获取一个随机整数
         * max最大值
         * min最小值
         */
        GameTools.getrandom = function (max, min) {
            return Math.round(Math.random() * (max - min) + min);
        };
        /**
      * str             提示内容
      * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
      * isWarning       是否是警告，警告是红色
      */
        GameTools.showTips = function (str, effectType, isWarning) {
            if (str === void 0) { str = ""; }
            if (effectType === void 0) { effectType = 1; }
            if (isWarning === void 0) { isWarning = false; }
            switch (effectType) {
                case 1: {
                    TipsUtils.showTipsDownToUp(str, isWarning);
                    break;
                }
                case 2: {
                    TipsUtils.showTipsLeftOrRight(str, isWarning, true);
                    break;
                }
                case 3: {
                    TipsUtils.showTipsLeftOrRight(str, isWarning, false);
                    break;
                }
                case 4: {
                    TipsUtils.showTipsFromCenter(str, isWarning);
                    break;
                }
                case 5: {
                    TipsUtils.showTipsBigToSmall(str, isWarning);
                    break;
                }
                default: {
                    // TODO: Implemente default case
                }
            }
        };
        return GameTools;
    }());
    game.GameTools = GameTools;
    __reflect(GameTools.prototype, "game.GameTools");
})(game || (game = {}));
//# sourceMappingURL=GameTools.js.map