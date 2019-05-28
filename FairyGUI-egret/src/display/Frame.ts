
module fairygui {

    export class Frame {
        public addDelay: number = 0;
        public texture: egret.Texture;
        public rect: egret.Rectangle;

        public constructor() {
            this.rect = new egret.Rectangle();
        }
    }
}