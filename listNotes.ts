import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const list = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});