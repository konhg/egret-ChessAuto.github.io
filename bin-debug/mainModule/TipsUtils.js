/**
  * tips特效汇总
  * by zhaoxin
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * TipsUtils.showTipsDownToUp()
  */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TipsUtils;
(function (TipsUtils) {
    //从下到上弹出
    function showTipsDownToUp(str, isWarning) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = Main.stage_Height >> 1;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        }
        else {
            effectTips.textColor = 0x00e500;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = (Main.stage_Width >> 1) - (effectTips.width >> 1);
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (Main.gameUILayer.getChildIndex(effectTips) == -1) {
            Main.gameUILayer.addChild(effectTips);
        }
        var onComplete2 = function () {
            if (Main.gameUILayer.getChildIndex(effectTips) != -1) {
                Main.gameUILayer.removeChild(effectTips);
                effectTips = null;
            }
        };
        var onComplete1 = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({ y: effectTips.y - 120, alpha: 1 }, 800, egret.Ease.backOut).call(onComplete1, this);
    }
    TipsUtils.showTipsDownToUp = showTipsDownToUp;
    //从左至右 或者 从右至左
    function showTipsLeftOrRight(str, isWarning, isFromeLeft) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        if (isFromeLeft === void 0) { isFromeLeft = true; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = Main.stage_Height / 2;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        }
        else {
            effectTips.textColor = 0x00e500;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        if (isFromeLeft) {
            effectTips.x = -effectTips.width;
        }
        else {
            effectTips.x = Main.stage_Width;
        }
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (Main.gameUILayer.getChildIndex(effectTips) == -1) {
            Main.gameUILayer.addChild(effectTips);
        }
        if (isFromeLeft) {
            egret.Tween.get(effectTips).to({ x: Main.stage_Width / 2 - effectTips.width / 2 - 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        }
        else {
            egret.Tween.get(effectTips).to({ x: Main.stage_Width / 2 - effectTips.width / 2 + 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        }
        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: effectTips.x + 100 }, 500);
            }
            else {
                egret.Tween.get(effectTips).to({ x: effectTips.x - 100 }, 500);
            }
        }, this, 300);
        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: Main.stage_Width }, 300, egret.Ease.sineIn);
            }
            else {
                egret.Tween.get(effectTips).to({ x: -effectTips.width }, 300, egret.Ease.sineIn);
            }
        }, this, 800);
        egret.setTimeout(function () {
            if (Main.gameUILayer.getChildIndex(effectTips) != -1) {
                Main.gameUILayer.removeChild(effectTips);
                effectTips = null;
            }
        }, this, 1100);
    }
    TipsUtils.showTipsLeftOrRight = showTipsLeftOrRight;
    //从里到外
    function showTipsFromCenter(str, isWarning) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = Main.stage_Height / 2;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        }
        else {
            effectTips.textColor = 0x00e500;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = Main.stage_Width / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (Main.gameUILayer.getChildIndex(effectTips) == -1) {
            Main.gameUILayer.addChild(effectTips);
        }
        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 0;
        effectTips.scaleY = 0;
        var onComplete2 = function () {
            if (Main.gameUILayer.getChildIndex(effectTips) != -1) {
                Main.gameUILayer.removeChild(effectTips);
                effectTips = null;
            }
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        }, this, 1000);
    }
    TipsUtils.showTipsFromCenter = showTipsFromCenter;
    //从外到里
    function showTipsBigToSmall(str, isWarning) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = Main.stage_Height / 2;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        }
        else {
            effectTips.textColor = 0x00e500;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = Main.stage_Width / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (Main.gameUILayer.getChildIndex(effectTips) == -1) {
            Main.gameUILayer.addChild(effectTips);
        }
        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete2 = function () {
            if (Main.gameUILayer.getChildIndex(effectTips) != -1) {
                Main.gameUILayer.removeChild(effectTips);
                effectTips = null;
            }
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        }, this, 1000);
    }
    TipsUtils.showTipsBigToSmall = showTipsBigToSmall;
    function r(from, to) {
        return ~~(Math.random() * (to - from + 1) + from);
    }
    TipsUtils.r = r;
    function pick(q, w, e) {
        return arguments[r(0, arguments.length - 1)];
    }
    TipsUtils.pick = pick;
    function getChar() {
        return String.fromCharCode(TipsUtils.pick(r(0x3041, 0x30ff), r(0x2000, 0x206f), r(0x0020, 0x003f)));
    }
    TipsUtils.getChar = getChar;
    var Char = (function () {
        function Char() {
            this.element = new egret.TextField();
            this.mutate();
        }
        Char.prototype.mutate = function () {
            this.element.text = getChar();
        };
        return Char;
    }());
    TipsUtils.Char = Char;
    __reflect(Char.prototype, "TipsUtils.Char");
    var Trail = (function () {
        function Trail(list, options) {
            if (list === void 0) { list = []; }
            this.list = list;
            this.options = options;
            this.list = list;
            this.options = Object.assign({ size: 10, offset: 0 }, options);
            this.body = [];
            this.move();
        }
        Trail.prototype.clear = function () {
            this.body = [];
            this.list = [];
        };
        Trail.prototype.traverse = function (fn) {
            var _this = this;
            this.body.forEach(function (n, i) {
                var last = (i == _this.body.length - 1);
                if (n)
                    fn(n, i, last);
            });
        };
        Trail.prototype.move = function () {
            this.body = [];
            var _a = this.options, offset = _a.offset, size = _a.size;
            for (var i = 0; i < size; ++i) {
                var item = this.list[offset + i - size + 1];
                this.body.push(item);
            }
            this.options.offset =
                (offset + 1) % (this.list.length + size - 1);
        };
        return Trail;
    }());
    TipsUtils.Trail = Trail;
    __reflect(Trail.prototype, "TipsUtils.Trail");
    var Rain = (function () {
        function Rain(_a) {
            var target = _a.target, row = _a.row, i = _a.i;
            this.element = new eui.Group();
            // this.element.name = i;
            this.build(row);
            if (target) {
                target.addChild(this.element);
                this.element.x = 33 * i;
            }
            this.drop();
        }
        Rain.prototype.clear = function () {
            this.element.removeChildren();
            this.element.parent.removeChild(this.element);
            this.element = null;
            this.trail.clear();
            this.trail = null;
        };
        Rain.prototype.build = function (row) {
            if (row === void 0) { row = 20; }
            var root = new eui.Group();
            var chars = [];
            var _loop_1 = function (i) {
                var c = new TipsUtils.Char();
                // c.element.name = i + '';
                root.addChild(c.element);
                c.element.y = c.element.height * (i - 1);
                chars.push(c);
                if (Math.random() < .5) {
                    TipsUtils.loop(function () { return c.mutate(); }, TipsUtils.r(1e3, 5e3));
                }
            };
            for (var i = 0; i < row; ++i) {
                _loop_1(i);
            }
            this.trail = new Trail(chars, {
                size: r(10, 30), offset: r(0, 100)
            });
            this.element.addChild(root);
        };
        Rain.prototype.drop = function () {
            var trail = this.trail;
            var len = trail.body.length;
            var delay = r(10, 100);
            loop(function () {
                trail.move();
                trail.traverse(function (c, i, last) {
                    var color = Number(convertColor("136,100%," + 85 / len * (i + 1) + "%").replace('#', '0x'));
                    console.log(convertColor("136,100%," + 85 / len * (i + 1) + "%").replace('#', '0x'));
                    c.element.textColor = color;
                    if (last) {
                        c.mutate();
                        c.element.textColor = 0xb3ffc7;
                        c.element.strokeColor = 0xffffff;
                    }
                });
            }, delay);
        };
        return Rain;
    }());
    TipsUtils.Rain = Rain;
    __reflect(Rain.prototype, "TipsUtils.Rain");
    function loop(fn, delay) {
        var stamp = Date.now();
        function _loop() {
            if (Date.now() - stamp >= delay) {
                fn();
                stamp = Date.now();
            }
            requestAnimationFrame(_loop);
        }
        requestAnimationFrame(_loop);
    }
    TipsUtils.loop = loop;
})(TipsUtils || (TipsUtils = {}));
//# sourceMappingURL=TipsUtils.js.map