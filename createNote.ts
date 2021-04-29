import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

interface Item {
    userId: string;
    noteId: any;
    content: any;
    attachment: any;
    createdAt: number;
}

interface Params {
    TableName: string;
    Item: Item;
}

export const create = handler( async (event: APIGatewayEvent, context: Context): Promise<any> => {
    const data = JSON.parse(event.body);

    const params: Params = {
        TableName: process.env.tableName,
        Item: {
        userId: event.requestContext.identity.cognitoIdentityId, 
        noteId: uuid.v1(),                 
        content: data.content, 
        attachment: data.attachment, 
        createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});