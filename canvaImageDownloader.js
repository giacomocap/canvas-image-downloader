async function svgToPng(svg, isUrl = false) {
    const url = isUrl ? svg : await getSvgUrl(svg);
    const img = await svgToPngAwaitable(url);
    if (!isUrl) URL.revokeObjectURL(url);
    return img;
}
async function fetchImageAsBlob(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error fetching the image:', error);
        return null;
    }
}
async function getSvgUrl(svg) {
    return URL.createObjectURL(await fetchImageAsBlob(svg));//new Blob([svg], { type: 'image/svg+xml' }));
}
function svgUrlToPng(svgUrl, callback) {
    const svgImage = document.createElement('img');
    // imgPreview.style.position = 'absolute';
    // imgPreview.style.top = '-9999px';
    document.body.appendChild(svgImage);
    svgImage.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = svgImage.clientWidth;
        canvas.height = svgImage.clientHeight;
        const canvasCtx = canvas.getContext('2d');
        canvasCtx.drawImage(svgImage, 0, 0);
        const imgData = canvas.toDataURL('image/png');
        callback(imgData);
        // document.body.removeChild(imgPreview);
    };
    svgImage.src = svgUrl;
}

async function downloadImage(
    imageSrc, index, isUrl = false
) {
    let href = imageSrc;
    if (!isUrl) {
        const response = await fetch(imageSrc);

        const blobImage = await response.blob();
        href = URL.createObjectURL(blobImage);
    }



    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = "sticker_" + index + ".png";

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}

//first function that is called
async function getAll() {
    //get all img tag and get the sources
    const imgs = [...document.getElementsByTagName('img')].map(e => e.src);
    debugger;
    for (let index = 1; index <= imgs.length; index++) {
        const element = imgs[index];
        if (!element)
            return;

        if (element.includes('blob')) {
            const blob = await fetch(element).then(r => r.blob());
            if (blob.type.includes('svg')) {
                let imggData = "";
                try {
                    imggData = await svgToPng(URL.createObjectURL(blob), true);
                } catch (error) {
                    console.error(error);
                }
                await downloadImage(imggData, index);
            } else if (blob.type.includes('png')) {
                await downloadImage(URL.createObjectURL(blob), index, true);
            }
        }
        else {
            if (element.includes('svg')) {
                let imggData = "";
                try {
                    imggData = await svgToPng(element);
                } catch (error) {
                    console.error(error);
                }
                await downloadImage(imggData, index);
            } else if (element.includes('png')) {
                await downloadImage(element, index);
            }
        }
    }
}


async function svgToPngAwaitable(src) {
    return new Promise((resolve, reject) => {
        const svgImage = document.createElement('img');
        // imgPreview.style.position = 'absolute';
        // imgPreview.style.top = '-9999px';
        document.body.appendChild(svgImage);
        svgImage.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = svgImage.clientWidth;
            canvas.height = svgImage.clientHeight;
            const canvasCtx = canvas.getContext('2d');
            canvasCtx.drawImage(svgImage, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            svgImage.remove();
            resolve(imgData)
        };
        svgImage.onerror = reject
        svgImage.src = src
    })
}
clear();
await getAll();


function triggerDownload(imgURI) {
    const a = document.createElement('a');
    a.download = 'MY_COOL_IMAGE.png'; // filename
    a.target = '_blank';
    a.href = imgURI;
  
    // trigger download button
    // (set `bubbles` to false here.
    // or just `a.click()` if you don't care about bubbling)
    a.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    }));
  }
function DownloadSVG() {
    const svgNode = document.querySelector('svg');
    const svgString = (new XMLSerializer()).serializeToString(svgNode);
    const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8'
    });

    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);

    const image = new Image();
    image.width = svgNode.width.baseVal.value;
    image.height = svgNode.height.baseVal.value;
    image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = image.clientWidth;
        canvas.height = image.clientHeight;

        const canvasCtx = canvas.getContext('2d');
        canvasCtx.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvas
            .toDataURL('image/png')
            // .replace('image/png', 'image/octet-stream');
        triggerDownload(imgURI);
    };
    image.src = url;
}
DownloadSVG();