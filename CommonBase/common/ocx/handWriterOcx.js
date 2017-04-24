/**
 * Created by whoszus on 2017/2/16.
 */

var handWriterOcx = function () {
    var ocxObj = null;

    function init() {
        var classId = "clsid:E8F5278C-0C72-4561-8F7E-CCBC3E48C2E3";
        var obj = $('<object classid=' + classId + ' width="1" height="1" ></object>');
        obj.appendTo($('body'));
        ocxObj = obj[0].object;
    }

    /**
     * 1.    LONG HWInitialize (void)
     函数功能：  手写模块初始化
     参数说明：  返回值见2.1
     */
    function HWInitialize() {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWInitialize();
    }

    /**
     * 2.    LONG HWFinalize (void)
     函数功能：  手写模块卸载
     参数说明：   无
     */
    function HWFinalize() {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWFinalize();
    }

    /**
     * HWClearPenSign 函数功能：  清除笔迹
     */
    function HWClearPenSign() {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWClearPenSign();
    }

    /**
     * 4.    LONG HWSetPenMode(LONG flag)
     函数功能：  设置笔模型
     参数说明： flag：0 -> 毛笔（默认）
     1 -> 钢笔
     */
    function HWSetPenMode(flag) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetPenMode(flag);
    }

    /**
     * HWSetPenWidth
     */
    function HWSetPenWidth(penWidth) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetPenWidth(penWidth);
    }

    /**
     * 6.    LONG HWSetPenColor(OLE_COLOR color)
     函数功能：  设置笔的颜色（默认颜色为0x000000）
     参数说明：  color： 颜色，格式为RGB

     * @param color
     * @constructor
     */
    function HWSetPenColor(color) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetPenColor(color);
    }

    /**
     * 函数功能：设置签名区域背景颜色
     参数说明： color：颜色，无背景图片时设置,默认为白色

     * @param flag
     * @constructor
     */
    function HWSetBkColor(linewidth, color) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetBkColor(linewidth, color);
    }

    /**
     * 8.    LONG HWSetCtlFrame(LONG linewidth, OLE_COLOR color)
     函数功能： 设置边框宽度和颜色
     参数说明：  linewidth：边框宽度， 0为无边框。
     Color： 边框颜色
     * @param linewidth
     * @param color
     * @constructor
     */
    function HWSetCtlFrame(linewidth, color) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetCtlFrame(linewidth, color);
    }


    /**
     * 设置签名图像的保存路径，确保输入路径的目标文件夹存在，若不存在，控件不创建。
     参数说明：  path：路径，支持图像格式为bmp，jpg，png，gif

     * @param flag
     * @constructor
     */
    function HWSetCtlFrame(path) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetCtlFrame(path);
    }


    /**
     * 保存文件
     * @constructor
     */
    function HWSaveFile() {
        if (!ocxObj) {
            init();
        }
        return ocxObj.HWSaveFile();
    }

    /**
     * 获取签字区域图像的base64流
     * 函数功能： 获取签字区域图像的base64流
     参数说明： flag：0 -> bmp      图像类型
     1 -> jpg
     2 -> png
     3 -> gif
     返回值：签字图像对应的base64数据流
     * @param flag
     * @constructor
     */
    function HWGetBase64Stream(flag) {
        if (!ocxObj) {
            init();
        }
        return ocxObj.HWGetBase64Stream(flag);
    }

    /**
     * 函数功能：传递与控件通信的窗口句柄值
     参数说明：hWndHandle：窗口句柄值

     * @param hWndHandle
     * @constructor
     */
    function HWSetExtWndHandle(hWndHandle) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetExtWndHandle(hWndHandle);
    }

    /**
     * HWLoadImage
     * 函数功能：給控件手写区域添加背景图片
     参数说明：pathBackImage –> 背景图片路径，当背景图片大小与控件手写区域大小不一致
     时，背景图片将被进行拉伸或缩放

     */
    function HWLoadImage(pathBackImage) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWLoadImage(pathBackImage);
    }

    /**
     * LONG HWLoadBase64Stream(VARIANT &stream)
     函数功能：给控件手写区域添加背景图片
     参数说明：stream  背景图片的Base64数据流
     返回值：见2.1。
     注：此接口仅适用于获取整个签字区域图像版本的控件。
     */
    function HWLoadBase64Stream(stream) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWLoadBase64Stream(stream);
    }

    /**
     *LONG HWIsNeedSave(void)
     *函数功能：是否有需要保存的笔迹
     参数说明：无
     返回值：  0   无笔迹          1   有笔迹
     * @constructor
     */
    function HWIsNeedSave() {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWIsNeedSave();
    }


    /**
     * 17.    void HWSetSignArea(LONG width, LONG height)
     函数功能：设置待获取的签字图像大小
     参数说明：width  签字图像的宽度
     Height  签字图像的高度
     注：此接口仅支持无窗口版本的控件。
     */
    function HWSetSignArea(width, height) {
        if (!ocxObj) {
            init();
        }
        ocxObj.HWSetSignArea(width, height);
    }

    /**
     * 函数功能：  设置签名图像的保存路径，确保输入路径的目标文件夹存在，若不存在，控件不创建。
     参数说明：  path：路径，支持图像格式为bmp，jpg，png，gif
     注：win7 / vista存在写文件权限问题，因此不支持将保存路径设置为该操作系统盘盘符下。
     * @param path
     * @constructor
     */
    function HWSetFilePath(path) {
        if (!ocxObj) {
            init();
        }
       return ocxObj.HWSetFilePath(path);
    }


    return{
        inti:init,
        HWInitialize:HWInitialize,
        HWFinalize:HWFinalize,
        HWClearPenSign:HWClearPenSign,
        HWSetPenMode:HWSetPenMode,
        HWSetPenWidth:HWSetPenWidth,
        HWSetPenColor:HWSetPenColor,
        HWSetBkColor:HWSetBkColor,
        HWSetCtlFrame:HWSetCtlFrame,
        HWSaveFile:HWSaveFile,
        HWGetBase64Stream:HWGetBase64Stream,
        HWSetExtWndHandle:HWSetExtWndHandle,
        HWLoadImage:HWLoadImage,
        HWLoadBase64Stream:HWLoadBase64Stream,
        HWIsNeedSave:HWIsNeedSave,
        HWSetSignArea:HWSetSignArea,
        HWSetFilePath:HWSetFilePath,
    }


}

