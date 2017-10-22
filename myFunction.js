var EventUtil = {

    // 事件处理程序
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            // DOM2级事件处理程序
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            // IE事件处理程序
            element.attachEvent("on" + type, handler);
        } else {
            // DOM0级事件处理程序
            element["on" + type] = handler;
        }
    },

    // 获取event对象的引用
    getEvent: function(event) {
        return event ? event : window.event;
    },

    // 获取事件目标
    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    // 取消事件默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnVaule = false;
        }
    },

    // 事件删除程序
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            // DOM2级事件删除程序
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            // IE事件删除程序
            element.detachEvent("on" + type, handler);
        } else {
            // DOM0级事件删除程序
            element["on" + type] = handler;
        }
    },

    // 取消事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 获取相关元素
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },

    // 获取鼠标按钮
    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },

    // 获取鼠标滚轮增量值
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ?
                -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },

    // 获取字符编码
    getCharCode: function(event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};

// 选取文本内容
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}

// 获取client大小
function getViewport() {
    if (document.compatMode == "BackCompat") {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}

// 获取scroll大小
function getPagearea() {
    if (document.compatMode == "BackCompat") {
        return {
            width: Math.max(document.body.scrollWidth, document.body.clientWidth),
            height: Math.max(document.body.scrollHeight, document.body.clientHeight)
        };
    } else {
        return {
            width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
        };
    }
}

// 获取元素的绝对位置的横坐标
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
}

// 获取元素的绝对位置的纵坐标
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

// 获取元素的相对位置的横坐标
function getElementViewLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    if (document.compatMode == "BackCompat") {
        var elementScrollLeft = document.body.scrollLeft;
    } else {
        var elementScrollLeft = document.documentElement.scrollLeft;
    }

    return actualLeft - elementScrollLeft;
}

// 获取元素的相对位置的纵坐标
function getElementViewTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    if (document.compatMode == "BackCompat") {
        var elementScrollTop = document.body.scrollTop;
    } else {
        var elementScrollTop = document.documentElement.scrollTop;
    }

    return actualTop - elementScrollTop;
}

// 创建柯里化函数
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

// 链式setTimeout()
setTimeout(function() {
    // 处理中
    setTimeout(arguments.callee, interval);
}, interval);

// 实现数组分块的函数
function chunk(array, process, context) {
    setTimeout(function() {
        // shift()用于删除数组中的第一个元素，并返回第一个元素的值
        var item = array.shift();
        process.call(context, item);
        if (array.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

// 创建自定义事件
function EventTarget() {
    this.handlers = {};
}
EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler) {
        if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};

// 实现拖放功能
var DragDrop = function() {
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event) {
        // 获取事件和目标
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        // 确定事件类型
        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({ type: "dragstart", target: dragging, x: event.clientX, y: event.clientY });
                }
                break;
            case "mousemove":
                if (dragging !== null) {
                    // 指定位置
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    // 触发自定义事件
                    dragdrop.fire({ type: "drag", target: dragging, x: event.clientX, y: event.clientY });
                }
                break;
            case "mouseup":
                dragdrop.fire({ type: "dragend", target: dragging, x: event.clientX, y: event.clientY });
                dragging = null;
                break;
        }
    };
    // 公共接口
    dragdrop.enable = function() {
        EventUtil.addHandler(document, "mousedown", handleEvent);
        EventUtil.addHandler(document, "mousemove", handleEvent);
        EventUtil.addHandler(document, "mouseup", handleEvent);
    };
    dragdrop.disable = function() {
        EventUtil.removeHandler(document, "mousedown", handleEvent);
        EventUtil.removeHandler(document, "mousemove", handleEvent);
        EventUtil.removeHandler(document, "mouseup", handleEvent);
    };
    return dragdrop;
}();
DragDrop.addHandler("dragstart", function(event) {
    var status = document.getElementById("status");
    status.innerHTML = "Started dragging " + event.target.id;
});
DragDrop.addHandler("drag", function(event) {
    var status = document.getElementById("status");
    status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
});
DragDrop.addHandler("dragend", function(event) {
    var status = document.getElementById("status");
    status.innerHTML += "<br/> Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
});