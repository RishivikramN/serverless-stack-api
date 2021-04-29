import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

interface Key{
    userId: string;
    noteId: string;
}

interface Params {
    TableName: string;
    Key: Key;
}

export const get = handler(async (event: APIGatewayEvent, context: Context): Promise<any> => {
  const params: Params = {
    TableName: process.env.tableName,
    Key: {
      userId: "123", 
      noteId: event.pathParameters.id, 
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});