function makeQRCode() {
    console.log("Current URL is: " + window.location.href);
    QRCode.toCanvas(document.getElementById('canvas'), window.location.href, function (error) {
        if (error) console.error(error)
        console.log('success!');
        return true;
      })
}