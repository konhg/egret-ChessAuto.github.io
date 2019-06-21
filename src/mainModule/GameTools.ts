module game {
	export class GameTools {
		public constructor() {
		}
		/**
	 * @author konhg
	 * @description 实现打字机效果
	 * @param label 显示实例
	 * @param content 显示文本
	 * @param interval 延时时间
	 * @param backFun 回调方法
	 */
		public static showText(label: eui.Label, content: string, interval: number = 200, backFun: Function = null): void {
			let strArr: Array<any> = content.split("");
			let len: number = strArr.length;
			for (let i = 0; i < len; i++) {
				egret.setTimeout(function () {
					label.appendText(strArr[Number(this)]);
					if ((Number(this) >= len - 1) && (backFun != null)) {
						backFun();
					}
				}, i, interval * i);
			}
		}
		/**
		 * 获取一个随机整数
		 * max最大值
		 * min最小值
		 */
		public static getrandom(max: number, min: number): number {
			return Math.round(Math.random() * (max - min) + min);
		}

		/**
	  * str             提示内容
	  * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
	  * isWarning       是否是警告，警告是红色
	  */
		public static showTips(str: string = "", effectType: number = 1, isWarning: boolean = false): void {
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
		}
	}
}