
<script>
var JsBarcode = require('jsbarcode');
if (typeof window !== 'undefined'){
    var printJS = require('print-js');

}
//

// const doc = new jsPDF({
//     orientation: "landscape",
//     // unit: "in",
//     // format: [4, 2]
// });

var VueBarcode = {
    render: function (createElement) {
        return createElement('button', [
            createElement(this.elementTag, {
                style: { display: this.valid ? undefined : 'none' },
                'class': ['vue-barcode-element']
            }),
            createElement('button', {
                style: { display: this.valid ? 'none' : undefined }
            }, this.$slots.default),
        ]);
    },
    props: {
        value: [String, Number],
        format: [String],
        width: [String, Number],
        height: [String, Number],
        displayValue: {
            type:  [String, Boolean],
            default: true
        },
        text: [String, Number],
        fontOptions : [String],
        font: [String],
        textAlign: [String],
        textPosition: [String],
        textMargin: [String, Number],
        fontSize: [String, Number],
        background: [String],
        lineColor: [String],
        margin: [String, Number],
        marginTop: [String, Number],
        marginBottom: [String, Number],
        marginLeft: [String, Number],
        marginRight: [String, Number],
        flat: [Boolean],
        ean128: [String, Boolean],
        elementTag: {
            type: String,
            default: 'img',
            validator: function (value) {
                return ['canvas', 'svg', 'img'].indexOf(value) !== -1
            }
        }
    },
    mounted: function(){
        this.$watch('$props', render, { deep: true, immediate: true });
        render.call(this);

        // doc.text("Hello world!", 1, 1);
        // doc.save("two-by-four.pdf");

    },
    print: function (message) {
        alert(message)
    },
    // methods:{
    //     print: function (message) {
    //         alert(message)
    //     }
    // },
    data: function(){
        return {valid: true};
    }
};

function render(){
    var that = this;

    var settings = {
        format: this.format,
        width: this.width,
        height: this.height,
        displayValue: this.displayValue,
        text: this.text,
        fontOptions: this.fontOptions,
        font: this.font,
        textAlign: this.textAlign,
        textPosition: this.textPosition,
        textMargin: this.textMargin,
        fontSize: this.fontSize,
        background: this.background,
        lineColor: this.lineColor,
        margin: this.margin,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        marginLeft: this.marginLeft,
        marginRight: this.marginRight,
        flat: this.flat,
        ean128: this.ean128,
        valid: function (valid) {
            that.valid = valid;
        },
        elementTag: this.elementTag
    };

    removeUndefinedProps(settings);

    JsBarcode(this.$el.querySelector('.vue-barcode-element'), String(this.value), settings);
    //console.log(this.$el.querySelector('.vue-barcode-element').src)
    //this.$el.querySelector('.vue-barcode-element').onclick = function(event) { alert("moot!"); };
    printJS(this.$el.querySelector('.vue-barcode-element').src, 'image')
}
function print(){
    alert("onclick Event detected!");
}
function removeUndefinedProps(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
            delete obj[prop];
        }
    }
}

module.exports = VueBarcode;
</script>
