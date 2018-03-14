/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);
var stacks = {};
stacks.jQuery = jQuery.noConflict(true);
stacks.com_joeworkman_stacks_foundation_styles_s3 = {};
stacks.com_joeworkman_stacks_foundation_styles_s3 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery; jQuery.fn.exists=function(){return jQuery(this).length>0;}
jQuery.debug=function(msg,obj){if(window.debug===true&&window.console&&console.log){console.log('[jwstacks] '+msg);if(obj)console.log(obj);}};jQuery.isMobile=function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch;};var triggerWindowResize=function(){$(window).trigger('resize')};if(typeof(orientationEvent)==undefined){var orientationEvent=0;}
$(window).bind(orientationEvent,triggerWindowResize).load(triggerWindowResize);jQuery.clearBrowserCache=function(){$(window).bind("pageshow",function(event){if(event.originalEvent.persisted){window.location.reload()}});};jQuery.preloadImages=function(){for(var i=0;i<arguments.length;i++){$("<img />").attr("src",arguments[i]);}};
!function(a,b){"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(a,b):this[a]=b()}("vein",function(){var a=function(){},b=function(a){a=a||{};for(var b=1;b<arguments.length;b++)if(arguments[b])for(var c in arguments[b])arguments[b].hasOwnProperty(c)&&(a[c]=arguments[b][c]);return a},c=function(a,b,c){var d,e,f=[],g=b[document.all?"rules":"cssRules"],h=a.replace(/\s/g,"");for(d=0,e=g.length;e>d;d++)(g[d].selectorText===a||4===g[d].type&&g[d].cssText.replace(/\s/g,"").substring(0,h.length)==h)&&(null===c?b.deleteRule(d):f.push(g[d]));return f},d=function(a){cssArray=[];for(property in a)a.hasOwnProperty(property)&&cssArray.push(property+": "+a[property]+";");return cssText=cssArray.join(""),cssText};a.getStylesheet=function(){var a,b=this;if(!b.element||!document.getElementById("vein"))for(b.element=document.createElement("style"),b.element.setAttribute("type","text/css"),b.element.setAttribute("id","vein"),document.getElementsByTagName("head")[0].appendChild(b.element),a=document.styleSheets.length-1;a>=0;a--)if(document.styleSheets[a].ownerNode===b.element){b.stylesheet=document.styleSheets[a];break}return b.stylesheet};var e=function(a){return a[document.all?"rules":"cssRules"]},f=function(a,b,c){var d=e(c);if(c.insertRule)try{c.insertRule(a+"{"+b+"}",d.length)}catch(f){"IndexSizeError"===f.message&&c.insertRule(a+"{"+b+"}",0)}else c.addRule(a,b,d.length)};return a.inject=function(a,g,h){h=b({},h);var i,j,k,l,m,n,o,p,q,r,s=this,t=h.stylesheet||s.getStylesheet();e(t);for("string"==typeof a&&(a=[a]),i=0,j=a.length;j>i;i++)if("object"==typeof a[i]&&t.insertRule)for(k in a[i])if(l=c(k,t,g),0===l.length)for(m=d(g),q=0,r=a[i][k].length;r>q;q++)f(k,a[i][k][q]+"{"+m+"}",t);else for(o=0,p=l.length;p>o;o++)s.inject(a[i][k],g,{stylesheet:l[o]});else{if(l=c(a[i],t,g),null===g)return;if(0===l.length)m=d(g),f(a[i],m,t);else for(o=0,p=l.length;p>o;o++)for(n in g)g.hasOwnProperty(n)&&l[o].style.setProperty(n,g[n],"")}return s},a});

return stack;})(stacks.com_joeworkman_stacks_foundation_styles_s3);
stacks.com_joeworkman_stacks_foundation_topbar_s3 = {};
stacks.com_joeworkman_stacks_foundation_topbar_s3 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;;(function($){"use strict";var version='20140730.1100',debug=function(msg,obj){if(window.debug===true&&window.console&&console.log){console.log('[rwflexnav] '+msg);if(obj)console.log(obj);}};$.fn.divideNav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});var container=$(this);$('> li.'+opts.className.divider,container).remove();var items=$('> li',container);$('<li>').addClass(opts.className.divider).insertBefore(items);$('<li>').addClass(opts.className.divider).insertAfter(items.last());return $(container);};$.fn.hackRWFlexNav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});var container=$(this);$('> ul.'+opts.className.menu,container).first().removeClass(opts.className.dropdown).find('ul').removeClass(opts.className.menu);$('> ul.'+opts.className.menu,container).find('li').each(function(){if($(this).find('ul').length===0)$(this).removeClass(opts.className.hasDropdown);});return $(container);};$.fn.processRWFlexNav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});var container=$(this);$('li a header',container).parent().attr('href','javascript:void(0)').parent().addClass(opts.className.heading);$('li a label',container).unwrap();$('li a button',container).each(function(){var classes=$(this).attr('class');var text=$(this).text();$(this).parent().addClass(opts.className.button).addClass(classes).html(text).parent().addClass(opts.className.hasButton);});$('li a hr',container).unwrap().parent().addClass(opts.className.divider).html('');return $(container);};$.fn.rwflexnav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});return this.each(function(){if($('> ul.'+opts.className.menu,this).length===0){console.error('RWFlexNav Aborting! Unable to locate menu with class "'+opts.className.menu+'"');return false;}
var method=$.fn.rwflexnav[opts.scope],container=typeof method==='function'?method(opts,this):false;if(opts.hackNav)container.hackRWFlexNav(opts);container.processRWFlexNav(opts);if(opts.divide)$('> ul.'+opts.className.menu,container).divideNav(opts);debug('Processing Complete',container);return $(container);});};$.fn.rwflexnav.all=function(opts,container){return $(container);};$.fn.rwflexnav.top=function(opts,container){$('> ul.'+opts.className.menu,container).find('ul').remove();return $(container);};$.fn.rwflexnav.subnav=function(opts,container){var menu=$('> ul.'+opts.className.menu,container).first(),submenu=$('> ul.'+opts.className.menu+'> li:nth-child('+opts.subNavIndex+') > ul',container),classes=menu.attr('class');debug('Scope SubNav',submenu);if(submenu.length===0){console.error('RWFlexNav Error! No subnav found at index '+opts.subNavIndex);}
else{submenu.addClass(opts.className.menu).addClass(classes).insertAfter(menu);submenu.find('>li.js-generated').remove();menu.remove();}
return $(container);};$.fn.rwflexnav.active=function(opts,container){var menu=$('> ul.'+opts.className.menu,container).first(),submenu=$('> ul.'+opts.className.menu+' > li.'+opts.className.active+' > ul',container),classes=menu.attr('class');debug('Scope Active',submenu);if(submenu.length===0){console.error('RWFlexNav Error! No active subnav found with class "'+opts.className.active+'"');}
else{submenu.addClass(opts.className.menu).addClass(classes).insertAfter(menu);submenu.find('>li.js-generated').remove();menu.remove();}
return $(container);};$.fn.rwflexnav.defaults={scope:'all',hackNav:true,divide:false,subNavIndex:0,className:{menu:'menu',heading:'heading',divider:'divider',active:'active',dropdown:'dropdown',button:'button',hasButton:'has-form',hasDropdown:'has-dropdown'}};})(jQuery);

