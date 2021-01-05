module fairygui {

    export class SoundPlayer {
        play(uri: string, vol: number) {
            var pi: PackageItem = UIPackage.getItemByURL(uri);
            if (pi) {
                var sound: egret.Sound = <egret.Sound>pi.owner.getItemAsset(pi);
                if (sound)
                    GRoot.inst.playOneShotSound(sound, vol);
            }
        }
    }
}