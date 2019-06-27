/**
  * tips特效汇总
  * by zhaoxin
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * TipsUtils.showTipsDownToUp()
  */

module TipsUtils {

    //从下到上弹出
    export function showTipsDownToUp(str: string = "", isWarning: boolean = false): void {
        let effectTips = new egret.TextField();

        effectTips.size = 24;
        effectTips.y = Main.stage_Height >> 1;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        } else {
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

        let onComplete2: Function = function () {
            if (Main.gameUILayer.getChildIndex(effectTips) != -1) {
                Main.gameUILayer.removeChild(effectTips);
                effectTips = null;
            }
        };
        let onComplete1: Function = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({ y: effectTips.y - 120, alpha: 1 }, 800, egret.Ease.backOut).call(onComplete1, this);
    }

    //从左至右 或者 从右至左
    export function showTipsLeftOrRight(str: string = "", isWarning: boolean = false, isFromeLeft: boolean = true): void {
        let effectTips = new egret.TextField();

        effectTips.size = 24;
        effectTips.y = Main.stage_Height / 2;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        } else {
            effectTips.textColor = 0x00e500;
        }
        effectTips.alpha = 0;

        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        if (isFromeLeft) {
            effectTips.x = - effectTips.width;
        } else {
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
        } else {
            egret.Tween.get(effectTips).to({ x: Main.stage_Width / 2 - effectTips.width / 2 + 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        }

        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: effectTips.x + 100 }, 500);
            } else {
                egret.Tween.get(effectTips).to({ x: effectTips.x - 100 }, 500);
            }
        }, this, 300);

        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: Main.stage_Width }, 300, egret.Ease.sineIn);
            } else {
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

    //从里到外
    export function showTipsFromCenter(str: string = "", isWarning: boolean = false): void {
        let effectTips = new egret.TextField();

        effectTips.size = 24;
        effectTips.y = Main.stage_Height / 2;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        } else {
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

        let onComplete2: Function = function () {
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

    //从外到里
    export function showTipsBigToSmall(str: string = "", isWarning: boolean = false): void {
        let effectTips = new egret.TextField();

        effectTips.size = 24;
        effectTips.y = Main.stage_Height / 2;
        if (isWarning) {
            effectTips.textColor = 0xf11300;
        } else {
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

        let onComplete2: Function = function () {
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
    export function r(from, to) {
        return ~~(Math.random() * (to - from + 1) + from);
    }
    export function pick(q, w, e) {
        return arguments[r(0, arguments.length - 1)];
    }
    export function getChar() {
        return String.fromCharCode(TipsUtils.pick(
            r(0x3041, 0x30ff),
            r(0x2000, 0x206f),
            r(0x0020, 0x003f)
        ));
    }
    export class Char {
        public element: egret.TextField;
        constructor() {
            this.element = new egret.TextField();
            this.mutate();
        }
        mutate() {
            this.element.text = getChar();
        }
    }
    export class Trail {
        public body;
        constructor(public list = [], public options) {
            this.list = list;
            this.options = (<any>Object).assign(
                { size: 10, offset: 0 }, options
            );
            this.body = [];
            this.move();
        }
        clear() {
            this.body = [];
            this.list = [];
        }
        traverse(fn) {
            this.body.forEach((n, i) => {
                let last = (i == this.body.length - 1);
                if (n) fn(n, i, last);
            });
        }
        move() {
            this.body = [];
            let { offset, size } = this.options;
            for (let i = 0; i < size; ++i) {
                let item = this.list[offset + i - size + 1];
                this.body.push(item);
            }
            this.options.offset =
                (offset + 1) % (this.list.length + size - 1);
        }
    }
    export class Rain {
        public element: eui.Group;
        public trail: Trail;
        constructor({ target, row, i}) {
            this.element = new eui.Group();
            // this.element.name = i;
            this.build(row);
            if (target) {
                target.addChild(this.element);
                this.element.x = 33 * i;
            }
            this.drop();
        }
        clear() {
            this.element.removeChildren();
            this.element.parent.removeChild(this.element);
            this.element = null;
            this.trail.clear();
            this.trail = null;

        }
        build(row = 20) {
            let root = new eui.Group();
            let chars = [];
            for (let i = 0; i < row; ++i) {
                let c = new TipsUtils.Char();
                // c.element.name = i + '';
                root.addChild(c.element);
                c.element.y = c.element.height * (i - 1);
                chars.push(c);
                if (Math.random() < .5) {
                    TipsUtils.loop(() => c.mutate(), TipsUtils.r(1e3, 5e3));
                }
            }
            this.trail = new Trail(chars, {
                size: r(10, 30), offset: r(0, 100)
            });
            this.element.addChild(root);
        }
        drop() {
            let trail = this.trail;
            let len = trail.body.length;
            let delay = r(10, 100);
            loop(() => {
                trail.move();
                trail.traverse((c: Char, i, last) => {
                    let color: number = Number(convertColor(`136,100%,${85 / len * (i + 1)}%`).replace('#', '0x'));
                    // console.log(convertColor(`136,100%,${85 / len * (i + 1)}%`).replace('#', '0x'))
                    c.element.textColor = color;
                    if (last) {
                        c.mutate();
                        c.element.textColor = 0xb3ffc7;
                        c.element.strokeColor = 0xffffff;
                    }
                });
            }, delay);
        }
    }
    export function loop(fn, delay) {
        let stamp = Date.now();
        function _loop() {
            if (Date.now() - stamp >= delay) {
                fn(); stamp = Date.now();
            }
            requestAnimationFrame(_loop);
        }
        requestAnimationFrame(_loop);
    }
}