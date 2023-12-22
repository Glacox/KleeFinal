// APP ENTRYPOINT

let labelEXT;


window.onload = () => {
    const api = new JitsiMeetExternalAPI("8x8.vc", {
      roomName: "vpaas-magic-cookie-c054920adebc4d9fa89ad03cf8f5bffc/KleeClientFreeConceptStore",
      parentNode: document.querySelector('#jaas-container'),
      // Make sure to include a JWT if you intend to record,
      // make outbound calls or use any other premium features!
      // jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtYzA1NDkyMGFkZWJjNGQ5ZmE4OWFkMDNjZjhmNWJmZmMvNzIyNzdjLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MDI0NjU4ODcsImV4cCI6MTcwMjQ3MzA4NywibmJmIjoxNzAyNDY1ODgyLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtYzA1NDkyMGFkZWJjNGQ5ZmE4OWFkMDNjZjhmNWJmZmMiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwic2lwLW91dGJvdW5kLWNhbGwiOmZhbHNlLCJ0cmFuc2NyaXB0aW9uIjpmYWxzZSwicmVjb3JkaW5nIjpmYWxzZX0sInVzZXIiOnsiaGlkZGVuLWZyb20tcmVjb3JkZXIiOmZhbHNlLCJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJUZXN0IFVzZXIiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA2OTgxMTg1MDM2MTI2NjEwMDIxIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ0ZXN0LnVzZXJAY29tcGFueS5jb20ifX0sInJvb20iOiIqIn0.Tm1nCaqvDcVa0EEIweyrz1Y8ME2GJa1Q1JLck318lj5vBWN9Mjcxw66BoknUziFzVqq2mu2vg0-TZfNgBhIGcUXcyaCXikwaUG2k-yFkugks-JeetUNNND03XJAY8N0_qwHNZeTMC-_plPZAZWv5R7Y5MuqdaRJP3XwrrGbSJq7xmTw3NJiOJmiZ51tEQhbFWnSfOgNDeaUSVm40RV9gSnuO4yWCLHBPrO6oYj55wJYPDYILlmvN4ozt8gnMXg7POdUSvQO8dbd-ESNh78NvAzj-zWRjhpkh-uAWdpAireqMEHVAqDRr7TcJ7NkA0cZefdrExWjkDm5gQEUeFu7Hzg"
    });
  }

async function InitApp() {
    await SDK3DVerse.joinOrStartSession({
        userToken: "public_-WzhFjin3iBmfocN",
        sceneUUID: "9d7ad4df-c1e7-4018-9ebf-1331d8fb4178",
        canvas: document.getElementById("display-canvas"),
        viewportProperties: {
            defaultControllerType: SDK3DVerse.controller_type.orbit,
        },
        
    });
    await SDK3DVerse.installExtension(SDK3DVerse_ViewportDomOverlay_Ext);
    labelEXT = await SDK3DVerse.installExtension(SDK3DVerse_LabelDisplay_Ext);
    const viewport = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];

    viewport.setGlobalTransform({position: [0,12,0]});
    SDK3DVerse.updateControllerSetting({
        speed: 4.0, // speed in meters per second
        sensitivity: 0.3, // "rotation speed"
        damping: 0.65,
        angularDamping: 0.65,
        lookAtPoint: [0, 0, 0] // orbit center of the orbit camera controller
    });

    labelEXT.onLabelSelected = onLabelSelected;
}

window.addEventListener("load", InitApp);
function onLabelSelected (label) {

    
    console.log(label);
    SDK3DVerse.updateControllerSetting({
        lookAtPoint: label.getGlobalTransform().position
    });
    //labelEXT.toggleDisplay();
    
};