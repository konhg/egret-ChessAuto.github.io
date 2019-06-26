module game {
	/**
	 * 对战商店实例
	 * @author konhg
	 * @description 对局内购买棋子的商店
	 * @param model 当前数据类
	 */
	export class ShopPanel extends eui.Component {
		public constructor(private addHero: Function, public model: GameModel) {
			super();
			this.skinName = 'ShopSkin';
		}
		/**实例化页面添加监听方法 */
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
			switch (partName) {
				case "refreshlist":
					(<eui.Button>instance).addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
						this.model.currentShopHeros = Global.getHeros(this.model.level);
						(<eui.List>this['list']).dataProvider = new eui.ArrayCollection(this.model.currentShopHeros);
					}, this);
					break;
				case "list":
					(<eui.List>instance).itemRenderer = HeroShowItemRenderer;
					(<eui.List>instance).dataProvider = new eui.ArrayCollection(this.model.currentShopHeros);
					(<eui.List>instance).addEventListener(eui.ItemTapEvent.ITEM_TAP, (e: eui.ItemTapEvent) => {
						this.addHero(e.itemIndex, (<HeroShowItemRenderer>e.itemRenderer).delArr);
						(<eui.List>e.currentTarget).dataProvider = new eui.ArrayCollection(this.model.currentShopHeros);
					}, this);
					break;
				case "closeBtn":
					(<eui.Button>instance).addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
						this.parent.removeChild(this);
					}, this);
					break;
				case "probabilityShow":
					let str: string = '';
					let a: number[] = Global.getRandomRatio(this.model.level);
					for (let i = 0; i < a.length; i++) {
						let d: number = 0
						if (a[i - 1]) {
							d = a[i] - a[i - 1];
						} else {
							d = a[i] - 0;
						}
						d <= 0 ? d = 0 : d;
						str += `<font color=${Global.getQualityColor(i + 1)}> ★${d}% </font>`;
					}
					(<eui.Label>instance).textFlow = new egret.HtmlTextParser().parser(`<font>Lv${this.model.level}:</font>${str}`)
					break;
				case "lock":
					(<eui.CheckBox>instance).currentState = this.model.isLockShop ? "upAndSelected" : 'up';
					(<eui.CheckBox>instance).addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent): void => {
					(<eui.CheckBox>e.currentTarget).currentState = ((<eui.CheckBox>e.currentTarget).currentState == "upAndSelected" ? "up" : "upAndSelected");
						this.model.isLockShop = (<eui.CheckBox>e.currentTarget).currentState == "upAndSelected";
					}, this);
					break;
			}
		}
		protected createChildren(): void {
			super.createChildren();

		}
	}
}