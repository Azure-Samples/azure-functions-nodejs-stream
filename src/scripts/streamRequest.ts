import { createReadStream } from 'fs';
import { fetch, FormData } from 'undici';
import { inputFilePath } from '../constants';

async function streamRequest(): Promise<void> {
    const start = Date.now();

    const form = new FormData();
    form.append('string1', 'value1');
    // https://stackoverflow.com/questions/75793118/streaming-multipart-form-data-request-with-native-fetch-in-node-js/75795888
    form.set('file1', {
        [Symbol.toStringTag]: 'File',
        name: 'input.txt',
        stream: () => createReadStream(inputFilePath),
    });

    const url = 'http://127.0.0.1:7071/api/streamRequest';
    await fetch(url, { method: 'POST', body: form });

    const duration = (Date.now() - start) / 1000;
    console.log(`streamRequest finished in ${duration} seconds`);
}

void streamRequest();