return stack;})(stacks.com_joeworkman_stacks_foundation_topbar_s3);
stacks.stacks_in_p227_n1_page12 = {};
stacks.stacks_in_p227_n1_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;
document.documentElement.lang='en';stacks.fInit=function(stack){return stack;}
window.wowjsmobile=true;window.revealAnimation='fadeAndPop';window.revealNoScroll=false;$(document).on('opened.fndtn.reveal','[data-reveal]',function(){$(window).trigger('resize')});$(document).ready(function(){if($.isMobile()){$('.show-for-touch').fadeIn('fast');$("a[data-dropdown],a.menu-icon,a.touchfix").on('touchend',function(){$(this).trigger('click')});}});var useCustomSelector='False',stacksTrue='True',headerFamily='Open Sans'==='custom'?'':"Open Sans",headerFamilyFallback='sans-serif',headerSelector='h1'+',.font-family-h1',headerStyle='normal',headerGoogle=headerFamily==='Open Sans'?stacksTrue:'Open Sans'==='custom'?'False':'false',headerWeight=headerStyle==='italic'?'300italic':'300',headerWeight=headerWeight+',400'.replace(/\s/g,''),header2Family='Open Sans'==='custom'?'':'Open Sans',header2FamilyFallback='sans-serif',header2Selector='h2, h3, h4, h5, h6'+',.font-family-h2',header2Style='normal',header2Google=header2Family==='Open Sans'?stacksTrue:'Open Sans'==='custom'?'False':'false',header2Weight=header2Style==='italic'?'600italic':'600',header2Weight=header2Weight+',400'.replace(/\s/g,''),fontFamily='Open Sans'==='custom'?'':'Open Sans',fontFamilyFallback='sans-serif',fontSelector='p'+',.font-family-text',fontGoogle=fontFamily==='Open Sans'?stacksTrue:'Open Sans'==='custom'?'False':'false',fontWeight='400,400'.replace(/\s/g,''),getGoogleUrls=function(fontStore){var googleFonts=[];for(var family in fontStore){var weights=fontStore[family].join().replace(/,,/g,',').replace(/,$/,'');googleFonts.push('https://fonts.googleapis.com/css?family='+family+':'+weights);}
return googleFonts;},isGFont=function(family,google){if(google===stacksTrue)return family;return false;},getGoogleFonts=function(data){var fonts=data.fonts,weights=data.weights,google=data.google,fontStore=new Object();for(var i=0;i<fonts.length;i++){if(isGFont(fonts[i],google[i])===false)continue;(fontStore[fonts[i]]=fontStore[fonts[i]]||[]).push(weights[i]);}
return getGoogleUrls(fontStore);};headerFamily=$.trim(headerFamily);header2Family=$.trim(header2Family);fontFamily=$.trim(fontFamily);var cssFontFiles=getGoogleFonts({fonts:[headerFamily,header2Family,fontFamily],weights:[headerWeight,header2Weight,fontWeight],google:[headerGoogle,header2Google,fontGoogle]});for(var i=0;i<cssFontFiles.length;i++){loadCSS(decodeURIComponent(cssFontFiles[i]));}
if(useCustomSelector===stacksTrue){fontFamily='"'+fontFamily+'"';headerFamily='"'+headerFamily+'"';header2Family='"'+header2Family+'"';var customFontStyles={'font-family':[fontFamily,fontFamilyFallback].join()+'!important','font-weight':fontWeight.split(',')[0]+'!important'},customHeaderSyles={'font-family':[headerFamily,headerFamilyFallback].join()+'!important','font-weight':headerWeight.split(',')[0]+'!important','font-style':headerStyle+'!important'},customHeader2Syles={'font-family':[header2Family,header2FamilyFallback].join()+'!important','font-weight':header2Weight.split(',')[0]+'!important','font-style':header2Style+'!important'};if(fontFamily!=='fontpro'){$.debug('Custom Font Selectors:'+fontSelector,customFontStyles);vein.inject(fontSelector,customFontStyles);}
if(headerFamily!=='fontpro'){$.debug('Custom Header Selectors:'+headerSelector,customHeaderSyles);vein.inject(headerSelector,customHeaderSyles);}
if(header2Family!=='fontpro'){$.debug('Custom Header2 Selectors:'+header2Selector,customHeader2Syles);vein.inject(header2Selector,customHeader2Syles);}}

