/**
 * 新中新 居民身份证阅读 OCX 控件操作
 * Created by skz on 2017/1/11 0011.
 */
define(['common/ocx/Class'],function(Class){
    /**
     * @class
     * @classdesc DOM工具类
     * @constructor
     */
    var DomUtil = {
        /**
         * @description 构建DOM对象
         * @param {String} id
         * @param {String} classId
         * @param codeBase
         * @returns {HTMLElement}
         */
        createIDCardDom : function(id,classId,codeBase){
            var $IDCardDom = window.document.createElement("object");
            try {
                $IDCardDom.style.width = '0';
                $IDCardDom.style.height = '0';
                $IDCardDom.classid = classId;
                $IDCardDom.id = id;
                //$IDCardDom.codeBase = codeBase;
                $IDCardDom.appendChild(this.createObjParam("wmode","transparent"));
            } catch (e) {}
            return $IDCardDom;
        },
        /**
         * @description 构建Object DOM对象的Param参数
         * @param {String} key      参数key
         * @param {String} value    参数值
         * @returns {HTMLElement}
         */
        createObjParam : function(key,value){
            var $param = document.createElement("param");
            $param.name = key;
            $param.value = value;
            return $param;
        }
    };

    /**
     * @class
     * @classdesc IDCardOCX
     * @description IDCardOCX
     * @constructor
     */
    var IDCardOCX = Class.extend({
        /**
         * @private
         * @description 构造初始函数
         * @param ocx
         */
        init: function(ocx){
            this.ocx = ocx;
        },
        /**
         * @description 是否IE浏览器
         * @returns {boolean}
         */
        isIE: function(){
            return !!window.ActiveXObject || "ActiveXObject" in window
        },
        /**
         * @description 自动寻找计算机连接的读卡器
         * <pre>
         *    > 1000        USB
         *    > 0  OR  < 16  COM
         * </pre>
         * @example <caption>Example usage of <b>findReader</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.findReader();
         *
         * @returns {boolean}
         */
        findReader: function(){
            return this.ocx.FindReader() > 0;
        },
        /**
         * @description 自动寻找USB连接的读卡器
         * @example <caption>Example usage of <b>findUSBReader</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.findUSBReader();
         *
         * @returns {boolean}
         */
        findUSBReader: function () {
            return this.ocx.FindUSBReader() > 1000;
        },
        /**
         * @description 回读卡器的ID号
         *    <strong>FinderReader或FindUSBReader返回值大于0才有效</strong>
         * @returns {*}
         */
        readSAMID: function () {
            return this.ocx.GetSAMID();
        },
        /**
         * @description 手动读卡函数不包含指纹
         * @example <caption>Example usage of <b>readCard</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.readCard();
         *
         * @returns {object}
         * <pre>
         *    cardMsg.nameA = "姓名";
         *    cardMsg.sex = "性别";
         *    cardMsg.nation = "民族";
         *    cardMsg.born = "出生日期";
         *    cardMsg.address = "地址";
         *    cardMsg.cardNo = "身份证号";
         *    cardMsg.userLifeB = "有效期开始";
         *    cardMsg.userLifeE = "有效期结束";
         *    cardMsg.police = "发证机关";
         *    cardMsg.photoName = "照片文件名";
         * </pre>
         */
        readCard: function () {
            var ret = this.ocx.ReadCardMsg();
            var cardMsg = {};
            if(ret === 0){
                cardMsg.nameA = this.ocx.NameA;
                cardMsg.sex = this.ocx.Sex;
                cardMsg.nation = this.ocx.Nation;
                cardMsg.born = this.ocx.Born;
                cardMsg.address = this.ocx.Address;
                cardMsg.cardNo = this.ocx.CardNo;
                cardMsg.userLifeB = this.ocx.UserLifeB;
                cardMsg.userLifeE = this.ocx.UserLifeE;
                cardMsg.police = this.ocx.Police;
                cardMsg.photoName = this.ocx.PhotoName;
            }
            return cardMsg;
        },
        /**
         * TODO
         * @description 手动读卡函数包含指纹
         * @returns {*}
         */
        readCardFP: function () {
            return this.ocx.ReadCardFPMsg();
        },
        /**
         * TODO 当前OCX没有该方法
         * 自动读卡
         */
        readCardAuto : function () {
            this.ocx.SetloopTime(1000);
            this.ocx.SetReadType(1);
        },
        /**
         * @description 设置照片文件存储的路径
         * @example <caption>Example usage of <b>setPhotoPath</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.setPhotoPath();
         *
         *  或在IDCard内部 通过 this调用
         *
         * @param {Number} mode
         *    0=C:根目录，
         *    1=当前路径	，
         *    2=指定路径
         * @param {String} path   路径名
         * @returns {boolean}
         *    0   	成功<br/>
         *    -1	不成功
         */
        setPhotoPath: function (mode,path) {
            if(mode === 2 && !path) {
                window.console && window.console.log('自定义存储路径不能为空');
                return false;
            }
            return this.ocx.SetPhotoPath(mode || 0, path || '')
        },
        /**
         * @description 设置照片文件存储的格式
         * @example <caption>Example usage of <b>setPhotoType</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.setPhotoType();
         *
         * @param {number} type   default: 1
         *    0=bmp,
         *    1=jpeg,
         *    2=base64,
         *    3=WLT,
         *    4=不生成图片
         * @returns {boolean}
         *    0   	成功<br>
         *    -1	不成功
         */
        setPhotoType: function (type) {
            return this.ocx.SetPhotoType(type || 1);
        },
        /**
         * @description 设置照片文件的文件名
         * @example <caption>Example usage of <b>setPhotoName</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.setPhotoName();
         *
         * @param {number} photoName
         *    0=tmp ，
         *    1=姓名	，
         *    2=身份证号	，
         *    3=姓名_身份证号
         * @returns {boolean}
         *    0   	成功<br/>
         *    -1	不成功
         */
        setPhotoName: function (photoName) {
            return this.ocx.SetPhotoName(photoName || 3);
        },
        /**
         * @description 设置返回性别的格式
         * @example <caption>Example usage of <b>setSexType</b>.</caption>
         *  var IDCardInstance = new IDCard(.....)
         *  IDCardInstance.setSexType();
         *
         * @param {number} type   格式类型
         *   0=卡内存储的数据，
         *   1=解释之后的数据
         * @returns {boolean}
         *   0   成功<br>
         *   -1	 不成功
         */
        setSexType: function (type) {
            return this.ocx.SetSexType(type);
        },
        /**
         * @description 设置返回民族的格式
         * @param {number} type   格式类型
         *   0=卡内存储的数据，
         *   1=解释之后的数据
         *   2=解释之后+“族”
         * @returns {boolean}
         *   0   成功<br>
         *   -1	 不成功
         */
        setNationType: function (type) {
            return this.ocx.SetNationType(type);
        },
        /**
         * @description 设置返回出生日期的格式
         * @param {number} type  格式类型
         *   0=YYYYMMDD,
         *   1=YYYY年MM月DD日,
         *   2=YYYY.MM.DD,
         *   3=YYYY-MM-DD,
         *   4=YYYY/MM/DD
         * @returns {boolean}
         *   0   成功<br>
         *   -1	 不成功
         */
        setBornType: function (type) {
            return this.ocx.SetBornType(type);
        },
        /**
         * @description 设置返回有效期开始日期的格式
         * @param {number} type  格式类型
         *   0=YYYYMMDD,
         *   1=YYYY年MM月DD日,
         *   2=YYYY.MM.DD,
         *   3=YYYY-MM-DD,
         *   4=YYYY/MM/DD
         * @returns {boolean}
         *   0   成功<br>
         *   -1	 不成功
         */
        setUserLifeBType: function (type) {
            return this.ocx.SetUserLifeBType(type);
        },
        /**
         * @description 设置返回有效期结束日期的格式
         * @param {number} type  格式类型
         *   0=YYYYMMDD,
         *   1=YYYY年MM月DD日,
         *   2=YYYY.MM.DD,
         *   3=YYYY-MM-DD,
         *   4=YYYY/MM/DD
         * @param {number} longterm  结束日期未长期的情况
         *   0=长期不转换,
         *   1=长期转换为 有效期开始加50年
         * @returns {boolean}
         *   0   成功<br>
         *   -1	 不成功
         */
        setUserLifeEType: function (type,longterm) {
            return this.ocx.SetUserLifeEType(type,longterm || 0);
        },
        /**
         * @description 返回读取信息的Base64照片编码
         * @returns {String}
         */
        getBase64Photo: function () {
            return this.ocx.Base64Photo;
        }
    });

    /**
     * @class
     * @classdesc IDCard
     * @description IDCard IDCardOCX子类，可自定义方法
     * @constructor
     * @extends IDCardOCX @see {@link IDCardOCX}
     */
    var IDCard = IDCardOCX.extend({
        /**
         * @private
         * @param id
         * @param target
         * @param classId
         * @param codebase
         */
        init: function(id,target,classId,codebase){
            /**
             * @private
             * @description OCX ID
             * @member {String}
             */
            this.id = id;
            /**
             * @private
             * @description OCX 父级标签ID
             * @member {String}
             */
            this.target = target;
            /**
             * @private
             * @description OCX ClassID
             * @member {String}
             */
            this.classId = classId;
            /**
             * @private
             * @description OCX 证书路径
             * @member {String}
             */
            this.codebase = codebase;
            /**
             * @private
             * @description 是否安装了 OCX
             * @member {Boolean}
             */
            this.hasOCX = false;

            try {
                /**
                 * @private
                 * @description OCX 对象
                 * @member {object}
                 */
                this.ocxDom = DomUtil.createIDCardDom(this.id,this.classId,this.codebase);

                $(this.target).prepend(this.ocxDom);
                this.hasOCX = true;
                this._super(this.ocxDom);
            }catch (e){
                this.hasOCX = false;
            }
        },
        /**
         * @description 获取IDCard 基本信息（默认设置）
         * @returns {*|{}}
         */
        getCardMsg: function () {
            return this.findUSBReader() ? this.readCard() : {};
        },
        /**
         * @description Formatted IDCard Message(just for demo)
         * @returns {*}
         */
        getFormatCardMsg: function () {
            if(!this.findUSBReader()) return {};

            this.setPhotoType(1);
            this.setPhotoName(1);
            this.setBornType(2);
            this.setPhotoPath(1);
            return this.readCard();

        }
    });

    return IDCard;
});