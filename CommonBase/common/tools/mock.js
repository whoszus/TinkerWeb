/**
 * 生成模拟数据
 * Created by skz on 2016/11/13.
 * http://mockjs.com/0.1/#mock
 */
define(['mock'],function (Mock) {
    Mock.mock(/\.json/, 'get', {
        'list|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
        }],
        'total|1-10': 1
    });
    Mock.mock('table.json', 'post', {
        'rows|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
        }],
        'total|1-10': 10
    });
    Mock.mock('subTable.json', 'post', {
        'rows|1-10': [{
            'id|+1': 1,
            'title': '@title(3, 5)',
            'text': '@word(5)'
        }],
        'total|1-10': 10
    });
    Mock.mock('list.json','post',{
        'list|10-20': [
            {
                'string': '@string(5)'
            }
        ]
    });

    Mock.mock('http://g.cn',{
        'name'	   : '@name()',
        'age|1-100': 100,
        'color'	   : '@color'
    });

    Mock.mock('http:c.com/mock/getTreeOrg.action',{
        'zNodes|10-30':[
            { name:"@name()",
              'open|1':true,
              'children|0-8': [
                   { name:"@name()",
                     'children|0-4': [{
                         'id|+1': 1,
                         'name|2-7':"@name()"}
                   ]}
              ]}
        ]
    });

    Mock.mock('getTreeOrg.action',{
        'zNodes|10-30':[
            { name:"@name()",
                'open|1':true,
                'children|0-8': [
                    { name:"@name()",
                        'children|0-4': [{
                            'id|+1': 1,
                            'name|2-7':"@name()"}
                        ]}
                ]}
        ]
    })

    Mock.mock('getEchartBarData.action',{
        'result|10-30':[
            { month:"@name()",
              'legend|2':[],
              'children|0-8': [
                    { name:"@name()",
                        'children|0-4': [{
                            'id|+1': 1,
                            'name|2-7':"@name()"}
                        ]}
                ]}
        ]
    })
    
    Mock.mock('getCalendarData.action',[
                                        {
        "title": "All Day Event",
        "start": "2016-11-01"
    },
    {
        "title": "Long Event",
        "start": "2016-11-07"
    },
    {
        "id": "999",
        "title": "Repeating Event dddsd 肉店发来的累死了",
        "start": "2016-11-09T16:00:00-05:00"
    },
    {
        "id": "9991",
        "title": "Repeating Event",
        "start": "2016-11-16T16:00:00-05:00"
    },
    {
        "id": "9992",
        "title": "Repeating Event",
        "start": "2016-11-16T16:00:00-05:00"
    },
    {
        "title": "Meeting",
        "start": "2016-11-12T10:30:00-05:00"
    },
    {
        "title": "Lunch",
        "start": "2016-11-12T12:00:00-05:00"
    },
    {
        "title": "Birthday Party",
        "start": "2016-11-13T07:00:00-05:00"
    },
    {
        "title": "Click for Google",
        "url": "http://google.com/",
        "start": "2016-11-28"
    }]);
    
    /*lineChart*/
    Mock.mock('getLineChart.action', {
        'chartData|1':[
            {
                'legend|2':["@word(5)"],
                'xAxisData|12':[Random.integer(1,42)],
               /* 'series|12':[{'number|1-100.1-2':1}],
                'series2|12':[{'number|1-100.1-2':1}],
                'color|1':Random.color(),*/
                'series|2':[
                    {
                        name:"@name()",
                        /*'data|12':[{'number|1-100.1-2':1}],*/
                        'data|12':[Random.float(0, 100, 0, 3)],
                        'color|1':Random.color()
                    }
                ]
            }
        ]
    });
    // 分局
    Mock.mock('getBranchCaseLineChart.action', {
        'chartData':{
                'legend|2':['@name()'],
                'xAxisData|5':['@name()'],
                'series|2':[
                    {
                        name:"@name()",
                        'data|5':[Random.float(0, 100, 0, 3)],
                        'color|1':Random.color()
                    }
                ]
            }
    });
    /*piechart*/
    Mock.mock('getPieChart.action', 'post', {
        'chartData|1':[
            {
                'legend|5':["@string(5)"],
                'pieData|5':[
                    {
                        'value|1-1000':100,
                        'name|2-3':"@string(5)"
                    }
                ],
            }
        ]
    });
    Mock.mock('getSummaryData.action', {
        'data|5':[
            {
                'total|150-600':500,
                'average|1-200':100
            }
        ]
    });
    
    // 所有案件数据
    Mock.mock('fetchAllCases.action', {
        'rows|10-100': [{
            'id|+1': 1,
            'serialNumber|2017021000001-2017021001001':2017021000001 ,
            'caseName': '@cword()',
            'policeName': '@cname()',
            'departmentID': Random.integer(1,42),
            'biluCount':  Random.integer(1,42),
            'identityCount': Random.integer(1,42),
            'createTime': Random.datetime(),
            'isFazhiReply': Random.integer(0,1)
            
        }],
        'total': Random.integer(10,100)
    });
    
    // generateCaseNo
    Mock.mock('generateSerialNumber.action', {
    	'number|2017021000001-2017021001001':2017021000001
    });
 // fetchDepartmentName
    Mock.mock('findDepartmentNameByAccountName.action', {
    	'name':'@cname()'
    });
    //findPoliceNameByPoliceNumber
    Mock.mock('findPoliceNameByPoliceNumber.action', {
    	'name':'@cname()'
    });
    
    
    // --- 导入材料
    
    // 根据被询问人名称，删除记录
    Mock.mock('removeRecordByName.action', {
    	'success':true
    });
    
    // update and save 
    Mock.mock('updateAndSave.action', {
    	'success':true
    });
    
    // TODO 获取分局列表
    Mock.mock('caseareaMonitor/fetchStationList.json',{
        'rows|20-50': [
            {
                'url': Random.image('1254x836'),
                'title': '@cname()'
            }
        ]
    });
    
    Mock.mock('caseareaMonitor/fetchPersonRealTimeInfoUrl.json',{
    	'rows|1-10': [{
    	   'camId|+1': 2,
	        'persons|1-10': [
	            {
	            	'personId|+1': 1,
	            	'snapshotTime': Random.time(),
	                'personUrl': Random.image('1254x836'),
	                'personName': '@cname()'
	            }
	        ],
	        'x|50-850': 50,
	        'y|50-800': 100
    	}
	  ]
    	
    });
});