return stack;})(stacks.stacks_in_p227_n1_page12);
stacks.stacks_in_p228_n1_page12 = {};
stacks.stacks_in_p228_n1_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery; var subNavIndex=1,divide=1,zoneDivider=1,fullWidthMenu='full-width',scope='all',style='solid',menuAlign='left',styleActive=''==='styleActive'?true:false,rwmenu='rw'==='rw'?true:false,magellan='rw'==='magellan'?true:false,dropdowns='#stacks_in_p228_n1_page12 ul:not(.title-area) li.has-dropdown';$(document).ready(function(){var stack=$('#stacks_in_p228_n1_page12');stack.parent().css({overflow:'visible'});$('.top-bar-section:not(.menu-magellan):not(.menu-none)',stack).rwflexnav({scope:scope,subNavIndex:subNavIndex,divide:divide});if(magellan){if(divide)$('ul.magellanList',stack).divideNav();$('.magellanList li',stack).each(function(){var id=$(this).data('magellan-arrival');$('a',this).attr('href','#'+id);});}
if($('ul.zone',stack).exists()){if(zoneDivider)$('ul.zone',stack).divideNav();}
if($('.zone-align-left ul.zone',stack).exists()||!$('ul.zone',stack).exists()){$('ul.menu',stack).addClass(menuAlign);}
if(fullWidthMenu==='full-width'&&menuAlign==='centered'){var calcMenuItemWidth=function(){var items=$('.menu-align-centered ul.menu > li:not(.divider)',stack),dividers=$('.menu-align-centered ul.menu > li.divider',stack);if($('.top-bar .toggle-topbar',stack).is(':visible')){items.removeAttr('style');}
else{var count=items.length;if(count>0){var width=dividers.length>0?100/count-0.2:100/count;items.width(width+"%");}}};calcMenuItemWidth();$(window).on('resize',calcMenuItemWidth);}
$(dropdowns).hover(function(){$('> a:not(.button)',this).addClass('hovered');},function(){$('> a:not(.button)',this).removeClass('hovered');});});$(window).load(function(){var stack=$('#stacks_in_p228_n1_page12');if('9999px'==='62.563em'){$('.parent-link.hide-for-medium-up',stack).removeClass('hide-for-medium-up').addClass('hide-for-large-up');}
else if('9999px'==='9999px'){$('.parent-link.hide-for-medium-up',stack).removeClass('hide-for-medium-up');}});

return stack;})(stacks.stacks_in_p228_n1_page12);
stacks.stacks_in_p228_n14_page12 = {};
stacks.stacks_in_p228_n14_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;




return stack;})(stacks.stacks_in_p228_n14_page12);
stacks.stacks_in_p228_n15_page12 = {};
stacks.stacks_in_p228_n15_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;




return stack;})(stacks.stacks_in_p228_n15_page12);
stacks.stacks_in_p228_n16_page12 = {};
stacks.stacks_in_p228_n16_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;




return stack;})(stacks.stacks_in_p228_n16_page12);
stacks.stacks_in_p228_n17_page12 = {};
stacks.stacks_in_p228_n17_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;




return stack;})(stacks.stacks_in_p228_n17_page12);
stacks.stacks_in_p228_n18_page12 = {};
stacks.stacks_in_p228_n18_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;




return stack;})(stacks.stacks_in_p228_n18_page12);
stacks.stacks_in_p228_n22_page12 = {};
stacks.stacks_in_p228_n22_page12 = (function(stack) {
var jQuery = stacks.jQuery;var $ = jQuery;




return stack;})(stacks.stacks_in_p228_n22_page12);