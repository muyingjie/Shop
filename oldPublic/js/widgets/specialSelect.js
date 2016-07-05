define(function (require, exports, module) {
    

    
    (function($) {
        var SpecialSelect;

        SpecialSelect = SpecialSelect || function(dom, opt) {
            this.opt = opt;
            this.dom = dom;
            this.$dom = $(dom);
        };

        SpecialSelect.fn = SpecialSelect.prototype;

        SpecialSelect.fn.close = SpecialSelect.fn.close || function() {
            this.$dom.find('>span').removeClass('sel');
            this.$dom.find('div').add(this.$dom.find('dl')).hide();
        };

        SpecialSelect.fn.pushData = SpecialSelect.fn.pushData || function(vals) {
            var html = '';
            var opt = this.opt;

            vals.forEach(function(val) {
                if(opt.hasCheckBox) html += '<dd v="' + val.value + '"><i></i>' + val.text + '</dd>';
                else html += '<dd v="' + val.value + '">' + val.text + '</dd>'; 
            });

            this.$dom.find('dl').html(html);
        };

        SpecialSelect.fn.setValue = SpecialSelect.fn.setValue || function(val) {
            var val,
                text;

            if(val == '') {
                text = this.$dom.data('opt') ? (this.$dom.data('opt').defaultText || '请选择') : '请选择';
            } else {
                this.$dom.find('dl dd').each(function(i, dom) {
                    if($(this).attr('v') == val) text = $(this).text();
                });
            }

            this.$dom.trigger('sltChange', {text: text, value: val});
        };

        SpecialSelect.fn.getValue = SpecialSelect.fn.getValue || function() {
            return this.$dom.find('>span').attr('v');
        };
    
        $.fn.specialSelect = function(options) {
            
            var args = arguments;

            

            if(options == 'setValue') {
                this.each(function(i, dom) {
                    (new SpecialSelect($(this)[0])).setValue(args[1]);
                });

                return;
            }

            if(options == 'getValue') {
                return (new SpecialSelect($(this)[0])).getValue();
            }

            this.each(function(i, dom) {
                var opt,
                    _default,
                    showEvent,
                    hideEvent,
                    $this = $(this),
                    _instance,
                    _options;

                _options = options || {};
                _default = {
                    vals: [],
                    mouseoverShow: false,
                    closeList: false,
                    onlyShow: true,
                    footerHandler: $.noop,
                    clear: $.noop,
                    hasCheckBox: true
                };
                opt = $.extend(true, _default, _options);

                showEvent = opt.mouseoverShow ? 'mouseover' : 'click';
                hideEvent = opt.mouseoverShow ? 'mouseout' : 'click';

                $this.addClass('js_specialSelect');
                $this.data('opt', opt);
                _instance = new SpecialSelect($this[0], opt);

                if(opt.vals.length) _instance.pushData(opt.vals);

                $this.off(showEvent+'.specialSelect').on(showEvent+'.specialSelect', function(e) {
                    $('.js_specialSelect').find('>span').removeClass('sel');
                    $('.js_specialSelect').find('div').add($('.js_specialSelect').find('dl')).hide();
                    $this.find('>span').addClass('sel');
                    $this.find('div').add($this.find('dl')).show();

                    e.stopPropagation();
                });

                if(opt.mouseoverShow) {
                    $this.off(hideEvent+'.specialSelect').on(hideEvent+'.specialSelect', function() {
                        $this.find('>span').removeClass('sel');
                        $this.find('div').add($this.find('dl')).hide();
                    });
                }

                $this.off('sltChange').on('sltChange', function(e, val) {
                    if(opt.closeList) $this.find('div').add($this.find('dl')).hide();

                    if(!opt.onlyShow) $this.find('>span').text(val.text);
                    $this.find('>span').attr('v', val.value);
                    $this.find('input:hidden').val(val.value);
                });

                $this.off('click.change.specialSelect').on('click.change.specialSelect', 'dl dd', function(e) {
                    var _text,
                        _val;

                    _text = $(this).text();
                    _val = $(this).attr('v');

                    $this.trigger('sltChange', [{text: _text, value: _val}, $this[0]]);

                    e.stopPropagation();
                });

                $this.find('dl').next('a').off('click.footer.specialSelect').on('click.footer.specialSelect', function(e) {
                    var instance = new SpecialSelect($this[0]);

                    instance.close();
                    e.preventDefault();
                    e.stopPropagation();
                    opt.footerHandler.call(instance);
                });

                opt.clear.call(new SpecialSelect($this[0]));
            });

            $(document).off('click.closeSpecialSelect').on('click.closeSpecialSelect', function() {
                $('.js_specialSelect').find('>span').removeClass('sel');
                $('.js_specialSelect').find('div').add($('.js_specialSelect').find('dl')).hide();
            });
        };
    })($);
});
