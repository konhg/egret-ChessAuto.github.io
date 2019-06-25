module game {
	/**与当期商店棋子相同的棋子实例 */
	export interface uplevelObj {
		id?: number;
		star?: number;
		name?: string;
	}
	/**
	 * 商店棋子展示
	 * @author konhg
	 * @description 用于商店里展示可出售棋子
	 */
	export class HeroShowItemRenderer extends eui.ItemRenderer {
		private cost: eui.Label;//费用
		private heroName: eui.Label;//名字
		private occupation: eui.Label;//职业
		private star: eui.Label;//是否可升星
		private haveNum: eui.Label;//已拥有的数量
		public delArr: uplevelObj[] = [];
		public constructor() {
			super();
			this.skinName = 'HeroShow';
		}
		protected dataChanged(): void {
			super.dataChanged();
			let d: GameHeroVO = this.data as GameHeroVO;
			this.visible = true;
			if (!d || d == null) {
				this.visible = false;
				return;
			}
			this.cost.text = `费用：${d.cost}`;
			this.heroName.textFlow = new egret.HtmlTextParser().parser(`<font color=${Global.getQualityColor(d.cost)}>${d.name}</font>`);
			let str: string = '';
			for (let i = 0; i < d.types.length; i++) {
				let s: string;
				d.types[i + 1] ? s = d.types[i] + ',' : s = d.types[i];
				str += s;
			}
			this.occupation.text = `${str}`;
			let model: GameModel = GameController.this.model;
			let uplevelArr: uplevelObj[] = [];//与当期商店棋子相同的棋子列表
			/**遍历已上阵数组 */
			for (let s = 0; s < model.battleHeros.length; s++) {
				for (let ds = 0; ds < model.battleHeros[s].length; ds++) {
					if (!model.battleHeros[s][ds] || null == model.battleHeros[s][ds] || undefined == model.battleHeros[s][ds]) {
						continue;
					}
					let a: BattleHeroVO = model.battleHeros[s][ds];
					if (a.ChessExample.heroInfo.name == d.name) {
						let uplevelObjA: uplevelObj = {};
						uplevelObjA.name = a.ChessExample.heroInfo.name;
						uplevelObjA.id = a.ChessExample.id;
						uplevelObjA.star = a.ChessExample.heroStar
						uplevelArr.push(uplevelObjA);
					}
				}
			}
			/**遍历未上阵数组 */
			for (let l = 0; l < model.notBattleHeros.length; l++) {
				if (!model.notBattleHeros[l] || null == model.notBattleHeros[l] || undefined == model.notBattleHeros[l]) {
					continue;
				}
				let v: BattleHeroVO = model.notBattleHeros[l];
				if (v.ChessExample.heroInfo.name == d.name) {
					let uplevelObjB: uplevelObj = {};
					uplevelObjB.name = v.ChessExample.heroInfo.name;
					uplevelObjB.id = v.ChessExample.id;
					uplevelObjB.star = v.ChessExample.heroStar
					uplevelArr.push(uplevelObjB);
				}
			}
			let star1: number = 0;//一级的数量
			let star2: number = 0;//二级的数量
			let haveNum = 0;
			let delAr1: uplevelObj[] = [];
			let delAr2: uplevelObj[] = [];
			for (let k = 0; k < uplevelArr.length; k++) {
				let u: uplevelObj = uplevelArr[k];
				if (u.star == 1) {
					star1++;
					haveNum += 1;
					delAr1.push(u);
				} else if (u.star == 2) {
					star2++;
					haveNum += 3;
					delAr2.push(u);
				} else if (u.star == 3) {
					haveNum += 9;
				}
			}
			this.haveNum.text = haveNum == 0 ? '' : `已拥有 ${haveNum}`;

			this.delArr = [];
			if (star1 >= 2 && star2 < 2) {
				this.star.text = "★★";
				/**生成删除列表 */
				this.delArr = this.delArr.concat([], delAr1);
			} else if (star1 >= 2 && star2 >= 2) {
				this.star.text = "★★★";
				/**生成删除列表 */
				this.delArr = this.delArr.concat(delAr1, delAr2);
			} else {
				this.star.text = "";
			}


		}
	}
}