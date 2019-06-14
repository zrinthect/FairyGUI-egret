
module fairygui {

    export class UIObjectFactory {
        public static objTypeExtensions = {};
        public static packageItemExtensions: any = {};

        public constructor() {
        }

        public static setObjTypeExtension(typeKey:ObjectType,cls:any):void{
            let oldCls = this.getObjCls(typeKey);
            if(!(cls.prototype instanceof oldCls)){
                console.error(`非法扩展控件类型(${typeKey})`);
            }
            this.objTypeExtensions[typeKey] = cls;
        }

        public static setPackageItemExtension(url: string, type: any): void {
            if (url == null)
                throw "Invaild url: " + url;

            var pi: PackageItem = UIPackage.getItemByURL(url);
            if (pi != null)
                pi.extensionType = type;

            UIObjectFactory.packageItemExtensions[url] = type;
        }

        public static setLoaderExtension(type: any): void {
            this.setObjTypeExtension(ObjectType.Loader, type);
        }

        public static resolvePackageItemExtension(pi: PackageItem): void {
            pi.extensionType = UIObjectFactory.packageItemExtensions["ui://" + pi.owner.id + pi.id];
            if (!pi.extensionType)
                pi.extensionType = UIObjectFactory.packageItemExtensions["ui://" + pi.owner.name + "/" + pi.name];
        }

        public static newObject(pi: PackageItem): GObject {
            if (pi.extensionType != null)
                return new pi.extensionType();
            else
                return this.newObject2(pi.objectType);
        }

        public static newObject2(type: ObjectType): GObject {
            let cls = this.objTypeExtensions[type];
            if(cls == null){
                cls = this.getObjCls(type);
            }
            if(cls == null){
                console.error(`错误控件对象类型(${type})`);
            }
            return new cls();
        }

        private static getObjCls(type: ObjectType):any{
            switch (type) {
                case ObjectType.Image:
                    return GImage;

                case ObjectType.MovieClip:
                    return GMovieClip;

                case ObjectType.Component:
                    return GComponent;

                case ObjectType.Text:
                    return GTextField;

                case ObjectType.RichText:
                    return GRichTextField;

                case ObjectType.InputText:
                    return GTextInput;

                case ObjectType.Group:
                    return GGroup;

                case ObjectType.List:
                    return GList;

                case ObjectType.Graph:
                    return GGraph;

                case ObjectType.Loader:
                    return GLoader;

                case ObjectType.Button:
                    return GButton;

                case ObjectType.Label:
                    return GLabel;

                case ObjectType.ProgressBar:
                    return GProgressBar;

                case ObjectType.Slider:
                    return GSlider;

                case ObjectType.ScrollBar:
                    return GScrollBar;

                case ObjectType.ComboBox:
                    return GComboBox;

                default:
                    return null;
            }
        }
    }
}