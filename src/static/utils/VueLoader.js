export default function (url, code) {
    function getSource(source, type) {
        var regex = new RegExp("<" + type + "[^>]*>");
        var openingTag = source.match(regex);
        if (!openingTag) return "";
        else openingTag = openingTag[0];
        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf("</" + type + ">"));
    }

    function splitCode() {
        return getSource(code, "script").replace(
            /TEMPLATE_PLACEHOLDER/,
            `template: \`${getSource(code, "template")}\``
        );
    }
    return splitCode();
}