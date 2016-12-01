/*
 * Copyright 2016 EPAM Systems
 *
 *
 * This file is part of EPAM Report Portal.
 * https://github.com/epam/ReportPortal
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */

define(function (require, exports, module) {
    'use strict';

    var Epoxy = require('backbone-epoxy');
    var Util = require('util');
    var $ = require('jquery');

    var ModalView = Epoxy.View.extend({
        templateWrapper: '_tpl-modal',

        show: function() {
            var self = this;
            this.closeAsync = $.Deferred();
            $('.rp-modal-dialog, .modal-backdrop').remove();
            this.$modalWrapper = $(Util.templates(this.templateWrapper, {}));
            $('body').append(this.$modalWrapper);
            $('[data-js-modal-content]', this.$modalWrapper).html(this.$el);
            Util.setupBaronScroll($('[data-js-scroll-container]', this.$modalWrapper));
            $('.baron_scroller', this.$modalWrapper).attr('data-js-cancel', true);
            this.$modalWrapper
                .modal('show')
                .click(function(e) {
                    var $target = $(e.target);
                    if ($target.is('[data-js-cancel]')) {
                        self.hide();
                    }
                }).keydown(function(e) {
                    if (e.keyCode === 27) {
                        self.hide();
                    }
                });
            this.attachKeyActions();
            return this.closeAsync;
        },
        attachKeyActions: function() {
            $(window).on('keydown.modal', function(e) {
                console.log(e);
                if((e.ctrlKey && e.keyCode === 13) || (e.metaKey && e.keyCode === 13)) {
                    this.onKeySuccess();
                }
            }.bind(this));
        },
        hide: function() {
            this.$modalWrapper && this.$modalWrapper.modal('hide');
            this.closeAsync && this.closeAsync.reject();
            this.destroy();
        },
        onKeySuccess: function () {
           this.successClose();
        },
        showLoading: function() {
            if(this.$modalWrapper){
                this.$modalWrapper.addClass('load');
                this.$modalWrapper.width();
                this.$modalWrapper.addClass('animate');
            }
        },
        hideLoading: function() {
            this.$modalWrapper && this.$modalWrapper.removeClass('load animate');
        },
        successClose: function(data) {
            this.$modalWrapper && this.$modalWrapper.modal('hide');
            this.closeAsync && this.closeAsync.resolve(data);
            this.destroy();
        },
        destroy: function() {
            $(window).off('keydown.modal');
            this.undelegateEvents();
            this.stopListening();
            this.unbind();
            delete this;
        }
    });

    return ModalView;
});