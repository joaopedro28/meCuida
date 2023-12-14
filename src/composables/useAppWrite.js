import { Client } from "appwrite";

export default () => {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6566bc2d17738de792ed');

    return client;
};
