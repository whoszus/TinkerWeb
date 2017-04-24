/**
 * Created by skz on 2016/11/6.
 */
define(function () {
    /**
     * 缓存器
     * @param capacity    缓存容量，数据条数
     * @param limit       获取数据上限，若limit === capacity时，获取容器中的所有数据
     * @constructor
     */
    function Cacher(capacity,limit){
        // cacher 容量
        this.capacity = capacity || 100;
        // 最多显示或获取的记录数
        this.limit = limit || 50;
        // 已存储的记录下标/标志
        // 没添加一条记录 自增
        this.offset = 0;
        // 数据存储容器
        this.dataSet = [];
    }
    Cacher.prototype.addRecord = function (record) {
        this.offset = this.dataSet.unshift(record);
        // 控制容量
        this.offset > this.capacity && this.removeRecord();
    };
    Cacher.prototype.removeRecord = function () {
        return this.dataSet.pop();
    };
    /**
     * 设置存储上限
     * @param limit
     */
    Cacher.prototype.setLimit = function (limit) {
        this.limit = limit;
    };
    /**
     * 获取存储上限数
     * @returns {*|number}
     */
    Cacher.prototype.getLimit = function () {
        return this.limit;
    };
    /**
     * 获取所有记录
     * @returns {*}
     */
    Cacher.prototype.getAllRecords = function () {
        return this.get();
    };
    /**
     * 获取第一条记录
     * @returns {*}
     */
    Cacher.prototype.getFirstRecord = function () {
        return this.get(0);
    };
    /**
     * 获取最后一条记录
     * @returns {*}
     */
    Cacher.prototype.getLastRecord = function () {
        return this.get[this.offset - 1];
    };
    Cacher.prototype.getCount = function () {
        return this.dataSet.length;
    };
    /**
     * 获取给定索引的记录
     * 不指定索引，则获取当前所有记录
     * 索引越位，则获取最后一条记录
     * @param index
     * @returns {*}
     */
    Cacher.prototype.get = function (index) {
       if(!index){// 获取当前所有的记录
           index = this.limit > this.offset ? this.offset : this.limit;
           return this.dataSet.slice(0,index);
       }else{
           index = index > this.offset - 1 ? this.offset - 1 : index;
           return this.dataSet[index];
       }
    };

    return Cacher;
});