cloudjs.define({
    totop: function(options){
        var defaults = {
            bottom: 0,  //鐩稿灞忓箷搴曢儴鐨勮窛绂�
            right: 0,   //鐩稿灞忓箷鍙充晶鐨勮窛绂�
            isScroll: true,  //鏄惁鍦ㄦ粴鍔ㄦ潯鍚戜笅婊氬姩鏃舵墠鍑虹幇
            scrollHeight: 200,  //婊氬姩鍒板楂樻椂鎵嶅嚭鐜�
            img: '//mat1.gtimg.com/xian/commonimg/totop.png',  //榛樿灞曠ず鐨勫浘鐗�
            hoverImg: ''   //hover鐘舵€佷笅灞曠ず鐨勫浘鐗�
        };
        $.extend(defaults,options);
        var _self,
            _scrollHeight = defaults.scrollHeight,
            _img = defaults.img,
            _hoverImg = defaults.hoverImg,
            _totopHtml = '<a href="#" style="dispaly:none;z-index:99999;position:fixed;bottom:' + defaults.bottom + 'px;right:' + defaults.right + 'px';
        if(_hoverImg){
            _totopHtml += '">';
        }else{
            _totopHtml += ';opacity:0.7;filter:alpha(opacity=70);">';
        }
        _totopHtml += '<img style="float:left;" src="' + _img + '" /></a>';
        
        _self = $(_totopHtml).appendTo('body');
        
        if(defaults.isScroll){
            if($(document).scrollTop() > _scrollHeight){
                _self.show();
            }else{
                _self.hide();
            }
            $(window).scroll(function(){ 
                
                if($(document).scrollTop() > _scrollHeight){
                    _self.show();
                }else{
                    _self.hide();
                }
            });
        }else{
            _self.show();
        }
        _self.hover(
            function(){
                hoverTop(this, 1);
            },
            function(){
                hoverTop(this, 0.7);
            }
        );
        
        /**
         * hover鏁堟灉
         * @param {Object} obj hover瀵硅薄
         * @param {Number} alpha 閫忔槑搴�
         */
        function hoverTop(obj, alpha){
            if(_hoverImg){
                if(alpha === 1){
                    $(obj).find('img').attr('src', _hoverImg);
                }else{
                    $(obj).find('img').attr('src', _img);
                }
            }else{
                $(obj).css({ opacity: alpha, filter: 'alpha(opacity=' + alpha*100 + ')' });
            }
        }
    }
});/*  |xGv00|724806cc898055c6c1efdc7c6ed60425 */