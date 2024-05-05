const reImage = /.*\.(jpg|jpeg|png|gif)(\?raw=1)?$/i;

export default function transformImage() {
    return str => {
        if (str.match(reImage)) {
            return `<div class="slide-image" style="background-image:url(${str})"></div>`;
        }

        return str;
    };
}
