# Azure Functions Node.js Stream Sample

The app in this repo demonstrates the new Node.js [HTTP streams feature](https://aka.ms/AzFuncNodeHttpStreams) on Azure Functions. It streams a large file (96mb by default) named `temp/input.txt` to a file `temp/output.txt` and logs the progress. This app has http streams turned on by default, but you can change this (and other settings) by modifying the `src/constants.ts` file.

## Prerequsites

- Version 4.0.5530 of Azure Functions Core Tools
- Node.js v18+

## Run the app

1. Add a `local.settings.json` file with the following contents:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "FUNCTIONS_REQUEST_BODY_SIZE_LIMIT": "4294967296"
        }
    }
    ```

2. Run `npm install`.
3. Run `npm start`. This will build the app, create the large input file, and start the app.
4. Leave the previous terminal running and open a new terminal to execute a function.
    - If you want to simulate streaming a request, run `npm run streamRequest`.
    - If you want to simulate streaming a response, run `npm run streamResponse`.
5. You should see progress in the console as the file is processed. It happens fast for a 96mb file, but as long as you see a chunk count greater than 1, you know your data was streamed.

## App contents

- `src/functions/*`: The actual functions for your app
- `src/scripts/*`: Scripts used to create the large file and send requests to Azure Functions
- `src/constants.ts`: A file with several settings that you can change to modify the behavior of the app.

## Next steps

We recommend you play around with this app to really get a feel for the feature!

1. Follow the steps above to run your app.
2. Open a new terminal and run `npm watch`. This will ensure your running app is updated every time you save a file.
3. Modify a setting in `src/constants.ts`, run the scripts mentioned above to simulate streaming a request or response, and see what happens!
    - `enableHttpStream`: Set this to false to turn the stream feature off. In general, you will notice slower performance and more errors with this feature off.
    - `sendRequestInChunks`: Set this to false to simulate different ways of sending a request to your app. The new streams feature will work regardless of how the request is sent, but without the new feature your app can fail in a variety of ways.
    - `inputFileSize`: Set this to a higher value to test the limits of your app. Each time you change this value, you will need to run `npm run createInputFile` to re-generate the input file with a different size.
