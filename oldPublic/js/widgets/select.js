define(function (require, exports, module) {
    

    if(typeof Array.prototype.forEach == 'undefined') {
        Array.prototype.forEach = function(callback) {
          for(var i=0,j=this.length; i<j; i++) {
            callback.call(this, this[i], i);
          }
        };
    }
    
    $.fn.select = function(options) {
        var that = this;
        var _arg = arguments;
        var _default = {
            onlyShow: true,
            vals: [],
            topShow: false,
            mouseoverShow: false
        };

        var tmpl = '<span></span>'
            +'<input type="hidden" name="">'
            +'<i></i>'
            +'<ul style="display: none;"></ul>';

        var opt;
        if(typeof options == 'object') {
            opt = $.extend(true, _default, options);
        } else {
            opt = _default;
        }

        if(typeof options != 'string') {
            $(this).data('opt', opt).addClass('js_select');
        }

        if(opt && !opt.onlyShow) {
            if(opt && (typeof $(this).find('input:hidden').val() != 'undefined') && $(this).find('input:hidden').val() != '') {
                opt.setValue = $(this).find('input:hidden').val();
            } else if(!opt && (typeof $(this).find('input:hidden').val() != 'undefined') && $(this).find('input:hidden').val() != '') {
                options = 'setValue';
                _arg[1] = arguments[1] = $(this).find('input:hidden').val();
            }
        }

        if(options == 'getValue') {
            return $(this).eq(0).find('>span').attr('v');
        }

        this.each(function(i, dom) {
            var $this = $(this);
            var $content;
            var html = '';

            if(!$this.html().replace(/\s+/, '')) {
                $(this).html(tmpl);
                $(this).addClass('text-oper select');
            }

            $content = $(this).find('ul');

            if(opt && opt.selectWidth) {
                $this.css('width', opt.selectWidth);
            }

            if(opt && opt.autoWidth && opt.minWidth) {
                $this.css({'width': 'auto', 'min-width': opt.minWidth});
            }

            if(opt && opt.topShow) {
                var tpl = $this.css('border-radius')?$this.css('border-radius').split(' ').reverse().join(' '):"none"
                $content.css({'bottom': $this.height(), 'border-top': 'inherit', 'border-bottom': '1px solid #fff', 'border-radius':tpl});
            }

            $this.off('sltChange.select').on('sltChange.select', function(e, valObj) {
                if($this.data('opt') && !$this.data('opt').onlyShow) {
                    $this.find('span').text(valObj.text);
                } else if(!$this.data('opt')) {
                    $this.find('span').text(valObj.text);
                }
                $this.find('span').attr('v', valObj.value);
                $this.find('input[type="hidden"]').val(valObj.value);
            });

            //设置value
            if(options == 'setValue') {
                var _text;
                var _val = _arg[1];

                if(_val == '') {
                    _text = ($(this).data('opt') && $(this).data('opt').defaultText) || '请选择';
                } else {
                    $content.find('li').each(function(i, dom) {
                        if($(this).attr('v') == _val) _text = $(this).text();
                    });
                }
                $this.trigger('sltChange', {text: _text, value: _val});

                return;
            } else {
                var _obj = {},
                    _text,
                    _val;

                if($(this).find('ul li[selected]')[0]) {
                    _text = $(this).find('ul li[selected]').text();
                    _val = $(this).find('ul li[selected]').attr('v');
                    _obj.text = _text;
                    _obj.value = _val;

                    $this.trigger('sltChange', _obj);
                }
            }

            (function() {
                var _text,
                    _val;

                _val = $this.find('input:hidden').val();
                if(_val == '') {
                    _text = $this.data('opt').defaultText || '请选择';
                } else {
                    $this.find('ul').find('li').each(function(i, dom) {
                        if($(this).attr('v') == _val) _text = $(this).text();
                    });
                }
                $this.trigger('sltChange', {text: _text, value: _val});
            })();

            if(opt && opt.vals.length) {
                opt.vals.forEach(function(val) {
                    html += '<li v="'+ val.value +'">'+ val.text +'</li>'
                });

                $content.empty().html(html);
            }

            $this.off('mouseenter.select').on('mouseenter.select', function() {
                $(this).addClass('sel');

                if(opt && opt.mouseoverShow) {
                    $('.js_select').removeClass('sel').find('ul').hide();
                    $(this).addClass('sel');
                    $content.show();
                }
            });

            $this.off('mouseleave.select').on('mouseleave.select', function() {
                if(!$(this).find('ul').is(':visible')) $(this).removeClass('sel');

                if(opt && opt.mouseoverShow) {
                    $('.js_select').removeClass('sel').find('ul').hide();
                    $(this).removeClass('sel');
                    $content.hide();
                }
            });

            if(!opt || (opt && !opt.mouseoverShow)) {
                $this.off('click.select').on('click.select', function(e) {
                    $('.js_select').removeClass('sel').find('ul').hide();
                    $(this).addClass('sel');
                    $content.show();

                    $(this).next('.err-tip').hide();

                    e.stopPropagation();
                });
            }

            $content.off('click.clickSelect').on('click.clickSelect', 'li', function(e) {
                var valObj = {};

                valObj.text = $(this).text();
                valObj.value = $(this).attr('v');

                $content.hide();
                $this.removeClass('sel');

                $this.trigger('sltChange', valObj);

                e.stopPropagation();
            });

            if(opt && (typeof opt.setValue != 'undefined')) {
                var _text;
                var _val = opt.setValue;

                $content.find('li').each(function(i, dom) {
                    if($(this).attr('v') == _val) _text = $(this).text();
                });
                $this.trigger('sltChange', {text: _text, value: _val});
            }
        });

        if(opt && !opt.mouseoverShow) {
            $(document).off('click.closeSelect').on('click.closeSelect', function(e) {
                if($(e.target).closest('.js_select').get(0) && !$(e.target).closest('.js_select').data('opt').mouseoverShow) {
                    that.removeClass('sel').find('ul').hide();
                    $('.js_select').removeClass('sel').find('ul').hide();
                } else if(!$(e.target).closest('.js_select').get(0)) {
                    that.removeClass('sel').find('ul').hide();
                    $('.js_select').removeClass('sel').find('ul').hide();
                }
            });
        }

        $(this).closest('form').off('reset.select').on('reset.select', function() {
            $(this).find('.js_select').each(function(i, dom) {
                var _val;

                _val = $(this).find('ul li[selected]').attr('v') || '';
                $(this).select('setValue', _val);
            });
        });

        return this;
    };
});
