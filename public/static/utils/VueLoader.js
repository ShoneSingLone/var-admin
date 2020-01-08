export default function (url, code) {
    function getSource(source, type) {
        var regex = new RegExp("<" + type + "[^>]*>");
        var openingTag = source.match(regex);
        if (!openingTag) return "";
        else openingTag = openingTag[0];
        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf("</" + type + ">"));
    }

    function splitCode() {
        var template = getSource(code, "template");
        var script = getSource(code, "script").replace(
            /TEMPLATE_PLACEHOLDER/,
            "template:`" + template + "`"
        );
        return script;
    }
    return splitCode();
}