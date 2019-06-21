var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameModel = (function () {
        function GameModel() {
            /**当前商店的棋子数组★ */
            this.currentShopHeros = [];
            /**当前棋盘等级 */
            this.level = 10;
            /**未上阵棋子列表 */
            this.notBattleHeros = [];
            /**已上阵棋子列表 */
            this.battleHeros = [];
            /**棋盘 */
            this.checkerboard = [];
            /**未上阵棋盘 */
            this.checkerboardNotBattle = [];
            this.notBattleHeros.length = game.Global.notBattleNumberMax;
            //初始化二维数组
            for (var i = 0; i < 8; i++) {
                var arr = [];
                arr.length = 8;
                this.battleHeros[i] = arr;
            }
            this.checkerboardNotBattle = [
                { id: 3, text: '' },
                { id: 4, text: '' },
                { id: 3, text: '' },
                { id: 4, text: '' },
                { id: 3, text: '' },
                { id: 4, text: '' },
                { id: 3, text: '' },
                { id: 4, text: '' },
            ];
            this.checkerboard = [
                [
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                ],
                [
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" }
                ],
                [
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" }
                ],
                [
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" },
                    { id: 2, text: "" },
                    { id: 1, text: "" }
                ],
                [
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" }
                ],
                [
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" }
                ],
                [
                    { id: 3, text: "" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "T" },
                    { id: 3, text: "X" },
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "" }
                ],
                [
                    { id: 4, text: "" },
                    { id: 3, text: "" },
                    { id: 4, text: "N" },
                    { id: 3, text: "M" },
                    { id: 4, text: "S" },
                    { id: 3, text: "L" },
                    { id: 4, text: "" },
                    { id: 3, text: "" }
                ],
            ];
        }
        /**把棋子移动到已战斗棋子列表 */
        GameModel.prototype.moveNotBattleHerosToBattleHeros = function (id, targetX, targetY) {
            var arrN = this.notBattleHeros.slice(); //拷贝原始数组
            var n;
            for (var i = 0; i < arrN.length; i++) {
                n = arrN[i];
                if (!n || n == undefined || n == null) {
                    continue;
                }
                if (n.ChessExample.id == id) {
                    this.battleHeros[targetX][targetY] = n;
                    this.battleHeros[targetX][targetY].targetX = targetX;
                    this.battleHeros[targetX][targetY].targetY = targetY;
                    this.notBattleHeros[i] = null;
                    arrN = n = null;
                    console.dir(this.battleHeros);
                    return;
                }
            }
            var arrB = this.battleHeros.slice(); //拷贝原始数组
            var b;
            for (var i = 0; i < arrB.length; i++) {
                for (var j = 0; j < arrB[i].length; j++) {
                    b = arrB[i][j];
                    if (!b || b == undefined || b == null) {
                        continue;
                    }
                    if (b.ChessExample.id == id) {
                        if (targetX == i && targetY == j) {
                            return;
                        }
                        this.battleHeros[targetX][targetY] = b;
                        this.battleHeros[targetX][targetY].targetX = targetX;
                        this.battleHeros[targetX][targetY].targetY = targetY;
                        this.battleHeros[i][j] = null;
                        arrB = b = null;
                        console.dir(this.battleHeros);
                        return;
                    }
                }
            }
        };
        /**把棋子移到未战斗棋子列表 */
        GameModel.prototype.moveBattleHerosToNotBattleHeros = function (id, targetX, targetY) {
            var arr = this.battleHeros.slice();
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if (!arr[i][j] || arr[i][j] == undefined || arr[i][j] == null) {
                        continue;
                    }
                    if (arr[i][j].ChessExample.id == id) {
                        this.notBattleHeros[targetX] = arr[i][j]; //new NotBattleHeroVO(arr[i][j].info, arr[i][j].id, arr[i][j].star, targetX);
                        this.notBattleHeros[targetX].targetX = targetX;
                        this.notBattleHeros[targetX].targetY = targetY;
                        this.battleHeros[i][j] = null;
                        arr = null;
                        console.dir(this.notBattleHeros);
                        return;
                    }
                }
            }
            var arrN = this.notBattleHeros.slice(); //拷贝原始数组
            var n;
            for (var i = 0; i < arrN.length; i++) {
                n = arrN[i];
                if (!n || n == undefined || n == null) {
                    continue;
                }
                if (n.ChessExample.id == id) {
                    if (n.targetX == targetX) {
                        return;
                    }
                    this.notBattleHeros[targetX] = n;
                    this.notBattleHeros[targetX].targetX = targetX;
                    this.notBattleHeros[targetX].targetY = targetY;
                    this.notBattleHeros[i] = null;
                    arrN = n = null;
                    console.dir(this.notBattleHeros);
                    return;
                }
            }
        };
        return GameModel;
    }());
    game.GameModel = GameModel;
    __reflect(GameModel.prototype, "game.GameModel");
    var GameHeroVO = (function () {
        /**
         * 棋子数据
         * @author konhg
         * @description 包含棋子的基本数据
         * @param name 名字
         * @param types 职业
         * @param atk 攻击力
         * @param ftk 防御力
         * @param cost 费用
         */
        function GameHeroVO(name, types, atk, ftk, cost) {
            if (types === void 0) { types = []; }
            this.name = name;
            this.types = types;
            this.atk = atk;
            this.ftk = ftk;
            this.cost = cost;
        }
        return GameHeroVO;
    }());
    game.GameHeroVO = GameHeroVO;
    __reflect(GameHeroVO.prototype, "game.GameHeroVO");
})(game || (game = {}));
//# sourceMappingURL=GameModel.js.map