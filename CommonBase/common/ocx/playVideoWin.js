/**
 * 播放视频弹窗
 */
var playVideoWin = function() {
	var classId= "clsid:B0D616B7-E0D0-40BA-A379-B550A9C4E478";
	var obj = '<object classid='+classId+' id="playWinOcx" width="98%" height="98%" style="margin:1%;" ></object>';
	var popupWin = null;
	function caretePopupWin() {
		    popupWin = new $.fWin({
			contentHtml : obj,
			modal :true,
			width:500,
			height:400,
			needFooter : false,
			title : '播放窗口',
			afterRender : function(){
				this.ocx = new ocxPanel({nRecordSummaryTask : 1,ocxID:"playOcxID",ocxType : 2,defaultScreen :1,nToolbarType:4,targetDom :$('#playWinOcx')[0]});
				this.ocx.init();
			},
			afterShow : function(){
				this.ocx.changeViewSplit(1);
			},
			onBeforeHide : function(){
				this.ocx.closeVideo(-1);
			},
			afterHide : function(){
				
			},
			closeVideo : function(){
				this.ocx.closeVideo(-1);
				this.close();
			}
		});  
		return popupWin;	
	}
	function playerEvent(data){
		if(data.action =="ReplayRecord"){
			if(data.code != 0){
				popupWin.hide();
				$.gmsg({contentHtml:'播放失败!',delayTime:2000,theme:'danger'});
			}
		}else if(data.action =="StopReplayRec"){
			popupWin.settings.ocx.closeVideo(data.data.nIndex);
		}
	}
	return {
		caretePopupWin : caretePopupWin,
		playerEvent : playerEvent
	}
}