import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { writeOutputFile } from '../writeOutputFile';

app.http('streamRequest', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request: HttpRequest, context: InvocationContext) => {
        const form = await request.formData();
        for (const [key, value] of form.entries()) {
            if (typeof value === 'string') {
                context.log(`${key}: ${value}`);
            } else {
                await writeOutputFile(value.stream());
                context.log(`File name: ${value.name}`);
                context.log(`File size: ${value.size}`);
                context.log(`File type: ${value.type}`);
            }
        }

        return {
            body: 'Done!',
            status: 200,
        };
    },
});
