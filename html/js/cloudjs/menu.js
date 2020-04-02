cloudjs.define({
    menu: function(options){
        var defaults = $.extend({},options),
            _self = this,
            _menuLi,
            _data,
            _selectedName,
            _selectedValue,
            _isHideOther,
            _html = '',
            _type = defaults.type,
            _levelClass = (_type || 'horizontal'),
            _css = $.isPlainObject(defaults.css) ? defaults.css : {},
            _objMap = cloudjs.menu._objMap = cloudjs.menu._objMap || {},
            _onClick = $.isFunction(defaults.onClick) ? defaults.onClick : $.noop,
            DELAY_TIME = 300,
            HOVER_CLASS = 'hover',
            OBJ_ID = 'uuid';

        //绗竴绉嶈彍鍗曪紝蹇呴』鏄痷l鍏冪礌锛屾暟鎹牸寮忓繀椤籮son鏁扮粍
        if(_type === 'tree'){
            _isHideOther = typeof defaults.isHideOther === 'boolean' ? defaults.isHideOther : true;
            _selectedName = defaults.selectedName || 'href';
            _selectedValue = defaults.selectedValue;
            
            _data = defaults.data;
            if(_self.is('ul')){
                _self.addClass('menu_tree_ul').find('li').each(function(index){
                    _html = '';
                    _createHtml(_data[index]);
                    $('<ul>' + _html + '</ul>').appendTo(this);
                });
            }else{
                _html = '';
                _createHtml(_data);
                _self.append('<ul class="menu_tree_ul">' + _html + '</ul>');
            }
            _self.find('a').bind('click', function(){
                var li = $(this).parent();
                if(li.hasClass(HOVER_CLASS)){
                    li.removeClass(HOVER_CLASS).children('ul').hide();
                }else{
                    li.addClass(HOVER_CLASS).children('ul').show();
                    if(_isHideOther && $(this).next().is('ul')){
                        li.siblings().removeClass(HOVER_CLASS).children('ul').hide();
                    }
                }
                _onClick(this);
            });
        }else if(_self.is('ul')){
            _data = defaults.data;
            _menuLi = _self.addClass('menu_data_ul menu_data_' + _levelClass + '_ul').find('>li').addClass('li_level0');
            if(defaults.isPreLoad){
                _menuLi.each(function(index){
                    var self = $(this);
                    _init(self);
                });
            }
            _menuLi.bind('mouseenter', function(){
                var self = $(this), uuid = getUuid(self);
                _init(self);
                clearTimeout(_objMap['hide_' + uuid]);
               _showObj(uuid, self.find('>ul'), self, self.find('>a'));
            }).bind('mouseleave', function(){
                var self = $(this), uuid = getUuid(self);
                clearTimeout(_objMap['show_' + uuid]);
                _hideObj(uuid, self.find('>ul'), self, self.find('>a'));
            });
        }else if(_self.children().eq(0).is('ul')){ //绗簩绉嶈彍鍗曪紝绗竴涓厓绱犲繀椤绘槸ul
            _self.each(function(){
                $(this).addClass('menu_fixed_div').children().eq(0).addClass('menu_fixed_title').nextAll().addClass('menu_fixed_hide');
            });
            _bindFixedMouse(_createFixedObj(_self));
        }else{ //绗笁绉嶈彍鍗曪紝蹇呴』鍚袱涓瓙鍏冪礌锛屽墠涓€涓樉绀烘爣棰橈紝鍚庝竴涓殣钘忓唴瀹�
            _self.each(function(){
                var nextObj = $(this).addClass('menu_simple_div').children().eq(0).addClass('menu_simple_title').next().addClass('menu_simple_hide');
                if(defaults.position === 'right'){
                    nextObj.css('right', 0);
                }else if(defaults.position === 'center'){
                    nextObj.css('left', ($(this).outerWidth() - nextObj.outerWidth())/2 + 'px');
                }
            });
            _self.bind('mouseenter', function(){
                var obj = $(this).children().eq(0), uuid = getUuid($(this));
                clearTimeout(_objMap['hide_' + uuid]);
                _showObj(uuid, obj.next(), obj);
            }).bind('mouseleave', function(){
                var obj = $(this).children().eq(0), uuid = getUuid($(this));
                clearTimeout(_objMap['show_' + uuid]);
                _hideObj(uuid, obj.next(), obj);
            });
        }

        /**
         * 鍒濆鍖�
         * @param {Jquery Object} self 鑿滃崟鐨刲i瀵硅薄
         */
        function _init(self){
            var index = self.index(), data = _data[index], top1 = 0, left1 = 0;
            if(defaults.type === 'vertical'){ //绾靛悜鑿滃崟
                left1 = self.outerWidth();
                top1--;
            }else{
                left1--; 
                top1 = self.outerHeight();
            }
            top1 = (typeof _css.top1 === 'number' ? _css.top1 + top1 : top1) + 'px';
            left1 = (typeof _css.left1 === 'number' ? _css.left1 + left1 : left1) + 'px';

            if(!$.isArray(data)) return;
            _html = '';
            _createHtml(data);
            $('<ul class="menu_div' + index + '" style="display:none;">' + _html + '</ul>').css({ top: top1, left: left1 })
                .appendTo(self).find('li').bind('mouseenter', function(){
                    var self = $(this),
                        uuid = getUuid(self),
                        top2 = (typeof _css.top2 === 'number' ? _css.top2 : -1) + 'px',
                        left2 = (typeof _css.left2 === 'number' ? _css.left2 + self.outerWidth() : self.outerWidth()) + 'px';
                    clearTimeout(_objMap['hide_' + uuid]);
                    _showObj(uuid, self.find('>ul').css({ top: top2, left: left2 }), self, self.find('>a'));
                }).bind('mouseleave', function(){
                    var self = $(this), uuid = getUuid(self);
                    clearTimeout(_objMap['show_' + uuid]);
                    _hideObj(uuid, self.find('>ul'), self, self.find('>a'));
                });
            _data[index] = null;
        }

        /**
         * 鑾峰彇鍏冪礌鍞竴id鍊�
         * @param {Jquery Object} self jquery瀵硅薄
         * @return {String} 褰撳墠鐨刯query瀵硅薄鐨凮BJ_ID灞炴€у€�
         */
        function getUuid(self){
            var uuid = self.attr(OBJ_ID);
            if(!uuid){
                self.attr(OBJ_ID, cloudjs.uniq());
                uuid = self.attr(OBJ_ID);
            }
            return uuid;
        }

        /**
         * 缁戝畾榧犳爣浜嬩欢
         * @param {Jquery Object} self jquery瀵硅薄
         */
        function _bindFixedMouse(self){
            self.div.css({minHeight: self.height + 'px', width: self.width + 'px'}).find('>div').hide();
            self.li.bind('mouseenter', function(){
                var top = self.top;
                self.mIndex = $(this).index();
                $(this).addClass(HOVER_CLASS);
                if(defaults.relativeTop === 'current') top += $(this).outerHeight() * self.mIndex;
                self.div.eq(self.mIndex).css({top: top + 'px', left: (self.left - 1) + 'px'}).show();
            }).bind('mouseleave', function(){
                $(this).removeClass(HOVER_CLASS);
                self.div.hide();
            });
            self.div.bind('mouseenter', function(){
                $(this).show();
                self.li.eq(self.mIndex).addClass(HOVER_CLASS);
            }).bind('mouseleave', function(){
                $(this).hide();
                self.li.eq(self.mIndex).removeClass(HOVER_CLASS);
            });
        }

        /**
         * 缁戝畾榧犳爣浜嬩欢
         * @param {Jquery Object} self jquery瀵硅薄
         * @return {Object} 瀵硅薄
         */
        function _createFixedObj(self){
            var ul = self.find('>ul'), height = defaults.relativeTop === 'current' ? 50 : ul.outerHeight() - 2;
            return {
                ul: ul,
                li: ul.find('>li'),
                div: self.find('>div'),
                width: _css.width || 500,
                height: _css.height || height,
                top: _css.top || 0,
                left: _css.left || ul.outerWidth(),
                mIndex: null
            };
        }

        /**
         * 鎶婂璞℃暟缁勭敓鎴愬搴旂殑html鍏冪礌
         * @param {Array} data 瀵硅薄鏁扮粍
         */
        function _createHtml(data){
            for(var i = 0; i < data.length; i++){
                var obj = data[i],
                    selected = obj.isOpen ? HOVER_CLASS : '',
                    className = obj.className ? ' class="' + obj.className + ' ' + selected + '"' : ' class="' + selected + '"',
                    href = obj.href ? ' href="' + obj.href + '"' : '',
                    target = obj.target ? ' target="' + obj.target + '"' : '',
                    children = obj.children;
                if(_selectedValue && _selectedValue === obj[_selectedName]) target += ' class="selected"';
                _html += '<li' + className + '><a' + href + target + '>' + obj.text + '</a>';
                if(!$.isArray(children) || children.length === 0){
                    _html += '</li>';
                }else{
                    if(_type !== 'tree') _html += '<span class="cloudjs_icon"></span>';
                    if(obj.isOpen){
                        _html += '<ul>';
                    }else{
                        _html += '<ul style="display:none;">';
                    }
                    _createHtml(children);
                    _html += '</ul></li>';
                }
            }
        }

        /**
         * 寤惰繜鏄剧ず瀵硅薄
         * @param {String} uuid 鍞竴id
         * @param {Jquery Object} self 瑕佹樉绀虹殑jquery瀵硅薄
         * @param {Jquery Object}  瑕佹坊鍔燞OVER_CLASS鐨刯query瀵硅薄锛屽彲浠ユ槸澶氫釜
         */
        function _showObj(uuid, self){
            var args = arguments, len = args.length;
            _objMap['show_' + uuid] = setTimeout(function(){
                self.show();
                while(len > 2){
                    len--;
                    args[len].addClass(HOVER_CLASS);
                }
            }, DELAY_TIME);
        }

        /**
         * 寤惰繜闅愯棌瀵硅薄
         * @param {String} uuid 鍞竴id
         * @param {Jquery Object} self瑕侀殣钘忕殑jquery瀵硅薄
         * @param {Jquery Object}  瑕佺Щ闄OVER_CLASS鐨刯query瀵硅薄锛屽彲浠ユ槸澶氫釜
         */
        function _hideObj(uuid, self){
            var args = arguments, len = args.length;
            _objMap['hide_' + uuid] = setTimeout(function(){
                self.hide();
                while(len > 2){
                    len--;
                    args[len].removeClass(HOVER_CLASS);
                }
            }, DELAY_TIME);
        }
        
        cloudjs.callback(_self);
    }
});/*  |xGv00|7e850dfe8232891cd446fb9e67150046 */